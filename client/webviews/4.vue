<template>
    <div class="E">
        <p style="color:#000;" v-dd>E Page {{time | list}}</p>
    </div>
</template>
<script>
import {
  Component,
  life,
  filter,
  watch,
  directive,
  error
} from "miox-vue2x-component-classify";

@Component({
  name: "E"
})
export default class Index {
  time = 'ccc';
  a = 1;

  @life created() {
    this.time = "5555";
  }

  @filter list(value) {
    return 'evio' + value;
  }

  @watch 'this.time'(...args) {
    console.log('watch change', ...args);
  }

  @watch('a') onAChange(...args) {
    console.log('watch change', ...args);
  }

  @directive dd() {
    return {
      inserted: function (el) {
        // 聚焦元素
        console.log('inserted');
      }
    }
  }

  @error renderError(h, err) {
    return h('pre', { style: { color: 'red' }}, err.stack);
  }

  @error errorCaptured(err, vm, info) {
    console.log(err, vm, info);
  }
}
</script>
