'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Animater;

require('./index.scss');

var _animate = require('./animate');

var _animate2 = _interopRequireDefault(_animate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Animater(name) {
    return function (app) {
        return new _animate2.default(app, name);
    };
}

Animater.hashChange = function hashChange() {
    return function (app) {
        app.set('hashchange', function (webview) {
            var node = webview.__MioxInjectElement__;
            var hash = app.history.uri.hash;
            var hashElement = node.querySelector(hash);
            node.scrollTop = hashElement.offsetTop;
        });
    };
};
module.exports = exports['default'];