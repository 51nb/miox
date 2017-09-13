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
            sourceMap: true
        }
    }
}

function cssLoader() {
    return {
        loader: 'css-loader',
        options: {
            minimize: true,
            sourceMap: true
        }
    }
}

function styleLoader(isVue) {
    return {
        loader: isVue ? 'vue-style-loader' : 'style-loader',
        options: {
            sourceMap: true
        }
    }
}

function lessLoader() {
    return {
        loader: 'less-loader',
        options: {
            sourceMap: true
        }
    }
}

function sassLoader() {
    return {
        loader: 'sass-loader',
        options: {
            sourceMap: true
        }
    }
}

function cssBlock(isVue) {
    return isProd
        ? ExtractTextPlugin.extract({
            use: [
                cssLoader(),
                postCssLoader()
            ],
            fallback: styleLoader(isVue)
        })
        : [
            styleLoader(isVue),
            cssLoader(),
            postCssLoader()
        ]
}

function lessBlock(isVue) {
    return isProd
        ? ExtractTextPlugin.extract({
            use: [
                cssLoader(),
                postCssLoader(),
                lessLoader()
            ],
            fallback: styleLoader(isVue)
        })
        : [
            styleLoader(isVue),
            cssLoader(),
            lessLoader()
        ]
}

function sassBlock(isVue) {
    return isProd
        ? ExtractTextPlugin.extract({
            use: [
                cssLoader(),
                postCssLoader(),
                sassLoader()
            ],
            fallback: styleLoader(isVue)
        })
        : [
            styleLoader(isVue),
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