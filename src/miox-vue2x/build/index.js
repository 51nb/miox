'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var cov_2pjpexxfpv = function () {
  var path = '/Users/shenyunjie/CodeBox/miox/src/miox-vue2x/src/index.js',
      hash = 'f5411ac9423a12e4bd73e992e798b71dbd2dfa14',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/Users/shenyunjie/CodeBox/miox/src/miox-vue2x/src/index.js',
    statementMap: {
      '0': {
        start: {
          line: 6,
          column: 0
        },
        end: {
          line: 6,
          column: 57
        }
      },
      '1': {
        start: {
          line: 9,
          column: 2
        },
        end: {
          line: 9,
          column: 28
        }
      }
    },
    fnMap: {
      '0': {
        name: 'installer',
        decl: {
          start: {
            line: 8,
            column: 9
          },
          end: {
            line: 8,
            column: 18
          }
        },
        loc: {
          start: {
            line: 8,
            column: 24
          },
          end: {
            line: 10,
            column: 1
          }
        },
        line: 8
      }
    },
    branchMap: {},
    s: {
      '0': 0,
      '1': 0
    },
    f: {
      '0': 0
    },
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

exports.default = installer;
cov_2pjpexxfpv.s[0]++;


installer.WebView = _engine2.default.WebView = _vue2.default.extend(_webview2.default);

function installer(app) {
  cov_2pjpexxfpv.f[0]++;
  cov_2pjpexxfpv.s[1]++;

  app.set('engine', _engine2.default);
}
module.exports = exports['default'];