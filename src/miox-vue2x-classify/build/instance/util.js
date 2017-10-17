'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.lifeCycles = exports.functionOwnProperties = exports.toString = undefined;
exports.createDecorator = createDecorator;
exports.removeMethodFromComponent = removeMethodFromComponent;
exports.getComponentProperties = getComponentProperties;

var _component = require('./component');

var toString = exports.toString = Object.prototype.toString; /**
                                                              * Created by evio on 2016/11/23.
                                                              */

var functionOwnProperties = exports.functionOwnProperties = Object.getOwnPropertyNames(function () {});
function createDecorator(factory) {
    return function (_, key, index) {
        _component.$decoratorQueue.push(function (options) {
            return factory(options, key, index);
        });
    };
}
var lifeCycles = exports.lifeCycles = ['beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeDestroy', 'destroyed', 'beforeUpdate', 'updated', 'activated', 'deactivated'];
function removeMethodFromComponent(options, name) {
    if (options.methods && options.methods[name]) {
        delete options.methods[name];
    }
}
function getComponentProperties(obj, cb) {
    Object.getOwnPropertyNames(obj).forEach(cb);

    if (obj.__proto__) {
        getComponentProperties(obj.__proto__, cb);
    }
}