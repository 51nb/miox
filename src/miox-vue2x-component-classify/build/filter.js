'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = filter;

var _require = require('./util'),
    createDecorator = _require.createDecorator;

function filter(target, key, descriptor) {
  return createDecorator(function (options, key) {
    return (options.filters || (options.filters = {}))[key] = descriptor.value;
  })(target, key);
}
module.exports = exports['default'];