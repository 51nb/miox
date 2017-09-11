'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.$decoratorQueue = undefined;
exports.componentFactory = componentFactory;

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _data = require('./data');

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $decoratorQueue = exports.$decoratorQueue = []; /**
                                                     * Created by evio on 2016/11/23.
                                                     */
function componentFactory(Component, options) {
    if (options === void 0) {
        options = {};
    }
    options.name = options.name || Component._componentTag || Component.name || Component.constructor.name || Component.prototype.name || 'VueComponent';
    var proto = Component.prototype;
    var pool = [];
    var statics = {};

    Object.getOwnPropertyNames(Component).forEach(function (key) {
        if (_util.functionOwnProperties.indexOf(key) === -1) {
            statics[key] = Component[key];
        }
    });

    (0, _util.getComponentProperties)(proto, function (key) {
        if (key === 'constructor' || /^[\$\_]/.test(key) || pool.indexOf(key) > -1 || _util.lifeCycles.indexOf(key) > -1) {
            return;
        }

        pool.push(key);

        if (key === 'render') {
            options.render = proto.render;
            return;
        }

        if (key === 'template') {
            options.template = proto.template();
            return;
        }

        var descriptor = Object.getOwnPropertyDescriptor(proto, key);

        if (!descriptor) return;

        if (typeof descriptor.value === 'function') {
            (options.methods || (options.methods = {}))[key] = descriptor.value;
        } else if (descriptor.get || descriptor.set) {
            (options.computed || (options.computed = {}))[key] = {
                get: descriptor.get,
                set: descriptor.set
            };
        }
    });

    (options.mixins || (options.mixins = [])).push({
        data: function data() {
            return (0, _data.collectDataFromConstructor)(this, Component);
        }
    });

    $decoratorQueue.forEach(function (fn) {
        return fn(options);
    });
    exports.$decoratorQueue = $decoratorQueue = [];

    var superProto = Object.getPrototypeOf(Component.prototype);
    var Super = superProto instanceof _vue2.default ? superProto.constructor : _vue2.default;
    var outComponent = Super.extend(options);

    for (var outs in statics) {
        try {
            outComponent[outs] = statics[outs];
        } catch (e) {}
    }

    return outComponent;
}