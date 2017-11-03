'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (ctx) {
  keys.forEach(function (key) {
    if (typeof ctx[key] === 'function') {
      _vue2.default.prototype['$' + key] = function () {
        return ctx[key].apply(ctx, arguments);
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


/* istanbul ignore next */
function historyRedirect(ctx, key) {
  return {
    bind: function bind(el, binding) {
      el.addEventListener('click', binding.__redirectInjector__ = bindDirectiveAction(ctx, key, binding));
    },
    unbind: function unbind(el, binding) {
      if (binding.__redirectInjector__) {
        el.removeEventListener('click', binding.__redirectInjector__);
      }
    }
  };
}

/* istanbul ignore next */
function bindDirectiveAction(ctx, key, binding) {
  return function () {
    if (ctx.req.href === binding.value) return;
    if (/^http(s?)\:\/\//i.test(binding.value)) return ctx.link(binding.value);
    ctx[key](binding.value, binding.arg);
  };
}
module.exports = exports['default'];