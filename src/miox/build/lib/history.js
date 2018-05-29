'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _events = require('../miox_modules/events');

var _session = require('./session');

var _session2 = _interopRequireDefault(_session);

var _request = require('../miox_modules/request');

var _request2 = _interopRequireDefault(_request);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by evio on 2017/8/29.
 */
var History = function (_EventEmitter) {
  (0, _inherits3.default)(History, _EventEmitter);

  function History(app) {
    (0, _classCallCheck3.default)(this, History);

    var _this = (0, _possibleConstructorReturn3.default)(this, (History.__proto__ || Object.getPrototypeOf(History)).call(this));

    _this.app = app;
    _this.stacks = [];
    _this.action = null;
    _this.direction = 0;
    _this.animateName = null;
    _this.title = global.document.title;
    _this.popState = app.options.popState || app.env === 'client' && global.history && typeof global.history.pushState === 'function';

    if (_this.useSessionStorage) {
      _this.session = new _session2.default(app);
    }
    return _this;
  }

  (0, _createClass3.default)(History, [{
    key: 'notify',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(index) {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this.session) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt('return');

              case 2:
                if (this.app.installed) {
                  _context.next = 6;
                  break;
                }

                if (!this.session.current) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt('return');

              case 5:
                return _context.abrupt('return', this.session.actionPush());

              case 6:
                _context.t0 = this.action;
                _context.next = _context.t0 === 'push' ? 9 : _context.t0 === 'replace' ? 12 : 14;
                break;

              case 9:
                this.session.actionPush();
                this.session.autoRemove();
                return _context.abrupt('break', 15);

              case 12:
                this.session.actionReplace();
                return _context.abrupt('break', 15);

              case 14:
                if (index) {
                  this.session.moveSession(index);
                }

              case 15:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function notify(_x) {
        return _ref.apply(this, arguments);
      }

      return notify;
    }()
  }, {
    key: 'clear',
    value: function clear() {
      this.action = null;
      this.direction = 0;
    }
  }, {
    key: 'processDirection',
    value: function processDirection(req) {
      if (!this.session) return;
      switch (this.action) {
        case 'push':
          this.direction = 1;
          break;
        case 'replace':
          break;
        default:
          var index = this.session.findSession(req.pathname, req.sortQuery);
          if (index === undefined) {
            throw new Error('can not find this request of `' + req.href + '` in sessionStorage');
          }
          this.direction = this.session.current > index ? -1 : this.session.current === index ? 0 : 1;
          return index;
      }
    }
  }, {
    key: 'push',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(url, animate) {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.action = 'push';
                this.animateName = animate;
                /* istanbul ignore if */

                if (!this.popState) {
                  _context2.next = 8;
                  break;
                }

                global.history.pushState(null, this.title, url);
                _context2.next = 6;
                return this.change(this.request, new _request2.default(this.location()));

              case 6:
                _context2.next = 9;
                break;

              case 8:
                global.location.hash = url;

              case 9:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function push(_x2, _x3) {
        return _ref2.apply(this, arguments);
      }

      return push;
    }()
  }, {
    key: 'replace',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(url) {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.action = 'replace';
                /* istanbul ignore if */

                if (!this.popState) {
                  _context3.next = 7;
                  break;
                }

                global.history.replaceState(null, this.title, url);
                _context3.next = 5;
                return this.change(this.request, new _request2.default(this.location()));

              case 5:
                _context3.next = 8;
                break;

              case 7:
                (0, _util.replaceHash)(url);

              case 8:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function replace(_x4) {
        return _ref3.apply(this, arguments);
      }

      return replace;
    }()
  }, {
    key: 'go',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(obj, animate) {
        var _ref5, pathname, sortQuery, index;

        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.animateName = animate;

                if (!(typeof obj === 'number')) {
                  _context4.next = 6;
                  break;
                }

                if (!(obj === 0)) {
                  _context4.next = 4;
                  break;
                }

                return _context4.abrupt('return');

              case 4:
                if (this.session) {
                  this.direction = obj > 1 ? 1 : -1;
                }
                return _context4.abrupt('return', global.history.go(obj));

              case 6:
                _ref5 = new _request2.default(obj), pathname = _ref5.pathname, sortQuery = _ref5.sortQuery;

                if (!this.session) {
                  _context4.next = 17;
                  break;
                }

                index = this.session.findSession(pathname, sortQuery);

                if (!(index === undefined)) {
                  _context4.next = 13;
                  break;
                }

                _context4.next = 12;
                return this.push(obj, animate);

              case 12:
                return _context4.abrupt('return', _context4.sent);

              case 13:
                if (!(this.session.current !== index)) {
                  _context4.next = 15;
                  break;
                }

                return _context4.abrupt('return', this.go(index - this.session.current, animate));

              case 15:
                _context4.next = 19;
                break;

              case 17:
                _context4.next = 19;
                return this.push(obj, animate);

              case 19:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function go(_x5, _x6) {
        return _ref4.apply(this, arguments);
      }

      return go;
    }()

    /* istanbul ignore next */

  }, {
    key: 'link',
    value: function link(url) {
      if (this.app.doing) return;
      this.app.doing = true;
      if (this.session) {
        var max = Math.max.apply(Math, Object.keys(this.session.variables).map(function (i) {
          return Number(i);
        }));
        if (this.session.current < max) {
          this.session.autoRemove(this.session.current);
        }
        this.session.setSession(this.session.current + 1, url, '');
      }
      global.location.href = url;
    }

    /**
     * 是否使用sessionStorage来判断方向
     * 如果没有动画插件，一律不使用。
     * 如果配置中未启动了，而你使用方向性动画，将报错或者无任何效果。
     * @returns {*}
     */

  }, {
    key: 'location',
    value: function location() {
      return (0, _util.getLocalURI)(global.location, this.popState);
    }
  }, {
    key: 'compare',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(prev, next) {
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!(prev.pathname !== next.pathname)) {
                  _context5.next = 4;
                  break;
                }

                _context5.next = 3;
                return this.emit('pathchange', next, prev);

              case 3:
                return _context5.abrupt('return', _context5.sent);

              case 4:
                if (!(prev.mark !== next.mark)) {
                  _context5.next = 8;
                  break;
                }

                _context5.next = 7;
                return this.emit('searchchange', next, prev);

              case 7:
                return _context5.abrupt('return', _context5.sent);

              case 8:
                if (!(prev.hash !== next.hash)) {
                  _context5.next = 12;
                  break;
                }

                _context5.next = 11;
                return this.emit('hashchange', next, prev);

              case 11:
                return _context5.abrupt('return', _context5.sent);

              case 12:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function compare(_x7, _x8) {
        return _ref6.apply(this, arguments);
      }

      return compare;
    }()
  }, {
    key: 'change',
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(prev, next) {
        var _this2 = this;

        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this.compare(prev, next).then(function () {
                  return _this2.clear();
                });

              case 2:
                this.animateName = null;

              case 3:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function change(_x9, _x10) {
        return _ref7.apply(this, arguments);
      }

      return change;
    }()
  }, {
    key: 'listen',
    value: function listen() {
      var _this3 = this;

      var callback = function callback() {
        return _this3.change(_this3.request, new _request2.default(_this3.location()));
      };
      global.addEventListener(this.popState ? 'popstate' : 'hashchange', callback);
      return function () {
        global.removeEventListener(_this3.popState ? 'popstate' : 'hashchange', callback);
      };
    }
  }, {
    key: 'useSessionStorage',
    get: function get() {
      if (!this.app.plugin.get('animate')) return false;
      return this.app.options.session;
    }
  }, {
    key: 'request',
    get: function get() {
      return this.app.request;
    }
  }]);
  return History;
}(_events.EventEmitter);

exports.default = History;
module.exports = exports['default'];