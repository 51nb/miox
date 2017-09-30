'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
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
    }
};
module.exports = exports['default'];