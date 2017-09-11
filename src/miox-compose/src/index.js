/**
 * Created by evio on 16/9/23.
 */
/**
 * Expose compositor.
 */

module.exports = compose;

/**
 * Compose `middleware` returning
 * a fully valid middleware comprised
 * of all those which are passed.
 *
 * @param {Array} middleware
 * @return {Function}
 * @api public
 */

function compose (middleware) {
    if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!');
    for (var item in middleware) {
        var fn = middleware[item];
        if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
    }

    /**
     * @param {Object} context
     * @return {Promise}
     * @api public
     */

    return function (context, next) {
        // last called middleware #
        var index = -1;
        return dispatch(0);
        function dispatch (i) {
            if (i <= index) return Promise.reject(new Error('next() called multiple times'));
            index = i;
            var fn = middleware[i] || next;
            if (!fn) return Promise.resolve();
            try {
                return Promise.resolve(fn(context, function next () {
                    return dispatch(i + 1)
                }))
            } catch (err) {
                return Promise.reject(err)
            }
        }
    }
}