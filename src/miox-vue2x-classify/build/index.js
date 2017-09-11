'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.filter = exports.watch = exports.life = exports.prop = exports.getComponentProperties = exports.removeMethodFromComponent = exports.createDecorator = undefined;

var _util = require('./instance/util');

Object.defineProperty(exports, 'createDecorator', {
    enumerable: true,
    get: function get() {
        return _util.createDecorator;
    }
});
Object.defineProperty(exports, 'removeMethodFromComponent', {
    enumerable: true,
    get: function get() {
        return _util.removeMethodFromComponent;
    }
});
Object.defineProperty(exports, 'getComponentProperties', {
    enumerable: true,
    get: function get() {
        return _util.getComponentProperties;
    }
});
exports.Component = Component;

var _component = require('./instance/component');

var _prop2 = require('./instance/prop');

var _prop3 = _interopRequireDefault(_prop2);

var _life2 = require('./instance/life');

var _life3 = _interopRequireDefault(_life2);

var _watch2 = require('./instance/watch');

var _watch3 = _interopRequireDefault(_watch2);

var _filter2 = require('./instance/filter');

var _filter3 = _interopRequireDefault(_filter2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.prop = _prop3.default;
exports.life = _life3.default;
exports.watch = _watch3.default;
exports.filter = _filter3.default;
function Component(options) {
    if (typeof options === 'function') {
        return (0, _component.componentFactory)(options);
    }
    return function (Component) {
        return (0, _component.componentFactory)(Component, options);
    };
}