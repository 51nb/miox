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
        var pathname, action, mark, existsWebViewConfigs, webViews, oldCacheWebViewConstructor, oldCacheWebView, pushWebViewExtras, remindExtra, newCacheWebView, oldCacheChangeStatus, newCacheWebViewIndex, reduce, index, targetWebView, sourceIndex, targetIndex;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
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
                            _context.next = 7;
                            break;
                        }

                        throw new Error('replace method need a existing webview');

                    case 7:

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
                            _context.next = 18;
                            break;
                        }

                        _context.next = 15;
                        return app.emit('webview:beforeEnter');

                    case 15:
                        _context.next = 17;
                        return createNewCachedWebView(app, engine, webview, data, mark, webViews);

                    case 17:
                        newCacheWebView = _context.sent;

                    case 18:

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

                        if (newCacheWebViewIndex > -1) {
                            pushWebViewExtras.splice(newCacheWebViewIndex, 1);
                            destroyWebViews(app, pushWebViewExtras);
                        } else {
                            destroyWebViews(app, pushWebViewExtras);
                            app.history.stacks.push(newCacheWebView);
                        }
                        return _context.abrupt('break', 39);

                    case 35:
                        /**
                         * 替换操作：
                         * 如果oldCacheChangeStatus为真，那么直接删除掉
                         * 然后在原位置添加新的实例
                         */
                        if (oldCacheChangeStatus) destroyWebViews(app, oldCacheWebView);
                        destroyWebViews(app, webViews.existsWebView, newCacheWebView);
                        return _context.abrupt('break', 39);

                    case 38:
                        /**
                         * 这里描述的是浏览器行为的前进与后退
                         * 如果单纯是这种行为，那么不需要对内存操作
                         * 但是，如果用户进行来刷新操作
                         * 那么，内存堆栈被清空，我们需要从新定义整个内存队列
                         * 这个是本算法的难点
                         * 我们优先通过对sessionStorage数据的分析来还原内存队列
                         * 如果没有开启session开关，那么我们就默认是`PUSH`行为
                         */
                        if (oldCacheChangeStatus) {
                            destroyWebViews(app, oldCacheWebView, newCacheWebView);
                        } else if (app.history.stacks.indexOf(newCacheWebView) === -1) {
                            if (app.history.direction === 0) {
                                app.history.stacks.push(newCacheWebView);
                                app.tick = -1;
                            } else {
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


                                if (targetWebView) {
                                    // 获取对应页面所在的历史记录索引
                                    targetIndex = targetWebView.historyIndex;
                                    // 如果当前所在索引 - 步数 < 对应所在索引
                                    // 那么可以认定将插入到index之前
                                    // 否则插入到index之后
                                    // 无论方向与否，都是一直的表现

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
                                    // 当对应的页面实例不存在
                                    // 说明是一种刷新页面行为
                                    if (app.history.direction < 0) {
                                        app.tick = 1;
                                        insertStacks(app, index, newCacheWebView);
                                    } else {
                                        app.tick = -1;
                                        insertStacks(app, index + 1, newCacheWebView);
                                    }
                                }
                            }
                        }

                    case 39:

                        webViews.activeWebView = newCacheWebView;

                        // 当前激活在页面上行的关键数据 { basic, mark } 组合
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
      * 这是一个最复杂的算法函数，我会尽量注释详细完整
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