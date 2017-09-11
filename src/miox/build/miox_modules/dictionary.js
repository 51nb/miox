'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _events = require('./events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Dictionary = function (_EventEmitter) {
    (0, _inherits3.default)(Dictionary, _EventEmitter);

    function Dictionary() {
        (0, _classCallCheck3.default)(this, Dictionary);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Dictionary.__proto__ || Object.getPrototypeOf(Dictionary)).call(this));

        _this.variables = {};
        _this.maps = [];
        return _this;
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


    (0, _createClass3.default)(Dictionary, [{
        key: '__defineDescriptor__',
        value: function __defineDescriptor__(key) {
            if (this.maps.indexOf(key) > -1) return;
            this.maps.push(key);
            Object.defineProperty(this, key, {
                configurable: true,
                get: function get() {
                    return this.get(key);
                },
                set: function set(value) {
                    var old = this.variables[key];
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

    }, {
        key: 'exists',
        value: function exists(mark) {
            return !!this.variables[mark];
        }

        /**
         * 遍历数据方法
         * @param fn
         */

    }, {
        key: 'each',
        value: function each(fn) {
            for (var i in this.variables) {
                fn(i, this.variables[i]);
            }
        }

        /**
         * 过滤符合条件的数据
         * @param fn
         * @returns {{}}
         */

    }, {
        key: 'filter',
        value: function filter(fn) {
            var result = {};
            for (var i in this.variables) {
                var value = fn(i, this.variables[i]);
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

    }, {
        key: 'set',
        value: function set(key, value) {
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

    }, {
        key: 'get',
        value: function get(key) {
            return this.variables[key];
        }

        /**
         * 删除一个值
         * @param key
         */

    }, {
        key: 'del',
        value: function del(key) {
            var index = this.maps.indexOf(key);
            if (index > -1) {
                delete this[key];
                delete this.variables[key];
                this.maps.splice(index, 1);
            }
        }
    }]);
    return Dictionary;
}(_events.EventEmitter); /**
                          * Created by evio on 2017/6/20.
                          */


exports.default = Dictionary;
module.exports = exports['default'];