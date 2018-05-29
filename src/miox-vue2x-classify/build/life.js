'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var cov_1hy4yzpg1f = function () {
  var path = '/Users/shenyunjie/CodeBox/miox/src/miox-vue2x-classify/src/life.js',
      hash = '2fabbbca30c65859cc953f08728a78ddf79a20ee',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/Users/shenyunjie/CodeBox/miox/src/miox-vue2x-classify/src/life.js',
    statementMap: {
      '0': {
        start: {
          line: 1,
          column: 57
        },
        end: {
          line: 1,
          column: 74
        }
      },
      '1': {
        start: {
          line: 4,
          column: 2
        },
        end: {
          line: 11,
          column: 17
        }
      },
      '2': {
        start: {
          line: 7,
          column: 8
        },
        end: {
          line: 7,
          column: 40
        }
      },
      '3': {
        start: {
          line: 8,
          column: 8
        },
        end: {
          line: 8,
          column: 38
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
            line: 12,
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
            line: 9,
            column: 7
          }
        },
        line: 6
      }
    },
    branchMap: {},
    s: {
      '0': 0,
      '1': 0,
      '2': 0,
      '3': 0
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

var _ref = (cov_1hy4yzpg1f.s[0]++, require('./util')),
    lifeCycles = _ref.lifeCycles,
    createDecorator = _ref.createDecorator,
    removeVueMethod = _ref.removeVueMethod;

function life(target, key, descriptor) {
  cov_1hy4yzpg1f.f[0]++;
  cov_1hy4yzpg1f.s[1]++;

  return createDecorator(function (options, key) {
    cov_1hy4yzpg1f.f[1]++;
    cov_1hy4yzpg1f.s[2]++;

    options[key] = descriptor.value;
    cov_1hy4yzpg1f.s[3]++;
    removeVueMethod(options, key);
  })(target, key);
}
module.exports = exports['default'];