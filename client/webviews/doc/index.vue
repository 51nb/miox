<template>
    <div class="doc">
        <x-header></x-header>
        <div class="container" style="padding-bottom: 100px;">
            <flex blocked align="left" valign="top">
                <flex :span="1">
                    <sider :which="which"></sider>
                </flex>
                <flex :span="3" style="width: 750px;">
                    <div class="markdown page__content" v-if="$store.getters.current" v-html="$store.getters.current.content"></div>
                    <div style="height: 700px" v-else></div>
                </flex>
            </flex>
        </div>
        <x-footer></x-footer>
    </div>
</template>
<style lang="less" src="./index.less"></style>
<script>
    import { Component } from 'miox-vue2x';
    import store from '../../webstore/index';
    import Header from '../../components/header/index.vue';
    import Footer from '../../components/footer/index.vue';
    import Sider from './side.vue';
    import { Flex } from '@u51/miox-vant';

    @Component({
        store,
        props: {
            which: String
        },
        components: {
            Flex, Sider,
            'x-header': Header,
            'x-footer': Footer
        }
    })
    export default class Page {}
</script>
