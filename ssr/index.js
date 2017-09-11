const Koa = require('koa');
const ServerSideRenderer = require('../config/webpack.ssr.engine');
const { port, ip } = require('../config/webpack.ssr.config');
const app = new Koa();

ServerSideRenderer.connect(app);

app.listen(port, ip, () => {
    console.log(`\n\tRun Server At ${ip}:${port}`);
    if (process.env.NODE_ENV === 'dev') {
        console.log(`\tWaiting for Webpack compiling...`);
    }
    console.log(`\n`);
});