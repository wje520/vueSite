<template>
    <div class="tmpl">
        <!-- 1.0 面包屑，菜单导航 -->
        <div id="header" class="header">
            <div class="head-top">
                <div class="section">
                    <div class="left-box">
                        <span>vue2.0单页应用</span>
                        <a target="_blank" href="#"></a>
                        <a target="_blank" href="#"></a>
                    </div>
                    <div id="menu" class="right-box">
                       
                             <router-link to="/site/login" v-if='!isvipshow'>登录</router-link>
                             <a href="/register.html" v-if='!isvipshow'>注册</a>
                             <router-link to="/site/vip/center" v-if='isvipshow'>会员中心</router-link>
                             <a href="javascript:;" @click='logout' v-if='isvipshow'>退出</a>
                        <strong>|</strong>
                        <!-- 方式1：使用global event bus 实现跨组件通讯 -->
                        <!-- <a href="/cart.html"><i class="iconfont icon-cart"></i>购物车(<span id="shoppingCartCount">{{bcount}}</span>)</a> -->
                        
                        <!-- 方式2：使用vuex的方式实现跨组件通讯 -->
                    <!-- <a href="/cart.html"><i class="iconfont icon-cart"></i>购物车(<span id="shoppingCartCount">{{this.$store.state.buyCount}}</span>)</a> -->
                    <router-link to="/site/car">
                        <!-- 调用getters中的getCount方法 -->
                         <a href="/cart.html"><i class="iconfont icon-cart"></i>购物车(<span id="shoppingCartCount">{{this.$store.getters.getCount}}</span>)</a>
                    </router-link>
                </div>
                </div>
            </div>
            <div class="head-nav">
                <div class="section">
                    <!-- <div class="logo">
                                       <a href="/index.html"><img width="230px" height="70px" src="/templates/main/images/logo.png" /></a>
                                   </div>-->
                    <div id="menu2" class="nav-box menuhd">
                        <ul>
                            <li class="index">
                                <a href="/index.html">
                                    首页
                                </a>
                            </li>
                            <li class="news">
                                <a href="/news.html">
                                    学员问题汇总
                                </a>
                            </li>
                            <li class="photo">
                                <a href="/photo.html">
                                    重难点专区
                                </a>
                            </li>
                            <!--<li class="goods"><a href="">就业阶段</a></li>-->
                            <li class="video">
                                <a href="/video.html">
                                    前端常用功能
                                </a>
                            </li>
                            <li class="down">
                                <a href="/down.html">
                                    资源下载
                                </a>
                            </li>
                            <li>
                               <router-link to="/site/goodslist">
                                    购物商城
                                </router-link>
                            </li>
                        </ul>
                    </div>
                    <div class="search-box">
                        <div class="input-box">
                            <input id="keywords" name="keywords" type="text" onkeydown="if(event.keyCode==13){SiteSearch('/search.html', '#keywords');return false};"
                                placeholder="输入关健字" x-webkit-speech="">
                        </div>
                        <a href="javascript:;" onclick="SiteSearch('/search.html', '#keywords');">
                            <i class="iconfont icon-search"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <!-- 2.0 路由的占位符 -->
        <router-view></router-view>
    </div>
</template>

<script>
    // 导入kits/下的vm.js   
    import {
        vm,
        key
    } from '../../kits/vm.js'

    // 实现菜单的翻滚   对应的css也放在了style.css中
    $(function() {
        $("#menu2 li a").wrapInner('<span class="out"></span>');
        $("#menu2 li a").each(function() {
            $('<span class="over">' + $(this).text() + '</span>').appendTo(this);
        });

        $("#menu2 li a").hover(function() {
            $(".out", this).stop().animate({
                'top': '48px'
            }, 300); // move down - hide
            $(".over", this).stop().animate({
                'top': '0px'
            }, 300); // move down - show

        }, function() {
            $(".out", this).stop().animate({
                'top': '0px'
            }, 300); // move up - show
            $(".over", this).stop().animate({
                'top': '-48px'
            }, 300); // move up - hide
        });

    });


    export default {
        data() {
            return {
                bcount: 0,
                isvipshow: false
            }
        },

        mounted() {
            // 方式1：buyCount这个参数是goodsinfo所有购买的数量，$on自动触发bcount的变化实现监听
            // vm.$on(key, (buyCount) => {
            //     this.bcount += buyCount;
            // })

            // 方式2：vuex  就不需要$on了
            // vm.$on(key, (buyCount) => {
            //     this.bcount += buyCount;
            // })

        },
        mounted() {

            //$on监听changeshow事件  事件名和$emit对应 不要写错
            vm.$on('changeshow', () => {
                // 获取到localStorage中的key="islogin"对应的值
                this.checklogin();
            })
            this.checklogin();
        },
        methods: {
            logout() {
                //要调接口退出
                var url = '/site/account/logout';
                this.$http.get(url).then(res => {
                    // 把显示状态变成false
                    this.isvipshow = false;
                    //把当前的登录状态设置到localstorage
                    localStorage.setItem('islogin', false);
                    this.$router.push({
                        name: 'login'
                    })

                })
            },

            checklogin() {
                var islogin = localStorage.getItem('islogin');
                // 注意localstorage中的存的值是字符串
                if (islogin == "true") {
                    this.isvipshow = true;
                } else {
                    this.isvipshow = false;
                }

            }
        }
    }
</script>

<style>
    /* 为了解决统一导入elemenui的样式,所以要放到layout.vue */
    /* 导入样式的格式  @import url() */
    
    @import url('../../../statics/elementuiCss/index.css');
</style>