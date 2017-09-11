/**
 * Created by evio on 2016/11/23.
 */
import Vue from 'vue';
import { collectDataFromConstructor } from './data';
import { lifeCycles, getComponentProperties, functionOwnProperties } from './util';

export let $decoratorQueue = [];
export function componentFactory(Component, options) {
    if (options === void 0) {
        options = {};
    }
    options.name = options.name || Component._componentTag || Component.name || Component.constructor.name || Component.prototype.name || 'VueComponent';
    const proto = Component.prototype;
    const pool = [];
    const statics = {};

    Object.getOwnPropertyNames(Component).forEach(key => {
        if ( functionOwnProperties.indexOf(key) === -1 ) {
            statics[key] = Component[key];
        }
    });

    getComponentProperties(proto, key => {
        if (
            key === 'constructor'   ||
            /^[\$\_]/.test(key)     ||
            pool.indexOf(key) > -1  ||
            lifeCycles.indexOf(key) > -1
        ) {
            return;
        }

        pool.push(key);

        if ( key === 'render' ){
            options.render = proto.render;
            return;
        }

        if ( key === 'template' ){
            options.template = proto.template();
            return;
        }

        const descriptor = Object.getOwnPropertyDescriptor(proto, key);

        if ( !descriptor ) return;

        if (typeof descriptor.value === 'function') {
            (options.methods || (options.methods = {}))[key] = descriptor.value;
        } else if (descriptor.get || descriptor.set) {
            (options.computed || (options.computed = {}))[key] = {
                get: descriptor.get,
                set: descriptor.set
            };
        }
    });

    (options.mixins || (options.mixins = [])).push({
        data: function () {
            return collectDataFromConstructor(this, Component);
        }
    });

    $decoratorQueue.forEach(fn => fn(options));
    $decoratorQueue = [];

    const superProto = Object.getPrototypeOf(Component.prototype);
    const Super = superProto instanceof Vue
        ? superProto.constructor
        : Vue;
    const outComponent = Super.extend(options);

    for ( let outs in statics ){
        try{
            outComponent[outs] = statics[outs];
        }catch(e){}
    }

    return outComponent;
}

