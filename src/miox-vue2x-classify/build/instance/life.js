'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = life;

var _util = require('./util');

function life(name, markName, _desc) {
    if (_desc !== undefined) {
        return (0, _util.createDecorator)(function (options) {
            if (_util.lifeCycles.indexOf(markName) === -1) {
                throw new Error('错误的生命周期函数', markName);
            }
            if (options[markName]) {
                var prevFeedback = options[markName];

                options[markName] = function () {
                    prevFeedback.call(this);
                    _desc.value.call(this);
                };
            } else {
                options[markName] = _desc.value;
            }

            (0, _util.removeMethodFromComponent)(options, markName);
        })();
    } else {
        if (typeof name === 'string' && _util.lifeCycles.indexOf(name) === -1) {
            throw new Error('错误的生命周期函数', name);
        }
        return (0, _util.createDecorator)(function (options, key, desc) {
            var keyName = name || key;

            if (options[keyName]) {
                var prevFeedback = options[keyName];

                options[keyName] = function () {
                    prevFeedback.call(this);
                    desc.value.call(this);
                };
            } else {
                options[keyName] = desc.value;
            }

            (0, _util.removeMethodFromComponent)(options, keyName);
        });
    }
} /**
   * Created by evio on 2016/11/23.
   */
module.exports = exports['default'];