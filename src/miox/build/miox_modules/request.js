'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _util = require('../lib/util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by evio on 2017/8/29.
 */
var Request = function () {
    function Request() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '/';
        (0, _classCallCheck3.default)(this, Request);

        if (typeof options === 'string') {
            this.options = _url2.default.parse(options, true);
        } else {
            this.options = options;
        }

        this.__defineMixinRequest__();
    }

    (0, _createClass3.default)(Request, [{
        key: '__defineMixinRequest__',
        value: function __defineMixinRequest__() {
            for (var req in this.options) {
                if (typeof this.options[req] === 'function') {
                    this[req] = this.options[req].bind(this.options);
                } else {
                    this[req] = this.options[req];
                }
            }

            var sortSearch = (0, _util.sortURI)(this.query || {});
            this.sortQuery = sortSearch;
            this.mark = this.pathname + (sortSearch ? ':' + sortSearch : '');
        }
    }]);
    return Request;
}();

exports.default = Request;
module.exports = exports['default'];