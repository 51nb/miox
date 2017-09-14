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
        const moduleChecked = checkPool(true, node_modules, file, moduleMaps);
        if (moduleChecked) return true;
        const dirChecked = checkPool(false, cwd, file, dirMaps);
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

function checkPool(isModule, cwd, file, pool) {
    const position = path.relative(cwd, file);
    let i = pool.length;

    while (i--) {
        if (isModule) {
            if (pool[i].test(position)) {
                return true;
            }
        } else {
            if (pool[i].test(position) && !/node_modules/i.test(position)) {
                return true;
            }
        }
    }
}