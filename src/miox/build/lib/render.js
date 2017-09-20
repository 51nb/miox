'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var resolveEventEmitter = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(app, events) {
        var array, i, sourceName, targetName, mioxName;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        array = ['Enter', 'Leave', 'Active'];
                        i = 0;

                    case 2:
                        if (!(i < array.length)) {
                            _context2.next = 15;
                            break;
                        }

                        sourceName = array[i];
                        targetName = 'MioxInject' + sourceName;
                        mioxName = 'webview:' + sourceName;

                        if (!(events[sourceName] && typeof events[sourceName][targetName] === 'function')) {
                            _context2.next = 12;
                            break;
                        }

                        _context2.next = 9;
                        return app.emit(mioxName, events[sourceName]);

                    case 9:
                        _context2.next = 11;
                        return events[sourceName][targetName]();

                    case 11:
                        events[sourceName] = null;

                    case 12:
                        i++;
                        _context2.next = 2;
                        break;

                    case 15:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function resolveEventEmitter(_x5, _x6) {
        return _ref2.apply(this, arguments);
    };
}();

var createNewCachedWebView = function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(app, engine, webview, data, mark, webViews) {
        var newCacheWebView;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.next = 2;
                        return engine.create(webview, data);

                    case 2:
                        newCacheWebView = _context3.sent;

                        newCacheWebView.__MioxMark__ = mark;
                        webview.dic.set(mark, newCacheWebView);
                        defineWebViewHistoryIndex(app, newCacheWebView);
                        webViews.events.Enter = newCacheWebView;
                        return _context3.abrupt('return', newCacheWebView);

                    case 8:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this);
    }));

    return function createNewCachedWebView(_x7, _x8, _x9, _x10, _x11, _x12) {
        return _ref3.apply(this, arguments);
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
        var pathname, action, mark, existsWebViewConfigs, webViews, oldCacheWebViewConstructor, oldCacheWebView, pushWebViewExtras, remindExtra, newCacheWebView, oldCacheChangeStatus, newCacheWebViewIndex, reduce, index, targetWebView, targetIndex, sourceIndex;
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
                            activeWebView: null,
                            events: {
                                Active: null,
                                Enter: null,
                                Leave: null
                            }
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
                            _context.next = 18;
                            break;
                        }

                        _context.next = 15;
                        return app.emit('webview:beforeEnter', { webview: webview, mark: mark });

                    case 15:
                        _context.next = 17;
                        return createNewCachedWebView(app, engine, webview, data, mark, webViews);

                    case 17:
                        newCacheWebView = _context.sent;

                    case 18:

                        if (oldCacheWebViewConstructor) {
                            oldCacheWebView = oldCacheWebViewConstructor.dic.get(mark);
                        }

                        oldCacheChangeStatus = oldCacheWebViewConstructor && oldCacheWebViewConstructor !== webview && oldCacheWebView;

                        app.cache.set(pathname, webview);

                        if (!(app.history.stacks.length === 0)) {
                            _context.next = 26;
                            break;
                        }

                        app.history.stacks.push(newCacheWebView);
                        app.tick = -1;
                        _context.next = 39;
                        break;

                    case 26:
                        _context.t0 = action;
                        _context.next = _context.t0 === 'push' ? 29 : _context.t0 === 'replace' ? 35 : 38;
                        break;

                    case 29:
                        app.tick = -1;
                        pushWebViewExtras = app.history.stacks.slice(webViews.existWebViewIndex + 1);
                        oldCacheChangeStatus && pushWebViewExtras.push(oldCacheWebView);
                        newCacheWebViewIndex = pushWebViewExtras.indexOf(newCacheWebView);

                        if (newCacheWebViewIndex > -1) {
                            pushWebViewExtras.splice(newCacheWebViewIndex, 1);
                            destroyWebViews(app, pushWebViewExtras);
                        } else {
                            destroyWebViews(app, pushWebViewExtras);
                            app.history.stacks.push(newCacheWebView);
                        }
                        return _context.abrupt('break', 39);

                    case 35:
                        if (oldCacheChangeStatus) destroyWebViews(app, oldCacheWebView);
                        destroyWebViews(app, webViews.existsWebView, newCacheWebView);
                        return _context.abrupt('break', 39);

                    case 38:
                        if (oldCacheChangeStatus) {
                            destroyWebViews(app, oldCacheWebView, newCacheWebView);
                        } else {
                            if (app.history.stacks.indexOf(newCacheWebView) === -1) {
                                reduce = app.history.session ? app.history.session.current - (app.index || 0) : 0;
                                index = webViews.existWebViewIndex - reduce;


                                if (index < 0) index = 0;
                                if (index >= app.options.max) index = app.options.max - 1;

                                targetWebView = app.history.stacks[index];
                                targetIndex = targetWebView ? targetWebView.historyIndex : 0;
                                sourceIndex = app.webView.historyIndex;


                                if (app.history.direction < 0) {
                                    if (sourceIndex - reduce < targetIndex) {
                                        app.tick = 1;
                                        insertStacks(app, index, newCacheWebView);
                                    } else if (sourceIndex - reduce > targetIndex) {
                                        app.tick = -1;
                                        insertStacks(app, index + 1, newCacheWebView);
                                    } else {
                                        destroyWebViews(app, targetWebView, newCacheWebView);
                                    }
                                } else if (app.history.direction > 0) {
                                    if (sourceIndex - reduce < targetIndex) {
                                        app.tick = 1;
                                        insertStacks(app, index, newCacheWebView);
                                    } else if (sourceIndex - reduce > targetIndex) {
                                        app.tick = -1;
                                        insertStacks(app, index + 1, newCacheWebView);
                                    } else {
                                        destroyWebViews(app, targetWebView, newCacheWebView);
                                    }
                                } else {
                                    app.history.stacks.push(newCacheWebView);
                                    app.tick = -1;
                                }
                            }
                        }

                    case 39:

                        webViews.activeWebView = newCacheWebView;

                        app.set('active-webview', {
                            basic: webview,
                            mark: mark
                        });

                        // SSR的client端渲染的时候，在没有mounted情况下，取不到节点；
                        // 那么直接返回，不做任何动画。

                        if (webViews.activeWebViewElement) {
                            _context.next = 45;
                            break;
                        }

                        _context.next = 44;
                        return resolveEventEmitter(app, webViews.events);

                    case 44:
                        return _context.abrupt('return', webViews.activeWebView);

                    case 45:
                        if (!webViews.existsWebViewElement) {
                            _context.next = 48;
                            break;
                        }

                        _context.next = 48;
                        return app.emit('webview:beforeLeave', webViews.existsWebView);

                    case 48:
                        _context.next = 50;
                        return (0, _animate2.default)(app, webViews.existsWebViewElement, webViews.activeWebViewElement);

                    case 50:
                        if (!(app.history.stacks.length > app.options.max)) {
                            _context.next = 59;
                            break;
                        }

                        _context.t1 = app.tick;
                        _context.next = _context.t1 === 1 ? 54 : _context.t1 === -1 ? 56 : 58;
                        break;

                    case 54:
                        remindExtra = app.history.stacks[app.history.stacks.length - 1];
                        return _context.abrupt('break', 58);

                    case 56:
                        remindExtra = app.history.stacks[0];
                        return _context.abrupt('break', 58);

                    case 58:

                        destroyWebViews(app, remindExtra);

                    case 59:

                        webViews.events.Leave = webViews.existsWebView;
                        webViews.events.Enter = webViews.activeWebView;

                        if (!webViews.events.Enter && newCacheWebView && app.history.stacks.indexOf(newCacheWebView) > -1) {
                            webViews.events.Active = newCacheWebView;
                        }

                        if (app.tick) delete app.tick;
                        _context.next = 65;
                        return resolveEventEmitter(app, webViews.events);

                    case 65:
                        return _context.abrupt('return', webViews.activeWebView);

                    case 66:
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

function defineWebViewHistoryIndex(app, object) {
    Object.defineProperty(object, 'historyIndex', {
        get: function get() {
            if (!app.history.session) return 0;
            var vars = app.history.session.variables;
            var strict = app.options.strict;
            for (var i in vars) {
                var mark = strict && vars[i].search ? vars[i].pathname + ':' + vars[i].search : vars[i].pathname;
                if (mark === object.__MioxMark__) {
                    return Number(i);
                }
            }
        }
    });
}
module.exports = exports['default'];