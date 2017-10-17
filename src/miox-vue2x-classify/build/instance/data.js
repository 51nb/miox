"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.collectDataFromConstructor = collectDataFromConstructor;
/**
 * Created by evio on 2016/11/23.
 */

function collectDataFromConstructor(vm, Component) {
    Component.prototype._init = function () {
        var _this = this;

        Object.getOwnPropertyNames(vm).forEach(function (key) {
            Object.defineProperty(_this, key, {
                get: function get() {
                    return vm[key];
                },
                set: function set(value) {
                    vm[key] = value;
                    return vm[key];
                }
            });
        });
    };

    var data = new Component();
    var plainData = {};

    Object.keys(data).forEach(function (key) {
        if (data[key] !== undefined) {
            plainData[key] = data[key];
        }
    });

    return plainData;
}