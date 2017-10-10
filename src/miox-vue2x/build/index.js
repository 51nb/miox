'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var cov_2pjpexxfpv = function () {
  var path = '/Users/shenyunjie/CodeBox/miox/src/miox-vue2x/src/index.js',
      hash = '0584fa6a0008501e742e622fb74166bc33b2efdc',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/Users/shenyunjie/CodeBox/miox/src/miox-vue2x/src/index.js',
    statementMap: {
      '0': {
        start: {
          line: 5,
          column: 0
        },
        end: {
          line: 5,
          column: 37
        }
      }
    },
    fnMap: {},
    branchMap: {},
    s: {
      '0': 0
    },
    f: {},
    b: {},
    _coverageSchema: '332fd63041d2c1bcb487cc26dd0d5f7d97098a6c'
  },
      coverage = global[gcv] || (global[gcv] = {});

  if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }

  coverageData.hash = hash;
  return coverage[path] = coverageData;
}();

var _engine = require('./engine');

var _engine2 = _interopRequireDefault(_engine);

var _webview = require('./webview');

var _webview2 = _interopRequireDefault(_webview);

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _engine2.default;
cov_2pjpexxfpv.s[0]++;

_engine2.default.WebView = _vue2.default.extend(_webview2.default);
module.exports = exports['default'];