'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var cov_7kzv1uvyo = function () {
  var path = '/Users/shenyunjie/CodeBox/miox/src/miox/src/lib/plugin.js',
      hash = 'fccb13466aae58189cb4627520fd87198a6c3379',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/Users/shenyunjie/CodeBox/miox/src/miox/src/lib/plugin.js',
    statementMap: {
      '0': {
        start: {
          line: 9,
          column: 4
        },
        end: {
          line: 9,
          column: 12
        }
      },
      '1': {
        start: {
          line: 10,
          column: 4
        },
        end: {
          line: 10,
          column: 27
        }
      },
      '2': {
        start: {
          line: 15,
          column: 4
        },
        end: {
          line: 17,
          column: 5
        }
      },
      '3': {
        start: {
          line: 18,
          column: 19
        },
        end: {
          line: 18,
          column: 42
        }
      },
      '4': {
        start: {
          line: 19,
          column: 4
        },
        end: {
          line: 21,
          column: 5
        }
      },
      '5': {
        start: {
          line: 20,
          column: 6
        },
        end: {
          line: 20,
          column: 23
        }
      },
      '6': {
        start: {
          line: 22,
          column: 4
        },
        end: {
          line: 22,
          column: 31
        }
      },
      '7': {
        start: {
          line: 26,
          column: 20
        },
        end: {
          line: 26,
          column: 39
        }
      },
      '8': {
        start: {
          line: 27,
          column: 4
        },
        end: {
          line: 27,
          column: 33
        }
      }
    },
    fnMap: {
      '0': {
        name: '(anonymous_0)',
        decl: {
          start: {
            line: 8,
            column: 2
          },
          end: {
            line: 8,
            column: 3
          }
        },
        loc: {
          start: {
            line: 8,
            column: 23
          },
          end: {
            line: 11,
            column: 3
          }
        },
        line: 8
      },
      '1': {
        name: '(anonymous_1)',
        decl: {
          start: {
            line: 13,
            column: 2
          },
          end: {
            line: 13,
            column: 3
          }
        },
        loc: {
          start: {
            line: 13,
            column: 16
          },
          end: {
            line: 23,
            column: 3
          }
        },
        line: 13
      },
      '2': {
        name: '(anonymous_2)',
        decl: {
          start: {
            line: 25,
            column: 2
          },
          end: {
            line: 25,
            column: 3
          }
        },
        loc: {
          start: {
            line: 25,
            column: 17
          },
          end: {
            line: 28,
            column: 3
          }
        },
        line: 25
      }
    },
    branchMap: {
      '0': {
        loc: {
          start: {
            line: 15,
            column: 4
          },
          end: {
            line: 17,
            column: 5
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 15,
            column: 4
          },
          end: {
            line: 17,
            column: 5
          }
        }],
        line: 15
      },
      '1': {
        loc: {
          start: {
            line: 15,
            column: 8
          },
          end: {
            line: 15,
            column: 54
          }
        },
        type: 'binary-expr',
        locations: [{
          start: {
            line: 15,
            column: 8
          },
          end: {
            line: 15,
            column: 35
          }
        }, {
          start: {
            line: 15,
            column: 39
          },
          end: {
            line: 15,
            column: 54
          }
        }],
        line: 15
      },
      '2': {
        loc: {
          start: {
            line: 19,
            column: 4
          },
          end: {
            line: 21,
            column: 5
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 19,
            column: 4
          },
          end: {
            line: 21,
            column: 5
          }
        }, {
          start: {
            line: 19,
            column: 4
          },
          end: {
            line: 21,
            column: 5
          }
        }],
        line: 19
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
      '8': 0
    },
    f: {
      '0': 0,
      '1': 0,
      '2': 0
    },
    b: {
      '0': [0],
      '1': [0, 0],
      '2': [0, 0]
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
      * Created by evio on 2017/8/29.
      */


var _dictionary = require('../miox_modules/dictionary');

var _dictionary2 = _interopRequireDefault(_dictionary);

var _isClass = require('is-class');

var _isClass2 = _interopRequireDefault(_isClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Plugin = function (_Dictionary) {
  (0, _inherits3.default)(Plugin, _Dictionary);

  function Plugin(context) {
    (0, _classCallCheck3.default)(this, Plugin);
    cov_7kzv1uvyo.f[0]++;
    cov_7kzv1uvyo.s[0]++;

    var _this = (0, _possibleConstructorReturn3.default)(this, (Plugin.__proto__ || Object.getPrototypeOf(Plugin)).call(this));

    cov_7kzv1uvyo.s[1]++;

    _this.context = context;
    return _this;
  }

  (0, _createClass3.default)(Plugin, [{
    key: 'Engine',
    value: function Engine(value) {
      cov_7kzv1uvyo.f[1]++;
      cov_7kzv1uvyo.s[2]++;

      /* istanbul ignore if */
      if ((cov_7kzv1uvyo.b[1][0]++, typeof value !== 'function') && (cov_7kzv1uvyo.b[1][1]++, !(0, _isClass2.default)(value))) {
        throw new Error('Engine must be a function or a class');
      } else {
        cov_7kzv1uvyo.b[0][0]++;
      }
      var engine = (cov_7kzv1uvyo.s[3]++, new value(this.context));
      cov_7kzv1uvyo.s[4]++;
      if (typeof engine.install === 'function') {
        cov_7kzv1uvyo.b[2][0]++;
        cov_7kzv1uvyo.s[5]++;

        engine.install();
      } else {
        cov_7kzv1uvyo.b[2][1]++;
      }
      cov_7kzv1uvyo.s[6]++;
      this.set('engine', engine);
    }
  }, {
    key: 'Animate',
    value: function Animate(value) {
      cov_7kzv1uvyo.f[2]++;

      var animate = (cov_7kzv1uvyo.s[7]++, value(this.context));
      cov_7kzv1uvyo.s[8]++;
      this.set('animate', animate);
    }
  }]);
  return Plugin;
}(_dictionary2.default);

exports.default = Plugin;
module.exports = exports['default'];