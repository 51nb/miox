'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _isClass = require('is-class');

var _isClass2 = _interopRequireDefault(_isClass);

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (webView) {
  if (!webView) return;
  webView = checkWebViewObject(webView);
  return function (app) {
    if (app.env !== 'web') return;
    var body = global.document.body;
    var element = global.document.createElement('div');
    body.appendChild(element);
    app.once('app:start', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var el;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return new Promise(function (resolve, reject) {
                var vm = new webView({
                  mounted: function mounted() {
                    resolve(vm.mioxContainerElement);
                  }
                });
                vm.$mount(element);
              });

            case 2:
              el = _context.sent;

              if (el) {
                _context.next = 5;
                break;
              }

              throw new Error('miss container element');

            case 5:
              app.set('container', el);

            case 6:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    })));
  };
};

function checkWebViewObject(webview) {
  if (!(0, _isClass2.default)(webview) && typeof webview !== 'function') {
    try {
      webview = _vue2.default.extend(webview);
    } catch (e) {
      throw new Error('`webview` argument is not a class object or a function or an object.');
    }
  }
  return webview;
}
module.exports = exports['default'];