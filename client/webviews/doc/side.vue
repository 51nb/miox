<template>
    <div class="sidebar-box">
        <div class="version">
            <img src="https://img.shields.io/badge/Miox-4.0.3%20Beta-green.svg" alt="" />
        </div>
        <div class="sidebar-item" :class="{'sidebar-item--open': tree.hash===$store.state.hash}" v-for="tree in $store.state.tree" :key="tree.hash">
            <icon type="right" class="sidebar-item__toggle"></icon>
            <a href="javascript:void(0);" class="sidebar-item__title" v-redirect="url(tree.hash)">{{tree.name}}</a>
            <ul class="sidebar-item__anchors">
                <li class="sidebar-item__anchor" title="TypeScript" v-for="header in tree.headers" :key="header.name">
                    <a href="javascript:void(0);" v-redirect="hash(tree.hash, header.url)">{{header.name}}</a>
                </li>
            </ul>
        </div>
    </div>
</template>
<style lang="less" src="./side.less"></style>
<script>
    import { Component } from 'miox-vue2x';
    import { Icon } from '@u51/miox-vant';
    import store from '../../webstore/index';

    @Component({
        store,
        props: {
            which: String
        },
        serverCacheKey: (...args) => 'sider',
        components: {
            Icon
        }
    })
    export default class Side {
        url(hash) {
            return `/${this.which}/${hash}`;
        }
        hash(hash, key) {
            return `/${this.which}/${hash}${key}`;
        }
    }
</script>
