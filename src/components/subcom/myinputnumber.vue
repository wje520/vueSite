<template>
<div class="tmpl">
    <ul>
        <li @click='substract'>-</li>
        <li>{{count}}</li>
        <li @click='add'>+</li>
    </ul>
</div>
</template>

<script>
    export default {
        data() {
            return {
                count: 1
            }
        },
        // props用来接收父组件传入的值  规定options的格式：{gid:102,count:1}
        props: ['options'],
        created() {
            this.count = this.options.count;
        },
        methods: {
            substract() {
                this.count--;
            },
            add() {
                this.count++;
            }
        }
    }
</script>
<style scoped>
    .tmpl ul {
        width: 120px;
    }
    
    .tmpl li {
        list-style: none;
        border: 1px solid #cdcdcd;
        width: 30px;
        text-align: center;
        display: inline-block;
        cursor: pointer;
    }
</style>