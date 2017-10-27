<template>
<div class="tmpl">
        <div class="section">
                <div class="location">
                    <span>当前位置：</span>
                    <a href="/index.html">首页</a> &gt;
                    <a href="/cart.html">购物车</a>
                </div>
            </div>
            
            <div class="section">
                <div class="wrapper">
                    <div class="bg-wrap">
                        <!--购物车头部-->
                        <div class="cart-head clearfix">
                            <h2><i class="iconfont icon-cart"></i>我的购物车</h2>
                            <div class="cart-setp">
                                <ul>
                                    <li class="first active">
                                        <div class="progress">
                                            <span>1</span> 放进购物车
                                        </div>
                                    </li>
                                    <li class="active">
                                        <div class="progress">
                                            <span>2</span> 填写订单信息
                                        </div>
                                    </li>
                                    <li class="last">
                                        <div class="progress">
                                            <span>3</span> 支付/确认订单
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <!--购物车头部-->
                        <div class="cart-box">
                            <h2 class="slide-tit">
                                <span>1、收货地址</span>
                            </h2>
                            <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                            <div id="orderForm" name="orderForm">
                                <div class="form-box address-info">
                                        <el-row>
                                                <el-col :span='12' :offset='5'>
                                                    <el-form-item label='收货人：' prop='accept_name'>
                                                        <el-input v-model='form.accept_name'></el-input>
                                                    </el-form-item>
                                                </el-col>
                                        </el-row>
                                        <!-- 所属区域 -->
                                        <el-row>
                                                <el-col :span='13' :offset='5'>
                                                    <el-form-item label='所属地区：' prop='accept_name'>
                                                        <v-distpicker @selected="onSelected"></v-distpicker>
                                                    </el-form-item>
                                                </el-col>
                                        </el-row>
                                        
                                        <el-row>
                                                <el-col :span='12' :offset='5'>
                                                    <el-form-item label='详细地址：' prop='address'>
                                                        <el-input v-model='form.address'></el-input>
                                                    </el-form-item>
                                                </el-col>
                                            </el-row>
                                            <el-row>
                                                <el-col :span='12' :offset='5'>
                                                    <el-form-item label='手机号码：' prop='mobile'>
                                                        <el-input v-model='form.mobile'></el-input>
                                                    </el-form-item>
                                                </el-col>
                                            </el-row>
                                            <el-row>
                                                <el-col :span='12' :offset='5'>
                                                    <el-form-item label='电子邮箱：' prop='email'>
                                                        <el-input v-model='form.email'></el-input>
                                                    </el-form-item>
                                                </el-col>
                                            </el-row>
                                            <el-row>
                                                <el-col :span='12' :offset='5'>
                                                    <el-form-item label='邮政编码：' prop='post_code'>
                                                        <el-input v-model='form.post_code'></el-input>
                                                    </el-form-item>
                                                </el-col>
                                            </el-row>
                                </div>
                                <h2 class="slide-tit">
                                    <span>2、支付方式</span>
                                </h2>
                                <ul class="item-box clearfix">
                                    <!--取得一个DataTable-->
                                    <li>
                                       <el-radio v-model='form.payment_id' label='6'>在线支付</el-radio>
                                    </li>
                                </ul>
                                <h2 class="slide-tit">
                                    <span>3、配送方式</span>
                                </h2>
                                    <!--取得一个DataTable-->
                                    <el-radio-group v-model="form.express_id" class="item-box clearfix">
                                        <!-- 这里要遍历 -->
                                            <el-radio :label="1" >顺丰快递</el-radio>
                                    </el-radio-group>
                                <h2 class="slide-tit">
                                    <span>4、商品清单</span>
                                </h2>
                                <div class="line15"></div>
                                <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                                    <tbody>
                                        <tr>
                                            <th colspan="2" align="left">商品信息</th>
                                            <th width="84" align="left">单价</th>
                                            <th width="84" align="center">购买数量</th>
                                            <th width="104" align="left">金额(元)</th>
                                        </tr>
                                        <tr>
                                            <td width="68">
                                                <a target="_blank" href="/goods/show-89.html">
                                                    <img src="" class="img">
                                                </a>
                                            </td>
                                            <td>
                                                <a target="_blank" href="/goods/show-89.html">小米（Mi）小米Note 16G双网通版</a>
                                            </td>
                                            <td>
                                                <span class="red">￥2299.00</span>
                                            </td>
                                            <td align="center">1</td>
                                            <td>
                                                <span class="red">￥2299.00</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="line15"></div>
                                <h2 class="slide-tit">
                                    <span>5、结算信息</span>
                                </h2>
                                <div class="buy-foot clearfix">
                                    <div class="left-box">
                                        <dl>
                                            <dt>订单备注(100字符以内)</dt>
                                            <dd>
                                                <textarea name="message" class="input" style="height:35px;"></textarea>
                                            </dd>
                                        </dl>
                                    </div>
                                    <div class="right-box">
                                        <p>
                                            商品 <label class="price">1</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                                            <label id="goodsAmount" class="price">2299.00</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                                        </p>
                                        <p>
                                            运费：￥<label id="expressFee" class="price">0.00</label> 元
                                        </p>
                                        <p class="txt-box">
                                            应付总金额：￥<label id="totalAmount" class="price">2299.00</label>
                                        </p>
                                        <p class="btn-box">
                                            <a class="btn button" href="/cart.html">返回购物车</a>
                                            <input id="btnSubmit" name="btnSubmit" type="submit" value="确认提交" class="btn submit">
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </el-form>
                        </div>
                    </div>
                </div>
            </div>
            </div>
</div>
</template>

<script>
    // 导入VDistpicker省市区级联组件
    import VDistpicker from 'v-distpicker'
    export default {
        //注册私有组件
        components: {
            VDistpicker
        },
        data() {
            var checkMobile = (rule, value, callback) => {
                var reg = /^13[0-9]{9}|15[012356789][0-9]{8}|18[0256789][0-9]{8}|147[0-9]{8}$/;
                if (!reg.test(value)) {
                    return callback(new Error('手机号格式错误'));
                }
                callback();
            }
            var checkEmail = (rule, value, callback) => {
                var reg = /^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$/;
                if (!reg.test(value)) {
                    return callback(new Error('邮箱格式错误'));
                }
                callback();
            }
            var checkPostCode = (rule, value, callback) => {
                var reg = /^\\d{6}$/;
                if (!reg.test(value)) {
                    return callback(new Error('邮编格式错误'))
                }
                callback();
            }
            return {
                form: {
                    "goodsAmount": 0,
                    "expressMoment": 0,
                    "accept_name": "",
                    "area": {},
                    "address": "",
                    "mobile": "",
                    "email": "",
                    "post_code": "",
                    "payment_id": "6",
                    "express_id": "1",
                    "message": "",
                    "goodsids": "",
                    "cargoodsobj": {}
                },
                rules: {
                    accept_name: [{
                        required: true,
                        message: '姓名不能为空',
                        trigger: 'blur'
                    }],
                    address: [{
                        required: true,
                        message: '地址不能为空',
                        trigger: 'blur'
                    }],
                    mobile: [{
                        validator: checkMobile,
                        trigger: 'blur'
                    }],
                    email: [{
                        validator: checkEmail,
                        trigger: 'blur'
                    }],
                    post_code: [{
                        validator: checkPostCode,
                        trigger: 'blur'
                    }]
                }
            }
        },
        methods: {
            getcargoodsList() {

                var url = '/site/comment/getshopcargoods/'
            },
            onSelected(data) {
                // alert(data.province + ' | ' + data.city + ' | ' + data.area)
                // console.log(data)

            },
        }
    }
</script>
<style scoped>

</style>