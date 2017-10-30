'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var cov_o3x6yd9r3 = function () {
  var path = '/Users/shenyunjie/CodeBox/miox/src/miox-vue2x-component-classify/src/life.js',
      hash = '48b97948830d26f484812e09122bb4f3d18e8a0c',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/Users/shenyunjie/CodeBox/miox/src/miox-vue2x-component-classify/src/life.js',
    statementMap: {
      '0': {
        start: {
          line: 1,
          column: 40
        },
        end: {
          line: 1,
          column: 57
        }
      },
      '1': {
        start: {
          line: 4,
          column: 2
        },
        end: {
          line: 8,
          column: 17
        }
      },
      '2': {
        start: {
          line: 6,
          column: 24
        },
        end: {
          line: 6,
          column: 55
        }
      }
    },
    fnMap: {
      '0': {
        name: 'life',
        decl: {
          start: {
            line: 3,
            column: 24
          },
          end: {
            line: 3,
            column: 28
          }
        },
        loc: {
          start: {
            line: 3,
            column: 54
          },
          end: {
            line: 9,
            column: 1
          }
        },
        line: 3
      },
      '1': {
        name: '(anonymous_1)',
        decl: {
          start: {
            line: 6,
            column: 6
          },
          end: {
            line: 6,
            column: 7
          }
        },
        loc: {
          start: {
            line: 6,
            column: 24
          },
          end: {
            line: 6,
            column: 55
          }
        },
        line: 6
      }
    },
    branchMap: {},
    s: {
      '0': 0,
      '1': 0,
      '2': 0
    },
    f: {
      '0': 0,
      '1': 0
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

exports.default = life;

var _ref = (cov_o3x6yd9r3.s[0]++, require('./util')),
    lifeCycles = _ref.lifeCycles,
    createDecorator = _ref.createDecorator;

function life(target, key, descriptor) {
  cov_o3x6yd9r3.f[0]++;
  cov_o3x6yd9r3.s[1]++;

  return createDecorator(function (options, key) {
    cov_o3x6yd9r3.f[1]++;
    cov_o3x6yd9r3.s[2]++;
    return options[key] = descriptor.value;
  })(target, key);
}
module.exports = exports['default'];