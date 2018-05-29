'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var cov_2cigiobflo = function () {
  var path = '/Users/shenyunjie/CodeBox/miox/src/miox-vue2x-classify/src/directive.js',
      hash = 'dfb1eb742b086e9a4ee43fe0d796e68f619a7a3d',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/Users/shenyunjie/CodeBox/miox/src/miox-vue2x-classify/src/directive.js',
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
          line: 19,
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
          line: 10,
          column: 22
        },
        end: {
          line: 12,
          column: 24
        }
      },
      '5': {
        start: {
          line: 14,
          column: 8
        },
        end: {
          line: 14,
          column: 91
        }
      },
      '6': {
        start: {
          line: 16,
          column: 8
        },
        end: {
          line: 16,
          column: 38
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
            line: 20,
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
            line: 17,
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
            column: 22
          },
          end: {
            line: 12,
            column: 24
          }
        },
        type: 'cond-expr',
        locations: [{
          start: {
            line: 11,
            column: 12
          },
          end: {
            line: 11,
            column: 42
          }
        }, {
          start: {
            line: 12,
            column: 12
          },
          end: {
            line: 12,
            column: 24
          }
        }],
        line: 10
      },
      '1': {
        loc: {
          start: {
            line: 12,
            column: 12
          },
          end: {
            line: 12,
            column: 24
          }
        },
        type: 'binary-expr',
        locations: [{
          start: {
            line: 12,
            column: 12
          },
          end: {
            line: 12,
            column: 18
          }
        }, {
          start: {
            line: 12,
            column: 22
          },
          end: {
            line: 12,
            column: 24
          }
        }],
        line: 12
      },
      '2': {
        loc: {
          start: {
            line: 14,
            column: 9
          },
          end: {
            line: 14,
            column: 56
          }
        },
        type: 'binary-expr',
        locations: [{
          start: {
            line: 14,
            column: 9
          },
          end: {
            line: 14,
            column: 27
          }
        }, {
          start: {
            line: 14,
            column: 32
          },
          end: {
            line: 14,
            column: 55
          }
        }],
        line: 14
      },
      '3': {
        loc: {
          start: {
            line: 14,
            column: 65
          },
          end: {
            line: 14,
            column: 90
          }
        },
        type: 'cond-expr',
        locations: [{
          start: {
            line: 14,
            column: 73
          },
          end: {
            line: 14,
            column: 78
          }
        }, {
          start: {
            line: 14,
            column: 81
          },
          end: {
            line: 14,
            column: 90
          }
        }],
        line: 14
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
      '0': [0, 0],
      '1': [0, 0],
      '2': [0, 0],
      '3': [0, 0]
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

var _ref = (cov_2cigiobflo.s[0]++, require('./util')),
    createDecorator = _ref.createDecorator,
    removeVueMethod = _ref.removeVueMethod;

function directive(target, key, descriptor) {
  cov_2cigiobflo.f[0]++;
  cov_2cigiobflo.s[1]++;

  return createDecorator(function (options, key) {
    cov_2cigiobflo.f[1]++;

    var handle = (cov_2cigiobflo.s[2]++, descriptor.value);
    var directive = (cov_2cigiobflo.s[3]++, {});

    var value = (cov_2cigiobflo.s[4]++, typeof handle === 'function' ? (cov_2cigiobflo.b[0][0]++, handle.call(target, directive)) : (cov_2cigiobflo.b[0][1]++, (cov_2cigiobflo.b[1][0]++, handle) || (cov_2cigiobflo.b[1][1]++, {})));

    cov_2cigiobflo.s[5]++;
    ((cov_2cigiobflo.b[2][0]++, options.directives) || (cov_2cigiobflo.b[2][1]++, options.directives = {}))[key] = value ? (cov_2cigiobflo.b[3][0]++, value) : (cov_2cigiobflo.b[3][1]++, directive);

    cov_2cigiobflo.s[6]++;
    removeVueMethod(options, key);
  })(target, key);
}
module.exports = exports['default'];