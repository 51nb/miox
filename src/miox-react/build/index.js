'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = installer;

var _engine = require('./engine');

var _engine2 = _interopRequireDefault(_engine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function installer(app) {
  app.set('engine', _engine2.default);
}
module.exports = exports['default'];