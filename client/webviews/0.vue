<template>
    <ul v-aaa>
        <li v-go:push="b">B</li>
        <li v-go="c">C</li>
        <li><a href="javascript:void(0);" v-link="d">Baidu</a></li>
        <v4></v4>
        <p>{{text}}</p>
    </ul>
</template>
<script>
    import { Component, life, watch, directive } from 'miox-vue2x-classify';
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
        time = 1;
        text = 'uuuuu';

        get ctime() {
            return this.time;
        }

        @life beforeCreate() {
            console.log(0, 'beforeCreate');
        }

        @life created() {
            console.log(0, 'created');
        }

        @life mounted() {
            setTimeout(() => {
                this.time = 2;
            }, 3000);
            // this.$on('webview:active', () => {
            //     alert(111111);
            // })
        }

        @watch 'this.ctime'(val) {
            console.log('change time to', val)
        }

        // @directive static aaa = {
        //     inserted() {
        //         console.log('inserted 2')
        //     }
        // }

        @directive aaa() {
            return {
                inserted() {
                    console.log('inserted 2')
                }
            }
        }
    }
</script>
