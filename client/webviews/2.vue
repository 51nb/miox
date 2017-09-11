<template>
    <div class="doc">
        <div class="container" style="padding-bottom: 100px;">
            <flex style="width: 100%;height:500px; text-align: center; font-size: 20px;" align="center" valign="middle">
                <div>
                    <p style="color:#000;" @click="go">22222</p>
                    <p style="color:#aaa; margin-top: 30px;">xxxxxxxx!</p>
                </div>
            </flex>
        </div>
    </div>
</template>
<script>
    import { Component } from 'miox-vue2x';
    import store from '../webstore/index';
    import { Flex } from '@u51/miox-vant';

    @Component({
        store,
        name: 'D',
        components: {
            Flex
        }
    })
    export default class Index {
        go() {
            this.$miox.push('/e');
        }
    }
</script>
