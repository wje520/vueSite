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
                                    <li>
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
                        <!--商品列表-->
                        <div class="cart-box">
                            <input id="jsondata" name="jsondata" type="hidden">
                            <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                                <tbody>
                                    <tr>
                                        <th width="48" align="center">
                                            <el-button type='success' size='primary' @click='selectAll' v-model='isselectAll'>{{selecttxt}}</el-button>
                                        </th>
                                        <th align="left" colspan="2">商品信息</th>
                                        <th width="84" align="left">单价</th>
                                        <th width="104" align="center">金额（元）</th>
                                        <th width="104" align="left">数量</th>
                                        <th width="54" align="center">操作</th>
                                    </tr>
                                    <!-- 没有商品时显示 -->
                                    <tr v-if='cargList.length<=0'>
                                        <td colspan="10">
                                            <div class="msg-tips">
                                                <div class="icon warning"><i class="iconfont icon-tip"></i></div>
                                                <div class="info">
                                                    <strong>购物车没有商品！</strong>
                                                    <p>您的购物车为空，<a href="/index.html">马上去购物</a>吧！</p>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <!-- 显示购物车的商品信息 -->
                                    <tr v-for='(item,index) in cargList' :key='item.id'>
                                            <td width="48" align="center">
                                               <el-switch v-model='values[index]' on-text='已选' off-text='未选' @change='itemChange'></el-switch>
                                            </td>
                                            <td align="left" colspan="2">
                                                <img  width='50' height='50' :src="item.img_url" alt="">
                                                <span>{{item.title}}</span>
                                            </td>
                                            <td width="84" align="left">{{item.sell_price}}</td>
                                            <td width="104" align="left" style="text-align:center">{{item.sell_price*item.buycount}}</td>
                                            <td width="104" align="left" >{{item.buycount}}</td>
                                            <td width="54" align="center">
                                                <el-button type='danger' size='mini'>删除</el-button>
                                            </td>
                                    </tr>
                                    <tr>
                                        <th align="right" colspan="8">
                                            已选择商品 <b class="red" id="totalQuantity">{{selectCount}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                            <span class="red">￥</span><b class="red" id="totalAmount">{{selectAmount}}</b>元
                                        </th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <!--/商品列表-->
                        <!--购物车底部-->
                        <div class="cart-foot clearfix">
                            <div class="right-box">
                                <button class="button" onclick="javascript:location.href='/index.html';">继续购物</button>
                                <button class="submit" onclick="formSubmit(this, '/', '/shopping.html');">立即结算</button>
                            </div>
                        </div>
                        <!--购物车底部-->
                    </div>
                </div>
            </div>
</div>
</template>

<script>
    //导入帮助类  获取商品种类（即商品id）
    import {
        getItem
    } from '../../kits/localStorageKit.js';

    export default {
        data() {
            return {
                selectCount: 0,
                isselectAll: false,
                selecttxt: '全选',
                values: [],
                cargList: []
            }
        },
        created() {
            this.getcarglist();
        },
        //使用计算属性统计商品数量
        computed: {
            selectAmount() {
                var trueArr = this.values.filter(item => {
                    return item;
                });
                this.selectCount = trueArr.length;
                var totalAmount = 0;
                this.values.forEach((item, index) => {
                    if (item) { //item为true  说明是已勾选的
                        var gitem = this.cargList[index]; //获取勾选的购物车列表的对应项
                        totalAmount += gitem.sell_price * gitem.buycount; //+=计算所有的和，否则只能单独计算某一项
                    }
                });
                return totalAmount;
            }
        },
        methods: {
            //全选和取消功能
            selectAll() {

                this.isselectAll = !this.isselectAll; //做一个toggle
                if (this.isselectAll) {
                    this.selecttxt = '取消';
                } else {
                    this.selecttxt = '全选';
                }
                // 控制其他按钮，实现全选和取消
                for (var i = 0; i < this.values.length; i++) {
                    this.values[i] = this.isselectAll;
                }


            },
            itemChange(selected) {
                // console.log(11)
                if (!selected) {
                    this.isselectAll = false;
                    this.selecttxt = '全选';
                }
                //以下实现values全为true，修改全选的状态
                var trueArr = this.values.filter(item => {
                    return item;
                });
                // console.log(trueArr)
                if (trueArr.length == this.values.length) {
                    this.isselectAll = true;
                    this.selecttxt = '取消';
                }
            },
            getcarglist() {
                // 获取所有的商品id
                var goodsObj = getItem();
                var keyArr = [];
                for (var key in goodsObj) {
                    keyArr.push(key);
                }
                var ids = keyArr.join(',');
                var url = '/site/comment/getshopcargoods/' + ids;
                this.$http.get(url).then(res => {
                    if (res.data.status == 1) {
                        return this.$message.error(res.data.message);
                    }
                    this.cargList = res.data.message;
                    var goodsObj = getItem();
                    this.cargList.forEach((item, index) => {
                        // 将当前商品的数量赋值给 接口中返回的buycount属性
                        item.buycount = goodsObj[item.id]
                            //在这里初始化values中的值
                        this.values.push(false);
                    });
                })
            }
        }
    }
</script>
<style scoped>

</style>