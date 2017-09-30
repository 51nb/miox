'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (ctx) {
    keys.forEach(function (key) {
        if (typeof ctx[key] === 'function') {
            _vue2.default.prototype['$' + key] = function () {
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }

                return ctx[key].apply(ctx, args);
            };
            _vue2.default.directive(key, historyRedirect(ctx, key));
        }
    });
};

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var keys = ['push', 'go', 'replace', 'redirect', 'link']; /**
                                                           * Created by evio on 2017/3/22.
                                                           */


function historyRedirect(ctx, key) {
    var options = {};
    options.bind = function (el, binding) {
        el.addEventListener('click', binding.__redirectInjector__ = function () {
            var modifiers = binding.modifiers || {};
            var options = {};
            binding.realValue = binding.value;

            if (ctx.history.url === binding.realValue) return;

            if (modifiers.argument) {
                options.animate = modifiers.argument;
            }

            if (modifiers.alone) {
                options.cache = false;
            }

            if (typeof ctx[key] === 'function') {
                ctx[key](binding.realValue, options);
            }
        });
    };

    options.unbind = function (el, binding) {
        if (binding.__redirectInjector__) {
            el.removeEventListener('click', binding.__redirectInjector__);
        }
    };

    options.componentUpdated = function (el, binding) {
        binding.realValue = binding.value;
    };

    return options;
}
module.exports = exports['default'];