'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = prop;

var _util = require('./util');

function prop(target, name, descriptor) {
    if (descriptor !== undefined) {
        return (0, _util.createDecorator)(function (options) {
            options.props || (options.props = {});

            if (typeof descriptor.value === 'function') {
                var settings = {};

                var result = descriptor.value(settings);

                if (result) {
                    settings = result;
                }

                options.props[name] = settings;
                (0, _util.removeMethodFromComponent)(options, name);
            }
        })();
    } else {
        return (0, _util.createDecorator)(function (options, key, desc) {
            options.props || (options.props = {});

            if (desc && typeof desc.value === 'function') {
                var settings = {};
                var result = desc.value(settings);

                if (result) {
                    settings = result;
                }

                if (target) {
                    settings.type = target;
                }

                options.props[key] = settings;
            } else {
                options.props[key] = target;
            }

            (0, _util.removeMethodFromComponent)(options, key);
        });
    }
} /**
   * Created by evio on 2016/11/23.
   */

module.exports = exports['default'];