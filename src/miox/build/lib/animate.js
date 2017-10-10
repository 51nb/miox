'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var cov_18qlczv4x0 = function () {
  var path = '/Users/shenyunjie/CodeBox/miox/src/miox/src/lib/animate.js',
      hash = '9424503d11057d8ec3de179b971f5e995af731cc',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/Users/shenyunjie/CodeBox/miox/src/miox/src/lib/animate.js',
    statementMap: {
      '0': {
        start: {
          line: 5,
          column: 18
        },
        end: {
          line: 5,
          column: 43
        }
      },
      '1': {
        start: {
          line: 7,
          column: 2
        },
        end: {
          line: 9,
          column: 3
        }
      },
      '2': {
        start: {
          line: 8,
          column: 4
        },
        end: {
          line: 8,
          column: 40
        }
      },
      '3': {
        start: {
          line: 10,
          column: 2
        },
        end: {
          line: 12,
          column: 3
        }
      },
      '4': {
        start: {
          line: 11,
          column: 4
        },
        end: {
          line: 11,
          column: 37
        }
      },
      '5': {
        start: {
          line: 14,
          column: 2
        },
        end: {
          line: 19,
          column: 3
        }
      },
      '6': {
        start: {
          line: 15,
          column: 4
        },
        end: {
          line: 18,
          column: 7
        }
      }
    },
    fnMap: {
      '0': {
        name: 'renderWebViewWithAnimate',
        decl: {
          start: {
            line: 4,
            column: 30
          },
          end: {
            line: 4,
            column: 54
          }
        },
        loc: {
          start: {
            line: 4,
            column: 80
          },
          end: {
            line: 20,
            column: 1
          }
        },
        line: 4
      }
    },
    branchMap: {
      '0': {
        loc: {
          start: {
            line: 7,
            column: 2
          },
          end: {
            line: 9,
            column: 3
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 7,
            column: 2
          },
          end: {
            line: 9,
            column: 3
          }
        }, {
          start: {
            line: 7,
            column: 2
          },
          end: {
            line: 9,
            column: 3
          }
        }],
        line: 7
      },
      '1': {
        loc: {
          start: {
            line: 10,
            column: 2
          },
          end: {
            line: 12,
            column: 3
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 10,
            column: 2
          },
          end: {
            line: 12,
            column: 3
          }
        }, {
          start: {
            line: 10,
            column: 2
          },
          end: {
            line: 12,
            column: 3
          }
        }],
        line: 10
      },
      '2': {
        loc: {
          start: {
            line: 14,
            column: 2
          },
          end: {
            line: 19,
            column: 3
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 14,
            column: 2
          },
          end: {
            line: 19,
            column: 3
          }
        }, {
          start: {
            line: 14,
            column: 2
          },
          end: {
            line: 19,
            column: 3
          }
        }],
        line: 14
      },
      '3': {
        loc: {
          start: {
            line: 14,
            column: 6
          },
          end: {
            line: 14,
            column: 53
          }
        },
        type: 'binary-expr',
        locations: [{
          start: {
            line: 14,
            column: 6
          },
          end: {
            line: 14,
            column: 13
          }
        }, {
          start: {
            line: 14,
            column: 17
          },
          end: {
            line: 14,
            column: 30
          }
        }, {
          start: {
            line: 14,
            column: 34
          },
          end: {
            line: 14,
            column: 53
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
      '0': 0
    },
    b: {
      '0': [0, 0],
      '1': [0, 0],
      '2': [0, 0],
      '3': [0, 0, 0]
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by evio on 2017/8/30.
 */
exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(app, prevNode, nextNode) {
    var animate;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            cov_18qlczv4x0.f[0]++;
            animate = (cov_18qlczv4x0.s[0]++, app.plugin.get('animate'));
            cov_18qlczv4x0.s[1]++;


            if (prevNode) {
              cov_18qlczv4x0.b[0][0]++;
              cov_18qlczv4x0.s[2]++;

              prevNode.classList.remove('active');
            } else {
              cov_18qlczv4x0.b[0][1]++;
            }
            cov_18qlczv4x0.s[3]++;
            if (nextNode) {
              cov_18qlczv4x0.b[1][0]++;
              cov_18qlczv4x0.s[4]++;

              nextNode.classList.add('active');
            } else {
              cov_18qlczv4x0.b[1][1]++;
            }

            cov_18qlczv4x0.s[5]++;

            if (!((cov_18qlczv4x0.b[3][0]++, animate) && (cov_18qlczv4x0.b[3][1]++, app.installed) && (cov_18qlczv4x0.b[3][2]++, app.history.session))) {
              _context.next = 14;
              break;
            }

            cov_18qlczv4x0.b[2][0]++;
            cov_18qlczv4x0.s[6]++;
            _context.next = 12;
            return Promise.all([animate.leave(prevNode), animate.enter(nextNode)]);

          case 12:
            _context.next = 15;
            break;

          case 14:
            cov_18qlczv4x0.b[2][1]++;

          case 15:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function renderWebViewWithAnimate(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  }

  return renderWebViewWithAnimate;
}();

module.exports = exports['default'];