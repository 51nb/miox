const webpackConfig = require('../src/miox-vue2x-webpack-config/src');
const { alias, port, ip } =  require('./util');
const proxy = require('./webpack.web.proxy.config');

module.exports = webpackConfig(config => {

    config.set({
        env: 'web',
        'source-compile': {
            dirs: [/^client/i, /^src/i],
            modules: /^miox\-/i
        }
    });

    config.merge({
        entry: {
            app: config.resolve('client', 'index.js')
        },
        resolve: { alias },
        plugins: [
            config.html(config.resolve('client', 'index.html'))
        ],
        devServer: {
            contentBase: config.resolve('client'),
            proxy: proxy,
            host: ip,
            port: port,
            disableHostCheck: true
        }
    });

});