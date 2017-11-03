'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = directive;

var _require = require('./util'),
    createDecorator = _require.createDecorator,
    removeVueMethod = _require.removeVueMethod;

function directive(target, key, descriptor) {
  return createDecorator(function (options, key) {
    var handle = descriptor.value;
    var directive = {};

    var value = typeof handle === 'function' ? handle.call(target, directive) : handle || {};

    (options.directives || (options.directives = {}))[key] = value ? value : directive;

    removeVueMethod(options, key);
  })(target, key);
}
module.exports = exports['default'];