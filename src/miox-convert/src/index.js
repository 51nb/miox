/**
 * Created by evio on 16/9/23.
 */
'use strict';

var co = require('co');
var compose = require('miox-compose');

module.exports = convert;

function convert (mw) {
    if (typeof mw !== 'function') {
        throw new TypeError('middleware must be a function')
    }
    if (mw.constructor.name !== 'GeneratorFunction') {
        // assume it's Promise-based middleware
        return mw
    }

    converted._name = mw._name || mw.name
    return converted;

    function converted(ctx, next) {
        return co.call(ctx, mw.call(ctx, createGenerator(next)));
    }
}

function * createGenerator (next) {
    return yield next()
}

// convert.compose(mw, mw, mw)
// convert.compose([mw, mw, mw])
convert.compose = function (arr) {
    if (!Array.isArray(arr)) {
        arr = Array.from(arguments)
    }
    return compose(arr.map(convert))
}

convert.back = function (mw) {
    if (typeof mw !== 'function') {
        throw new TypeError('middleware must be a function')
    }
    if (mw.constructor.name === 'GeneratorFunction') {
        // assume it's generator middleware
        return mw
    }
    var converted = function * (next) {
        var ctx = this
        var called = false
        // no need try...catch here, it's ok even `mw()` throw exception
        yield Promise.resolve(mw(ctx, function () {
            if (called) {
                // guard against multiple next() calls
                // https://github.com/koajs/compose/blob/4e3e96baf58b817d71bd44a8c0d78bb42623aa95/index.js#L36
                return Promise.reject(new Error('next() called multiple times'))
            }
            called = true
            return co.call(ctx, next)
        }))
    }
    converted._name = mw._name || mw.name
    return converted
}