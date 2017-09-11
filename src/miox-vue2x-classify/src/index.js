/**
 * Created by evio on 2016/11/23.
 */

import { componentFactory } from './instance/component';

export { createDecorator, removeMethodFromComponent, getComponentProperties } from './instance/util';
export prop from './instance/prop';
export life from './instance/life';
export watch from './instance/watch';
export filter from './instance/filter';

export function Component(options) {
    if (typeof options === 'function') {
        return componentFactory(options);
    }
    return function (Component) {
        return componentFactory(Component, options);
    };
}
