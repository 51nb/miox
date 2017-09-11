'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _render = require('../lib/render');

var _render2 = _interopRequireDefault(_render);

var _dictionary = require('./dictionary');

var _dictionary2 = _interopRequireDefault(_dictionary);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by evio on 2017/8/29.
 */
var Response = function () {
    function Response() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        (0, _classCallCheck3.default)(this, Response);

        this.options = options;
        this.__defineMixinResponse__();
    }

    (0, _createClass3.default)(Response, [{
        key: '__defineMixinResponse__',
        value: function __defineMixinResponse__() {
            for (var res in this.options) {
                if (typeof this.options[res] === 'function') {
                    this[res] = this.options[res].bind(this.options);
                } else {
                    this[res] = this.options[res];
                }
            }
        }

        /**
         * 渲染引擎模板
         * @param engine
         * @param webview
         * @param data
         * @returns {Promise.<null>}
         */

    }, {
        key: 'render',
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(engine, webview) {
                var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
                var app, mark, component;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                app = this.app;


                                if (!webview.dic) {
                                    /**
                                     * 在webview上植入dic对象用来缓存对应的构造体
                                     * @type {Dictionary}
                                     */
                                    webview.dic = new _dictionary2.default();
                                }

                                /**
                                 * 在SSR的时候，我们只要将编译后的对象设置到active-webview上即可
                                 * 无需做过多的处理
                                 * 因为在服务端渲染时候，只是渲染当前的对象，跟之后的逻辑对象无关
                                 */

                                if (!(app.env === 'server')) {
                                    _context.next = 10;
                                    break;
                                }

                                mark = app.options.strict ? app.req.mark : app.req.pathname;
                                _context.next = 6;
                                return engine.create(webview, data);

                            case 6:
                                component = _context.sent;

                                app.cache.set(app.req.pathname, webview);
                                webview.dic.set(mark, component);
                                return _context.abrupt('return', app.set('active-webview', {
                                    basic: webview,
                                    mark: mark
                                }));

                            case 10:
                                _context.next = 12;
                                return (0, _render2.default)(app, engine, webview, data);

                            case 12:
                                return _context.abrupt('return', _context.sent);

                            case 13:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function render(_x2, _x3) {
                return _ref.apply(this, arguments);
            }

            return render;
        }()
    }]);
    return Response;
}();

exports.default = Response;
module.exports = exports['default'];