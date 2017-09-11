/**
 * Created by evio on 2017/6/20.
 */
import { EventEmitter } from './events';
export default class Dictionary extends EventEmitter {
    constructor() {
        super();
        this.variables = {};
        this.maps = [];
    }

    /**
     * 定义对象在class类上的getter与setter
     * 同时绑定监听
     * @param key
     * @returns {*}
     * @private
     *
     * @example
     *
     *  this.on('abc', (newValue, oldValue) => {
     *      console.log(newValue, oldValue);
     *  });
     *
     *  this.set('abc', 123);
     *  this.set('abc', 456);
     *  @watcher [456, 123]
     */
    __defineDescriptor__(key) {
        if (this.maps.indexOf(key) > -1) return;
        this.maps.push(key);
        Object.defineProperty(this, key, {
            configurable: true,
            get() { return this.get(key); },
            set(value) {
                const old = this.variables[key];
                this.variables[key] = value;
                if (old !== value) {
                    this.emit(key, value, old);
                }
            }
        });
    }

    /**
     * 判断某个值存在或有效
     * @param mark
     * @returns {boolean}
     */
    exists(mark) {
        return !!this.variables[mark];
    }

    /**
     * 遍历数据方法
     * @param fn
     */
    each(fn) {
        for (const i in this.variables) {
            fn(i, this.variables[i]);
        }
    }

    /**
     * 过滤符合条件的数据
     * @param fn
     * @returns {{}}
     */
    filter(fn) {
        const result = {};
        for (const i in this.variables) {
            const value = fn(i, this.variables[i]);
            if (value) {
                result[i] = this.variables[i];
            }
        }
        return result;
    }

    /**
     * 设置一个值
     * @param key
     * @param value
     * @returns {*}
     */
    set(key, value) {
        if (key === undefined || key === null) return;
        this.__defineDescriptor__(key);
        this[key] = value;
        return value;
    }

    /**
     * 获取一个值
     * @param key
     * @returns {*}
     */
    get(key) {
        return this.variables[key];
    }

    /**
     * 删除一个值
     * @param key
     */
    del(key) {
        const index = this.maps.indexOf(key);
        if (index > -1) {
            delete this[key];
            delete this.variables[key];
            this.maps.splice(index, 1);
        }
    }
}