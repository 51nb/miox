const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlFile = path.resolve(__dirname, '..', 'react', 'index.html');
const { alias } = require('./util');

module.exports = {
    entry: {
        app: path.resolve(__dirname, '..', 'react', 'index.jsx')
    },
    module: {
        noParse: /es6-promise\.js$/,
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                  presets: ['react', 'es2015'],
                  plugins: ['transform-runtime']
                }
            }
        ]
    },
    resolve: {
        alias
    },
    devtool: "#inline-source-map",
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        new HtmlWebpackPlugin({
            template: htmlFile,
            filename: htmlFile.split('/').slice(-1)[0],
            inject: true
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, '..', 'react'),
        host: '0.0.0.0',
        port: 5621,
        disableHostCheck: true
    }
};
