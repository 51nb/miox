'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = error;

var _require = require('./util'),
    createDecorator = _require.createDecorator;

var errorPrefixes = ['renderError', 'errorCaptured'];

function error(target, key, descriptor) {
  return createDecorator(function (options, key) {
    if (!~errorPrefixes.indexOf(key)) {
      throw new Error(key + ' is not a error handle in Vue');
    }
    options[key] = descriptor.value;
  })(target, key);
}
module.exports = exports['default'];