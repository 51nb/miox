'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var cov_ef7edsaea = function () {
    var path = '/Users/shenyunjie/CodeBox/miox/src/miox/src/miox_modules/events.js',
        hash = '014bb3d46f88fc88e6037766a741d48292f8480a',
        global = new Function('return this')(),
        gcv = '__coverage__',
        coverageData = {
        path: '/Users/shenyunjie/CodeBox/miox/src/miox/src/miox_modules/events.js',
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
}();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by evio on 2017/8/29.
 */
// Copyright Joyent & evio, Inc. and other Node contributors.
// mail: <evio@vip.qq.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

/**
 * @example:
 *
 * const a = new EventEmitter();
 * a.on('aaa', async () => {
 *    console.log('start:', '1 = ', 'aaa', '->', new Date().getTime());
 *    await new Promise(resolve => setTimeout(resolve, 3000));
 *    console.log('end:', '1 = ', 'aaa', '->', new Date().getTime());
 * });
 *
 * a.on('aaa', async () => {
 *    console.log('start:', '2 = ', 'aaa', '->', new Date().getTime());
 *    await new Promise(resolve => setTimeout(resolve, 3000));
 *    console.log('end:', '2 = ', 'aaa', '->', new Date().getTime());
 * });
 *
 * a.on('aaa', async () => {
 *    console.log('start:', '1 = ', 'aaa', '->', new Date().getTime());
 *    await new Promise(resolve => setTimeout(resolve, 3000));
 *    console.log('end:', '1 = ', 'aaa', '->', new Date().getTime());
 * });
 *
 * (async () => {
 *    await a.emit('aaa');
 *    console.log('all done');
 * })();
 *
 * @output:
 * start: 1 =  aaa -> 1487673861652
 * end: 1 =  aaa -> 1487673864656
 * start: 2 =  aaa -> 1487673864657
 * end: 2 =  aaa -> 1487673867663
 * start: 3 =  aaa -> 1487673867663
 * end: 3 =  aaa -> 1487673870664
 * all done
 *
 */
/* istanbul ignore next */
function EventEmitter() {
    this._events = this._events || {};
    this._maxListeners = this._maxListeners || undefined;
}
/* istanbul ignore next */
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
/* istanbul ignore next */
EventEmitter.EventEmitter = EventEmitter;
/* istanbul ignore next */
EventEmitter.prototype._events = undefined;
/* istanbul ignore next */
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
/* istanbul ignore next */
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
/* istanbul ignore next */
EventEmitter.prototype.setMaxListeners = function (n) {
    if (!isNumber(n) || n < 0 || isNaN(n)) throw TypeError('n must be a positive number');
    this._maxListeners = n;
    return this;
};
/* istanbul ignore next */
EventEmitter.prototype.emit = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(type) {
        var er,
            handler,
            len,
            args,
            i,
            listeners,
            err,
            _args = arguments;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:

                        if (!this._events) this._events = {};

                        // If there is no 'error' event listener then throw.

                        if (!(type === 'error')) {
                            _context.next = 12;
                            break;
                        }

                        if (!(!this._events.error || isObject(this._events.error) && !this._events.error.length)) {
                            _context.next = 12;
                            break;
                        }

                        er = _args[1];

                        if (!er) {
                            _context.next = 12;
                            break;
                        }

                        if (!(er instanceof Error)) {
                            _context.next = 9;
                            break;
                        }

                        throw er;

                    case 9:
                        // At least give some kind of context to the user
                        err = new Error('Uncaught, unspecified "error" event. (' + er + ')');

                        err.context = er;
                        throw err;

                    case 12:

                        handler = this._events[type];

                        if (!isUndefined(handler)) {
                            _context.next = 15;
                            break;
                        }

                        return _context.abrupt('return', false);

                    case 15:
                        if (!isFunction(handler)) {
                            _context.next = 33;
                            break;
                        }

                        _context.t0 = _args.length;
                        _context.next = _context.t0 === 1 ? 19 : _context.t0 === 2 ? 22 : _context.t0 === 3 ? 25 : 28;
                        break;

                    case 19:
                        _context.next = 21;
                        return handler.call(this);

                    case 21:
                        return _context.abrupt('break', 31);

                    case 22:
                        _context.next = 24;
                        return handler.call(this, _args[1]);

                    case 24:
                        return _context.abrupt('break', 31);

                    case 25:
                        _context.next = 27;
                        return handler.call(this, _args[1], _args[2]);

                    case 27:
                        return _context.abrupt('break', 31);

                    case 28:
                        args = Array.prototype.slice.call(_args, 1);
                        _context.next = 31;
                        return handler.apply(this, args);

                    case 31:
                        _context.next = 44;
                        break;

                    case 33:
                        if (!isObject(handler)) {
                            _context.next = 44;
                            break;
                        }

                        args = Array.prototype.slice.call(_args, 1);
                        listeners = handler.slice();
                        len = listeners.length;
                        i = 0;

                    case 38:
                        if (!(i < len)) {
                            _context.next = 44;
                            break;
                        }

                        _context.next = 41;
                        return listeners[i].apply(this, args);

                    case 41:
                        i++;
                        _context.next = 38;
                        break;

                    case 44:
                        return _context.abrupt('return', true);

                    case 45:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function (_x) {
        return _ref.apply(this, arguments);
    };
}();
/* istanbul ignore next */
EventEmitter.prototype.addListener = function (type, listener) {
    var m;

    if (!isFunction(listener)) throw TypeError('listener must be a function');

    if (!this._events) this._events = {};

    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (this._events.newListener) this.emit('newListener', type, isFunction(listener.listener) ? listener.listener : listener);

    if (!this._events[type])
        // Optimize the case of one listener. Don't need the extra array object.
        this._events[type] = listener;else if (isObject(this._events[type]))
        // If we've already got an array, just append.
        this._events[type].push(listener);else
        // Adding the second element, need to change to array.
        this._events[type] = [this._events[type], listener];

    // Check for listener leak
    if (isObject(this._events[type]) && !this._events[type].warned) {
        if (!isUndefined(this._maxListeners)) {
            m = this._maxListeners;
        } else {
            m = EventEmitter.defaultMaxListeners;
        }

        if (m && m > 0 && this._events[type].length > m) {
            this._events[type].warned = true;
            console.error('(node) warning: possible EventEmitter memory ' + 'leak detected. %d listeners added. ' + 'Use emitter.setMaxListeners() to increase limit.', this._events[type].length);
            if (typeof console.trace === 'function') {
                // not supported in IE 10
                console.trace();
            }
        }
    }

    return this;
};
/* istanbul ignore next */
EventEmitter.prototype.on = EventEmitter.prototype.addListener;
/* istanbul ignore next */
EventEmitter.prototype.once = function (type, listener) {
    if (!isFunction(listener)) throw TypeError('listener must be a function');

    var fired = false;

    function g() {
        this.removeListener(type, g);

        if (!fired) {
            fired = true;
            listener.apply(this, arguments);
        }
    }

    g.listener = listener;
    this.on(type, g);

    return this;
};

// emits a 'removeListener' event iff the listener was removed
/* istanbul ignore next */
EventEmitter.prototype.removeListener = function (type, listener) {
    var list, position, length, i;

    if (!isFunction(listener)) throw TypeError('listener must be a function');

    if (!this._events || !this._events[type]) return this;

    list = this._events[type];
    length = list.length;
    position = -1;

    if (list === listener || isFunction(list.listener) && list.listener === listener) {
        delete this._events[type];
        if (this._events.removeListener) this.emit('removeListener', type, listener);
    } else if (isObject(list)) {
        for (i = length; i-- > 0;) {
            if (list[i] === listener || list[i].listener && list[i].listener === listener) {
                position = i;
                break;
            }
        }

        if (position < 0) return this;

        if (list.length === 1) {
            list.length = 0;
            delete this._events[type];
        } else {
            list.splice(position, 1);
        }

        if (this._events.removeListener) this.emit('removeListener', type, listener);
    }

    return this;
};
/* istanbul ignore next */
EventEmitter.prototype.removeAllListeners = function (type) {
    var key, listeners;

    if (!this._events) return this;

    // not listening for removeListener, no need to emit
    if (!this._events.removeListener) {
        if (arguments.length === 0) this._events = {};else if (this._events[type]) delete this._events[type];
        return this;
    }

    // emit removeListener for all listeners on all events
    if (arguments.length === 0) {
        for (key in this._events) {
            if (key === 'removeListener') continue;
            this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = {};
        return this;
    }

    listeners = this._events[type];

    if (isFunction(listeners)) {
        this.removeListener(type, listeners);
    } else if (listeners) {
        // LIFO order
        while (listeners.length) {
            this.removeListener(type, listeners[listeners.length - 1]);
        }
    }
    delete this._events[type];

    return this;
};
/* istanbul ignore next */
EventEmitter.prototype.listeners = function (type) {
    var ret;
    if (!this._events || !this._events[type]) ret = [];else if (isFunction(this._events[type])) ret = [this._events[type]];else ret = this._events[type].slice();
    return ret;
};
/* istanbul ignore next */
EventEmitter.prototype.listenerCount = function (type) {
    if (this._events) {
        var evlistener = this._events[type];

        if (isFunction(evlistener)) return 1;else if (evlistener) return evlistener.length;
    }
    return 0;
};
/* istanbul ignore next */
EventEmitter.listenerCount = function (emitter, type) {
    return emitter.listenerCount(type);
};
/* istanbul ignore next */
function isFunction(arg) {
    return typeof arg === 'function';
}
/* istanbul ignore next */
function isNumber(arg) {
    return typeof arg === 'number';
}
/* istanbul ignore next */
function isObject(arg) {
    return (typeof arg === 'undefined' ? 'undefined' : (0, _typeof3.default)(arg)) === 'object' && arg !== null;
}
/* istanbul ignore next */
function isUndefined(arg) {
    return arg === void 0;
}