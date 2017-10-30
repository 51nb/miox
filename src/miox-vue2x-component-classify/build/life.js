'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = life;

var _require = require('./util'),
    lifeCycles = _require.lifeCycles,
    createDecorator = _require.createDecorator;

function life(target, key, descriptor) {
  return createDecorator(function (options, key) {
    return options[key] = descriptor.value;
  })(target, key);
}
module.exports = exports['default'];