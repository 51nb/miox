/**
 * Created by evio on 16/10/26.
 */

export default {
    beforeCreate() {
        this.$miox.emit('webview:beforeCreate', this);
    },

    created() {
        this.$nextTick(() => {
            this.$emit('webview:created');
            this.$miox.emit('webview:created', this);
        });
    },

    beforeMount() {
        this.$miox.emit('webview:beforeMount', this);
    },

    mounted() {
        this.__MioxInjectElement__ = this.$el.parentNode;
        this.$nextTick(() => {
            this.$emit('webview:mounted');
            this.$miox.emit('webview:mounted', this);
        });
    },

    beforeUpdate() {
        this.$miox.emit('webview:beforeUpdate', this);
    },

    updated() {
        this.$miox.emit('webview:updated', this);
    },

    activated() {
        this.$miox.emit('webview:activated', this);
    },

    deactivated() {
        this.$miox.emit('webview:deactivated', this);
    },

    beforeDestroy() {
        this.$miox.emit('webview:beforeDestroy', this);
    },

    destroyed() {
        if (this.__MioxInjectElement__ && this.__MioxInjectElement__.parentNode) {
            this.__MioxInjectElement__.parentNode.removeChild(this.__MioxInjectElement__);
        }
        this.$miox.emit('webview:destroyed', this);
    },

    methods: {
        MioxInjectDestroy(){ this.$destroy(); },
        async MioxInjectActive() { this.$emit('webview:active'); },
        async MioxInjectEnter() { this.$emit('webview:enter'); },
        async MioxInjectLeave() { this.$emit('webview:leave'); },
        async MioxInjectWebviewSearchChange(prev, next) { this.$emit('webview:searchchange', prev, next); },
        async MioxInjectWebviewHashChange(prev, next) { this.$emit('webview:hashchange', prev, next); }
    }
}