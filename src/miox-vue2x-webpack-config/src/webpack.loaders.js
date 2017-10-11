const ExtractTextPlugin = require('extract-text-webpack-plugin');
const isProd = process.env.NODE_ENV === 'production';

module.exports = function(includeCompiler) {
    return [
        vue(includeCompiler),
        js(includeCompiler),
        jsx(includeCompiler),
        css(includeCompiler),
        less(includeCompiler),
        sass(includeCompiler)
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

function cssBlock(isVue) {
    const devArray = [cssLoader()];
    const proArray = [styleLoader(), cssLoader()];

    if (!isVue) {
        devArray.push(postCssLoader());
        proArray.push(postCssLoader());
    }

    return isProd
        ? ExtractTextPlugin.extract({
            use: devArray,
            fallback: styleLoader()
        })
        : proArray
}

function lessBlock(isVue) {
    const devArray = [cssLoader(), lessLoader()];
    const proArray = [styleLoader(), cssLoader(), lessLoader()];

    if (!isVue) {
        devArray.splice(1, 1, postCssLoader(), devArray[1]);
        proArray.splice(2, 1, postCssLoader(), proArray[2]);
    }

    return isProd
        ? ExtractTextPlugin.extract({
            use: devArray,
            fallback: styleLoader()
        })
        : proArray
}

function sassBlock() {
    const devArray = [cssLoader(), sassLoader()];
    const proArray = [styleLoader(), cssLoader(), sassLoader()];

    if (!isVue) {
        devArray.splice(1, 1, postCssLoader(), devArray[1]);
        proArray.splice(2, 1, postCssLoader(), proArray[2]);
    }

    return isProd
        ? ExtractTextPlugin.extract({
            use: devArray,
            fallback: styleLoader()
        })
        : proArray
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

function css(includeCompiler) {
    return {
        test: /\.css$/,
        include: includeCompiler,
        use: cssBlock()
    }
}

function less(includeCompiler) {
    return {
        test: /\.less$/,
        include: includeCompiler,
        use: lessBlock()
    }
}

function sass(includeCompiler) {
    return {
        test: /\.scss$/,
        include: includeCompiler,
        use: sassBlock()
    }
}