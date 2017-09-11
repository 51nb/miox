/**
 * Created by evio on 16/10/26.
 */

export default {
    created() {
        this.$nextTick(() => this.$emit('webview:created'));
    },

    mounted() {
        this.__MioxInjectElement__ = this.$el.parentNode;
        this.$nextTick(() => {
            this.$emit('webview:mounted');
            this.$miox.emit('webview:mounted', this);
        });
    },

    destroyed() {
        if (this.__MioxInjectElement__ && this.__MioxInjectElement__.parentNode) {
            this.__MioxInjectElement__.parentNode.removeChild(this.__MioxInjectElement__);
        }
        this.$miox.emit('webview:destroyed', this);
    },

    methods: {
        MioxInjectDestroy(){ this.$destroy(); },

        MioxInjectWebviewActive() {
            this.$emit('webview:active');
            this.$miox.emit('webview:active', this);
        },

        MioxInjectWebviewUnActive() {
            this.$emit('webview:unActive');
            this.$miox.emit('webview:unActive', this);
        },

        async MioxInjectWebviewSearchChange(prev, next) {
            this.$emit('webview:searchchange', prev, next);
        },

        async MioxInjectWebviewHashChange(prev, next) {
            this.$emit('webview:hashchange', prev, next);
        },
    }
}