const webpackConfig = require('../src/miox-vue2x-webpack-config/src');
const { alias } =  require('./util');

module.exports = webpackConfig(config => {
    config.set({
        env: 'web',
        'source-compile': {
            dirs: [/^test/i, /^src/i],
            modules: /^miox\-/i
        }
    });

    config.merge({
        resolve: { alias },
        plugins: [
            config.html(config.resolve('client', 'index.html'))
        ]
    });
});