'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var cov_12fmn5hxpk = function () {
  var path = '/Users/shenyunjie/CodeBox/miox/src/miox-vue2x/src/directives.js',
      hash = '2ac62fc472d5d5434851fa4b67daf4f4439107ca',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/Users/shenyunjie/CodeBox/miox/src/miox-vue2x/src/directives.js',
    statementMap: {
      '0': {
        start: {
          line: 5,
          column: 13
        },
        end: {
          line: 5,
          column: 58
        }
      },
      '1': {
        start: {
          line: 8,
          column: 2
        },
        end: {
          line: 13,
          column: 5
        }
      },
      '2': {
        start: {
          line: 9,
          column: 4
        },
        end: {
          line: 12,
          column: 5
        }
      },
      '3': {
        start: {
          line: 10,
          column: 6
        },
        end: {
          line: 10,
          column: 64
        }
      },
      '4': {
        start: {
          line: 10,
          column: 46
        },
        end: {
          line: 10,
          column: 63
        }
      },
      '5': {
        start: {
          line: 11,
          column: 6
        },
        end: {
          line: 11,
          column: 52
        }
      }
    },
    fnMap: {
      '0': {
        name: '(anonymous_0)',
        decl: {
          start: {
            line: 7,
            column: 15
          },
          end: {
            line: 7,
            column: 16
          }
        },
        loc: {
          start: {
            line: 7,
            column: 30
          },
          end: {
            line: 14,
            column: 1
          }
        },
        line: 7
      },
      '1': {
        name: '(anonymous_1)',
        decl: {
          start: {
            line: 8,
            column: 15
          },
          end: {
            line: 8,
            column: 16
          }
        },
        loc: {
          start: {
            line: 8,
            column: 22
          },
          end: {
            line: 13,
            column: 3
          }
        },
        line: 8
      },
      '2': {
        name: '(anonymous_2)',
        decl: {
          start: {
            line: 10,
            column: 33
          },
          end: {
            line: 10,
            column: 34
          }
        },
        loc: {
          start: {
            line: 10,
            column: 46
          },
          end: {
            line: 10,
            column: 63
          }
        },
        line: 10
      }
    },
    branchMap: {
      '0': {
        loc: {
          start: {
            line: 9,
            column: 4
          },
          end: {
            line: 12,
            column: 5
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 9,
            column: 4
          },
          end: {
            line: 12,
            column: 5
          }
        }, {
          start: {
            line: 9,
            column: 4
          },
          end: {
            line: 12,
            column: 5
          }
        }],
        line: 9
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
      '1': 0,
      '2': 0
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
}(); /**
      * Created by evio on 2017/3/22.
      */


exports.default = function (ctx) {
  cov_12fmn5hxpk.f[0]++;
  cov_12fmn5hxpk.s[1]++;

  keys.forEach(function (key) {
    cov_12fmn5hxpk.f[1]++;
    cov_12fmn5hxpk.s[2]++;

    if (typeof ctx[key] === 'function') {
      cov_12fmn5hxpk.b[0][0]++;
      cov_12fmn5hxpk.s[3]++;

      _vue2.default.prototype['$' + key] = function () {
        cov_12fmn5hxpk.f[2]++;
        cov_12fmn5hxpk.s[4]++;
        return ctx[key].apply(ctx, arguments);
      };
      cov_12fmn5hxpk.s[5]++;
      _vue2.default.directive(key, historyRedirect(ctx, key));
    } else {
      cov_12fmn5hxpk.b[0][1]++;
    }
  });
};

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var keys = (cov_12fmn5hxpk.s[0]++, ['push', 'go', 'replace', 'redirect', 'link']);

/* istanbul ignore next */
function historyRedirect(ctx, key) {
  return {
    bind: function bind(el, binding) {
      el.addEventListener('click', binding.__redirectInjector__ = bindDirectiveAction(ctx, key, binding));
    },
    unbind: function unbind(el, binding) {
      if (binding.__redirectInjector__) {
        el.removeEventListener('click', binding.__redirectInjector__);
      }
    }
  };
}

/* istanbul ignore next */
function bindDirectiveAction(ctx, key, binding) {
  return function () {
    if (ctx.req.href === binding.value) return;
    if (/^http(s?)\:\/\//i.test(binding.value)) return ctx.link(binding.value);
    ctx[key](binding.value, binding.arg);
  };
}
module.exports = exports['default'];