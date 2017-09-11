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

var _dictionary = require('../miox_modules/dictionary');

var _dictionary2 = _interopRequireDefault(_dictionary);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by evio on 2017/8/29.
 */
var SessionStorage = function (_Dictionary) {
    (0, _inherits3.default)(SessionStorage, _Dictionary);

    function SessionStorage(app) {
        (0, _classCallCheck3.default)(this, SessionStorage);

        var _this = (0, _possibleConstructorReturn3.default)(this, (SessionStorage.__proto__ || Object.getPrototypeOf(SessionStorage)).call(this));

        _this.app = app;
        _this.current = 0;
        _this.historyListRegExp = _util.sessionIndexRegExp;
        _this.historyCurrentRegExp = _util.sessionCurrentRegExp;
        _this.init();
        return _this;
    }

    (0, _createClass3.default)(SessionStorage, [{
        key: 'init',
        value: function init() {
            var session = global.sessionStorage;
            var i = session.length;
            while (i--) {
                var key = session.key(i);
                var value = void 0;
                if (this.historyListRegExp.test(key)) {
                    try {
                        value = JSON.parse(session.getItem(key));
                    } catch (e) {
                        continue;
                    }
                    this.set(key.replace(this.historyListRegExp, ''), value);
                } else if (this.historyCurrentRegExp.test(key)) {
                    this.current = Number(session.getItem(key));
                }
            }
        }
    }, {
        key: 'setSession',
        value: function setSession(index, pathname, search) {
            var name = (0, _util.sessionIndexName)(index);
            this.set(index, { pathname: pathname, search: search });
            global.sessionStorage.setItem(name, JSON.stringify({ pathname: pathname, search: search }));
        }
    }, {
        key: 'delSession',
        value: function delSession(index) {
            var name = (0, _util.sessionIndexName)(index);
            this.del(index);
            global.sessionStorage.removeItem(name);
        }
    }, {
        key: 'moveSession',
        value: function moveSession(index) {
            if (this.get(index)) {
                this.current = index;
                global.sessionStorage.setItem(_util.sessionCurrentName, index);
            }
        }
    }, {
        key: 'findSession',
        value: function findSession(_pathname, _search) {
            var keys = Object.keys(this.variables).sort().map(function (v) {
                return Number(v);
            });
            var i = keys.length;
            while (i--) {
                var key = keys[i];
                var value = this.get(key);
                if (value) {
                    var pathname = value.pathname,
                        search = value.search;

                    if (pathname === _pathname && search === _search) {
                        return key;
                    }
                }
            }
        }
    }, {
        key: 'actionPush',
        value: function actionPush() {
            var index = global.history.length;
            this.setSession(index, this.app.req.pathname, this.app.req.sortQuery);
            this.moveSession(index);
        }
    }, {
        key: 'actionReplace',
        value: function actionReplace() {
            this.setSession(this.current, this.app.req.pathname, this.app.req.sortQuery);
        }
    }, {
        key: 'autoRemove',
        value: function autoRemove() {
            var _this2 = this;

            var index = global.history.length;
            this.each(function (key) {
                key = Number(key);
                if (key > index) {
                    _this2.delSession(key);
                }
            });
        }
    }]);
    return SessionStorage;
}(_dictionary2.default);

exports.default = SessionStorage;
module.exports = exports['default'];