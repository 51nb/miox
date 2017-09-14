const webpackConfig = require('../src/miox-vue2x-webpack-config/src');
const { alias } =  require('./util');

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
            'app': config.resolve('client', 'index.js')
        },
        output: {
            path: config.resolve('build'),
            filename: '[name].[hash:10].js'
        },
        resolve: { alias },
        plugins: [
            config.html(config.resolve('client', 'index.html')),
            config.resource('web.[hash:10].css')
        ]
    });
});