<template>
    <div>
        <h1>局部属性功能测试</h1>
        <p>时间戳：{{time}}</p>
        <p>局部属性点：{{path}}</p>
        <ul>
            <li><a href="javascript:void(0);" v-redirect="'/test/2'">go</a></li>
        </ul>
    </div>
</template>
<script>
    import {Component, life} from 'miox-vue2x';

    @Component
    export default class NewComponent {
        time = new Date().getTime();
        path = null;
        @life created() {
            this.$on('refresh', (a, b) => {
                this.path = a.pathname;
            });
        }
    }
</script>
