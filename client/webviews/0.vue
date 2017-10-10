<template>
    <ul>
        <li v-go="b">B</li>
        <li v-go="c">C</li>
        <li><a href="javascript:void(0);" v-link="d">Baidu</a></li>
    </ul>
</template>
<script>
    import { Component } from 'miox-vue2x-classify';

    @Component({
        name: 'A'
    })
    export default class Home {
        b = '/b?a=1';
        c = '/c';
        d = 'http://baidu.com'
    }
</script>
