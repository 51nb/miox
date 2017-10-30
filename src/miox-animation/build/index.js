'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var cov_sqjfat4e1 = function () {
    var path = '/Users/shenyunjie/CodeBox/miox/src/miox-animation/src/index.js',
        hash = '5e433a801e27aa3584c99ee4476bd39b6dc8ccbe',
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
                    line: 7,
                    column: 5
                }
            },
            '1': {
                start: {
                    line: 6,
                    column: 8
                },
                end: {
                    line: 6,
                    column: 38
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
                        line: 8,
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
                        column: 20
                    },
                    end: {
                        line: 7,
                        column: 5
                    }
                },
                line: 5
            }
        },
        branchMap: {},
        s: {
            '0': 0,
            '1': 0
        },
        f: {
            '0': 0,
            '1': 0
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

        return new _animate2.default(app, name);
    };
}

// Animater.hashChange = app => {
//     app.on('hashchange', webview => {
//         const node = webview.__MioxInjectElement__;
//         const hash = app.history.uri.hash;
//         const hashElement = node.querySelector(hash);
//         node.scrollTop = hashElement.offsetTop;
//     });
// }

module.exports = exports['default'];