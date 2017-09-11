/**
 * Created by evio on 2016/11/23.
 */

import { createDecorator, removeMethodFromComponent } from "./util";

export default function filter(target, name, descriptor){
    if ( descriptor !== undefined ){
        return createDecorator(options => {
            (options.filters || (options.filters = {}));

            if ( typeof descriptor.value === 'function' ){
                options.filters[name] = descriptor.value;
                removeMethodFromComponent(options, name);
            }
        })();
    } else {
        return createDecorator((options, key, desc) => {
            (options.filters || (options.filters = {}));
            const keyName = target || key;

            if ( desc &&  typeof desc.value === 'function' ){
                options.filters[keyName] = desc.value;
                removeMethodFromComponent(options, keyName);
            }
        });
    }
}

