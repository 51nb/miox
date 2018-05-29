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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ReactEngine = function () {
  function ReactEngine(ctx) {
    (0, _classCallCheck3.default)(this, ReactEngine);

    this.ctx = ctx;
  }

  (0, _createClass3.default)(ReactEngine, [{
    key: 'element',
    value: function element(target) {
      return target.__MioxInjectElement__;
    }
  }, {
    key: 'create',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(webView, options) {
        var element, dom, view;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                element = this.createWebViewRoot();
                dom = _react2.default.createElement(webView, options);
                view = _reactDom2.default.render(dom, element);

                Object.defineProperty(view, '__MioxInjectElement__', {
                  get: function get() {
                    return element;
                  }
                });
                Object.defineProperty(view, 'element', {
                  get: function get() {
                    return dom;
                  }
                });
                return _context.abrupt('return', view);

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function create(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: 'destroy',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(target) {
        var element;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                element = this.element(target);

                _reactDom2.default.unmountComponentAtNode(element);
                element.parentNode.parentNode.removeChild(element.parentNode);

              case 3:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function destroy(_x3) {
        return _ref2.apply(this, arguments);
      }

      return destroy;
    }()
  }, {
    key: 'active',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(target) {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!target.webViewDidActive) {
                  _context3.next = 3;
                  break;
                }

                _context3.next = 3;
                return target.webViewDidActive();

              case 3:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function active(_x4) {
        return _ref3.apply(this, arguments);
      }

      return active;
    }()
  }, {
    key: 'enter',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(target) {
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!target.webViewDidEnter) {
                  _context4.next = 3;
                  break;
                }

                _context4.next = 3;
                return target.webViewDidEnter();

              case 3:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function enter(_x5) {
        return _ref4.apply(this, arguments);
      }

      return enter;
    }()
  }, {
    key: 'leave',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(target) {
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!target.webViewDidLeave) {
                  _context5.next = 3;
                  break;
                }

                _context5.next = 3;
                return target.webViewDidLeave();

              case 3:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function leave(_x6) {
        return _ref5.apply(this, arguments);
      }

      return leave;
    }()
  }, {
    key: 'searchchange',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(target, prev, next) {
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!target.webViewDidSearchChange) {
                  _context6.next = 3;
                  break;
                }

                _context6.next = 3;
                return target.webViewDidSearchChange(prev, next);

              case 3:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function searchchange(_x7, _x8, _x9) {
        return _ref6.apply(this, arguments);
      }

      return searchchange;
    }()
  }, {
    key: 'hashchange',
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(target, prev, next) {
        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (target.webViewDidHashChange) {
                  target.webViewDidHashChange(prev, next);
                }

              case 1:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function hashchange(_x10, _x11, _x12) {
        return _ref7.apply(this, arguments);
      }

      return hashchange;
    }()
  }, {
    key: 'install',
    value: function install() {
      _react2.default.Component.prototype.$push = this.ctx.push.bind(this.ctx);
      _react2.default.Component.prototype.$go = this.ctx.go.bind(this.ctx);
      _react2.default.Component.prototype.$replace = this.ctx.replace.bind(this.ctx);
      _react2.default.Component.prototype.$redirect = this.ctx.redirect.bind(this.ctx);
      _react2.default.Component.prototype.$link = this.ctx.link.bind(this.ctx);
    }
  }, {
    key: 'createWebViewRoot',
    value: function createWebViewRoot() {
      if (!global.document) return;
      var element = global.document.createElement('div');
      var container = global.document.createElement('div');

      this.ctx.element.appendChild(element);
      element.appendChild(container);
      element.classList.add('mx-webview');
      container.classList.add('mx-window');

      return container;
    }
  }, {
    key: 'ssr',
    value: function ssr() {
      var _this = this;

      this.ctx.emit('app:start');
      return function () {
        var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(options) {
          var url, app, ctx;
          return _regenerator2.default.wrap(function _callee8$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  url = options.url, app = options.app, ctx = options.ctx;

                  _this.ctx.$application = app;
                  _this.ctx.$context = ctx;
                  _context8.next = 5;
                  return _this.ctx.createServerProgress(url);

                case 5:
                  _context8.next = 7;
                  return _this.ctx.emit('app:end');

                case 7:
                  if (!_this.ctx.err) {
                    _context8.next = 11;
                    break;
                  }

                  throw _this.ctx.err;

                case 11:
                  return _context8.abrupt('return', _this.ctx.webView.element);

                case 12:
                case 'end':
                  return _context8.stop();
              }
            }
          }, _callee8, _this);
        }));

        return function (_x13) {
          return _ref8.apply(this, arguments);
        };
      }();
    }
  }]);
  return ReactEngine;
}();

exports.default = ReactEngine;
module.exports = exports['default'];