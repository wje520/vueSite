<template>
<div class="tmpl">
    <div>
        <!-- <span>{{amount}}</span> -->
        <el-button type='success' @click='payment'>支付</el-button>
    </div>
</div>
</template>

<script>
    export default {
        data() {
            return {
                //总金额该怎么传递过来？
                // amount: this.$route.params.amount
            }
        },
        methods: {
            //调支付接口，支付成功后跳转
            payment() {
                var orderid = this.$route.params.orderid;
                var url = '/site/validate/order/pay/' + orderid;
                this.$http.get(url).then(res => {
                    this.$router.push({
                        name: 'paysuccess'
                    });
                })
            }
        }
    }
</script>
<style scoped>

</style>