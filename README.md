# 定义

> Miox 是一个兼容多种渲染引擎的，提供高度自动化 Webview 生命周期管理的一个中间件/框架，同时提供了开箱即用的若干自动化脚手架，快速生成项目。

Miox 可以自动帮你处理路由切换、webview 生命周期管理等各种单页应用会面临的问题，让你专注于 webview 内的业务开发。

开始项目时，通过使用 miox-cli，可以迅速生成 Miox 开发所需环境和配置，无需担心上手配置问题。

同时，Miox 并不依赖任何框架，这意味着你的业务开发无论是基于 React、Vue 还是其他框架，都可以完美的接入到 Miox 中来。

Miox 实现了生命周期和路由管理的最佳实践，避免了不统一的开发方式可能造成的性能下降和错误，并且可以平滑接入 SSR 和 Weex 这样业界最先进的混合开发技术，达到开发效率和接近原生体验两者之间的最佳平衡。

# 优势

- 强大的中间件和生命周期管理体系
- 高度接近浏览器原生行为，依据IOS原生行为设计
- 抽屉式设计，完全自定义渲染引擎，能够轻松地将主流地渲染框架接入到miox中来使用。

# 我是否应该使用 Miox？

如果你

- 希望用现代渲染框架比如 Vue 和 React 来做视图层开发，但是又不想依赖他们的全家桶，或者存在多种渲染引擎混用的情况
- 在开发SPA应用时，希望框架可以像原生应用一样，自动管理每一个视图的生命周期，同时提供生命周期每个时间节点的处理回调
- 希望一套代码可以覆盖普通 Web 页面、SSR、Weex 应用等场景

那么 Miox 就是你应该考虑使用的中间件。目前 Miox 在51信用卡全线业务中均有使用，覆盖了桌面、移动浏览器和移动应用。

# 组成

- 核心 `miox`
- 路由 `miox-router`
- 引擎 `miox-vue2x` `miox-vue` `miox-react`
- 插件 `miox-animation`

## 起步

> 假设你已有 HTML、CSS 和 JavaScript 中级前端知识，同时具备一定的后端路由知识。如果你刚开始学习前端开发，将框架作为你的第一步可能不是最好的主意——掌握好基础知识再来！之前有其他框架的使用经验对于学习 Miox 是有帮助的，但这不是必需的。

开启第一个 Hello Miox 实例最好的方式是通过 miox-cli 来创建你的第一个项目。或者你可以参照官方github上提供的demo来创建。Miox 不提倡使用一般的编码模式，推荐使用webpack的源码打包。因为在它的项目中，我们使用了比较多的es6 es7的语法和语法糖。

```javascript
import Miox from 'miox';
import Engine from 'miox-vue2x';
import Animate from 'miox-animation';
import Router from 'miox-router';

// 渲染模板A
import A from './webviews/0.vue';

// 创建一个路由
const router = new Router();

// 定义一个路由
router.patch('/', async ctx => {
    await ctx.render(A);
});

// 创建实例
const app = new Miox(...options);

// 定义使用地引擎
app.set('engine', Engine);

// 定义切换的默认动画
app.set('animate', Animate('slide'));

// 定义使用的路由
app.use(router.routes());

// 监听服务
export default app.listen();
```

## 预览

![Miox效果预览](http://pic.51zhangdan.com/u51/storage/a2/a878e1c6-2750-2b36-13f0-3f29544b3802.gif)

# License

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2015-present, evio(沈赟杰) 51信用卡管家 杭州恩牛网络技术有限公司