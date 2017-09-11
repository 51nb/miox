<template><i :class="cls"></i></template>
<script>
    import { Component } from 'miox-vue2x';

    @Component({
        props: {
            size: Number
        }
    })
    export default class NewComponent {
        get cls() {
            if (this.size) {
                return `editormd-logo-${this.size}x`;
            } else {
                return 'editormd-logo';
            }
        }
    }
</script>
