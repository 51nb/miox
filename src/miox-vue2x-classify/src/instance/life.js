/**
 * Created by evio on 2016/11/23.
 */
import { createDecorator, lifeCycles, removeMethodFromComponent } from "./util";

export default function life(name, markName, _desc){
    if ( _desc !== undefined ){
        return createDecorator(options => {
            if ( lifeCycles.indexOf(markName) === -1 ){
                throw new Error('错误的生命周期函数', markName);
            }
            if ( options[markName] ) {
                const prevFeedback = options[markName];

                options[markName] = function(){
                    prevFeedback.call(this);
                    _desc.value.call(this);
                }
            } else {
                options[markName] = _desc.value;
            }

            removeMethodFromComponent(options, markName);
        })();
    } else {
        if ( typeof name === 'string' && lifeCycles.indexOf(name) === -1 ){
            throw new Error('错误的生命周期函数', name);
        }
        return createDecorator((options, key, desc) => {
            const keyName = name || key;

            if ( options[keyName] ) {
                const prevFeedback = options[keyName];

                options[keyName] = function(){
                    prevFeedback.call(this);
                    desc.value.call(this);
                }
            } else {
                options[keyName] = desc.value;
            }

            removeMethodFromComponent(options, keyName);
        });
    }
}
