<template>
    <div class="C">
        <p style="color:#000;" @click="go">C Page</p>
    </div>
</template>
<script>
    import { Component } from 'miox-vue2x-classify';

    @Component({
        name: 'C'
    })
    export default class Index {
        go() {
            this.$miox.push('/d');
        }
    }
</script>
