'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = directive;

var _require = require('./util'),
    createDecorator = _require.createDecorator;

function directive(target, key, descriptor) {
  return createDecorator(function (options, key) {
    var handle = descriptor.value;
    var directive = {};
    var value = handle.call(target, directive);
    (options.directives || (options.directives = {}))[key] = value ? value : directive;
  })(target, key);
}
module.exports = exports['default'];