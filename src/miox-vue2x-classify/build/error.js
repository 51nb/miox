'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = error;

var _require = require('./util'),
    createDecorator = _require.createDecorator,
    removeVueMethod = _require.removeVueMethod;

var errorPrefixes = ['renderError', 'errorCaptured'];

function error(target, key, descriptor) {
  return createDecorator(function (options, key) {
    if (!~errorPrefixes.indexOf(key)) {
      throw new Error(key + ' is not a error handle in Vue');
    }
    options[key] = descriptor.value;
    removeVueMethod(options, key);
  })(target, key);
}
module.exports = exports['default'];