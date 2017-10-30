'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.error = exports.directive = exports.watch = exports.filter = exports.life = exports.lifeCycles = exports.createDecorator = undefined;

var _util = require('./util');

Object.defineProperty(exports, 'createDecorator', {
  enumerable: true,
  get: function get() {
    return _util.createDecorator;
  }
});
Object.defineProperty(exports, 'lifeCycles', {
  enumerable: true,
  get: function get() {
    return _util.lifeCycles;
  }
});
exports.Component = Component;
exports.registerLifeCycle = registerLifeCycle;

var _component = require('./component');

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var life = exports.life = require('./life');
var filter = exports.filter = require('./filter');
var watch = exports.watch = require('./watch');
var directive = exports.directive = require('./directive');
var error = exports.error = require('./error');
function Component(options) {
  if (typeof options === 'function') return (0, _component2.default)(options);
  return function (target) {
    return (0, _component2.default)(target, options);
  };
}
function registerLifeCycle() {
  var _lifeCycles;

  (_lifeCycles = lifeCycles).push.apply(_lifeCycles, arguments);
}