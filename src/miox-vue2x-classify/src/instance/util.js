/**
 * Created by evio on 2016/11/23.
 */

import { $decoratorQueue } from './component';

export const toString = Object.prototype.toString;
export const functionOwnProperties = Object.getOwnPropertyNames(function(){});
export function createDecorator(factory){
    return (_, key, index) => {
        $decoratorQueue.push(options => factory(options, key, index));
    };
}
export const lifeCycles = [
    'beforeCreate',
    'created',
    'beforeMount',
    'mounted',
    'beforeDestroy',
    'destroyed',
    'beforeUpdate',
    'updated',
    'activated',
    'deactivated'
];
export function removeMethodFromComponent(options, name){
    if ( options.methods && options.methods[name] ){
        delete options.methods[name];
    }
}
export function getComponentProperties(obj, cb){
    Object.getOwnPropertyNames(obj).forEach(cb);

    if ( obj.__proto__ ){
        getComponentProperties(obj.__proto__, cb);
    }
}
