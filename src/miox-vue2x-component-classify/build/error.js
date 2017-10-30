'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var cov_u9v8et9b8 = function () {
  var path = '/Users/shenyunjie/CodeBox/miox/src/miox-vue2x-component-classify/src/error.js',
      hash = 'a7c2a1f5d68772441a89aa7108a02506047647d0',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/Users/shenyunjie/CodeBox/miox/src/miox-vue2x-component-classify/src/error.js',
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
          line: 2,
          column: 22
        },
        end: {
          line: 2,
          column: 54
        }
      },
      '2': {
        start: {
          line: 5,
          column: 2
        },
        end: {
          line: 14,
          column: 17
        }
      },
      '3': {
        start: {
          line: 8,
          column: 8
        },
        end: {
          line: 10,
          column: 9
        }
      },
      '4': {
        start: {
          line: 9,
          column: 10
        },
        end: {
          line: 9,
          column: 65
        }
      },
      '5': {
        start: {
          line: 11,
          column: 8
        },
        end: {
          line: 11,
          column: 40
        }
      }
    },
    fnMap: {
      '0': {
        name: 'error',
        decl: {
          start: {
            line: 4,
            column: 24
          },
          end: {
            line: 4,
            column: 29
          }
        },
        loc: {
          start: {
            line: 4,
            column: 55
          },
          end: {
            line: 15,
            column: 1
          }
        },
        line: 4
      },
      '1': {
        name: '(anonymous_1)',
        decl: {
          start: {
            line: 7,
            column: 6
          },
          end: {
            line: 7,
            column: 7
          }
        },
        loc: {
          start: {
            line: 7,
            column: 24
          },
          end: {
            line: 12,
            column: 7
          }
        },
        line: 7
      }
    },
    branchMap: {
      '0': {
        loc: {
          start: {
            line: 8,
            column: 8
          },
          end: {
            line: 10,
            column: 9
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 8,
            column: 8
          },
          end: {
            line: 10,
            column: 9
          }
        }, {
          start: {
            line: 8,
            column: 8
          },
          end: {
            line: 10,
            column: 9
          }
        }],
        line: 8
      }
    },
    s: {
      '0': 0,
      '1': 0,
      '2': 0,
      '3': 0,
      '4': 0,
      '5': 0
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

exports.default = error;

var _ref = (cov_u9v8et9b8.s[0]++, require('./util')),
    createDecorator = _ref.createDecorator;

var errorPrefixes = (cov_u9v8et9b8.s[1]++, ['renderError', 'errorCaptured']);

function error(target, key, descriptor) {
  cov_u9v8et9b8.f[0]++;
  cov_u9v8et9b8.s[2]++;

  return createDecorator(function (options, key) {
    cov_u9v8et9b8.f[1]++;
    cov_u9v8et9b8.s[3]++;

    if (!~errorPrefixes.indexOf(key)) {
      cov_u9v8et9b8.b[0][0]++;
      cov_u9v8et9b8.s[4]++;

      throw new Error(key + ' is not a error handle in Vue');
    } else {
      cov_u9v8et9b8.b[0][1]++;
    }
    cov_u9v8et9b8.s[5]++;
    options[key] = descriptor.value;
  })(target, key);
}
module.exports = exports['default'];