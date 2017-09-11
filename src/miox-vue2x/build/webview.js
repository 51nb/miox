'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _desc, _value, _class2; /**
                                     * Created by evio on 16/10/26.
                                     */

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _mioxVue2xClassify = require('miox-vue2x-classify');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
        Object['define' + 'Property'](target, property, desc);
        desc = null;
    }

    return desc;
}

var Webview = (0, _mioxVue2xClassify.Component)(_class = (_class2 = function (_Vue) {
    (0, _inherits3.default)(Webview, _Vue);

    function Webview() {
        (0, _classCallCheck3.default)(this, Webview);
        return (0, _possibleConstructorReturn3.default)(this, (Webview.__proto__ || Object.getPrototypeOf(Webview)).apply(this, arguments));
    }

    (0, _createClass3.default)(Webview, [{
        key: 'created',
        value: function created() {
            var _this2 = this;

            this.$nextTick(function () {
                return _this2.$emit('webview:created');
            });
        }
    }, {
        key: 'mounted',
        value: function mounted() {
            var _this3 = this;

            this.__MioxInjectElement__ = this.$el.parentNode;
            this.$nextTick(function () {
                _this3.$emit('webview:mounted');
                _this3.$miox.emit('webview:mounted', _this3);
            });
        }
    }, {
        key: 'destroyed',
        value: function destroyed() {
            if (this.__MioxInjectElement__ && this.__MioxInjectElement__.parentNode) {
                this.__MioxInjectElement__.parentNode.removeChild(this.__MioxInjectElement__);
            }
            this.$miox.emit('webview:destroyed', this);
        }
    }, {
        key: 'MioxInjectDestroy',
        value: function MioxInjectDestroy() {
            this.$destroy();
        }
    }, {
        key: 'MioxInjectLocalRefresh',
        value: function MioxInjectLocalRefresh() {
            var _this4 = this;

            var refresher = !!this._events.refresh;
            if (refresher) {
                return function (newValue, oldValue) {
                    _this4.$emit('refresh', newValue, oldValue);
                };
            }
        }
    }, {
        key: 'MioxInjectWebviewActive',
        value: function MioxInjectWebviewActive() {
            this.$emit('webview:active');
            this.$miox.emit('webview:active', this);
        }
    }, {
        key: 'MioxInjectWebviewUnActive',
        value: function MioxInjectWebviewUnActive() {
            this.$emit('webview:unActive');
            this.$miox.emit('webview:unActive', this);
        }
    }, {
        key: 'MioxInjectWebviewSearchChange',
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(prev, next) {
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                this.$emit('webview:searchchange', prev, next);

                            case 1:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function MioxInjectWebviewSearchChange(_x, _x2) {
                return _ref.apply(this, arguments);
            }

            return MioxInjectWebviewSearchChange;
        }()
    }, {
        key: 'MioxInjectWebviewHashChange',
        value: function () {
            var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(prev, next) {
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                this.$emit('webview:hashchange', prev, next);

                            case 1:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function MioxInjectWebviewHashChange(_x3, _x4) {
                return _ref2.apply(this, arguments);
            }

            return MioxInjectWebviewHashChange;
        }()
    }]);
    return Webview;
}(_vue2.default), (_applyDecoratedDescriptor(_class2.prototype, 'created', [_mioxVue2xClassify.life], Object.getOwnPropertyDescriptor(_class2.prototype, 'created'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'mounted', [_mioxVue2xClassify.life], Object.getOwnPropertyDescriptor(_class2.prototype, 'mounted'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'destroyed', [_mioxVue2xClassify.life], Object.getOwnPropertyDescriptor(_class2.prototype, 'destroyed'), _class2.prototype)), _class2)) || _class;

exports.default = Webview;
module.exports = exports['default'];