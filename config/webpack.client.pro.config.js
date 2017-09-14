const webpackConfig = require('../src/miox-vue2x-webpack-config/src');
const { alias } =  require('./util');

module.exports = webpackConfig(config => {
    config.set({
        env: 'client',
        'source-compile': {
            dirs: [/^client/i, /^src/i],
            modules: /^miox\-/i
        }
    });

    config.merge({
        entry: {
            app: config.resolve('client', 'index.js')
        },
        output: {
            path: config.resolve('build'),
            publicPath: undefined,
            filename: '[name].[hash:10].js'
        },
        resolve: { alias },
        plugins: [
            config.chunk({
                name: 'vendor',
                minChunks(module) {
                    // a module is extracted into the vendor chunk if...
                    return (
                        // it's inside node_modules
                        /node_modules/.test(module.context) &&
                        // and not a CSS file (due to extract-text-webpack-plugin limitation)
                        !/\.css$/.test(module.request)
                    )
                }
            }),
            config.chunk({
                name: 'manifest',
                minChunks: Infinity
            }),
            config.vueClient(),
            config.jsCompress(),
            config.resource('common.[hash:10].css')
        ]
    });
});