'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var cov_1m557s9h9v = function () {
  var path = '/Users/shenyunjie/CodeBox/miox/src/miox-vue2x-classify/src/error.js',
      hash = '376b69720a2cb05e6dbca95ffc4a07a4bffb2ac4',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/Users/shenyunjie/CodeBox/miox/src/miox-vue2x-classify/src/error.js',
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
          line: 15,
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
      },
      '6': {
        start: {
          line: 12,
          column: 8
        },
        end: {
          line: 12,
          column: 38
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
            line: 16,
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
            line: 13,
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
      '5': 0,
      '6': 0
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

var _ref = (cov_1m557s9h9v.s[0]++, require('./util')),
    createDecorator = _ref.createDecorator,
    removeVueMethod = _ref.removeVueMethod;

var errorPrefixes = (cov_1m557s9h9v.s[1]++, ['renderError', 'errorCaptured']);

function error(target, key, descriptor) {
  cov_1m557s9h9v.f[0]++;
  cov_1m557s9h9v.s[2]++;

  return createDecorator(function (options, key) {
    cov_1m557s9h9v.f[1]++;
    cov_1m557s9h9v.s[3]++;

    if (!~errorPrefixes.indexOf(key)) {
      cov_1m557s9h9v.b[0][0]++;
      cov_1m557s9h9v.s[4]++;

      throw new Error(key + ' is not a error handle in Vue');
    } else {
      cov_1m557s9h9v.b[0][1]++;
    }
    cov_1m557s9h9v.s[5]++;
    options[key] = descriptor.value;
    cov_1m557s9h9v.s[6]++;
    removeVueMethod(options, key);
  })(target, key);
}
module.exports = exports['default'];