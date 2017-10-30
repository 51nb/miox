<template>
    <div class="dist">
        <h1>tezxt</h1>
        <div class="most" ref="el"></div>
    </div>
</template>
<style lang="less" type="text/less">
.dist,
.most {
  width: 100%;
  height: 100%;
}
</style>
<script>
import { Component } from "miox-vue2x-component-classify";
import Engine from "miox-vue2x";

@Component
export default class Page extends Engine.WebView {
  get mioxContainerElement() {
    console.log(this);
    return this.$refs.el;
  }
}
</script>