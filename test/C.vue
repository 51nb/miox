<template>
    <div class="C">
        <h1>C</h1>
        <ul>
            <li @click="" v-for="(value, key) in $store.state.url" v-go="value">Page [{{key}}]</li>
        </ul>
    </div>
</template>
<script>
    import { Component } from 'miox-vue2x-classify';
    import store from './store';

    @Component({
        store,
        name: 'C'
    })
    export default class C {}
</script>
