/**
 * Created by evio on 2016/11/23.
 */
import { createDecorator, removeMethodFromComponent } from "./util";

export default function watch(target, name, descriptor){
    if ( descriptor !== undefined ){
        return createDecorator(options => {
            (options.watch || (options.watch = {}));

            if ( typeof descriptor.value === 'function' ){
                options.watch[name] = descriptor.value;
                removeMethodFromComponent(options, name);
            }
        })();
    } else {
        return createDecorator((options, key, desc) => {
            (options.watch || (options.watch = {}));
            const keyName = target || key;

            if ( desc &&  typeof desc.value === 'function' ){
                options.watch[keyName] = desc.value;
                removeMethodFromComponent(options, keyName);
            }
        });
    }
}
