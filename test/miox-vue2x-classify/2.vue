<template>
  <div id="filter">{{time | ft}}</div>
</template>
<script>
import { Component, filter } from "miox-vue2x-classify";
import Vue from "vue";

@Component
export default class A extends Vue {
  time = 'hello';
  @filter
  ft(val) {
    return val + 'evio';
  }
}
</script>