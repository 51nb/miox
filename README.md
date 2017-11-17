<p align="center"><a href="https://51nb.github.io/miox-doc" target="_blank"><img src="http://7xtj22.com1.z0.glb.clouddn.com/miox-120x120.svg" width="350" /></a></p>

# Modern Infrastructure Of Complex SPA

[![Build Status](https://www.travis-ci.org/51nb/miox.svg?branch=master)](https://www.travis-ci.org/51nb/miox)
[![Coverage Status](https://coveralls.io/repos/github/51nb/miox/badge.svg?1)](https://coveralls.io/github/51nb/miox)
[![NPM Version](http://img.shields.io/npm/v/miox.svg?style=flat)](https://www.npmjs.org/package/miox)
[![NPM Downloads](https://img.shields.io/npm/dm/miox.svg?style=flat)](https://www.npmjs.org/package/miox)
[![miox starter](https://img.shields.io/badge/miox-starter-brightgreen.svg)](https://www.npmjs.org/package/miox)

[Miox](https://github.com/51nb/miox) is an SPA management framework.

In classic web development, browser creates and manages a series of lifecycle activities of web page, such as session history, page creation, discard, pageshow, pagehide, on which developer can process there own logic.

In an SPA application, developers have to deal with all these events by themselves, or by an framework that deals with them. Miox is yet another framework deals with them.

- What makes Miox special, is that it supports any render core, which means with Miox, developer can simultaneously introduce Miox into their projects and stay with his favrite react or vue.
- Miox focuses on being an SPA runtime, with such limited small goal, it developed the ability to easily integrate with most essential technologies, including redux/vuex, SSR and so on.

As of today, almost every web front-end project in 51 credit card is using Miox as there SPA framework, on both PC and Mobile side, which mean Miox is already widely used and tested in production.

## Documentation

You can find the Miox documentation [on the website](https://51nb.github.io/miox-doc).
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

## Demo

- On mobile, you can visit [here](https://github.com/51nb/miox-demo-member-level).
- On pc, comming soon...


## Installation

Miox is available as the miox package on [npm](https://www.npmjs.com/). 

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

