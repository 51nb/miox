/**
 * Created by evio on 2017/8/29.
 */
import { EventEmitter } from './events';
import compose from 'miox-compose';
import convert from 'miox-convert';
import isGeneratorFunction from 'is-generator-function';
import flatten from 'flatten';

export default class MiddleWares extends EventEmitter {
    constructor() {
        super();
        this.middlewares = [];
    }

    /**
     * 设计一个中间件
     * @param args
     * @returns {MiddleWares}
     */
    use(...args) {
        args = flatten(args);
        const result = [];
        for (let i = 0; i < args.length; i++) {
            let cb = args[i];
            if (typeof cb !== 'function') {
                throw new Error(
                    'middleware must be a function ' +
                    'but got ' + typeof cb
                );
            }

            // runtime convert generator function to ...
            if (isGeneratorFunction(cb)) {
                cb = convert(cb);
            }

            result.push(cb);
        }
        this.middlewares.push.apply(this.middlewares, result);
        return this;
    }

    /**
     * 组合所有中间件
     * @private
     */
    __defineProcessHandle__() {
        this.__processer__ = compose(this.middlewares);
    }

    /**
     * 运行遍历中间件
     * @param context
     * @returns {Promise.<*>}
     */
    async execute(context) {
        return await this.__processer__(context || this);
    }
}
