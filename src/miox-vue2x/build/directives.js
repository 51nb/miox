'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var cov_12fmn5hxpk = function () {
    var path = '/Users/shenyunjie/CodeBox/miox/src/miox-vue2x/src/directives.js',
        hash = 'b6037d7344a225253fca203244574fd8669a978d',
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
                    column: 4
                },
                end: {
                    line: 13,
                    column: 7
                }
            },
            '2': {
                start: {
                    line: 9,
                    column: 8
                },
                end: {
                    line: 12,
                    column: 9
                }
            },
            '3': {
                start: {
                    line: 10,
                    column: 12
                },
                end: {
                    line: 10,
                    column: 78
                }
            },
            '4': {
                start: {
                    line: 10,
                    column: 52
                },
                end: {
                    line: 10,
                    column: 77
                }
            },
            '5': {
                start: {
                    line: 11,
                    column: 12
                },
                end: {
                    line: 11,
                    column: 58
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
                        column: 29
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
                        column: 17
                    },
                    end: {
                        line: 8,
                        column: 18
                    }
                },
                loc: {
                    start: {
                        line: 8,
                        column: 24
                    },
                    end: {
                        line: 13,
                        column: 5
                    }
                },
                line: 8
            },
            '2': {
                name: '(anonymous_2)',
                decl: {
                    start: {
                        line: 10,
                        column: 39
                    },
                    end: {
                        line: 10,
                        column: 40
                    }
                },
                loc: {
                    start: {
                        line: 10,
                        column: 52
                    },
                    end: {
                        line: 10,
                        column: 77
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
                        column: 8
                    },
                    end: {
                        line: 12,
                        column: 9
                    }
                },
                type: 'if',
                locations: [{
                    start: {
                        line: 9,
                        column: 8
                    },
                    end: {
                        line: 12,
                        column: 9
                    }
                }, {
                    start: {
                        line: 9,
                        column: 8
                    },
                    end: {
                        line: 12,
                        column: 9
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
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }

                cov_12fmn5hxpk.f[2]++;
                cov_12fmn5hxpk.s[4]++;
                return ctx[key].apply(ctx, args);
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
    var options = {};
    options.bind = function (el, binding) {
        el.addEventListener('click', binding.__redirectInjector__ = function () {
            var modifiers = binding.modifiers || {};
            var options = {};
            binding.realValue = binding.value;

            if (ctx.history.url === binding.realValue) return;

            if (modifiers.argument) {
                options.animate = modifiers.argument;
            }

            if (modifiers.alone) {
                options.cache = false;
            }

            if (typeof ctx[key] === 'function') {
                ctx[key](binding.realValue, options);
            }
        });
    };

    options.unbind = function (el, binding) {
        if (binding.__redirectInjector__) {
            el.removeEventListener('click', binding.__redirectInjector__);
        }
    };

    options.componentUpdated = function (el, binding) {
        binding.realValue = binding.value;
    };

    return options;
}
module.exports = exports['default'];