'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by evio on 2017/8/30.
 */
exports.default = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(app, prevNode, nextNode) {
        var animate;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        animate = app.plugin.get('animate');

                        if (!(animate && app.installed && app.history.session)) {
                            _context.next = 4;
                            break;
                        }

                        _context.next = 4;
                        return Promise.all([animate.leave(prevNode), animate.enter(nextNode)]);

                    case 4:

                        if (prevNode) {
                            prevNode.classList.remove('active');
                        }
                        if (nextNode) {
                            nextNode.classList.add('active');
                        }

                    case 6:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    function renderWebViewWithAnimate(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    }

    return renderWebViewWithAnimate;
}();

module.exports = exports['default'];