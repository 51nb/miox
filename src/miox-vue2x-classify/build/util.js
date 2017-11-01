'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createDecorator = createDecorator;
exports.removeVueMethod = removeVueMethod;
var lifeCycles = exports.lifeCycles = ['beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeDestroy', 'destroyed', 'beforeUpdate', 'updated', 'activated', 'deactivated'];

function createDecorator(handle) {
  return function (target, key, index) {
    var ctx = typeof target === 'function' ? target : target.constructor;

    if (!ctx.__decorators__) ctx.__decorators__ = [];
    if (typeof index !== 'number') index = undefined;
    ctx.__decorators__.push(function (options) {
      return handle(options, key, index);
    });
  };
}

function removeVueMethod(options, methodName) {
  if (options.methods && options.methods[methodName]) {
    delete options.methods[methodName];
  }
}