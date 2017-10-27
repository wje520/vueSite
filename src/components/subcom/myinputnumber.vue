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
                this.sendfather();
            },
            add() {
                this.count++;
                this.sendfather();
            },
            sendfather() {
                this.$emit('updata', {
                    gid: this.options.gid,
                    count: this.count //这里直接取当前组件的vm中的count
                });
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