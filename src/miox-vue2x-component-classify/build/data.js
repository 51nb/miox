'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = VueDecoratorDataFactory;
function VueDecoratorDataFactory(viewModule, Component) {
  Component.prototype._init = function () {
    var _this = this;

    var keys = Object.getOwnPropertyNames(viewModule);
    if (viewModule.$options.props) {
      for (var key in viewModule.$options.props) {
        if (!vm.hasOwnProperty(key)) {
          keys.push(key);
        }
      }
    }
    keys.forEach(function (key) {
      if (key.charAt(0) !== '_') {
        Object.defineProperty(_this, key, {
          get: function get() {
            return vm[key];
          },
          set: function set(value) {
            return vm[key] = value;
          }
        });
      }
    });
  };

  var data = new Component();
  var plainData = {};
  Object.keys(data).forEach(function (key) {
    if (data[key] !== undefined) {
      plainData[key] = data[key];
    }
  });

  return plainData;
}
module.exports = exports['default'];