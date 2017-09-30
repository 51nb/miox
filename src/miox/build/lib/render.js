'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(app, engine, webview, data) {
        var resolveEventEmitter = function () {
            var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(events) {
                var array, i, eventName, _webview, simpleName;

                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                array = ['Enter', 'Leave', 'Active'];
                                i = 0;

                            case 2:
                                if (!(i < array.length)) {
                                    _context.next = 13;
                                    break;
                                }

                                eventName = array[i];
                                _webview = events[eventName];
                                simpleName = eventName.toLowerCase();

                                if (!(_webview && engine[simpleName])) {
                                    _context.next = 10;
                                    break;
                                }

                                _context.next = 9;
                                return engine[simpleName](_webview);

                            case 9:
                                events[eventName] = null;

                            case 10:
                                i++;
                                _context.next = 2;
                                break;

                            case 13:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            return function resolveEventEmitter(_x5) {
                return _ref2.apply(this, arguments);
            };
        }();

        var destroyWebViews = function () {
            var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(webviews) {
                for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                    args[_key - 1] = arguments[_key];
                }

                var i, _webview2, _index, _app$history$stacks;

                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                if (!Array.isArray(webviews)) webviews = [webviews];
                                i = webviews.length;

                            case 2:
                                if (!i--) {
                                    _context2.next = 12;
                                    break;
                                }

                                _webview2 = webviews[i];
                                _index = app.history.stacks.indexOf(_webview2);

                                if (!(_index > -1)) {
                                    _context2.next = 10;
                                    break;
                                }

                                (_app$history$stacks = app.history.stacks).splice.apply(_app$history$stacks, [_index, 1].concat(args));
                                _webview2.constructor.dic.del(_webview2.__MioxMark__);
                                _context2.next = 10;
                                return engine.destroy(_webview2);

                            case 10:
                                _context2.next = 2;
                                break;

                            case 12:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            return function destroyWebViews(_x6) {
                return _ref3.apply(this, arguments);
            };
        }();

        var createNewCachedWebView = function () {
            var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
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
                                defineWebViewHistoryIndex(newCacheWebView);
                                webViews.events.Enter = newCacheWebView;
                                return _context3.abrupt('return', newCacheWebView);

                            case 8:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            return function createNewCachedWebView() {
                return _ref4.apply(this, arguments);
            };
        }();

        var pathname, action, mark, existsWebViewConfigs, webViews, oldCacheWebViewConstructor, oldCacheWebView, pushWebViewExtras, remindExtra, newCacheWebView, oldCacheChangeStatus, newCacheWebViewIndex, reduce, index, targetWebView, sourceIndex, targetIndex, defineWebViewElementGetter, insertStacks, defineWebViewHistoryIndex;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        defineWebViewHistoryIndex = function defineWebViewHistoryIndex(object) {
                            Object.defineProperty(object, 'historyIndex', {
                                get: function get() {
                                    if (!app.history.session) return 0;
                                    var vars = app.history.session.variables;
                                    var strict = app.options.strict;
                                    for (var i in vars) {
                                        var _mark = strict && vars[i].search ? vars[i].pathname + ':' + vars[i].search : vars[i].pathname;
                                        if (_mark === object.__MioxMark__) {
                                            return Number(i);
                                        }
                                    }
                                }
                            });
                        };

                        insertStacks = function insertStacks(i) {
                            var stacks = app.history.stacks;
                            var left = stacks.slice(0, i);
                            var right = stacks.slice(i);

                            for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                                args[_key2 - 1] = arguments[_key2];
                            }

                            app.history.stacks = left.concat(args).concat(right);
                        };

                        defineWebViewElementGetter = function defineWebViewElementGetter(webViews, name) {
                            Object.defineProperty(webViews, name + 'Element', {
                                get: function get() {
                                    if (this[name]) {
                                        return engine.element(this[name]);
                                    }
                                }
                            });
                        };

                        // 当前URL的路径
                        pathname = app.req.pathname;
                        // 当前行为方式

                        action = app.history.action;
                        // 当前URI标识

                        mark = app.options.strict ? app.req.mark : pathname;
                        // 当前显示在页面上行的关键数据 { basic, mark } 组合

                        existsWebViewConfigs = app.get('exists-webview');

                        //临时数据变量

                        webViews = {
                            // 当前显示页面的实例
                            existsWebView: existsWebViewConfigs ? existsWebViewConfigs.basic.dic.get(existsWebViewConfigs.mark) : null,
                            // 被激活的页面实例
                            activeWebView: null,
                            // 事件
                            events: {
                                Active: null,
                                Enter: null,
                                Leave: null
                            }
                        };

                        // 当行为为`replace`，但是当前现实页面的构造体不存在
                        // 我们应该抛出错误 `replace method need a existing webview`

                        if (!(action === 'replace' && !webViews.existsWebView)) {
                            _context4.next = 10;
                            break;
                        }

                        throw new Error('replace method need a existing webview');

                    case 10:

                        // 设置构造体对应的节点获取对象
                        defineWebViewElementGetter(webViews, 'existsWebView');
                        defineWebViewElementGetter(webViews, 'activeWebView');

                        // 当前显示页面在内存Stacks中的索引
                        Object.defineProperty(webViews, 'existWebViewIndex', {
                            get: function get() {
                                if (webViews.existsWebView) {
                                    return app.history.stacks.indexOf(webViews.existsWebView);
                                }
                                return -1;
                            }
                        });

                        // 从cache中找出当前路径对应的构造体
                        // 用来对比前后是否同一构造体
                        oldCacheWebViewConstructor = app.cache.get(pathname);
                        // oldCacheWebView: 从缓存中拿到的老的页面实例
                        // newCacheWebView: 从缓存中拿到的新的页面实例

                        oldCacheWebView = void 0, pushWebViewExtras = void 0, remindExtra = void 0, newCacheWebView = webview.dic.get(mark);

                        // 当缓存中不存在新的页面实例的时候
                        // 我们重新创建并且标记新的激活页面实例

                        if (newCacheWebView) {
                            _context4.next = 21;
                            break;
                        }

                        _context4.next = 18;
                        return app.emit('webview:beforeEnter');

                    case 18:
                        _context4.next = 20;
                        return createNewCachedWebView();

                    case 20:
                        newCacheWebView = _context4.sent;

                    case 21:

                        // 如果有老的构造体
                        // 尝试从老的构造体中拿到当前路径对应的实例
                        if (oldCacheWebViewConstructor) {
                            oldCacheWebView = oldCacheWebViewConstructor.dic.get(mark);
                        }

                        /**
                         * 此时我们应该非常注意一下参数：
                         * newCacheWebView: 从缓存中尝试拿到的新页面实例
                         * oldCacheWebView: 从缓存中尝试拿到的老页面实例
                         * 
                         * 理解这些参数后对之后的算法有更好的理解
                         * 我们的理念是尽最大可能去复用页面实例
                         * 减少页面的额外渲染成本 让体验更加流畅
                         * 
                         * 同时需要注意一个最远距离概念
                         * `app.tick` 最远距离操作标识
                         * 
                         * app.tick = -1 删除第一个内存堆栈元素
                         * app.tick = 1  删除最后一个内存堆栈元素
                         */

                        // oldCacheChangeStatus: 判断当前渲染是否基于特殊的不同的构造体渲染
                        // 如果我们发现这个值为真，那么我们需要将老的构造体删除，同时对相关的页面实例进行destroy操作。
                        oldCacheChangeStatus = oldCacheWebViewConstructor && oldCacheWebViewConstructor !== webview && oldCacheWebView;

                        // 将新的构造体覆盖老的构造体

                        app.cache.set(pathname, webview);

                        // 当我们发现内存堆栈中没有任何数据
                        // 那么直接添加即可，无需其他处理

                        if (!(app.history.stacks.length === 0)) {
                            _context4.next = 29;
                            break;
                        }

                        app.history.stacks.push(newCacheWebView);
                        app.tick = -1;
                        _context4.next = 86;
                        break;

                    case 29:
                        _context4.t0 = action;
                        _context4.next = _context4.t0 === 'push' ? 32 : _context4.t0 === 'replace' ? 46 : 52;
                        break;

                    case 32:
                        app.tick = -1;

                        /**
                         * `PUSH`行为，根据浏览器规则，永远是将之后的删除，推入新的数据
                         * 那么对于模拟的内存堆栈，我们也应该将其之后的所有压入到待删除队列中去 `pushWebViewExtras`
                         * 需要注意的是，newCacheWebView可能是从缓存中拿到的，所以需要判断是否newCacheWebView在删除队列中
                         * 如果存在其中，需要从删除队列中抛弃掉newCacheWebView
                         */
                        pushWebViewExtras = app.history.stacks.slice(webViews.existWebViewIndex + 1);

                        /**
                         * 判断老的实例：
                         * 如果oldCacheChangeStatus状态为真，说明是一种不同webview的渲染
                         * 我们需要从删除堆栈中判断是否存在oldCacheWebView
                         */
                        if (oldCacheChangeStatus) {
                            if (pushWebViewExtras.indexOf(oldCacheWebView) === -1) {
                                pushWebViewExtras.push(oldCacheWebView);
                            }
                        }

                        // 判断新的实例：
                        newCacheWebViewIndex = pushWebViewExtras.indexOf(newCacheWebView);

                        if (!(newCacheWebViewIndex > -1)) {
                            _context4.next = 42;
                            break;
                        }

                        pushWebViewExtras.splice(newCacheWebViewIndex, 1);
                        _context4.next = 40;
                        return destroyWebViews(pushWebViewExtras);

                    case 40:
                        _context4.next = 45;
                        break;

                    case 42:
                        _context4.next = 44;
                        return destroyWebViews(pushWebViewExtras);

                    case 44:
                        app.history.stacks.push(newCacheWebView);

                    case 45:
                        return _context4.abrupt('break', 86);

                    case 46:
                        if (!oldCacheChangeStatus) {
                            _context4.next = 49;
                            break;
                        }

                        _context4.next = 49;
                        return destroyWebViews(oldCacheWebView);

                    case 49:
                        _context4.next = 51;
                        return destroyWebViews(webViews.existsWebView, newCacheWebView);

                    case 51:
                        return _context4.abrupt('break', 86);

                    case 52:
                        if (!oldCacheChangeStatus) {
                            _context4.next = 57;
                            break;
                        }

                        _context4.next = 55;
                        return destroyWebViews(oldCacheWebView, newCacheWebView);

                    case 55:
                        _context4.next = 86;
                        break;

                    case 57:
                        if (!(app.history.stacks.indexOf(newCacheWebView) === -1)) {
                            _context4.next = 86;
                            break;
                        }

                        if (!(app.history.direction === 0)) {
                            _context4.next = 63;
                            break;
                        }

                        app.history.stacks.push(newCacheWebView);
                        app.tick = -1;
                        _context4.next = 86;
                        break;

                    case 63:
                        // reduce: 从session的当前索引移步到现在需要达到的索引的时候需要的步数
                        reduce = app.history.session ? app.history.session.current - (app.index || 0) : 0;

                        // 得到移动步数后同步到当前内存中一致步数所得到值为最终的移动索引

                        index = webViews.existWebViewIndex - reduce;

                        // 越界处理

                        if (index < 0) index = 0;
                        if (index >= app.options.max) index = app.options.max - 1;

                        // 移动到最终到达点的所以对应的页面实例
                        targetWebView = app.history.stacks[index];
                        sourceIndex = app.webView.historyIndex;

                        if (!targetWebView) {
                            _context4.next = 85;
                            break;
                        }

                        // 获取对应页面所在的历史记录索引
                        targetIndex = targetWebView.historyIndex;
                        // 如果当前所在索引 - 步数 < 对应所在索引
                        // 那么可以认定将插入到index之前
                        // 否则插入到index之后
                        // 无论方向与否，都是一直的表现

                        if (!(sourceIndex - reduce < targetIndex)) {
                            _context4.next = 76;
                            break;
                        }

                        app.tick = 1;
                        insertStacks(index, newCacheWebView);
                        _context4.next = 83;
                        break;

                    case 76:
                        if (!(sourceIndex - reduce > targetIndex)) {
                            _context4.next = 81;
                            break;
                        }

                        app.tick = -1;
                        insertStacks(index + 1, newCacheWebView);
                        _context4.next = 83;
                        break;

                    case 81:
                        _context4.next = 83;
                        return destroyWebViews(targetWebView, newCacheWebView);

                    case 83:
                        _context4.next = 86;
                        break;

                    case 85:
                        // 当对应的页面实例不存在
                        // 说明是一种刷新页面行为
                        if (app.history.direction < 0) {
                            app.tick = 1;
                            insertStacks(index, newCacheWebView);
                        } else {
                            app.tick = -1;
                            insertStacks(index + 1, newCacheWebView);
                        }

                    case 86:

                        webViews.activeWebView = newCacheWebView;

                        // 当前激活在页面上行的关键数据 { basic, mark } 组合
                        app.set('active-webview', {
                            basic: webview,
                            mark: mark
                        });

                        // SSR的client端渲染的时候，在没有mounted情况下，取不到节点；
                        // 那么直接返回，不做任何动画。

                        if (webViews.activeWebViewElement) {
                            _context4.next = 92;
                            break;
                        }

                        _context4.next = 91;
                        return resolveEventEmitter(app, webViews.events);

                    case 91:
                        return _context4.abrupt('return', webViews.activeWebView);

                    case 92:
                        if (!webViews.existsWebViewElement) {
                            _context4.next = 95;
                            break;
                        }

                        _context4.next = 95;
                        return app.emit('webview:beforeLeave', webViews.existsWebView);

                    case 95:
                        _context4.next = 97;
                        return (0, _animate2.default)(app, webViews.existsWebViewElement, webViews.activeWebViewElement);

                    case 97:
                        if (!(app.history.stacks.length > app.options.max)) {
                            _context4.next = 107;
                            break;
                        }

                        _context4.t1 = app.tick;
                        _context4.next = _context4.t1 === 1 ? 101 : _context4.t1 === -1 ? 103 : 105;
                        break;

                    case 101:
                        remindExtra = app.history.stacks[app.history.stacks.length - 1];
                        return _context4.abrupt('break', 105);

                    case 103:
                        remindExtra = app.history.stacks[0];
                        return _context4.abrupt('break', 105);

                    case 105:
                        _context4.next = 107;
                        return destroyWebViews(remindExtra);

                    case 107:

                        /**
                         * 此时我们可以完全认定，
                         * 离开的对象是webViews.existsWebView
                         * 进入的对象是webViews.activeWebView
                         */
                        webViews.events.Leave = webViews.existsWebView;
                        webViews.events.Enter = webViews.activeWebView;

                        // active条件是
                        // 1. 它步数进入的对象
                        // 2. 存在新的newCacheWebView
                        // 3. app.history.stacks中不存在存在新的newCacheWebView
                        // 试想一下，这应该是一种唤起行为
                        if (!webViews.events.Enter && newCacheWebView && app.history.stacks.indexOf(newCacheWebView) > -1) {
                            webViews.events.Active = newCacheWebView;
                        }

                        if (app.tick) delete app.tick;
                        // 触发额外事件
                        _context4.next = 113;
                        return resolveEventEmitter(webViews.events);

                    case 113:
                        return _context4.abrupt('return', webViews.activeWebView);

                    case 114:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined);
    }));

    return function (_x, _x2, _x3, _x4) {
        return _ref.apply(this, arguments);
    };
}(); /**
      * Created by evio on 2017/8/29.
      * 这是一个最复杂的算法函数，我会尽量注释详细完整
      */


module.exports = exports['default'];