/**
 * Created by evio on 2017/3/22.
 */
import Vue from 'vue';
const keys = ['push', 'go', 'replace', 'redirect', 'link'];

export default function (ctx) {
  keys.forEach(key => {
    if (typeof ctx[key] === 'function') {
      Vue.prototype[`$${key}`] = (...args) => ctx[key](...args);
      Vue.directive(key, historyRedirect(ctx, key));
    }
  });
}

/* istanbul ignore next */
function historyRedirect(ctx, key) {
  return {
    bind(el, binding) {
      el.addEventListener('click',
        binding.__redirectInjector__ = bindDirectiveAction(ctx, key, binding)
      );
    },
    unbind(el, binding) {
      if (binding.__redirectInjector__) {
        el.removeEventListener('click', binding.__redirectInjector__);
      }
    }
  }
}

/* istanbul ignore next */
function bindDirectiveAction(ctx, key, binding) {
  return () => {
    if (ctx.req.href === binding.value) return;
    if (/^http(s?)\:\/\//i.test(binding.value)) return ctx.link(binding.value);
    ctx[key](binding.value, binding.arg);
  }
}