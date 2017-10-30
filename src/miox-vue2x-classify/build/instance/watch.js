'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = watch;

var _util = require('./util');

function watch(target, name, descriptor) {
    if (descriptor !== undefined) {
        return (0, _util.createDecorator)(function (options) {
            options.watch || (options.watch = {});

            if (typeof descriptor.value === 'function') {
                options.watch[name] = descriptor.value;
                (0, _util.removeMethodFromComponent)(options, name);
            }
        })();
    } else {
        return (0, _util.createDecorator)(function (options, key, desc) {
            options.watch || (options.watch = {});
            var keyName = target || key;

            if (desc && typeof desc.value === 'function') {
                options.watch[keyName] = desc.value;
                (0, _util.removeMethodFromComponent)(options, keyName);
            }
        });
    }
} /**
   * Created by evio on 2016/11/23.
   */
module.exports = exports['default'];