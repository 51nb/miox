<template>
    <ul>
        <li v-go="b">B</li>
        <li v-go="c">C</li>
        <li><a href="javascript:void(0);" v-link="d">Baidu</a></li>
        <v4></v4>
        <p>{{text}}</p>
    </ul>
</template>
<script>
    import { Component, life } from 'miox-vue2x-component-classify';
    import v4 from './4.vue';

    @Component({
        name: 'A',
        components: {
            v4
        }
    })
    export default class Home {
        b = '/b?a=1';
        c = '/c';
        d = 'http://baidu.com';
        text = 'uuuuu';

        @life beforeCreate() {
            console.log(0, 'beforeCreate');
        }

        @life created() {
            console.log(0, 'created');
        }
    }
</script>
