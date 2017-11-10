/**
 * Created by evio on 2017/8/29.
 * 这是一个最复杂的算法函数，我会尽量注释详细完整
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
export default async(app, engine, webview, data) => {
  // 当前URL的路径
  const pathname = app.req.pathname;
  // 当前行为方式
  const action = app.history.action;
  // 当前URI标识
  const mark = app.options.strict ? app.req.mark : pathname;
  // 当前显示在页面上行的关键数据 { basic, mark } 组合
  const existsWebViewConfigs = app.get('exists-webview');

  //临时数据变量
  const webViews = {
    // 当前显示页面的实例
    existsWebView: existsWebViewConfigs ?
      existsWebViewConfigs.basic.dic.get(existsWebViewConfigs.mark) :
      null,
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
  /* istanbul ignore if */
  if (action === 'replace' && !webViews.existsWebView) {
    throw new Error('replace method need a existing webview');
  }

  // 设置构造体对应的节点获取对象
  defineWebViewElementGetter(webViews, 'existsWebView');
  defineWebViewElementGetter(webViews, 'activeWebView');

  // 当前显示页面在内存Stacks中的索引
  Object.defineProperty(webViews, 'existWebViewIndex', {
    get() {
      if (webViews.existsWebView) {
        return app.history.stacks.indexOf(webViews.existsWebView);
      }
      return -1;
    }
  });

  // 从cache中找出当前路径对应的构造体
  // 用来对比前后是否同一构造体
  const oldCacheWebViewConstructor = app.cache.get(pathname);
  // oldCacheWebView: 从缓存中拿到的老的页面实例
  // newCacheWebView: 从缓存中拿到的新的页面实例
  let oldCacheWebView, pushWebViewExtras, remindExtra, newCacheWebView = webview.dic.get(mark);

  // 当缓存中不存在新的页面实例的时候
  // 我们重新创建并且标记新的激活页面实例
  if (!newCacheWebView) {
    await app.emit('webview:beforeEnter');
    newCacheWebView = await createNewCachedWebView();
  }

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
  const oldCacheChangeStatus = oldCacheWebViewConstructor && oldCacheWebViewConstructor !== webview && oldCacheWebView;

  // 将新的构造体覆盖老的构造体
  app.cache.set(pathname, webview);

  // 当我们发现内存堆栈中没有任何数据
  // 那么直接添加即可，无需其他处理
  if (app.history.stacks.length === 0) {
    app.history.stacks.push(newCacheWebView);
    app.tick = -1;
  } else {
    switch (action) {
      case 'push':
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
        const newCacheWebViewIndex = pushWebViewExtras.indexOf(newCacheWebView);
        if (newCacheWebViewIndex > -1) {
          pushWebViewExtras.splice(newCacheWebViewIndex, 1);
          await destroyWebViews(pushWebViewExtras);
        } else {
          await destroyWebViews(pushWebViewExtras);
          app.history.stacks.push(newCacheWebView);
        }
        break;
      case 'replace':
        /**
         * 替换操作：
         * 如果oldCacheChangeStatus为真，那么直接删除掉
         * 然后在原位置添加新的实例
         */
        if (oldCacheChangeStatus) await destroyWebViews(oldCacheWebView);
        await destroyWebViews(webViews.existsWebView, newCacheWebView);
        break;
      default:
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
          await destroyWebViews(oldCacheWebView, newCacheWebView);
        } else if (app.history.stacks.indexOf(newCacheWebView) === -1) {
          if (app.history.direction === 0) {
            app.history.stacks.push(newCacheWebView);
            app.tick = -1;
          } else {
            // reduce: 从session的当前索引移步到现在需要达到的索引的时候需要的步数
            const reduce = app.history.session ?
              app.history.session.current - (app.index || 0) :
              0;

            // 得到移动步数后同步到当前内存中一致步数所得到值为最终的移动索引
            let index = webViews.existWebViewIndex - reduce;

            // 越界处理
            if (index < 0) index = 0;
            if (index >= app.options.max) index = app.options.max - 1;

            // 移动到最终到达点的所以对应的页面实例
            const targetWebView = app.history.stacks[index];
            const sourceIndex = app.webView.historyIndex;

            if (targetWebView) {
              // 获取对应页面所在的历史记录索引
              const targetIndex = targetWebView.historyIndex;
              // 如果当前所在索引 - 步数 < 对应所在索引
              // 那么可以认定将插入到index之前
              // 否则插入到index之后
              // 无论方向与否，都是一直的表现
              if (sourceIndex - reduce < targetIndex) {
                app.tick = 1;
                insertStacks(index, newCacheWebView);
              } else if (sourceIndex - reduce > targetIndex) {
                app.tick = -1;
                insertStacks(index + 1, newCacheWebView);
              } else {
                await destroyWebViews(targetWebView, newCacheWebView);
              }
            } else {
              // 当对应的页面实例不存在
              // 说明是一种刷新页面行为
              if (app.history.direction < 0) {
                app.tick = 1;
                insertStacks(index, newCacheWebView);
              } else {
                app.tick = -1;
                insertStacks(index + 1, newCacheWebView);
              }
            }
          }
        }
    }
  }

  webViews.activeWebView = newCacheWebView;

  // 当前激活在页面上行的关键数据 { basic, mark } 组合
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

  // 触发离开事件
  if (webViews.existsWebViewElement) {
    await app.emit('webview:beforeLeave', webViews.existsWebView);
  }

  // 动画渲染两个页面的加载过程。
  await renderWebViewWithAnimate(
    app,
    webViews.existsWebViewElement,
    webViews.activeWebViewElement
  );

  // 如果history中堆栈大于max值
  // 我们根据tick方向来删除对应的元素
  if (app.history.stacks.length > app.options.max) {
    switch (app.tick) {
      case 1:
        remindExtra = app.history.stacks[app.history.stacks.length - 1];
        break;
      case -1:
        remindExtra = app.history.stacks[0];
        break;
    }

    if (app.webView !== remindExtra) {
      await destroyWebViews(remindExtra);
    }
  }

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
  await resolveEventEmitter(webViews.events);

  return webViews.activeWebView;

  async function resolveEventEmitter(events) {
    const array = ['Enter', 'Leave', 'Active'];
    for (let i = 0; i < array.length; i++) {
      const eventName = array[i];
      const webview = events[eventName];
      const simpleName = eventName.toLowerCase();

      if (webview && engine[simpleName]) {
        await engine[simpleName](webview);
        events[eventName] = null;
      }
    }
  }

  function defineWebViewElementGetter(webViews, name) {
    Object.defineProperty(webViews, name + 'Element', {
      get() {
        if (this[name]) {
          return engine.element(this[name]);
        }
      }
    });
  }

  async function destroyWebViews(webviews, ...args) {
    if (!Array.isArray(webviews)) webviews = [webviews];
    let i = webviews.length;
    while (i--) {
      const webview = webviews[i];
      const index = app.history.stacks.indexOf(webview);
      if (index > -1) {
        app.history.stacks.splice(index, 1, ...args);
        webview.constructor.dic.del(webview.__MioxMark__);
        await engine.destroy(webview);
      }
    }
  }

  function insertStacks(i, ...args) {
    const stacks = app.history.stacks;
    const left = stacks.slice(0, i);
    const right = stacks.slice(i);
    app.history.stacks = left.concat(args).concat(right);
  }

  async function createNewCachedWebView() {
    const newCacheWebView = await engine.create(webview, data);
    newCacheWebView.__MioxMark__ = mark;
    webview.dic.set(mark, newCacheWebView);
    defineWebViewHistoryIndex(newCacheWebView);
    webViews.events.Enter = newCacheWebView;
    return newCacheWebView;
  }

  function defineWebViewHistoryIndex(object) {
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
}