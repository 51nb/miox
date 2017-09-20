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
    beforeCreate: function beforeCreate() {
        this.$miox.emit('webview:beforeCreate', this);
    },
    created: function created() {
        var _this = this;

        this.$nextTick(function () {
            _this.$emit('webview:created');
            _this.$miox.emit('webview:created', _this);
        });
    },
    beforeMount: function beforeMount() {
        this.$miox.emit('webview:beforeMount', this);
    },
    mounted: function mounted() {
        var _this2 = this;

        this.__MioxInjectElement__ = this.$el.parentNode;
        this.$nextTick(function () {
            _this2.$emit('webview:mounted');
            _this2.$miox.emit('webview:mounted', _this2);
        });
    },
    beforeUpdate: function beforeUpdate() {
        this.$miox.emit('webview:beforeUpdate', this);
    },
    updated: function updated() {
        this.$miox.emit('webview:updated', this);
    },
    activated: function activated() {
        this.$miox.emit('webview:activated', this);
    },
    deactivated: function deactivated() {
        this.$miox.emit('webview:deactivated', this);
    },
    beforeDestroy: function beforeDestroy() {
        this.$miox.emit('webview:beforeDestroy', this);
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
        MioxInjectActive: function MioxInjectActive() {
            var _this3 = this;

            return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _this3.$emit('webview:active');
                            case 1:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, _this3);
            }))();
        },
        MioxInjectEnter: function MioxInjectEnter() {
            var _this4 = this;

            return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _this4.$emit('webview:enter');
                            case 1:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, _this4);
            }))();
        },
        MioxInjectLeave: function MioxInjectLeave() {
            var _this5 = this;

            return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _this5.$emit('webview:leave');
                            case 1:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, _this5);
            }))();
        },
        MioxInjectWebviewSearchChange: function MioxInjectWebviewSearchChange(prev, next) {
            var _this6 = this;

            return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
                return _regenerator2.default.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _this6.$emit('webview:searchchange', prev, next);
                            case 1:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, _this6);
            }))();
        },
        MioxInjectWebviewHashChange: function MioxInjectWebviewHashChange(prev, next) {
            var _this7 = this;

            return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
                return _regenerator2.default.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                _this7.$emit('webview:hashchange', prev, next);
                            case 1:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, _this7);
            }))();
        }
    }
};
module.exports = exports['default'];