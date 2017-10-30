'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.error = exports.directive = exports.watch = exports.filter = exports.life = exports.lifeCycles = exports.createDecorator = undefined;

var cov_79lw9isrg = function () {
  var path = '/Users/shenyunjie/CodeBox/miox/src/miox-vue2x-component-classify/src/index.js',
      hash = '86a4d285b8e6d15445cca96a66e20bc1066da27b',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/Users/shenyunjie/CodeBox/miox/src/miox-vue2x-component-classify/src/index.js',
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
          line: 9,
          column: 2
        },
        end: {
          line: 9,
          column: 63
        }
      },
      '6': {
        start: {
          line: 9,
          column: 37
        },
        end: {
          line: 9,
          column: 63
        }
      },
      '7': {
        start: {
          line: 10,
          column: 2
        },
        end: {
          line: 10,
          column: 46
        }
      },
      '8': {
        start: {
          line: 10,
          column: 19
        },
        end: {
          line: 10,
          column: 45
        }
      },
      '9': {
        start: {
          line: 13,
          column: 2
        },
        end: {
          line: 13,
          column: 27
        }
      }
    },
    fnMap: {
      '0': {
        name: 'Component',
        decl: {
          start: {
            line: 8,
            column: 16
          },
          end: {
            line: 8,
            column: 25
          }
        },
        loc: {
          start: {
            line: 8,
            column: 35
          },
          end: {
            line: 11,
            column: 1
          }
        },
        line: 8
      },
      '1': {
        name: '(anonymous_1)',
        decl: {
          start: {
            line: 10,
            column: 9
          },
          end: {
            line: 10,
            column: 10
          }
        },
        loc: {
          start: {
            line: 10,
            column: 19
          },
          end: {
            line: 10,
            column: 45
          }
        },
        line: 10
      },
      '2': {
        name: 'registerLifeCycle',
        decl: {
          start: {
            line: 12,
            column: 16
          },
          end: {
            line: 12,
            column: 33
          }
        },
        loc: {
          start: {
            line: 12,
            column: 43
          },
          end: {
            line: 14,
            column: 1
          }
        },
        line: 12
      }
    },
    branchMap: {
      '0': {
        loc: {
          start: {
            line: 9,
            column: 2
          },
          end: {
            line: 9,
            column: 63
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 9,
            column: 2
          },
          end: {
            line: 9,
            column: 63
          }
        }, {
          start: {
            line: 9,
            column: 2
          },
          end: {
            line: 9,
            column: 63
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
      '5': 0,
      '6': 0,
      '7': 0,
      '8': 0,
      '9': 0
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

var _util = require('./util');

Object.defineProperty(exports, 'createDecorator', {
  enumerable: true,
  get: function get() {
    return _util.createDecorator;
  }
});
Object.defineProperty(exports, 'lifeCycles', {
  enumerable: true,
  get: function get() {
    return _util.lifeCycles;
  }
});
exports.Component = Component;
exports.registerLifeCycle = registerLifeCycle;

var _component = require('./component');

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var life = exports.life = (cov_79lw9isrg.s[0]++, require('./life'));
var filter = exports.filter = (cov_79lw9isrg.s[1]++, require('./filter'));
var watch = exports.watch = (cov_79lw9isrg.s[2]++, require('./watch'));
var directive = exports.directive = (cov_79lw9isrg.s[3]++, require('./directive'));
var error = exports.error = (cov_79lw9isrg.s[4]++, require('./error'));
function Component(options) {
  cov_79lw9isrg.f[0]++;
  cov_79lw9isrg.s[5]++;

  if (typeof options === 'function') {
      cov_79lw9isrg.b[0][0]++;
      cov_79lw9isrg.s[6]++;
      return (0, _component2.default)(options);
    } else {
    cov_79lw9isrg.b[0][1]++;
  }cov_79lw9isrg.s[7]++;
  return function (target) {
    cov_79lw9isrg.f[1]++;
    cov_79lw9isrg.s[8]++;
    return (0, _component2.default)(target, options);
  };
}
function registerLifeCycle() {
  var _lifeCycles;

  cov_79lw9isrg.f[2]++;
  cov_79lw9isrg.s[9]++;

  (_lifeCycles = lifeCycles).push.apply(_lifeCycles, arguments);
}