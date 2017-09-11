<template>
    <div class="A">A{{a}}:{{b}}</div>
</template>
<script>
    import { Component } from 'miox-vue2x-classify';

    @Component({
        name: 'A',
        props: {
            a: Number,
            b: Number
        }
    })
    export default class A {}
</script>
