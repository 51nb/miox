'use strict';

/**
 * Created by evio on 2017/5/11.
 */
var path = require('path');

module.exports = function WebpackBabelCompileSourceModuleCompile(cwd, includes) {
    var node_modules = path.resolve(cwd, 'node_modules');
    var source_position = [];

    if (!Array.isArray(includes)) {
        includes = [includes];
    }
    var i = includes.length;
    while (i--) {
        var exc = includes[i];
        if (typeof exc === 'string') {
            exc = new RegExp(exc);
        }
        source_position.push(exc);
    }

    return function (pather) {
        var position = path.relative(node_modules, pather);
        var i = source_position.length;

        while (i--) {
            if (source_position[i].test(position)) {
                return true;
            }
        }

        return false;
    };
};