# Modern Infrastructure Of Complex SPA

[![Build Status](https://www.travis-ci.org/51nb/miox.svg?branch=master)](https://www.travis-ci.org/51nb/miox)
[![Coverage Status](https://coveralls.io/repos/github/51nb/miox/badge.svg)](https://coveralls.io/github/51nb/miox)
[![NPM Version](http://img.shields.io/npm/v/miox.svg?style=flat)](https://www.npmjs.org/package/miox)
[![NPM Downloads](https://img.shields.io/npm/dm/miox.svg?style=flat)](https://www.npmjs.org/package/miox)
[![miox starter](https://img.shields.io/badge/miox-starter-brightgreen.svg)](https://www.npmjs.org/package/miox)

[Miox](https://github.com/51nb/miox)是一个兼容多种渲染引擎的，提供高度自动化 Webview 生命周期管理的一个中间件/框架，同时提供了开箱即用的若干自动化脚手架，快速生成项目。它可以自动帮你处理路由切换、webview 生命周期管理等各种单页应用会面临的问题，让你专注于 webview 内的业务开发。

Miox 实现了生命周期和路由管理的最佳实践，避免了不统一的开发方式可能造成的性能下降和错误，并且可以平滑接入 SSR 和 Weex 这样业界最先进的混合开发技术，达到开发效率和接近原生体验两者之间的最佳平衡。

> Miox 并不依赖任何框架，这意味着你的业务开发无论是基于 React、Vue 还是其他框架，都可以完美的接入到其中来，无需担心是否在公司中不能使用某些框架的问题。

开始项目时，通过使用`miox-cli`，可以迅速生成Miox开发所需环境和配置，无需担心上手配置问题。

**注意：**你所看到的miox的代码覆盖率仅仅是对所有模块的代码覆盖率，而miox核心的代码覆盖率达到了`93%`，你可以通过`npm run test:chrome`命令生成覆盖率报告查看。

![Miox核心代码覆盖率报告截图](https://pic.51zhangdan.com/u51/storage/8c/8ecf8d7d-2eb2-0dc2-706f-487724f64d9c.png)

## 源码

- Github: [https://github.com/51nb/miox](https://github.com/51nb/miox)
- NPM Package: [https://www.npmjs.com/package/miox](https://www.npmjs.com/package/miox)

## 安装

官方推荐使用`miox-cli`来创建您的项目。如果您对Miox比较了解，那么您可以自己创建一套适合自己的模板，方便以后自己的重复创建。

```bash
npm install -g miox-cli
```

官方提供两套模板，传统基于客户端渲染的模板和基于[koa](https://www.npmjs.com/package/koa)应用服务体系的SSR模板（利于SEO）。模板一旦创建完毕，业务逻辑即可开始编写。您只需要专注于内部业务逻辑的开发，无需关心其他任何架构上的设计。

同时目前官方已支持`miox-react引擎`，你可以通过创建react模板来开始使用`miox+react`。

```bash
miox create
```

miox创建的模板，官方提供的只有基于[webpack](http://webpack.org/)的编译，如您需要[rollup](https://rollupjs.org/)打包编译，那么您需要自己创建编译模板。

[> miox-cli详细命名即功能介绍](https://github.com/51nb/miox-cli)

## 优势

- 动态路由：强大的中间件分发机制解决传统路由无法解决的难题。
- 原生行为：高度接近浏览器原生行为，让页面切换更加流畅，用户体验极佳。
- 灵活架构：插拔式设计，兼容主流 MVX 框架。
- 生命周期：提供稳定强大的页面生命周期管理，可以自行设计页面的生存与死亡机制。
- 文件体积：空项目编译出来体积只有`167K+`，已包含`vue` 等第三方包。miox代码大约只有`40K+`。

## 我是否应该使用 Miox？

如果您：

- 希望用现代渲染框架比如[Vue](https://vuejs.org/)和[React](https://facebook.github.io/react/)来做视图层开发，但是又不想依赖他们的全家桶，或者存在多种渲染引擎混用的情况
- 在开发SPA应用时，希望框架可以像原生应用一样，自动管理每一个视图的生命周期，同时提供生命周期每个时间节点的处理回调
- 希望一套代码可以覆盖普通 Web 页面、SSR、Weex 应用等场景

那么 Miox 就是你应该考虑使用的中间件架构。

目前 Miox 在51信用卡全线业务中均有使用，覆盖了桌面、移动浏览器和移动应用。

## 组成

理论上说Miox主要分以下几部分组成：

- 核心：`miox`
- 路由：`miox-router`
- 引擎：`miox-vue2x` `miox-react`
- 动画：`miox-animation`
- 插件：`miox-vue2x-container`
- 服务端渲染：
    - `miox-koa-vue2x-server-render`
    - `miox-express-vue2x-server-render`
    - `miox-koa-react-server-render`
    - `miox-express-react-server-render`
- webpack: `miox-vue2x-webpack-config`

除了核心，您都可以使用您编写的模块替换掉其中的任意部分，达到理想的插拔设计。但是对于初学者，并不介意马上编写自己的模块。

Miox开源将在下半年进行，到时候奉上相关文档。

## Example

![Miox演示代码](https://pic.51zhangdan.com/u51/storage/95/914ba4fb-569c-2d59-b363-f50b361733f5.png)

# License

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2015-present, evio(沈赟杰) 51信用卡管家 杭州恩牛网络技术有限公司
