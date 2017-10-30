'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var cov_w88djvc8y = function () {
  var path = '/Users/shenyunjie/CodeBox/miox/src/miox-vue2x/src/webview.js',
      hash = '9df0fe8e1baee86b41ef58bdc2a2566dd2a6d268',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/Users/shenyunjie/CodeBox/miox/src/miox-vue2x/src/webview.js',
    statementMap: {
      '0': {
        start: {
          line: 7,
          column: 4
        },
        end: {
          line: 7,
          column: 50
        }
      },
      '1': {
        start: {
          line: 11,
          column: 4
        },
        end: {
          line: 14,
          column: 7
        }
      },
      '2': {
        start: {
          line: 12,
          column: 6
        },
        end: {
          line: 12,
          column: 36
        }
      },
      '3': {
        start: {
          line: 13,
          column: 6
        },
        end: {
          line: 13,
          column: 47
        }
      },
      '4': {
        start: {
          line: 18,
          column: 4
        },
        end: {
          line: 18,
          column: 49
        }
      },
      '5': {
        start: {
          line: 22,
          column: 4
        },
        end: {
          line: 22,
          column: 53
        }
      },
      '6': {
        start: {
          line: 23,
          column: 4
        },
        end: {
          line: 26,
          column: 7
        }
      },
      '7': {
        start: {
          line: 24,
          column: 6
        },
        end: {
          line: 24,
          column: 36
        }
      },
      '8': {
        start: {
          line: 25,
          column: 6
        },
        end: {
          line: 25,
          column: 47
        }
      },
      '9': {
        start: {
          line: 30,
          column: 4
        },
        end: {
          line: 30,
          column: 50
        }
      },
      '10': {
        start: {
          line: 34,
          column: 4
        },
        end: {
          line: 34,
          column: 45
        }
      },
      '11': {
        start: {
          line: 38,
          column: 4
        },
        end: {
          line: 38,
          column: 47
        }
      },
      '12': {
        start: {
          line: 42,
          column: 4
        },
        end: {
          line: 42,
          column: 49
        }
      },
      '13': {
        start: {
          line: 46,
          column: 4
        },
        end: {
          line: 46,
          column: 51
        }
      },
      '14': {
        start: {
          line: 50,
          column: 4
        },
        end: {
          line: 52,
          column: 5
        }
      },
      '15': {
        start: {
          line: 51,
          column: 6
        },
        end: {
          line: 51,
          column: 84
        }
      },
      '16': {
        start: {
          line: 53,
          column: 4
        },
        end: {
          line: 53,
          column: 47
        }
      }
    },
    fnMap: {
      '0': {
        name: '(anonymous_0)',
        decl: {
          start: {
            line: 11,
            column: 19
          },
          end: {
            line: 11,
            column: 20
          }
        },
        loc: {
          start: {
            line: 11,
            column: 25
          },
          end: {
            line: 14,
            column: 5
          }
        },
        line: 11
      },
      '1': {
        name: '(anonymous_1)',
        decl: {
          start: {
            line: 23,
            column: 19
          },
          end: {
            line: 23,
            column: 20
          }
        },
        loc: {
          start: {
            line: 23,
            column: 25
          },
          end: {
            line: 26,
            column: 5
          }
        },
        line: 23
      }
    },
    branchMap: {
      '0': {
        loc: {
          start: {
            line: 50,
            column: 4
          },
          end: {
            line: 52,
            column: 5
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 50,
            column: 4
          },
          end: {
            line: 52,
            column: 5
          }
        }, {
          start: {
            line: 50,
            column: 4
          },
          end: {
            line: 52,
            column: 5
          }
        }],
        line: 50
      },
      '1': {
        loc: {
          start: {
            line: 50,
            column: 8
          },
          end: {
            line: 50,
            column: 75
          }
        },
        type: 'binary-expr',
        locations: [{
          start: {
            line: 50,
            column: 8
          },
          end: {
            line: 50,
            column: 34
          }
        }, {
          start: {
            line: 50,
            column: 38
          },
          end: {
            line: 50,
            column: 75
          }
        }],
        line: 50
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
      '12': 0,
      '13': 0,
      '14': 0,
      '15': 0,
      '16': 0
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

/**
 * Created by evio on 16/10/26.
 */

exports.default = {
  beforeCreate: function beforeCreate() {
    cov_w88djvc8y.s[0]++;

    this.$miox.emit('webview:beforeCreate', this);
  },
  created: function created() {
    var _this = this;

    cov_w88djvc8y.s[1]++;

    this.$nextTick(function () {
      cov_w88djvc8y.f[0]++;
      cov_w88djvc8y.s[2]++;

      _this.$emit('webview:created');
      cov_w88djvc8y.s[3]++;
      _this.$miox.emit('webview:created', _this);
    });
  },
  beforeMount: function beforeMount() {
    cov_w88djvc8y.s[4]++;

    this.$miox.emit('webview:beforeMount', this);
  },
  mounted: function mounted() {
    var _this2 = this;

    cov_w88djvc8y.s[5]++;

    this.__MioxInjectElement__ = this.$el.parentNode;
    cov_w88djvc8y.s[6]++;
    this.$nextTick(function () {
      cov_w88djvc8y.f[1]++;
      cov_w88djvc8y.s[7]++;

      _this2.$emit('webview:mounted');
      cov_w88djvc8y.s[8]++;
      _this2.$miox.emit('webview:mounted', _this2);
    });
  },
  beforeUpdate: function beforeUpdate() {
    cov_w88djvc8y.s[9]++;

    this.$miox.emit('webview:beforeUpdate', this);
  },
  updated: function updated() {
    cov_w88djvc8y.s[10]++;

    this.$miox.emit('webview:updated', this);
  },
  activated: function activated() {
    cov_w88djvc8y.s[11]++;

    this.$miox.emit('webview:activated', this);
  },
  deactivated: function deactivated() {
    cov_w88djvc8y.s[12]++;

    this.$miox.emit('webview:deactivated', this);
  },
  beforeDestroy: function beforeDestroy() {
    cov_w88djvc8y.s[13]++;

    this.$miox.emit('webview:beforeDestroy', this);
  },
  destroyed: function destroyed() {
    cov_w88djvc8y.s[14]++;

    if ((cov_w88djvc8y.b[1][0]++, this.__MioxInjectElement__) && (cov_w88djvc8y.b[1][1]++, this.__MioxInjectElement__.parentNode)) {
      cov_w88djvc8y.b[0][0]++;
      cov_w88djvc8y.s[15]++;

      this.__MioxInjectElement__.parentNode.removeChild(this.__MioxInjectElement__);
    } else {
      cov_w88djvc8y.b[0][1]++;
    }
    cov_w88djvc8y.s[16]++;
    this.$miox.emit('webview:destroyed', this);
  }
};
module.exports = exports['default'];