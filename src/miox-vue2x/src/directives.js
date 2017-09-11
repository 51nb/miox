/**
 * Created by evio on 2017/3/22.
 */
import Vue from 'vue';
const keys = ['push', 'go', 'replace', 'redirect'];

export default function(ctx) {
    keys.forEach(key => {
        if ( typeof ctx[key] === 'function' ){
            Vue.prototype[`$${key}`] = (...args) => ctx[key].apply(ctx, args);
            Vue.directive(key, historyRedirect(ctx, key));
        }
    });
}

function historyRedirect(ctx, key) {
    const options = {};
    options.bind = (el, binding) => {
        el.addEventListener('click', binding.__redirectInjector__ = () => {
            const modifiers = binding.modifiers || {};
            const options = {};
            binding.realValue = binding.value;

            if ( ctx.history.url === binding.realValue ) return;

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
    }

    options.unbind = (el, binding) => {
        if (binding.__redirectInjector__) {
            el.removeEventListener('click', binding.__redirectInjector__);
        }
    }

    options.componentUpdated = (el, binding) => {
        binding.realValue = binding.value;
    }

    return options;
}