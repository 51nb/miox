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

var _isClass = require('is-class');

var _isClass2 = _interopRequireDefault(_isClass);

var _webview = require('./webview');

var _webview2 = _interopRequireDefault(_webview);

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _directives = require('./directives');

var _directives2 = _interopRequireDefault(_directives);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Vue2x 驱动引擎
 */
/**
 * Created by evio on 2017/3/20.
 */
var Engine = function () {
    function Engine(ctx) {
        (0, _classCallCheck3.default)(this, Engine);

        this.ctx = ctx;

        ctx.on('app:end', function () {
            if (ctx.env === 'server') return;
            var scripts = ctx.element.querySelectorAll('script');
            var i = scripts.length;

            while (i--) {
                var script = scripts[i];
                if (script && script.parentNode) {
                    script.parentNode.removeChild(script);
                }
            }
        });
        ctx.on('server:render:polyfill', function (context) {
            var store = ctx.get('vuex');
            if (store) {
                context.state = store.state;
            }
        });

        ctx.on('client:render:polyfill', function () {
            var store = ctx.get('vuex');
            if (global.__INITIAL_STATE__ && store) {
                store.replaceState(global.__INITIAL_STATE__);
            }
        });

        ctx.on('client:render:mount', function (viewModule) {
            if (!ctx.element) throw new Error('miss ctx.element');
            if (!viewModule) throw new Error('miss view module');

            var el = ctx.element.querySelector('[data-server-rendered=true]');
            if (!el) throw new Error('miss data-server-rendered element');

            viewModule.$mount(el);
        });
    }

    (0, _createClass3.default)(Engine, [{
        key: 'create',
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(webview, options) {
                var _this = this;

                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!(!(0, _isClass2.default)(webview) && typeof webview !== 'function')) {
                                    _context.next = 2;
                                    break;
                                }

                                throw new Error('`webview` argument is not a class object.');

                            case 2:
                                _context.next = 4;
                                return new Promise(function (resolve, reject) {
                                    try {
                                        var Arguments = {};

                                        if (['web', 'client'].indexOf(_this.ctx.env) > -1 && _this.ctx.installed) {
                                            Arguments.el = _this.createWebviewRoot();
                                        }

                                        Arguments.propsData = options || {};
                                        Arguments.extends = _webview2.default;

                                        new webview(Arguments).$on('webview:created', function () {
                                            resolve(this);
                                        });
                                    } catch (e) {
                                        reject(e);
                                    }
                                });

                            case 4:
                                return _context.abrupt('return', _context.sent);

                            case 5:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function create(_x, _x2) {
                return _ref.apply(this, arguments);
            }

            return create;
        }()
    }, {
        key: 'install',
        value: function install() {
            _vue2.default.prototype.$miox = this.ctx;
            (0, _directives2.default)(this.ctx);
        }
    }, {
        key: 'createWebviewRoot',
        value: function createWebviewRoot() {
            if (!global.document) return;
            var element = global.document.createElement('div');
            var wrapElement = global.document.createElement('div');

            this.ctx.element.appendChild(element);
            element.appendChild(wrapElement);
            element.classList.add('mx-webview');

            return wrapElement;
        }
    }]);
    return Engine;
}();

exports.default = Engine;
module.exports = exports['default'];