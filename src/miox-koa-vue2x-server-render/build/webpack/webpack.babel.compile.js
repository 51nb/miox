'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = WebpackBabelCompileSourceModuleCompile;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function WebpackBabelCompileSourceModuleCompile(cwd, includes) {
    var node_modules = _path2.default.resolve(cwd, 'node_modules');
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
        var position = _path2.default.relative(node_modules, pather);
        var i = source_position.length;

        while (i--) {
            if (source_position[i].test(position)) {
                return true;
            }
        }

        return false;
    };
} /**
   * Created by evio on 2017/5/11.
   */
module.exports = exports['default'];