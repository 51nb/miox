<template>
    <div class="doc-footer">
        <div class="container line">
            <flex blocked valign="middle">
                <flex :span="1" align="left" class="link">
                    <a href="http://web.51.nb/">Publisher</a>
                    <a href="http://wiki.51.nb/">Wiki</a>
                    <a href="http://vant.51.nb/">Vant</a>
                </flex>
                <flex :span="1" align="center" valign="middle"><miox-icon class="logo"></miox-icon></flex>
                <flex :span="1" align="right">U51信用卡管家最牛逼的前端团队出品</flex>
            </flex>
        </div>
    </div>
</template>
<style src="./index.less" lang="less"></style>
<script>
    import {Component} from 'miox-vue2x';
    import { Flex } from '@u51/miox-vant';
    import MioxIcon from '../miox-icon/index.vue';

    @Component({
        components: {
            Flex,
            'miox-icon': MioxIcon
        }
    })
    export default class NewComponent {

    }
</script>
