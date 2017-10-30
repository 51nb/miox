'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = life;

var _require = require('./util'),
    lifeCycles = _require.lifeCycles,
    createDecorator = _require.createDecorator,
    removeVueMethod = _require.removeVueMethod;

function life(target, key, descriptor) {
  return createDecorator(function (options, key) {
    options[key] = descriptor.value;
    removeVueMethod(options, key);
  })(target, key);
}
module.exports = exports['default'];