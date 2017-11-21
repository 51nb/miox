const Koa = require('koa');
const path = require('path');
const PKG = require('../package.json');
const ServerSideRenderer = require('../src/miox-koa-vue2x-server-render/src/index');
const clientDevConfig = require('../config/webpack.client.dev.config');
const clientProConfig = require('../config/webpack.client.pro.config');
const serverDevConfig = require('../config/webpack.server.dev.config');
const serverProConfig = require('../config/webpack.server.pro.config');

const app = new Koa();
const renderer = new ServerSideRenderer(app);

// 使用Miox中间件接管Koa中间件
renderer.connect(
    renderer.isProd ? clientProConfig : clientDevConfig,
    renderer.isProd ? serverProConfig : serverDevConfig,
    {
        hot: true,
        html: path.resolve(__dirname, '..', 'client', 'index.html')
    }
);

app.listen(PKG.service.port, PKG.service.ip, () => {
    console.log(`\n\tRun Server At ${PKG.service.ip}:${PKG.service.port}`);
    if (!renderer.isProd) {
        console.log(`\tWaiting for Webpack compiling...`);
    }
    console.log(`\n`);
});