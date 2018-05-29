'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateDecorator = exports.error = exports.directive = exports.watch = exports.filter = exports.life = undefined;

var cov_1ezu3iywei = function () {
  var path = '/Users/shenyunjie/CodeBox/miox/src/miox-vue2x-classify/src/index.js',
      hash = 'e2a4b95180dbf254c25b8cb4ba65730f7b00e18d',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/Users/shenyunjie/CodeBox/miox/src/miox-vue2x-classify/src/index.js',
    statementMap: {
      '0': {
        start: {
          line: 3,
          column: 20
        },
        end: {
          line: 3,
          column: 37
        }
      },
      '1': {
        start: {
          line: 4,
          column: 22
        },
        end: {
          line: 4,
          column: 41
        }
      },
      '2': {
        start: {
          line: 5,
          column: 21
        },
        end: {
          line: 5,
          column: 39
        }
      },
      '3': {
        start: {
          line: 6,
          column: 25
        },
        end: {
          line: 6,
          column: 47
        }
      },
      '4': {
        start: {
          line: 7,
          column: 21
        },
        end: {
          line: 7,
          column: 39
        }
      },
      '5': {
        start: {
          line: 8,
          column: 31
        },
        end: {
          line: 8,
          column: 46
        }
      },
      '6': {
        start: {
          line: 10,
          column: 2
        },
        end: {
          line: 10,
          column: 63
        }
      },
      '7': {
        start: {
          line: 10,
          column: 37
        },
        end: {
          line: 10,
          column: 63
        }
      },
      '8': {
        start: {
          line: 11,
          column: 2
        },
        end: {
          line: 11,
          column: 46
        }
      },
      '9': {
        start: {
          line: 11,
          column: 19
        },
        end: {
          line: 11,
          column: 45
        }
      },
      '10': {
        start: {
          line: 14,
          column: 2
        },
        end: {
          line: 14,
          column: 27
        }
      }
    },
    fnMap: {
      '0': {
        name: 'Component',
        decl: {
          start: {
            line: 9,
            column: 16
          },
          end: {
            line: 9,
            column: 25
          }
        },
        loc: {
          start: {
            line: 9,
            column: 35
          },
          end: {
            line: 12,
            column: 1
          }
        },
        line: 9
      },
      '1': {
        name: '(anonymous_1)',
        decl: {
          start: {
            line: 11,
            column: 9
          },
          end: {
            line: 11,
            column: 10
          }
        },
        loc: {
          start: {
            line: 11,
            column: 19
          },
          end: {
            line: 11,
            column: 45
          }
        },
        line: 11
      },
      '2': {
        name: 'RegisterLifeCycle',
        decl: {
          start: {
            line: 13,
            column: 16
          },
          end: {
            line: 13,
            column: 33
          }
        },
        loc: {
          start: {
            line: 13,
            column: 43
          },
          end: {
            line: 15,
            column: 1
          }
        },
        line: 13
      }
    },
    branchMap: {
      '0': {
        loc: {
          start: {
            line: 10,
            column: 2
          },
          end: {
            line: 10,
            column: 63
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 10,
            column: 2
          },
          end: {
            line: 10,
            column: 63
          }
        }, {
          start: {
            line: 10,
            column: 2
          },
          end: {
            line: 10,
            column: 63
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
      '5': 0,
      '6': 0,
      '7': 0,
      '8': 0,
      '9': 0,
      '10': 0
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
}();

exports.Component = Component;
exports.RegisterLifeCycle = RegisterLifeCycle;

var _component = require('./component');

var _component2 = _interopRequireDefault(_component);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var life = exports.life = (cov_1ezu3iywei.s[0]++, require('./life'));
var filter = exports.filter = (cov_1ezu3iywei.s[1]++, require('./filter'));
var watch = exports.watch = (cov_1ezu3iywei.s[2]++, require('./watch'));
var directive = exports.directive = (cov_1ezu3iywei.s[3]++, require('./directive'));
var error = exports.error = (cov_1ezu3iywei.s[4]++, require('./error'));
var CreateDecorator = exports.CreateDecorator = (cov_1ezu3iywei.s[5]++, _util.createDecorator);
function Component(options) {
  cov_1ezu3iywei.f[0]++;
  cov_1ezu3iywei.s[6]++;

  if (typeof options === 'function') {
      cov_1ezu3iywei.b[0][0]++;
      cov_1ezu3iywei.s[7]++;
      return (0, _component2.default)(options);
    } else {
    cov_1ezu3iywei.b[0][1]++;
  }cov_1ezu3iywei.s[8]++;
  return function (target) {
    cov_1ezu3iywei.f[1]++;
    cov_1ezu3iywei.s[9]++;
    return (0, _component2.default)(target, options);
  };
}
function RegisterLifeCycle() {
  cov_1ezu3iywei.f[2]++;
  cov_1ezu3iywei.s[10]++;

  _util.lifeCycles.push.apply(_util.lifeCycles, arguments);
}