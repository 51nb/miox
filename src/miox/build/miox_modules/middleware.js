'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _events = require('./events');

var _mioxCompose = require('miox-compose');

var _mioxCompose2 = _interopRequireDefault(_mioxCompose);

var _mioxConvert = require('miox-convert');

var _mioxConvert2 = _interopRequireDefault(_mioxConvert);

var _isGeneratorFunction = require('is-generator-function');

var _isGeneratorFunction2 = _interopRequireDefault(_isGeneratorFunction);

var _flatten = require('flatten');

var _flatten2 = _interopRequireDefault(_flatten);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MiddleWares = function (_EventEmitter) {
    (0, _inherits3.default)(MiddleWares, _EventEmitter);

    function MiddleWares() {
        (0, _classCallCheck3.default)(this, MiddleWares);

        var _this = (0, _possibleConstructorReturn3.default)(this, (MiddleWares.__proto__ || Object.getPrototypeOf(MiddleWares)).call(this));

        _this.middlewares = [];
        return _this;
    }

    /**
     * 设计一个中间件
     * @param args
     * @returns {MiddleWares}
     */


    (0, _createClass3.default)(MiddleWares, [{
        key: 'use',
        value: function use() {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            args = (0, _flatten2.default)(args);
            var result = [];
            for (var i = 0; i < args.length; i++) {
                var cb = args[i];

                /* istanbul ignore if */
                if (typeof cb !== 'function') {
                    throw new Error('middleware must be a function ' + 'but got ' + (typeof cb === 'undefined' ? 'undefined' : (0, _typeof3.default)(cb)));
                }

                /* istanbul ignore if */
                if ((0, _isGeneratorFunction2.default)(cb)) {
                    cb = (0, _mioxConvert2.default)(cb);
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

    }, {
        key: '__defineProcessHandle__',
        value: function __defineProcessHandle__() {
            this.__processer__ = (0, _mioxCompose2.default)(this.middlewares);
        }

        /**
         * 运行遍历中间件
         * @param context
         * @returns {Promise.<*>}
         */

    }, {
        key: 'execute',
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(context) {
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.__processer__(context || this);

                            case 2:
                                return _context.abrupt('return', _context.sent);

                            case 3:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function execute(_x) {
                return _ref.apply(this, arguments);
            }

            return execute;
        }()
    }]);
    return MiddleWares;
}(_events.EventEmitter); /**
                          * Created by evio on 2017/8/29.
                          */


exports.default = MiddleWares;
module.exports = exports['default'];