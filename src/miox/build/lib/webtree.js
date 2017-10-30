'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var cov_1q6dlpm8ub = function () {
  var path = '/Users/shenyunjie/CodeBox/miox/src/miox/src/lib/webtree.js',
      hash = '54948ebb242c232bc9fc775533fd39d7dbf942bc',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/Users/shenyunjie/CodeBox/miox/src/miox/src/lib/webtree.js',
    statementMap: {
      '0': {
        start: {
          line: 8,
          column: 2
        },
        end: {
          line: 12,
          column: 5
        }
      },
      '1': {
        start: {
          line: 10,
          column: 6
        },
        end: {
          line: 10,
          column: 23
        }
      },
      '2': {
        start: {
          line: 14,
          column: 2
        },
        end: {
          line: 29,
          column: 3
        }
      },
      '3': {
        start: {
          line: 16,
          column: 6
        },
        end: {
          line: 16,
          column: 69
        }
      },
      '4': {
        start: {
          line: 17,
          column: 6
        },
        end: {
          line: 17,
          column: 12
        }
      },
      '5': {
        start: {
          line: 19,
          column: 22
        },
        end: {
          line: 19,
          column: 42
        }
      },
      '6': {
        start: {
          line: 20,
          column: 19
        },
        end: {
          line: 20,
          column: 55
        }
      },
      '7': {
        start: {
          line: 21,
          column: 6
        },
        end: {
          line: 21,
          column: 55
        }
      },
      '8': {
        start: {
          line: 23,
          column: 6
        },
        end: {
          line: 23,
          column: 32
        }
      },
      '9': {
        start: {
          line: 24,
          column: 6
        },
        end: {
          line: 24,
          column: 34
        }
      },
      '10': {
        start: {
          line: 26,
          column: 6
        },
        end: {
          line: 26,
          column: 35
        }
      },
      '11': {
        start: {
          line: 27,
          column: 6
        },
        end: {
          line: 27,
          column: 45
        }
      },
      '12': {
        start: {
          line: 28,
          column: 6
        },
        end: {
          line: 28,
          column: 12
        }
      }
    },
    fnMap: {
      '0': {
        name: '(anonymous_0)',
        decl: {
          start: {
            line: 5,
            column: 15
          },
          end: {
            line: 5,
            column: 16
          }
        },
        loc: {
          start: {
            line: 5,
            column: 22
          },
          end: {
            line: 30,
            column: 1
          }
        },
        line: 5
      }
    },
    branchMap: {
      '0': {
        loc: {
          start: {
            line: 14,
            column: 2
          },
          end: {
            line: 29,
            column: 3
          }
        },
        type: 'switch',
        locations: [{
          start: {
            line: 15,
            column: 4
          },
          end: {
            line: 17,
            column: 12
          }
        }, {
          start: {
            line: 18,
            column: 4
          },
          end: {
            line: 28,
            column: 12
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
      '6': 0,
      '7': 0,
      '8': 0,
      '9': 0,
      '10': 0,
      '11': 0,
      '12': 0
    },
    f: {
      '0': 0
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

/**
 * Created by evio on 2017/8/29.
 */

exports.default = function (ctx) {
  cov_1q6dlpm8ub.f[0]++;

  var container = void 0;

  cov_1q6dlpm8ub.s[0]++;
  Object.defineProperty(ctx, 'element', {
    get: function get() {
      cov_1q6dlpm8ub.s[1]++;

      return container;
    }
  });

  cov_1q6dlpm8ub.s[2]++;
  switch (ctx.env) {
    case 'client':
      cov_1q6dlpm8ub.b[0][0]++;
      cov_1q6dlpm8ub.s[3]++;

      container = ctx.get('container').querySelector('.mx-webviews');
      cov_1q6dlpm8ub.s[4]++;
      break;
    case 'web':
      cov_1q6dlpm8ub.b[0][1]++;

      var element = (cov_1q6dlpm8ub.s[5]++, ctx.get('container'));
      var root = (cov_1q6dlpm8ub.s[6]++, global.document.createElement('div'));
      cov_1q6dlpm8ub.s[7]++;
      container = global.document.createElement('div');

      cov_1q6dlpm8ub.s[8]++;
      element.appendChild(root);
      cov_1q6dlpm8ub.s[9]++;
      root.appendChild(container);

      cov_1q6dlpm8ub.s[10]++;
      root.classList.add('mx-app');
      cov_1q6dlpm8ub.s[11]++;
      container.classList.add('mx-webviews');
      cov_1q6dlpm8ub.s[12]++;
      break;
  }
};

module.exports = exports['default'];