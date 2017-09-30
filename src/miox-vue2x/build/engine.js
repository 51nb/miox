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
                                webview = checkWebViewObject(webview);
                                _context.next = 3;
                                return new Promise(function (resolve, reject) {
                                    try {
                                        var Arguments = {};

                                        switch (_this.ctx.env) {
                                            case 'web':
                                                Arguments.el = _this.createWebViewRoot();
                                                break;
                                            case 'client':
                                                if (_this.ctx.installed) {
                                                    Arguments.el = _this.createWebViewRoot();
                                                }
                                                break;
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

                            case 3:
                                return _context.abrupt('return', _context.sent);

                            case 4:
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
        key: 'destroy',
        value: function () {
            var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(target) {
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                target.$destroy();

                            case 1:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function destroy(_x3) {
                return _ref2.apply(this, arguments);
            }

            return destroy;
        }()
    }, {
        key: 'active',
        value: function () {
            var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(target) {
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                target.$emit('webview:active');

                            case 1:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function active(_x4) {
                return _ref3.apply(this, arguments);
            }

            return active;
        }()
    }, {
        key: 'enter',
        value: function () {
            var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(target) {
                return _regenerator2.default.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                target.$emit('webview:enter');

                            case 1:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function enter(_x5) {
                return _ref4.apply(this, arguments);
            }

            return enter;
        }()
    }, {
        key: 'leave',
        value: function () {
            var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(target) {
                return _regenerator2.default.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                target.$emit('webview:leave');

                            case 1:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));

            function leave(_x6) {
                return _ref5.apply(this, arguments);
            }

            return leave;
        }()
    }, {
        key: 'searchchange',
        value: function () {
            var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(target, prev, next) {
                return _regenerator2.default.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                target.$emit('webview:searchchange', prev, next);

                            case 1:
                            case 'end':
                                return _context6.stop();
                        }
                    }
                }, _callee6, this);
            }));

            function searchchange(_x7, _x8, _x9) {
                return _ref6.apply(this, arguments);
            }

            return searchchange;
        }()
    }, {
        key: 'hashchange',
        value: function () {
            var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(target, prev, next) {
                return _regenerator2.default.wrap(function _callee7$(_context7) {
                    while (1) {
                        switch (_context7.prev = _context7.next) {
                            case 0:
                                target.$emit('webview:hashchange', prev, next);

                            case 1:
                            case 'end':
                                return _context7.stop();
                        }
                    }
                }, _callee7, this);
            }));

            function hashchange(_x10, _x11, _x12) {
                return _ref7.apply(this, arguments);
            }

            return hashchange;
        }()
    }, {
        key: 'element',
        value: function element(target) {
            return target.__MioxInjectElement__;
        }
    }, {
        key: 'install',
        value: function install() {
            _vue2.default.prototype.$miox = this.ctx;
            (0, _directives2.default)(this.ctx);
        }
    }, {
        key: 'createWebViewRoot',
        value: function createWebViewRoot() {
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


function checkWebViewObject(webview) {
    if (!(0, _isClass2.default)(webview) && typeof webview !== 'function') {
        try {
            webview = _vue2.default.extend(webview);
        } catch (e) {
            throw new Error('`webview` argument is not a class object or a function or an object.');
        }
    }
    return webview;
}
module.exports = exports['default'];