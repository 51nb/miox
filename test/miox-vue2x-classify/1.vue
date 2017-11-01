<template>
  <div id="test" v-choose>A</div>
</template>
<script>
import { Component, directive } from "miox-vue2x-classify";
import Vue from "vue";

@Component
export default class A extends Vue {
  time = 0;
  @directive
  choose(options) {
    options.inserted = function(el, binding, vnode) {
      vnode.context.time = 2;
    };
    return options;
  }
}
</script>