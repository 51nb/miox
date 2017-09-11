/**
 * Created by evio on 16/10/26.
 */

import Vue from 'vue';
import { Component, life } from 'miox-vue2x-classify';

@Component
export default class Webview extends Vue {

    @life created() {
        this.$nextTick(() => this.$emit('webview:created'));
    }

    @life mounted() {
        this.__MioxInjectElement__ = this.$el.parentNode;
        this.$nextTick(() => {
            this.$emit('webview:mounted');
            this.$miox.emit('webview:mounted', this);
        });
    }

    @life destroyed(){
        if (this.__MioxInjectElement__ && this.__MioxInjectElement__.parentNode) {
            this.__MioxInjectElement__.parentNode.removeChild(this.__MioxInjectElement__);
        }
        this.$miox.emit('webview:destroyed', this);
    }

    MioxInjectDestroy(){ this.$destroy(); }

    MioxInjectLocalRefresh() {
        const refresher = !!this._events.refresh;
        if (refresher) {
            return (newValue, oldValue) => {
                this.$emit('refresh', newValue, oldValue);
            }
        }
    }

    MioxInjectWebviewActive() {
        this.$emit('webview:active');
        this.$miox.emit('webview:active', this);
    }

    MioxInjectWebviewUnActive() {
        this.$emit('webview:unActive');
        this.$miox.emit('webview:unActive', this);
    }

    async MioxInjectWebviewSearchChange(prev, next) {
        this.$emit('webview:searchchange', prev, next);
    }

    async MioxInjectWebviewHashChange(prev, next) {
        this.$emit('webview:hashchange', prev, next);
    }
}