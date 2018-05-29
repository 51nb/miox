'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var cov_sqjfat4e1 = function () {
    var path = '/Users/shenyunjie/CodeBox/miox/src/miox-animation/src/index.js',
        hash = '59d497fcfb87e905741fe6af0a52092da1d8e3ae',
        global = new Function('return this')(),
        gcv = '__coverage__',
        coverageData = {
        path: '/Users/shenyunjie/CodeBox/miox/src/miox-animation/src/index.js',
        statementMap: {
            '0': {
                start: {
                    line: 5,
                    column: 4
                },
                end: {
                    line: 5,
                    column: 68
                }
            },
            '1': {
                start: {
                    line: 5,
                    column: 18
                },
                end: {
                    line: 5,
                    column: 67
                }
            },
            '2': {
                start: {
                    line: 5,
                    column: 44
                },
                end: {
                    line: 5,
                    column: 66
                }
            }
        },
        fnMap: {
            '0': {
                name: 'Animater',
                decl: {
                    start: {
                        line: 4,
                        column: 24
                    },
                    end: {
                        line: 4,
                        column: 32
                    }
                },
                loc: {
                    start: {
                        line: 4,
                        column: 39
                    },
                    end: {
                        line: 6,
                        column: 1
                    }
                },
                line: 4
            },
            '1': {
                name: '(anonymous_1)',
                decl: {
                    start: {
                        line: 5,
                        column: 11
                    },
                    end: {
                        line: 5,
                        column: 12
                    }
                },
                loc: {
                    start: {
                        line: 5,
                        column: 18
                    },
                    end: {
                        line: 5,
                        column: 67
                    }
                },
                line: 5
            },
            '2': {
                name: '(anonymous_2)',
                decl: {
                    start: {
                        line: 5,
                        column: 37
                    },
                    end: {
                        line: 5,
                        column: 38
                    }
                },
                loc: {
                    start: {
                        line: 5,
                        column: 44
                    },
                    end: {
                        line: 5,
                        column: 66
                    }
                },
                line: 5
            }
        },
        branchMap: {},
        s: {
            '0': 0,
            '1': 0,
            '2': 0
        },
        f: {
            '0': 0,
            '1': 0,
            '2': 0
        },
        b: {},
        _coverageSchema: '332fd63041d2c1bcb487cc26dd0d5f7d97098a6c'
    },
        coverage = global[gcv] || (global[gcv] = {});

    if (coverage[path] && coverage[path].hash === hash) {
        return coverage[path];
    }

    coverageData.hash = hash;
    return coverage[path] = coverageData;
}();

exports.default = Animater;

require('./index.scss');

var _animate = require('./animate');

var _animate2 = _interopRequireDefault(_animate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Animater(name) {
    cov_sqjfat4e1.f[0]++;
    cov_sqjfat4e1.s[0]++;

    return function (app) {
        cov_sqjfat4e1.f[1]++;
        cov_sqjfat4e1.s[1]++;
        return app.set('animate', function (app) {
            cov_sqjfat4e1.f[2]++;
            cov_sqjfat4e1.s[2]++;
            return new _animate2.default(app, name);
        });
    };
}
module.exports = exports['default'];