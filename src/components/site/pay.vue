<template>
<div class="tmpl">
        <div class="section">
                <div class="location">
                    <span>当前位置：</span>
                    <a href="/index.html">首页</a> &gt;
                    <a href="javascript:;">支付中心</a>
                </div>
            </div>
            
            <div class="section">
                <div class="wrapper">
                    <div class="bg-wrap">
                        <div class="nav-tit pay">
                            <a href="javascript:;" class="selected">支付中心</a>
                        </div>
                        <div class="form-box payment">
                            <div class="el-row">
                                <div class="el-col el-col-16">
                                    <div class="el-row">
                                        <div class="el-col el-col-12">
                                            <dl class="form-group">
                                                <dt>订 单 号：</dt>
                                                <dd>{{orderinfo.order_no}}</dd>
                                            </dl>
                                        </div>
                                        <div class="el-col el-col-12">
                                            <dl class="form-group">
                                                <dt>收货人姓名：</dt>
                                                <dd>{{orderinfo.accept_name}}</dd>
                                            </dl>
                                        </div>
                                    </div>
                                    <div class="el-row">
                                        <div class="el-col el-col-12">
                                            <dl class="form-group">
                                                <dt>送货地址：</dt>
                                                <dd>{{orderinfo.area}}
                                                </dd>
                                            </dl>
                                        </div>
                                        <div class="el-col el-col-12">
                                            <dl class="form-group">
                                                <dt>手机号码：</dt>
                                                <dd >{{orderinfo.mobile}}</dd>
                                            </dl>
                                        </div>
                                    </div>
                                    <div class="el-row">
                                        <div class="el-col el-col-12">
                                            <dl class="form-group">
                                                <dt>支付金额：</dt>
                                                <dd>{{orderinfo.order_amount}} 元</dd>
                                            </dl>
                                        </div>
                                        <div class="el-col el-col-12">
                                            <dl class="form-group">
                                                <dt>支付方式：</dt>
                                                <dd>在线支付</dd>
                                            </dl>
                                        </div>
                                    </div>
                                    <div class="message">
                                        <span>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</span>
                                        <span>{{orderinfo.message}}</span>
                                    </div>
                                </div>
                                <div class="el-col el-col-8">
                                    <div id="container">
                                        二维码图片
                                        <canvas width="300" height="300"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            </div>
</div>
</template>

<script>
    //导入二维码jq插件
    import '../../../statics/site/js/jqplugins/qr/jqueryqr.js';

    export default {
        data() {
            return {
                orderinfo: {}
            }
        },
        created() {
            this.getorderlist();
        },
        mounted() {
            //在页面加载完成，引入jq插件
            $("#container").erweima({
                label: '扫一扫支付',
                text: 'www.baidu.com'
            });
        },
        methods: {
            getorderlist() {
                var orderid = this.$route.params.orderid;
                // console.log(orderid)
                var url = '/site/validate/order/getorder/' + orderid;
                this.$http.get(url).then(res => {
                    if (res.data.status == 1) {
                        return this.$message.error(res.data.message);
                    }
                    this.orderinfo = res.data.message[0]; //直接获取数组中的第0个---因为下一个单，就只有一个订单
                    console.log(this.orderinfo)
                })
            }
        }
    }
</script>
<style scoped>
    #container {
        float: left;
        margin-right: 20px;
    }
</style>