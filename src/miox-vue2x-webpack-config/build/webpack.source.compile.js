'use strict';

var path = require('path');

module.exports = function WebpackBabelCompileSourceModuleCompile(cwd) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var node_modules = path.resolve(cwd, 'node_modules');
    var dirMaps = [],
        moduleMaps = [];
    var dirs = options.dirs,
        modules = options.modules;


    if (!dirs) dirs = [];
    if (!modules) modules = [];
    if (!Array.isArray(dirs)) dirs = [dirs];
    if (!Array.isArray(modules)) modules = [modules];

    pushMaps(dirs, dirMaps);
    pushMaps(modules, moduleMaps);

    return function (file) {
        var moduleChecked = checkPool(true, node_modules, file, moduleMaps);
        if (moduleChecked) return true;
        var dirChecked = checkPool(false, cwd, file, dirMaps);
        if (dirChecked) return true;
        return false;
    };
};

function pushMaps(which, pool) {
    var i = which.length;
    while (i--) {
        var exc = which[i];
        if (typeof exc === 'string') {
            exc = new RegExp(exc);
        }
        pool.push(exc);
    }
}

function checkPool(isModule, cwd, file, pool) {
    var position = path.relative(cwd, file);
    var i = pool.length;

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