/**
 * Created by evio on 2017/5/12.
 */
const server = require('./webpack.ssr.engine');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const includeCompiler = server.include();
const isProd = process.env.NODE_ENV === 'production';

module.exports = [
    {
        test: /\.vue$/,
        loader: 'vue-loader',
        include: includeCompiler,
        options: {
            // extractCSS: isProd,
            preserveWhitespace: false,
            loaders: {
                css: isProd ? ExtractTextPlugin.extract({
                    use: ['css-loader?minimize', { loader: 'postcss-loader', options: { sourceMap: true } }],
                    fallback: 'vue-style-loader'
                }) : ['vue-style-loader', 'css-loader', { loader: 'postcss-loader', options: { sourceMap: true } }],
                less: isProd ? ExtractTextPlugin.extract({
                    use: ['css-loader?minimize', 'postcss-loader', 'less-loader'],
                    fallback: 'vue-style-loader'
                }) : ['vue-style-loader', 'css-loader', 'less-loader'],
                scss: isProd ? ExtractTextPlugin.extract({
                    use: ['css-loader?minimize', 'postcss-loader', 'sass-loader'],
                    fallback: 'vue-style-loader'
                }) : ['vue-style-loader', 'css-loader', 'sass-loader'],
                sass: isProd ? ExtractTextPlugin.extract({
                    use: ['css-loader?minimize', 'postcss-loader', 'sass-loader'],
                    fallback: 'vue-style-loader'
                }) : ['vue-style-loader', 'css-loader', 'sass-loader']
            }
        }
    },
    {
        test: /\.js$/,
        loader: 'babel-loader',
        include: includeCompiler
    },
    {
        test: /\.jsx$/,
        loader: 'babel-loader',
        include: includeCompiler
    },
    {
        test: /\.css$/,
        use: isProd ? ExtractTextPlugin.extract({
            use: ['css-loader?minimize', 'postcss-loader'],
            fallback: 'vue-style-loader'
        }) : ['vue-style-loader', 'css-loader', 'postcss-loader']
    },
    {
        test: /\.less$/,
        use: isProd ? ExtractTextPlugin.extract({
            use: ['css-loader?minimize', 'postcss-loader', 'less-loader'],
            fallback: 'vue-style-loader'
        }) : ['vue-style-loader', 'css-loader', 'less-loader']
    },
    {
        test: /\.scss$/,
        use: isProd ? ExtractTextPlugin.extract({
            use: ['css-loader?minimize', 'postcss-loader', 'sass-loader'],
            fallback: 'vue-style-loader'
        }) : ['vue-style-loader', 'css-loader', 'sass-loader']
    }
];