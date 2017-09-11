/**
 * Created by evio on 2017/5/11.
 */
import webpack from 'webpack';
import merge from 'webpack-merge';
import VueSSRClientPlugin from 'vue-server-renderer/client-plugin';

const isProd = process.env.NODE_ENV === 'production';

export default function WebpackClientRenderer(base = {}, options = {}) {
    const configs = {
        entry: {},

        // For bundle renderer source map support
        devtool: isProd
            ? false
            : '#cheap-module-source-map',

        // This tells the server bundle to use Node-style exports
        output: {
            path: options.build,
            publicPath: options.prefix,
            filename: '[name].[chunkhash].js'
        },

        performance: {
            maxEntrypointSize: 300000,
            hints: isProd ? 'warning' : false
        },

        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
                'process.env.MIOX_ENV': '"client"'
            }),
            // extract vendor chunks for better caching
            new webpack.optimize.CommonsChunkPlugin({
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
            // Important: this splits the webpack runtime into a leading chunk
            // so that async chunks can be injected right after it.
            // this also enables better caching for your app/vendor code.
            new webpack.optimize.CommonsChunkPlugin({
                name: 'manifest',
                minChunks: Infinity
            }),
            // This plugins generates `vue-ssr-client-manifest.json` in the
            // output directory.
            new VueSSRClientPlugin()
        ]
    };

    if (options.app) {
        configs.entry.app = options.app;
    }

    return merge(base, configs);
}