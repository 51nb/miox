'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = watch;

var _require = require('./util'),
    createDecorator = _require.createDecorator,
    removeVueMethod = _require.removeVueMethod;

function watch(target, key, descriptor) {
  if (typeof target === 'string') {
    key = target;
    return function (target, methodName, descriptor) {
      return createWatcher(target, key, descriptor);
    };
  }
  return createWatcher(target, key, descriptor);
}

function createWatcher(target, key, descriptor) {
  if (/^this/.test(key)) key = key.replace(/^this/, '');
  if (/^\./.test(key)) key = key.replace(/^\./, '');
  return createDecorator(function (options, key) {
    (options.watch || (options.watch = {}))[key] = descriptor.value;
    removeVueMethod(options, key);
  })(target, key);
}
module.exports = exports['default'];