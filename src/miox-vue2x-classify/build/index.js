'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.filter = exports.watch = exports.life = exports.prop = exports.getComponentProperties = exports.removeMethodFromComponent = exports.createDecorator = undefined;

var cov_1ezu3iywei = function () {
    var path = '/Users/shenyunjie/CodeBox/miox/src/miox-vue2x-classify/src/index.js',
        hash = '1ccf00fdf6fce0fce001a4ce934fc9e620f57a44',
        global = new Function('return this')(),
        gcv = '__coverage__',
        coverageData = {
        path: '/Users/shenyunjie/CodeBox/miox/src/miox-vue2x-classify/src/index.js',
        statementMap: {
            '0': {
                start: {
                    line: 14,
                    column: 4
                },
                end: {
                    line: 16,
                    column: 5
                }
            },
            '1': {
                start: {
                    line: 15,
                    column: 8
                },
                end: {
                    line: 15,
                    column: 41
                }
            },
            '2': {
                start: {
                    line: 17,
                    column: 4
                },
                end: {
                    line: 19,
                    column: 6
                }
            },
            '3': {
                start: {
                    line: 18,
                    column: 8
                },
                end: {
                    line: 18,
                    column: 52
                }
            }
        },
        fnMap: {
            '0': {
                name: 'Component',
                decl: {
                    start: {
                        line: 13,
                        column: 16
                    },
                    end: {
                        line: 13,
                        column: 25
                    }
                },
                loc: {
                    start: {
                        line: 13,
                        column: 35
                    },
                    end: {
                        line: 20,
                        column: 1
                    }
                },
                line: 13
            },
            '1': {
                name: '(anonymous_1)',
                decl: {
                    start: {
                        line: 17,
                        column: 11
                    },
                    end: {
                        line: 17,
                        column: 12
                    }
                },
                loc: {
                    start: {
                        line: 17,
                        column: 32
                    },
                    end: {
                        line: 19,
                        column: 5
                    }
                },
                line: 17
            }
        },
        branchMap: {
            '0': {
                loc: {
                    start: {
                        line: 14,
                        column: 4
                    },
                    end: {
                        line: 16,
                        column: 5
                    }
                },
                type: 'if',
                locations: [{
                    start: {
                        line: 14,
                        column: 4
                    },
                    end: {
                        line: 16,
                        column: 5
                    }
                }, {
                    start: {
                        line: 14,
                        column: 4
                    },
                    end: {
                        line: 16,
                        column: 5
                    }
                }],
                line: 14
            }
        },
        s: {
            '0': 0,
            '1': 0,
            '2': 0,
            '3': 0
        },
        f: {
            '0': 0,
            '1': 0
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
      * Created by evio on 2016/11/23.
      */

var _util = require('./instance/util');

Object.defineProperty(exports, 'createDecorator', {
    enumerable: true,
    get: function get() {
        return _util.createDecorator;
    }
});
Object.defineProperty(exports, 'removeMethodFromComponent', {
    enumerable: true,
    get: function get() {
        return _util.removeMethodFromComponent;
    }
});
Object.defineProperty(exports, 'getComponentProperties', {
    enumerable: true,
    get: function get() {
        return _util.getComponentProperties;
    }
});
exports.Component = Component;

var _component = require('./instance/component');

var _prop2 = require('./instance/prop');

var _prop3 = _interopRequireDefault(_prop2);

var _life2 = require('./instance/life');

var _life3 = _interopRequireDefault(_life2);

var _watch2 = require('./instance/watch');

var _watch3 = _interopRequireDefault(_watch2);

var _filter2 = require('./instance/filter');

var _filter3 = _interopRequireDefault(_filter2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.prop = _prop3.default;
exports.life = _life3.default;
exports.watch = _watch3.default;
exports.filter = _filter3.default;
function Component(options) {
    cov_1ezu3iywei.f[0]++;
    cov_1ezu3iywei.s[0]++;

    if (typeof options === 'function') {
        cov_1ezu3iywei.b[0][0]++;
        cov_1ezu3iywei.s[1]++;

        return (0, _component.componentFactory)(options);
    } else {
        cov_1ezu3iywei.b[0][1]++;
    }
    cov_1ezu3iywei.s[2]++;
    return function (Component) {
        cov_1ezu3iywei.f[1]++;
        cov_1ezu3iywei.s[3]++;

        return (0, _component.componentFactory)(Component, options);
    };
}