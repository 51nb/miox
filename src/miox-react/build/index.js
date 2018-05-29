'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var cov_rn84azgdv = function () {
  var path = '/Users/shenyunjie/CodeBox/miox/src/miox-react/src/index.js',
      hash = 'e3fe30588d22bd223a22e60cbdf173018a33098c',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/Users/shenyunjie/CodeBox/miox/src/miox-react/src/index.js',
    statementMap: {
      '0': {
        start: {
          line: 4,
          column: 2
        },
        end: {
          line: 4,
          column: 28
        }
      }
    },
    fnMap: {
      '0': {
        name: 'installer',
        decl: {
          start: {
            line: 3,
            column: 24
          },
          end: {
            line: 3,
            column: 33
          }
        },
        loc: {
          start: {
            line: 3,
            column: 39
          },
          end: {
            line: 5,
            column: 1
          }
        },
        line: 3
      }
    },
    branchMap: {},
    s: {
      '0': 0
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

exports.default = installer;

var _engine = require('./engine');

var _engine2 = _interopRequireDefault(_engine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function installer(app) {
  cov_rn84azgdv.f[0]++;
  cov_rn84azgdv.s[0]++;

  app.set('engine', _engine2.default);
}
module.exports = exports['default'];