const path = require('path');

module.exports = function WebpackBabelCompileSourceModuleCompile(cwd, options = {}) {
    const node_modules = path.resolve(cwd, 'node_modules');
    const dirMaps = [], moduleMaps = [];
    let { dirs, modules } = options;

    if (!dirs) dirs = [];
    if (!modules) modules = [];
    if (!Array.isArray(dirs)) dirs = [dirs];
    if (!Array.isArray(modules)) modules = [modules];

    pushMaps(dirs, dirMaps);
    pushMaps(modules, moduleMaps);

    return file => {
        const moduleChecked = checkPool(node_modules, file, moduleMaps);
        if (moduleChecked) return true;
        const dirChecked = checkPool(cwd, file, dirMaps);
        if (dirChecked) return true;
        return false;
    }
};

function pushMaps(which, pool) {
    let i = which.length;
    while (i--) {
        let exc = which[i];
        if (typeof exc === 'string') {
            exc = new RegExp(exc);
        }
        pool.push(exc);
    }
}

function checkPool(cwd, file, pool) {
    const position = path.relative(cwd, file);
    let i = pool.length;

    while (i--) {
        if (pool[i].test(position)) {
            return true;
        }
    }
}