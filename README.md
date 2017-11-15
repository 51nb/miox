<p align="center"><a href="https://51nb.github.io/miox-doc" target="_blank"><img src="http://7xtj22.com1.z0.glb.clouddn.com/miox-120x120.svg" width="350" /></a></p>

# Modern Infrastructure Of Complex SPA

[![Build Status](https://www.travis-ci.org/51nb/miox.svg?branch=master)](https://www.travis-ci.org/51nb/miox)
[![Coverage Status](https://coveralls.io/repos/github/51nb/miox/badge.svg?1)](https://coveralls.io/github/51nb/miox)
[![NPM Version](http://img.shields.io/npm/v/miox.svg?style=flat)](https://www.npmjs.org/package/miox)
[![NPM Downloads](https://img.shields.io/npm/dm/miox.svg?style=flat)](https://www.npmjs.org/package/miox)
[![miox starter](https://img.shields.io/badge/miox-starter-brightgreen.svg)](https://www.npmjs.org/package/miox)

[Miox](https://github.com/51nb/miox) is a SPA management framework。
在传统web开发中，浏览器会帮助开发者管理会话历史以及页面的创建、销毁、切入切出等生命行为，
在SPA开发中，这些工作需要由SPA的管理框架来实现，miox 就是做了这样的工作。

- miox 支持任何渲染引擎，就是说，使用 miox，开发者仍可以使用 react/vue 来编写业务代码。
- miox 专注做 SPA 的运行容器，因此它具有良好的扩展性，可以与 redux/vuex，SSR 等技术结合应用。

目前 Miox 在51信用卡全线业务中均有使用，PC端和移动端都有覆盖。

## Documentation

You can find the React documentation [on the website](https://51nb.github.io/miox-doc).
It is divided into several sections:

- [Get Started](https://51nb.github.io/miox-doc/docs/index.html)
- [Advanced](https://51nb.github.io/miox-doc/docs/miox_runtime.html)
- [Plugins](https://51nb.github.io/miox-doc/docs/miox_router.html)
- [Contribution](https://51nb.github.io/miox-doc/docs/contribution_code.html)

You can improve it by sending pull requests to [this repository](https://github.com/51nb/miox).


## Examples

You can start your project with the following code:

> **index.js**: The entrance of your project.

```javascript
import Miox from 'miox';
import Engine from 'miox-react';
import router from './route';

const app = new Miox({...options});
app.install(Engine);
app.use(router.routes());
export default app.listen();
```

> **route.js**: Routing file.

```javascript
import Router from 'miox-router';
import Page from './page.jsx';

const route = new Router();
export default route;
route.patch('/', async ctx => {
  await ctx.render(Page);
});
``` 

> **page.jsx**: Rendering webview file.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
export default class ExamplePage extends React.Component {
  render() {
    return <h1>Hello World!</h1>;
  }
}
```

This example will render "Hello World!" into a container on the page.


## Installation

Miox is available as the react package on [npm](https://www.npmjs.com/). 

We provide a scaffold to facilitate the installation of the project. Once the project is installed, you can start writing business logic.

> Install `miox-cli` to create project:

```bash
npm install -g miox-cli
```

> Then run the code of `miox create` to create a new project:

```bash
miox create
```

More commands, please read [here](https://github.com/51nb/miox-cli).

## Contributing

The main purpose of this repository is to continue to evolve Miox, making it faster and easier to use. Development of Miox happens in the open on GitHub, and we are grateful to the community for contributing bugfixes and improvements. 

## License

Miox is [MIT licensed](https://opensource.org/licenses/MIT).

Copyright (c) 2015-present, [evio(沈赟杰)](https://github.com/cevio) - 51信用卡管家 杭州恩牛网络技术有限公司

