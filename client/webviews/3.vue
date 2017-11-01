<template>
    <div class="D">
        <p style="color:#000;" @click="go">D Page</p>
    </div>
</template>
<script>
    import { Component } from 'miox-vue2x-classify';

    @Component({
        name: 'D'
    })
    export default class Index {
        go() {
            this.$miox.push('/e');
        }
    }
</script>
