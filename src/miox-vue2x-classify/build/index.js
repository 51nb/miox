'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateDecorator = exports.error = exports.directive = exports.watch = exports.filter = exports.life = undefined;
exports.Component = Component;
exports.RegisterLifeCycle = RegisterLifeCycle;

var _component = require('./component');

var _component2 = _interopRequireDefault(_component);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var life = exports.life = require('./life');
var filter = exports.filter = require('./filter');
var watch = exports.watch = require('./watch');
var directive = exports.directive = require('./directive');
var error = exports.error = require('./error');
var CreateDecorator = exports.CreateDecorator = _util.createDecorator;
function Component(options) {
  if (typeof options === 'function') return (0, _component2.default)(options);
  return function (target) {
    return (0, _component2.default)(target, options);
  };
}
function RegisterLifeCycle() {
  _util.lifeCycles.push.apply(_util.lifeCycles, arguments);
}