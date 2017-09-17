const ExtractTextPlugin = require('extract-text-webpack-plugin');
const isProd = process.env.NODE_ENV === 'production';

module.exports = function(includeCompiler) {
    return [
        vue(includeCompiler),
        js(includeCompiler),
        jsx(includeCompiler),
        css(),
        less(),
        sass()
    ];
};

function postCssLoader() {
    return {
        loader: 'postcss-loader',
        options: {
            sourceMap: !isProd
        }
    }
}

function cssLoader() {
    return {
        loader: 'css-loader',
        options: {
            minimize: true,
            sourceMap: !isProd
        }
    }
}

function styleLoader() {
    return {
        loader: 'vue-style-loader',
        options: {
            sourceMap: !isProd
        }
    }
}

function lessLoader() {
    return {
        loader: 'less-loader',
        options: {
            sourceMap: !isProd
        }
    }
}

function sassLoader() {
    return {
        loader: 'sass-loader',
        options: {
            sourceMap: !isProd
        }
    }
}

function cssBlock() {
    return isProd
        ? ExtractTextPlugin.extract({
            use: [
                cssLoader(),
                postCssLoader()
            ],
            fallback: styleLoader()
        })
        : [
            styleLoader(),
            cssLoader(),
            postCssLoader()
        ]
}

function lessBlock() {
    return isProd
        ? ExtractTextPlugin.extract({
            use: [
                cssLoader(),
                postCssLoader(),
                lessLoader()
            ],
            fallback: styleLoader()
        })
        : [
            styleLoader(),
            cssLoader(),
            lessLoader()
        ]
}

function sassBlock() {
    return isProd
        ? ExtractTextPlugin.extract({
            use: [
                cssLoader(),
                postCssLoader(),
                sassLoader()
            ],
            fallback: styleLoader()
        })
        : [
            styleLoader(),
            cssLoader(),
            sassLoader()
        ]
}

function vue(includeCompiler) {
    return {
        test: /\.vue$/,
        loader: "vue-loader",
        include: includeCompiler,
        options: {
            preserveWhitespace: false,
            loaders: {
                css: cssBlock(true),
                less: lessBlock(true),
                scss: sassBlock(true),
                sass: sassBlock(true)
            }
        }
    }
}

function js(includeCompiler) {
    return {
        test: /\.js$/,
        loader: 'babel-loader',
        include: includeCompiler
    }
}

function jsx(includeCompiler) {
    return {
        test: /\.jsx$/,
        loader: 'babel-loader',
        include: includeCompiler
    }
}

function css() {
    return {
        test: /\.css$/,
        use: cssBlock()
    }
}

function less() {
    return {
        test: /\.less$/,
        use: lessBlock()
    }
}

function sass() {
    return {
        test: /\.scss$/,
        use: sassBlock()
    }
}