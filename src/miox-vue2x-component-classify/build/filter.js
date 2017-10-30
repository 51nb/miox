'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var cov_1fbpup10f0 = function () {
  var path = '/Users/shenyunjie/CodeBox/miox/src/miox-vue2x-component-classify/src/filter.js',
      hash = '7eb960f528675ecc7ac0152dc800487b00ec51c9',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/Users/shenyunjie/CodeBox/miox/src/miox-vue2x-component-classify/src/filter.js',
    statementMap: {
      '0': {
        start: {
          line: 1,
          column: 28
        },
        end: {
          line: 1,
          column: 45
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
          column: 91
        }
      }
    },
    fnMap: {
      '0': {
        name: 'filter',
        decl: {
          start: {
            line: 3,
            column: 24
          },
          end: {
            line: 3,
            column: 30
          }
        },
        loc: {
          start: {
            line: 3,
            column: 56
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
            column: 91
          }
        },
        line: 6
      }
    },
    branchMap: {
      '0': {
        loc: {
          start: {
            line: 6,
            column: 25
          },
          end: {
            line: 6,
            column: 66
          }
        },
        type: 'binary-expr',
        locations: [{
          start: {
            line: 6,
            column: 25
          },
          end: {
            line: 6,
            column: 40
          }
        }, {
          start: {
            line: 6,
            column: 45
          },
          end: {
            line: 6,
            column: 65
          }
        }],
        line: 6
      }
    },
    s: {
      '0': 0,
      '1': 0,
      '2': 0
    },
    f: {
      '0': 0,
      '1': 0
    },
    b: {
      '0': [0, 0]
    },
    _coverageSchema: '332fd63041d2c1bcb487cc26dd0d5f7d97098a6c'
  },
      coverage = global[gcv] || (global[gcv] = {});

  if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }

  coverageData.hash = hash;
  return coverage[path] = coverageData;
}();

exports.default = filter;

var _ref = (cov_1fbpup10f0.s[0]++, require('./util')),
    createDecorator = _ref.createDecorator;

function filter(target, key, descriptor) {
  cov_1fbpup10f0.f[0]++;
  cov_1fbpup10f0.s[1]++;

  return createDecorator(function (options, key) {
    cov_1fbpup10f0.f[1]++;
    cov_1fbpup10f0.s[2]++;
    return ((cov_1fbpup10f0.b[0][0]++, options.filters) || (cov_1fbpup10f0.b[0][1]++, options.filters = {}))[key] = descriptor.value;
  })(target, key);
}
module.exports = exports['default'];