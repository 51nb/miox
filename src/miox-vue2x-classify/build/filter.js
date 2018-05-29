'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var cov_xergmtqvq = function () {
  var path = '/Users/shenyunjie/CodeBox/miox/src/miox-vue2x-classify/src/filter.js',
      hash = '126664fb3d110e7d2b51e798fc76b7c141c15400',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/Users/shenyunjie/CodeBox/miox/src/miox-vue2x-classify/src/filter.js',
    statementMap: {
      '0': {
        start: {
          line: 1,
          column: 45
        },
        end: {
          line: 1,
          column: 62
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
          column: 76
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
    branchMap: {
      '0': {
        loc: {
          start: {
            line: 7,
            column: 9
          },
          end: {
            line: 7,
            column: 50
          }
        },
        type: 'binary-expr',
        locations: [{
          start: {
            line: 7,
            column: 9
          },
          end: {
            line: 7,
            column: 24
          }
        }, {
          start: {
            line: 7,
            column: 29
          },
          end: {
            line: 7,
            column: 49
          }
        }],
        line: 7
      }
    },
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

var _ref = (cov_xergmtqvq.s[0]++, require('./util')),
    createDecorator = _ref.createDecorator,
    removeVueMethod = _ref.removeVueMethod;

function filter(target, key, descriptor) {
  cov_xergmtqvq.f[0]++;
  cov_xergmtqvq.s[1]++;

  return createDecorator(function (options, key) {
    cov_xergmtqvq.f[1]++;
    cov_xergmtqvq.s[2]++;

    ((cov_xergmtqvq.b[0][0]++, options.filters) || (cov_xergmtqvq.b[0][1]++, options.filters = {}))[key] = descriptor.value;
    cov_xergmtqvq.s[3]++;
    removeVueMethod(options, key);
  })(target, key);
}
module.exports = exports['default'];