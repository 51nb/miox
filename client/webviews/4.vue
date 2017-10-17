<template>
    <div class="E">
        <p style="color:#000;">E Page</p>
    </div>
</template>
<script>
    import { Component, life } from 'miox-vue2x-classify';

    @Component({
        name: 'E'
    })
    export default class Index {
        @life beforeCreate() {
            console.log(4, 'beforeCreate');
        }

        @life created() {
            this.$parent.text = '5555';
            console.log(4, 'created');
        }
    }
</script>
