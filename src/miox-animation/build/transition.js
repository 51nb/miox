'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultEventFailureGracePeriod = 100;

exports.default = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(element, expectedDuration, type, eventFailureGracePeriod) {
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return new Promise(function (resolve) {
                            var transitionend = getTransitionEndEvent(type);
                            var gracePeriod = eventFailureGracePeriod !== undefined ? eventFailureGracePeriod : defaultEventFailureGracePeriod;
                            var done = false;
                            var forceEnd = false;

                            element.addEventListener(transitionend, onTransitionEnd);

                            setTimeout(function () {
                                if (!done) {
                                    // forcing onTransitionEnd callback...
                                    forceEnd = true;
                                    onTransitionEnd();
                                } else {
                                    resolve();
                                }
                            }, expectedDuration + gracePeriod);

                            function onTransitionEnd(e) {
                                if (forceEnd || e.target === element) {
                                    done = true;
                                    element.removeEventListener(transitionend, onTransitionEnd);
                                    resolve();
                                }
                            }
                        });

                    case 2:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function (_x, _x2, _x3, _x4) {
        return _ref.apply(this, arguments);
    };
}();

function getTransitionEndEvent(type) {
    var types = void 0;
    if (type && ('transition' === type || 'trans' === type)) {
        types = {
            'OTransition': 'oTransitionEnd',
            'WebkitTransition': 'webkitTransitionEnd',
            'MozTransition': 'transitionend',
            'transition': 'transitionend'
        };
    } else {
        // animation is default
        types = {
            'OAnimation': 'oAnimationEnd',
            'WebkitAnimation': 'webkitAnimationEnd',
            'MozAnimation': 'animationend',
            'animation': 'animationend'
        };
    }
    var elem = document.createElement('fake');
    return Object.keys(types).reduce(function (prev, trans) {
        return undefined !== elem.style[trans] ? types[trans] : prev;
    }, '');
}
module.exports = exports['default'];