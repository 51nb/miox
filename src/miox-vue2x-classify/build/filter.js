'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = filter;

var _require = require('./util'),
    createDecorator = _require.createDecorator,
    removeVueMethod = _require.removeVueMethod;

function filter(target, key, descriptor) {
  return createDecorator(function (options, key) {
    (options.filters || (options.filters = {}))[key] = descriptor.value;
    removeVueMethod(options, key);
  })(target, key);
}
module.exports = exports['default'];