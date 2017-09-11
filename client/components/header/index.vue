<template>
    <div class="doc-header">
        <div class="container" style="height:100%;">
            <flex align="between" valign="middle" blocked fulled>
                <flex class="left" valign="middle" align="left">
                    <span class="logo"><miox-icon></miox-icon>iox</span>
                    <a href="javascript:void(0);">Guide</a>
                    <a href="javascript:void(0);">API</a>
                    <a href="javascript:void(0);">Test</a>
                </flex>
                <div class="right">
                    <a href="http://git.51.nb/web-common/miox" target="_blank"><icon type="github"></icon></a>
                </div>
            </flex>
        </div>
    </div>
</template>
<style lang="less" src="./index.less"></style>
<script>
    import { Component } from 'miox-vue2x';
    import MioxIcon from '../miox-icon/index.vue';
    import { Flex, Icon } from '@u51/miox-vant';

    @Component({
        components: {
            Flex, Icon,
            'miox-icon': MioxIcon
        }
    })
    export default class Header {

    }
</script>
