const shell = require('shelljs');
const path = require('path');
const PKG = require('../package.json');

exports.port = PKG.service.port;
exports.ip = PKG.service.ip;
const modules = exports.modules = {
    'miox': { build: true, alias: 'src/' },
    'miox-css': { build: false, alias: 'index.css' },
    'miox-compose': { build: true, alias: 'src/' },
    'miox-convert': { build: true, alias: 'src/' },
    'miox-animation': { build: true, alias: 'src/' },
    'miox-koa-vue2x-server-render': { build: true, alias: 'src/' },
    'miox-router': { build: true, alias: 'src/' },
    'miox-vue2x': { build: true, alias: 'src/' },
    'miox-vue2x-webpack-config': { build: true, alias: 'src/' },
    'miox-vue2x-container': { build: true, alias: 'src/' },
    'miox-react': { build: true, alias: 'src/' },
    'miox-vue2x-component-classify': { build: true, alias: 'src/' },
};

exports.compile = function(cmd, cwd, prefix) {
    return new Promise(function(resolve) {
        var child = shell.exec(cmd, {
            async: true,
            cwd: cwd,
            silent: true
        }, resolve);

        child.stdout.on('data', consoleInject(prefix));
        child.stderr.on('data', consoleInject(prefix));
    });
};

exports.alias = moduleAlias();
exports.resolve = resolve;

function consoleInject(prefix) {
    return (...data) => {
        if (prefix) {
            data.unshift(prefix);
        }

        console.log(...data.map(dat => dat.replace(/\n/g, '')));
    }
}

function resolve(...args) {
    return path.resolve(__dirname, '..', ...args);
}

function moduleAlias() {
    const result = {};
    for (const i in modules) {
        result[i] = resolve('src', i, modules[i].alias);
    }
    return result;
}