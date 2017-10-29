// 步骤1：导入 vue这个包
// var Vue = require('vue');
import Vue from 'vue';

// 步骤2：想要解析和呈现App.vue组件的内容，则导入 App.vue组件
// var App = require('./App.vue');
import App from './App.vue';

// 1.0 路由的写法
// 1.0.0 导包
import vueRouter from 'vue-router';

// 1.0.2 将vueRouter和vue绑定起来
Vue.use(vueRouter);
// 1.0.3 定义路由规则
// 导入系统的整体布局组件
import layout from './components/site/layout.vue';
// 导入商品列表组件
import goodslist from './components/site/goodslist.vue';

// 导入商品详情组件
import goodsinfo from './components/site/goodsinfo.vue';

import car from './components/site/car.vue';
import shopping from './components/site/shopping.vue';
import login from './components/site/login.vue';
import pay from './components/site/pay.vue';
import payamount from './components/site/payamount.vue';
import paysuccess from './components/site/paysuccess.vue';
import vipcenter from './components/site/vipcenter.vue';
// 特点：当state的值一旦发生改变，那么通过 this.$store.state.buyCount 地方就会自动发生改变
var state = {
        buyCount: 0 //使用vuex来监视购物车数量的改变
    }
    //action (购物车按钮点击的时候触发action,代码： this.$store.dispatch('changeBuyCount'),购买数量)
var actions = {
    changeBuyCount({ commit }, paramsBuyCount) {
        commit('changeBuyCount1', paramsBuyCount);
    }
}
var mutations = {
    changeBuyCount1(state, paramsBuyCount) {
        state.buyCount += paramsBuyCount;
    }
}
import { getItem } from './kits/localStorageKit'
var getters = {
        // 该方法获取商品种类个数(所有的商品id)
        getCount(state) {
            if (state.buyCount > 0) {
                return state.buyCount;
            }
            // 从localstorage中获取存储的数据
            var goodsObj = getItem();
            var count = 0;
            for (var key in goodsObj) {
                count++; //统计所有的键  即为商品种类的个数
            }
            state.buyCount = count;
            return state.buyCount;
        }
    }
    //vuex必须在store之前引入
import vuex from 'vuex';
Vue.use(vuex);
var store = new vuex.Store({
    state,
    actions,
    mutations,
    getters
})


var router = new vueRouter({
    routes: [
        { name: 'default', path: '/', redirect: '/site' },
        { name: 'payamount', path: '/site/payamount/:orderid', component: payamount },
        // 配置手机端支付成功后的跳转 不依赖于layout
        { name: 'paysuccess', path: 'site/paysuccess', component: paysuccess },
        {
            name: 'layout',
            path: '/site',
            component: layout,
            children: [
                { name: 'login', path: 'login', component: login },
                { name: 'goodslist', path: 'goodslist', component: goodslist },
                { name: 'goodsinfo', path: 'goodsinfo/:goodsid', component: goodsinfo },
                { name: 'car', path: 'car', component: car },
                //   meta:{islogin:true}：表示要进行登录检查,只有登录过的才能进入到shopping组件，否则要进入到登录页面
                { name: 'shopping', path: 'shopping/:ids', component: shopping, meta: { 'islogin': true } },
                { name: 'pay', path: 'pay/:orderid', component: pay, meta: { 'islogin': true } },
                //配置pc端支付成功后的跳转
                { name: 'paysuccesspc', path: 'paysuccesspc', component: paysuccess },
                { name: 'vipcenter', path: 'vip/center', component: vipcenter },
            ]
        }
    ]
});

//利用router的全局守卫钩子函数实现登录验证
router.beforeEach((to, from, next) => {
    // 在localStorage中记录当前浏览器访问的的最后一个路由规则的名称
    if (to.name != 'login') {
        localStorage.setItem('changeRouterName', to.name);
    }
    // console.log(to); //其中的meta参数默认是一个空对象  可以对它进行设置
    // console.log(from)
    // console.log(next)
    if (to.meta.islogin) {
        var url = '/site/account/islogin';
        axios.get(url).then(res => {
            if (res.data.code == 'logined') {
                //router.push({ name: 'shopping' });   //这样会报错
                next()
            } else {
                router.push({ name: 'login' })
            }
        })
    } else {
        next();
    }

});



// 2.0 axios的使用
// 2.0.1 导入axios包
import axios from 'axios';
// 2.0.2 设定axios的基本的url请求前缀
axios.defaults.baseURL = 'http://157.122.54.189:9095';

// 2.0.3 想要在将来的每个子组件中的方法中均可以使用 this.$http去调用其方法执行ajax请求
//就要将axios对象挂载到vue的原型属性$http上
Vue.prototype.$http = axios;
// 设定axios的参数使得axios发出的ajax请求能够自动带上cookie
axios.defaults.withCredentials = true;

// 2.0.4 绑定到vue上
Vue.use(axios);

// 3.0 使用elementUI这个ui框架的步骤
// 3.0.1、导包
import elementUI from 'element-ui';
// 3.0.2 导入elemeui的css控制样式
// 由于项目的样式和elementui的css样式有些不一样，那么修改了这个样式以后，要利用自己的样式替换原来的原有样式

// 3.0.3 绑定
Vue.use(elementUI);

// 导入整个网站布局的控制样式
import '../statics/site/css/style.css';


// 4.0 定义共有过滤器(全局过滤器)来实现日期字符串的格式化操作
Vue.filter('datefmt', (input, fmtstring) => {
    var mydate = new Date(input);
    var y = mydate.getFullYear();
    var m = mydate.getMonth() + 1;
    var d = mydate.getDate();
    var h = mydate.getHours();
    var mi = mydate.getMinutes();
    var s = mydate.getSeconds();

    if (fmtstring == 'YYYY-MM-DD') {
        return y + '-' + m + '-' + d;
    }
    if (fmtstring == 'YYYY-MM-DD HH:mm:ss') {
        return y + '-' + m + '-' + d + ' ' + h + ':' + mi + ':' + s;
    }

});

new Vue({
    el: '#app',
    // 使用app这个组件对象
    // es5的写法
    // render:function(create){create(App);}
    router,
    store,
    // es6的写法 :将app当做根组件替换index1.html这个模板中的<div id="app">
    render: create => create(App)
});