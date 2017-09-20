/**
 * Created by evio on 2017/8/29.
 */
import renderWebViewWithAnimate from './animate';

/**
 * webview渲染方法
 * @param app
 * @param engine
 * @param webview
 * @param data
 * @returns {Promise.<null>}
 */
export default async (app, engine, webview, data) => {
    const pathname = app.req.pathname;
    const action = app.history.action;
    const mark = app.options.strict ? app.req.mark : pathname;
    const existsWebViewConfigs = app.get('exists-webview');

    const webViews = {
        existsWebView: existsWebViewConfigs
            ? existsWebViewConfigs.basic.dic.get(existsWebViewConfigs.mark)
            : null,
        activeWebView: null,
        events: {
            Active: null,
            Enter: null,
            Leave: null
        }
    };

    if (action === 'replace' && !webViews.existsWebView) {
        throw new Error('replace method need a existing webview');
    }

    defineWebViewElementGetter(webViews, 'existsWebView');
    defineWebViewElementGetter(webViews, 'activeWebView');

    Object.defineProperty(webViews, 'existWebViewIndex', {
        get() {
            if (webViews.existsWebView) {
                return app.history.stacks.indexOf(webViews.existsWebView);
            }
            return -1;
        }
    });

    const oldCacheWebViewConstructor = app.cache.get(pathname);
    let oldCacheWebView, pushWebViewExtras, remindExtra, newCacheWebView = webview.dic.get(mark);

    if (!newCacheWebView) {
        await app.emit('webview:beforeEnter', { webview, mark });
        newCacheWebView = await createNewCachedWebView(app, engine, webview, data, mark, webViews);
    }

    if (oldCacheWebViewConstructor) {
        oldCacheWebView = oldCacheWebViewConstructor.dic.get(mark);
    }

    const oldCacheChangeStatus = oldCacheWebViewConstructor && oldCacheWebViewConstructor !== webview && oldCacheWebView;
    app.cache.set(pathname, webview);

    if (app.history.stacks.length === 0) {
        app.history.stacks.push(newCacheWebView);
        app.tick = -1;
    } else {
        switch (action) {
            case 'push':
                app.tick = -1;
                pushWebViewExtras = app.history.stacks.slice(webViews.existWebViewIndex + 1);
                oldCacheChangeStatus && pushWebViewExtras.push(oldCacheWebView);
                const newCacheWebViewIndex = pushWebViewExtras.indexOf(newCacheWebView);
                if (newCacheWebViewIndex > -1) {
                    pushWebViewExtras.splice(newCacheWebViewIndex, 1);
                    destroyWebViews(app, pushWebViewExtras);
                } else {
                    destroyWebViews(app, pushWebViewExtras);
                    app.history.stacks.push(newCacheWebView);
                }
                break;
            case 'replace':
                if (oldCacheChangeStatus) destroyWebViews(app, oldCacheWebView);
                destroyWebViews(app, webViews.existsWebView, newCacheWebView);
                break;
            default:
                if (oldCacheChangeStatus) {
                    destroyWebViews(app, oldCacheWebView, newCacheWebView);
                } else {
                    if (app.history.stacks.indexOf(newCacheWebView) === -1) {
                        const reduce = app.history.session
                            ? app.history.session.current - (app.index || 0)
                            : 0;

                        let index = webViews.existWebViewIndex - reduce;

                        if (index < 0) index = 0;
                        if (index >= app.options.max) index = app.options.max - 1;

                        const targetWebView = app.history.stacks[index];
                        const targetIndex = targetWebView ? targetWebView.historyIndex : 0;
                        const sourceIndex = app.webView.historyIndex;

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
        }
    }

    webViews.activeWebView = newCacheWebView;

    app.set('active-webview', {
        basic: webview,
        mark: mark
    });

    // SSR的client端渲染的时候，在没有mounted情况下，取不到节点；
    // 那么直接返回，不做任何动画。
    if (!webViews.activeWebViewElement) {
        await resolveEventEmitter(app, webViews.events);
        return webViews.activeWebView;
    }

    // 动画渲染两个页面的加载过程。
    await renderWebViewWithAnimate(
        app,
        webViews.existsWebViewElement,
        webViews.activeWebViewElement
    );

    if (app.history.stacks.length > app.options.max) {
        switch (app.tick) {
            case 1:
                remindExtra = app.history.stacks[app.history.stacks.length - 1];
                break;
            case -1:
                remindExtra = app.history.stacks[0];
                break;
        }

        destroyWebViews(app, remindExtra);
    }

    webViews.events.Leave = webViews.existsWebView;
    webViews.events.Enter = webViews.activeWebView;

    if (!webViews.events.Enter && newCacheWebView && app.history.stacks.indexOf(newCacheWebView) > -1) {
        webViews.events.Active = newCacheWebView;
    }

    if (app.tick) delete app.tick;
    await resolveEventEmitter(app, webViews.events);

    return webViews.activeWebView;
}

async function resolveEventEmitter(app, events) {
    const array = ['Enter', 'Leave', 'Active'];
    for (let i = 0; i < array.length; i++) {
        const sourceName = array[i];
        const targetName = `MioxInject${sourceName}`;
        const mioxName = `webview:${sourceName}`;
        if (events[sourceName] && typeof events[sourceName][targetName] === 'function') {
            await app.emit(mioxName, events[sourceName]);
            await events[sourceName][targetName]();
            events[sourceName] = null;
        }
    }
}

function defineWebViewElementGetter(webViews, name) {
    Object.defineProperty(webViews, name + 'Element', {
        get() {
            if (this[name]) {
                return this[name].__MioxInjectElement__;
            }
        }
    });
}

function destroyWebViews(app, webviews, ...args) {
    if (!Array.isArray(webviews)) {
        webviews = [webviews];
    }
    let i = webviews.length;
    while (i--) {
        const webview = webviews[i];
        const index = app.history.stacks.indexOf(webview);
        if (index > -1) {
            app.history.stacks.splice(index, 1, ...args);
            webview.constructor.dic.del(webview.__MioxMark__);
            webview.MioxInjectDestroy();
        }
    }
}

function insertStacks(app, i, ...args) {
    const stacks = app.history.stacks;
    const left = stacks.slice(0, i);
    const right = stacks.slice(i);
    app.history.stacks = left.concat(args).concat(right);
}

async function createNewCachedWebView(app, engine, webview, data, mark, webViews) {
    const newCacheWebView = await engine.create(webview, data);
    newCacheWebView.__MioxMark__ = mark;
    webview.dic.set(mark, newCacheWebView);
    defineWebViewHistoryIndex(app, newCacheWebView);
    webViews.events.Enter = newCacheWebView;
    return newCacheWebView;
}

function defineWebViewHistoryIndex(app, object) {
    Object.defineProperty(object, 'historyIndex', {
        get() {
            if (!app.history.session) return 0;
            const vars = app.history.session.variables;
            const strict = app.options.strict;
            for (const i in vars) {
                const mark = strict && vars[i].search ? `${vars[i].pathname}:${vars[i].search}` : vars[i].pathname;
                if (mark === object.__MioxMark__) {
                    return Number(i);
                }
            }
        }
    });
}