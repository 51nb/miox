'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var createNewCachedWebView = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(engine, webview, data, mark) {
        var newCacheWebView;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return engine.create(webview, data);

                    case 2:
                        newCacheWebView = _context2.sent;

                        newCacheWebView.__MioxMark__ = mark;
                        webview.dic.set(mark, newCacheWebView);
                        return _context2.abrupt('return', newCacheWebView);

                    case 6:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function createNewCachedWebView(_x5, _x6, _x7, _x8) {
        return _ref2.apply(this, arguments);
    };
}();

var _animate = require('./animate');

var _animate2 = _interopRequireDefault(_animate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * webview渲染方法
 * @param app
 * @param engine
 * @param webview
 * @param data
 * @returns {Promise.<null>}
 */
exports.default = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(app, engine, webview, data) {
        var pathname, action, mark, existsWebViewConfigs, webViews, oldCacheWebViewConstructor, oldCacheWebView, pushWebViewExtras, remindExtra, newCacheWebView, oldCacheChangeStatus;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        pathname = app.req.pathname;
                        action = app.history.action;
                        mark = app.options.strict ? app.req.mark : pathname;
                        existsWebViewConfigs = app.get('exists-webview');
                        webViews = {
                            existsWebView: existsWebViewConfigs ? existsWebViewConfigs.basic.dic.get(existsWebViewConfigs.mark) : null,
                            activeWebView: null
                        };

                        if (!(action === 'replace' && !webViews.existsWebView)) {
                            _context.next = 7;
                            break;
                        }

                        throw new Error('replace method need a existing webview');

                    case 7:

                        defineWebViewElementGetter(webViews, 'existsWebView');
                        defineWebViewElementGetter(webViews, 'activeWebView');

                        Object.defineProperty(webViews, 'existWebViewIndex', {
                            get: function get() {
                                if (webViews.existsWebView) {
                                    return app.history.stacks.indexOf(webViews.existsWebView);
                                }
                                return -1;
                            }
                        });

                        oldCacheWebViewConstructor = app.cache.get(pathname);
                        oldCacheWebView = void 0, pushWebViewExtras = void 0, remindExtra = void 0, newCacheWebView = webview.dic.get(mark);

                        if (newCacheWebView) {
                            _context.next = 16;
                            break;
                        }

                        _context.next = 15;
                        return createNewCachedWebView(engine, webview, data, mark);

                    case 15:
                        newCacheWebView = _context.sent;

                    case 16:

                        if (oldCacheWebViewConstructor) {
                            oldCacheWebView = oldCacheWebViewConstructor.dic.get(mark);
                        }

                        oldCacheChangeStatus = oldCacheWebViewConstructor && oldCacheWebViewConstructor !== webview && oldCacheWebView;

                        app.cache.set(pathname, webview);

                        _context.t0 = action;
                        _context.next = _context.t0 === 'push' ? 22 : _context.t0 === 'replace' ? 31 : 34;
                        break;

                    case 22:
                        pushWebViewExtras = app.history.stacks.slice(webViews.existWebViewIndex + 1);
                        oldCacheChangeStatus && pushWebViewExtras.push(oldCacheWebView);
                        destroyWebViews(app, pushWebViewExtras);

                        if (!(pushWebViewExtras.indexOf(newCacheWebView) > -1)) {
                            _context.next = 29;
                            break;
                        }

                        _context.next = 28;
                        return createNewCachedWebView(engine, webview, data, mark);

                    case 28:
                        newCacheWebView = _context.sent;

                    case 29:
                        app.history.stacks.push(newCacheWebView);
                        return _context.abrupt('break', 35);

                    case 31:
                        if (oldCacheChangeStatus) {
                            destroyWebViews(app, oldCacheWebView);
                        }
                        destroyWebViews(app, webViews.existsWebView, newCacheWebView);
                        return _context.abrupt('break', 35);

                    case 34:
                        if (oldCacheChangeStatus) {
                            destroyWebViews(app, oldCacheWebView, newCacheWebView);
                        } else {
                            if (app.history.stacks.indexOf(newCacheWebView) === -1) {
                                if (app.history.direction < 0) {
                                    insertStacks(app, webViews.existWebViewIndex, newCacheWebView);
                                } else if (app.history.direction > 0) {
                                    insertStacks(app, webViews.existWebViewIndex + 1, newCacheWebView);
                                } else {
                                    app.history.stacks.push(newCacheWebView);
                                }
                            }
                        }

                    case 35:

                        webViews.activeWebView = newCacheWebView;

                        app.set('active-webview', {
                            basic: webview,
                            mark: mark
                        });

                        // SSR的client端渲染的时候，在没有mounted情况下，取不到节点；
                        // 那么直接返回，不做任何动画。

                        if (webViews.activeWebViewElement) {
                            _context.next = 39;
                            break;
                        }

                        return _context.abrupt('return', webViews.activeWebView);

                    case 39:
                        _context.next = 41;
                        return (0, _animate2.default)(app, webViews.existsWebViewElement, webViews.activeWebViewElement);

                    case 41:

                        if (app.history.stacks.length > app.options.max) {
                            if (action === 'push') {
                                remindExtra = app.history.stacks[0];
                            } else if (action !== 'replace') {
                                if (app.history.direction >= 0) {
                                    remindExtra = app.history.stacks[0];
                                } else {
                                    remindExtra = app.history.stacks[app.history.stacks.length - 1];
                                }
                            }
                            destroyWebViews(app, remindExtra);
                        }

                        return _context.abrupt('return', webViews.activeWebView);

                    case 43:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function (_x, _x2, _x3, _x4) {
        return _ref.apply(this, arguments);
    };
}(); /**
      * Created by evio on 2017/8/29.
      */


function defineWebViewElementGetter(webViews, name) {
    Object.defineProperty(webViews, name + 'Element', {
        get: function get() {
            if (this[name]) {
                return this[name].__MioxInjectElement__;
            }
        }
    });
}

function destroyWebViews(app, webviews) {
    if (!Array.isArray(webviews)) {
        webviews = [webviews];
    }
    var i = webviews.length;

    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
    }

    while (i--) {
        var webview = webviews[i];
        var index = app.history.stacks.indexOf(webview);
        if (index > -1) {
            var _app$history$stacks;

            (_app$history$stacks = app.history.stacks).splice.apply(_app$history$stacks, [index, 1].concat(args));
            webview.constructor.dic.del(webview.__MioxMark__);
            webview.MioxInjectDestroy();
        }
    }
}

function insertStacks(app, i) {
    var stacks = app.history.stacks;
    var left = stacks.slice(0, i);
    var right = stacks.slice(i);

    for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
    }

    app.history.stacks = left.concat(args).concat(right);
}

module.exports = exports['default'];