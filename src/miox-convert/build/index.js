/**
 * Created by evio on 16/9/23.
 */
'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/_regenerator2.default.mark(createGenerator);

var co = require('co');
var compose = require('miox-compose');

module.exports = convert;

function convert(mw) {
    if (typeof mw !== 'function') {
        throw new TypeError('middleware must be a function');
    }
    if (mw.constructor.name !== 'GeneratorFunction') {
        // assume it's Promise-based middleware
        return mw;
    }

    converted._name = mw._name || mw.name;
    return converted;

    function converted(ctx, next) {
        return co.call(ctx, mw.call(ctx, createGenerator(next)));
    }
}

function createGenerator(next) {
    return _regenerator2.default.wrap(function createGenerator$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _context.next = 2;
                    return next();

                case 2:
                    return _context.abrupt('return', _context.sent);

                case 3:
                case 'end':
                    return _context.stop();
            }
        }
    }, _marked, this);
}

// convert.compose(mw, mw, mw)
// convert.compose([mw, mw, mw])
convert.compose = function (arr) {
    if (!Array.isArray(arr)) {
        arr = Array.from(arguments);
    }
    return compose(arr.map(convert));
};

convert.back = function (mw) {
    if (typeof mw !== 'function') {
        throw new TypeError('middleware must be a function');
    }
    if (mw.constructor.name === 'GeneratorFunction') {
        // assume it's generator middleware
        return mw;
    }
    var converted = /*#__PURE__*/_regenerator2.default.mark(function converted(next) {
        var ctx, called;
        return _regenerator2.default.wrap(function converted$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        ctx = this;
                        called = false;
                        // no need try...catch here, it's ok even `mw()` throw exception

                        _context2.next = 4;
                        return Promise.resolve(mw(ctx, function () {
                            if (called) {
                                // guard against multiple next() calls
                                // https://github.com/koajs/compose/blob/4e3e96baf58b817d71bd44a8c0d78bb42623aa95/index.js#L36
                                return Promise.reject(new Error('next() called multiple times'));
                            }
                            called = true;
                            return co.call(ctx, next);
                        }));

                    case 4:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, converted, this);
    });
    converted._name = mw._name || mw.name;
    return converted;
};