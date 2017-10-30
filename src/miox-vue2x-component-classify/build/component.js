'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = VueComponentDecoratorFactory;

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _data = require('./data');

var _data2 = _interopRequireDefault(_data);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('./util'),
    functionOwnProperties = _require.functionOwnProperties,
    lifeCycles = _require.lifeCycles;

function VueComponentDecoratorFactory(webView) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  options.name = options.name || webView._componentTag || webView.name || (webView.constructor ? webView.constructor.name : null) || (webView.prototype ? webView.prototype.name : null) || (webView.$options ? webView.$options.name : null) || 'VueComponent';

  var webViewPrototype = webView.prototype;
  var webviewRenderedPool = [];

  componentProperties(webViewPrototype, function (key) {
    var reject = key === 'constructor' || /^[\$\_]/.test(key) || webviewRenderedPool.indexOf(key) > -1 || lifeCycles.indexOf(key) > -1;

    if (reject) return;
    webviewRenderedPool.push(key);
    var factory = webViewPrototype[key];

    switch (key) {
      case 'render':
        options.render = factory;
        break;
      case 'template':
        options.template = typeof factory === 'string' ? factory : factory();
        break;
      default:
        convertMethodsToOptions(webViewPrototype, key, options);
    }
  });

  (options.mixins || (options.mixins = [])).push({
    data: function data() {
      return (0, _data2.default)(this, webView);
    }
  });

  var decorators = webView.__decorators__;
  if (decorators) {
    decorators.forEach(function (fn) {
      return fn(options);
    });
  }

  var superProto = Object.getPrototypeOf(webViewPrototype);
  var Super = superProto instanceof _vue2.default ? superProto.constructor : _vue2.default;

  var outComponent = Super.extend(options);
  for (var staticKey in webView) {
    if (webView.hasOwnProperty(staticKey)) {
      outComponent[staticKey] = webView[staticKey];
    }
  }
  return outComponent;
}

function convertMethodsToOptions(webViewPrototype, key, options) {
  var descriptor = Object.getOwnPropertyDescriptor(webViewPrototype, key);
  if (!descriptor) return;
  if (typeof descriptor.value === 'function') {
    (options.methods || (options.methods = {}))[key] = descriptor.value;
  } else if (descriptor.get || descriptor.set) {
    (options.computed || (options.computed = {}))[key] = {
      get: descriptor.get,
      set: descriptor.set
    };
  }
}

function componentProperties(obj, cb) {
  var proto = obj.__proto__;
  Object.getOwnPropertyNames(obj).forEach(cb);
  if (proto) componentProperties(proto, cb);
}
module.exports = exports['default'];