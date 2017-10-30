'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var cov_2a6osilorl = function () {
  var path = '/Users/shenyunjie/CodeBox/miox/src/miox-vue2x-component-classify/src/directive.js',
      hash = 'ff788be0b43b8465e1ebe99c1c7776499e703909',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/Users/shenyunjie/CodeBox/miox/src/miox-vue2x-component-classify/src/directive.js',
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
          line: 13,
          column: 17
        }
      },
      '2': {
        start: {
          line: 7,
          column: 23
        },
        end: {
          line: 7,
          column: 39
        }
      },
      '3': {
        start: {
          line: 8,
          column: 26
        },
        end: {
          line: 8,
          column: 28
        }
      },
      '4': {
        start: {
          line: 9,
          column: 22
        },
        end: {
          line: 9,
          column: 52
        }
      },
      '5': {
        start: {
          line: 10,
          column: 8
        },
        end: {
          line: 10,
          column: 91
        }
      }
    },
    fnMap: {
      '0': {
        name: 'directive',
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
            column: 59
          },
          end: {
            line: 14,
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
            line: 11,
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
            line: 10,
            column: 9
          },
          end: {
            line: 10,
            column: 56
          }
        },
        type: 'binary-expr',
        locations: [{
          start: {
            line: 10,
            column: 9
          },
          end: {
            line: 10,
            column: 27
          }
        }, {
          start: {
            line: 10,
            column: 32
          },
          end: {
            line: 10,
            column: 55
          }
        }],
        line: 10
      },
      '1': {
        loc: {
          start: {
            line: 10,
            column: 65
          },
          end: {
            line: 10,
            column: 90
          }
        },
        type: 'cond-expr',
        locations: [{
          start: {
            line: 10,
            column: 73
          },
          end: {
            line: 10,
            column: 78
          }
        }, {
          start: {
            line: 10,
            column: 81
          },
          end: {
            line: 10,
            column: 90
          }
        }],
        line: 10
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
      '0': [0, 0],
      '1': [0, 0]
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

exports.default = directive;

var _ref = (cov_2a6osilorl.s[0]++, require('./util')),
    createDecorator = _ref.createDecorator;

function directive(target, key, descriptor) {
  cov_2a6osilorl.f[0]++;
  cov_2a6osilorl.s[1]++;

  return createDecorator(function (options, key) {
    cov_2a6osilorl.f[1]++;

    var handle = (cov_2a6osilorl.s[2]++, descriptor.value);
    var directive = (cov_2a6osilorl.s[3]++, {});
    var value = (cov_2a6osilorl.s[4]++, handle.call(target, directive));
    cov_2a6osilorl.s[5]++;
    ((cov_2a6osilorl.b[0][0]++, options.directives) || (cov_2a6osilorl.b[0][1]++, options.directives = {}))[key] = value ? (cov_2a6osilorl.b[1][0]++, value) : (cov_2a6osilorl.b[1][1]++, directive);
  })(target, key);
}
module.exports = exports['default'];