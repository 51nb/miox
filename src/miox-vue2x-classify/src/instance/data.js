/**
 * Created by evio on 2016/11/23.
 */

export function collectDataFromConstructor(vm, Component) {
    Component.prototype._init = function () {
        Object.getOwnPropertyNames(vm).forEach(key => {
            Object.defineProperty(this, key, {
                get: function () {
                    return vm[key];
                },
                set: function (value) {
                    vm[key] = value;
                    return vm[key];
                }
            });
        });
    };

    const data = new Component();
    const plainData = {};

    Object.keys(data).forEach(function (key) {
        if (data[key] !== undefined) {
            plainData[key] = data[key];
        }
    });

    return plainData;
}
