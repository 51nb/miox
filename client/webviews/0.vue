<template>
    <div class="A">
        <p style="color:#000;" @click="go">A Page</p>
    </div>
</template>
<script>
    import { Component } from 'miox-vue2x-classify';

    @Component({
        name: 'A'
    })
    export default class Home {
        go() {
            this.$miox.push('/b');
        }
    }
</script>
