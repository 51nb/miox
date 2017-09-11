'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by evio on 16/10/26.
 */

exports.default = {
    created: function created() {
        var _this = this;

        this.$nextTick(function () {
            return _this.$emit('webview:created');
        });
    },
    mounted: function mounted() {
        var _this2 = this;

        this.__MioxInjectElement__ = this.$el.parentNode;
        this.$nextTick(function () {
            _this2.$emit('webview:mounted');
            _this2.$miox.emit('webview:mounted', _this2);
        });
    },
    destroyed: function destroyed() {
        if (this.__MioxInjectElement__ && this.__MioxInjectElement__.parentNode) {
            this.__MioxInjectElement__.parentNode.removeChild(this.__MioxInjectElement__);
        }
        this.$miox.emit('webview:destroyed', this);
    },


    methods: {
        MioxInjectDestroy: function MioxInjectDestroy() {
            this.$destroy();
        },
        MioxInjectWebviewActive: function MioxInjectWebviewActive() {
            this.$emit('webview:active');
            this.$miox.emit('webview:active', this);
        },
        MioxInjectWebviewUnActive: function MioxInjectWebviewUnActive() {
            this.$emit('webview:unActive');
            this.$miox.emit('webview:unActive', this);
        },
        MioxInjectWebviewSearchChange: function MioxInjectWebviewSearchChange(prev, next) {
            var _this3 = this;

            return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _this3.$emit('webview:searchchange', prev, next);

                            case 1:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, _this3);
            }))();
        },
        MioxInjectWebviewHashChange: function MioxInjectWebviewHashChange(prev, next) {
            var _this4 = this;

            return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _this4.$emit('webview:hashchange', prev, next);

                            case 1:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, _this4);
            }))();
        }
    }
};
module.exports = exports['default'];