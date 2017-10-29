<template>
<div class="tmpl">
        <div class="section">
                <div class="location">
                    <span>当前位置：</span>
                    <a href="/index.html">首页</a> &gt;
                    <a href="/login.html">会员登录</a>
                </div>
        </div>
            <div class="section">  
                <div class="wrapper">
                    <div class="bg-wrap">
                        <div class="nav-tit">
                            <a class="selected" href="javascript:;">账户登录</a>
                            <i>|</i>
                            <a href="/register.html">免费注册</a>
                        </div>
            
                        <form id="loginform" name="loginform" class="login-box" >
                            <div class="input-box">
                                <input v-model='form.user_name' id="txtUserName" name="txtUserName" type="text" placeholder="用户名/手机/邮箱" maxlength="50">
                            </div>
                            <div class="input-box">
                                <input v-model='form.password' id="txtPassword" name="txtPassword" type="password" placeholder="输入登录密码" maxlength="16">
                            </div>
                            <div class="btn-box">
                                <!-- type是submit的话会刷新整个页面，所以要改成button -->
                                <input id="btnSubmit" name="btnSubmit" type="button" value="立即登录" @click='login'>
                            </div>
                            <div id="msgtips" class="tip-box"></div>
                            <input id="turl" name="turl" type="hidden" value="http://localhost:8020/cart.html">
                            <!--记住上一页网址-->
                        </form>
            
                    </div>
                </div>
            </div>
            </div>
</div>
</template>

<script>
    //导入共有的vm实例
    import {
        vm
    } from '../../kits/vm.js';

    export default {
        data() {
            return {
                form: {
                    user_name: '',
                    password: ''
                }
            }
        },
        methods: {
            login() {
                // console.log(11)
                var url = '/site/account/login';
                this.$http.post(url, this.form).then(res => {
                    if (res.data.status == 1) {
                        return this.$message.error(res.data.message);
                    }
                    this.$message.success('登录成功');
                    // this.$router.push({
                    //     name: 'shopping'
                    // });
                    var toRouterName = localStorage.getItem('changeRouterName');
                    if (!toRouterName) {
                        this.$router.push({
                            name: 'goodslist'
                        })
                    }
                    //把当前的的登录状态设置到localstorage
                    localStorage.setItem('islogin', true);
                    //使用全局事件总线实现跨组件通讯  $emit触发
                    vm.$emit('changeshow');

                    this.$router.push({
                        name: toRouterName //这里传入的是变量，别用引号
                    });


                })
            }
        }
    }
</script>
<style scoped>

</style>