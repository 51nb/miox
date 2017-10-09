'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _dictionary = require('../miox_modules/dictionary');

var _dictionary2 = _interopRequireDefault(_dictionary);

var _isClass = require('is-class');

var _isClass2 = _interopRequireDefault(_isClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by evio on 2017/8/29.
 */
var Plugin = function (_Dictionary) {
  (0, _inherits3.default)(Plugin, _Dictionary);

  function Plugin(context) {
    (0, _classCallCheck3.default)(this, Plugin);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Plugin.__proto__ || Object.getPrototypeOf(Plugin)).call(this));

    _this.context = context;
    return _this;
  }

  (0, _createClass3.default)(Plugin, [{
    key: 'Engine',
    value: function Engine(value) {
      if (typeof value !== 'function' && !(0, _isClass2.default)(value)) {
        throw new Error('Engine must be a function or a class');
      }
      var engine = new value(this.context);
      if (typeof engine.install === 'function') {
        engine.install();
      }
      this.set('engine', engine);
    }
  }, {
    key: 'Animate',
    value: function Animate(value) {
      var animate = value(this.context);
      this.set('animate', animate);
    }
  }]);
  return Plugin;
}(_dictionary2.default);

exports.default = Plugin;
module.exports = exports['default'];