'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = filter;

var _util = require('./util');

function filter(target, name, descriptor) {
    if (descriptor !== undefined) {
        return (0, _util.createDecorator)(function (options) {
            options.filters || (options.filters = {});

            if (typeof descriptor.value === 'function') {
                options.filters[name] = descriptor.value;
                (0, _util.removeMethodFromComponent)(options, name);
            }
        })();
    } else {
        return (0, _util.createDecorator)(function (options, key, desc) {
            options.filters || (options.filters = {});
            var keyName = target || key;

            if (desc && typeof desc.value === 'function') {
                options.filters[keyName] = desc.value;
                (0, _util.removeMethodFromComponent)(options, keyName);
            }
        });
    }
} /**
   * Created by evio on 2016/11/23.
   */

module.exports = exports['default'];