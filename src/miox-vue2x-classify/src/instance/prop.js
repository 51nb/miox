/**
 * Created by evio on 2016/11/23.
 */

import { createDecorator, removeMethodFromComponent } from "./util";

export default function prop(target, name, descriptor){
    if ( descriptor !== undefined ){
        return createDecorator(options => {
            (options.props || (options.props = {}));

            if ( typeof descriptor.value === 'function' ){
                let settings = {};

                const result = descriptor.value(settings);

                if ( result ){
                    settings = result;
                }

                options.props[name] = settings;
                removeMethodFromComponent(options, name);
            }
        })();
    } else {
        return createDecorator((options, key, desc) => {
            (options.props || (options.props = {}));

            if ( desc &&  typeof desc.value === 'function' ){
                let settings = {};
                const result = desc.value(settings);

                if ( result ){
                    settings = result;
                }

                if ( target ) {
                    settings.type = target;
                }

                options.props[key] = settings;
            } else {
                options.props[key] = target;
            }

            removeMethodFromComponent(options, key);
        });
    }
}

