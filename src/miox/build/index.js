'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var cov_2dxjac3ao4 = function () {
  var path = '/Users/shenyunjie/CodeBox/miox/src/miox/src/index.js',
      hash = '54c4c4f369e4a171d11a6789eb09679b60fbaade',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/Users/shenyunjie/CodeBox/miox/src/miox/src/index.js',
    statementMap: {},
    fnMap: {},
    branchMap: {},
    s: {},
    f: {},
    b: {},
    _coverageSchema: '332fd63041d2c1bcb487cc26dd0d5f7d97098a6c'
  },
      coverage = global[gcv] || (global[gcv] = {});

  if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }

  coverageData.hash = hash;
  return coverage[path] = coverageData;
}(); /**
      * Created by evio on 2017/8/28.
      */


var _index = require('./lib/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _index2.default;
module.exports = exports['default'];