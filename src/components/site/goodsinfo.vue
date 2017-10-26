<template>
<div class="tmpl">
    <!-- 这是goodsinfo页面 -->
    <!-- 导航栏 -->
<div class="section">
        <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="/goods.html">购物商城</a>
        <a href="/goods/42/1.html">商品详情</a>

        </div>
        </div>

        <!-- 商品详情 -->
        <!-- v-if设置是否显示，是为了防止数据还没回来导致title变成undefined -->
        <div class="section" v-if='ginfo.goodsinfo'>
            <div class="wrapper clearfix">
        <div class="wrap-box">
        <!--页面左边-->
        <div class="left-925">
        <div class="goods-box clearfix">
        <!--商品图片-->
        <div class="pic-box">
            <div class="magnifier" id="magnifier1">
                <div class="magnifier-container">
                    <div class="images-cover"></div>
                    <!--当前图片显示容器-->
                    <div class="move-view"></div>
                    <!--跟随鼠标移动的盒子-->
                </div>
                <div class="magnifier-assembly">
                    <div class="magnifier-btn">
                        <span class="magnifier-btn-left">&lt;</span>
                        <span class="magnifier-btn-right">&gt;</span>
                    </div>
                    <!--按钮组-->
                    <div class="magnifier-line">
                        <ul class="clearfix animation03">
                            <li v-for='item in ginfo.imglist' :key='item.id'>
                                <div class="small-img">
                                    <img :src="item.original_path" />
                                </div>
                            </li>
                        </ul>
                    </div>
                    <!--缩略图-->
                </div>
                <div class="magnifier-view"></div>
                <!--经过放大的图片显示容器-->
            </div>
        
        </div>
        <!--/商品图片-->

        <!--商品信息-->
        <div class="goods-spec" >
        <h1 v-text='ginfo.goodsinfo.title'></h1>
        <p class="subtitle" v-text='ginfo.goodsinfo.sub_title'></p>
        <div class="spec-box">
        <dl>
        <dt>货号</dt>
        <dd id="commodityGoodsNo" v-text='ginfo.goodsinfo.goods_no'></dd>
        </dl>
        <dl>
        <dt>市场价</dt>
        <dd>
        <s id="commodityMarketPrice">¥{{ginfo.goodsinfo.market_price}}</s>
        </dd>
        </dl>
        <dl>
        <dt>销售价</dt>
        <dd>
        <em class="price" id="commoditySellPrice">¥{{ginfo.goodsinfo.sell_price}}</em>
        </dd>
        </dl>
        </div>

        <div class="spec-box">
        <dl>
        <dt>购买数量</dt>
        <dd>
            <div class="stock-box">
                    <!-- InputNumber 计数器 -->
                    <el-input-number v-model="buyCount" size='small' :min="1" ></el-input-number>
             </div>
                    <span class="stock-txt">
                        库存
                        <em id="commodityStockNum">{{ginfo.goodsinfo.stock_quantity}}</em>件
                     </span>
        </dd>
        </dl>
        <dl>
        <dd>
        <div class="btn-buy" id="buyButton">
        <button class="buy" >立即购买</button>
        <button class="add" @click='addCar'>加入购物车</button>
        </div>
        </dd>
        </dl>
        </div>

        </div>
        <!--/商品信息-->
        </div>

        <div id="goodsTabs" class="goods-tab bg-wrap">
        <!--选项卡-->
        <Affix>
          <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
            <ul>
              <li>
                <a v-bind="{class:isContent?'selected':''}" href="javascript:;" @click='changeContent(true)'>商品介绍</a>
             </li>
              <li>
                  <a  v-bind="{class:!isContent?'selected':''}" href="javascript:;" @click='changeContent(false)'>商品评论</a>
              </li>
            </ul>
          </div>
        </Affix>
        <!--/选项卡-->

        <!--选项内容-->
        <div class="tab-content entry" v-if='isContent'>
            <!-- 对于含有标签的 使用v-html来绑定数据 -->
            <span v-html='ginfo.goodsinfo.content'></span>

        </div>

        <div class="tab-content" v-if='!isContent'>
        <!--网友评论-->
        <div class="comment-box">
        <!--取得评论总数-->
        <form id="commentForm" name="commentForm" class="form-box" url="/tools/submit_ajax.ashx?action=comment_add&amp;channel_id=2&amp;article_id=98">
        <div class="avatar-box">
        <i class="iconfont icon-user-full"></i>
        </div>
        <div class="conn-box">
        <div class="editor">
        <textarea id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！" v-model='content'></textarea>
        <span class="Validform_checktip"></span></div>
        <div class="subcon">
        <input id="btnSubmit" name="submit" type="button" value="提交评论" class="submit" @click='submitComment'>
        <span class="Validform_checktip"></span></div>
        </div>
        </form>
        <ul id="commentList" class="list-box">
        <p style="margin:5px 0 15px 69px;line-height:42px;text-align:center;border:1px solid #f7f7f7;">暂无评论，快来抢沙发吧！</p>
        <!-- 循环生成评论数据 -->
        <li v-for='item in commentList' :key='item.id'>
            <div class="avatar-box"><i class="iconfont icon-user-full"></i></div>
            <div class="inner-box">
                <div class="info">
                    <span>{{item.user_name}}</span>
                    <span>{{item.add_time | datefmt('YYYY-MM-DD HH:mm:ss')}}</span>
                </div><p>{{item.content}}</p>
            </div>
        </li>
        </ul>
        <!--放置页码-->
        <div class="page-box" style="margin:5px 0 0 62px">
        <div id="pagination" class="digg">
            <!-- 使用elementUI的分页 -->
            <el-pagination
            @size-change="sizeChange"
            @current-change="currentChange"
            :current-page="pageIndex"
            :page-sizes="[1,10,20,30,50,80]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalcount">
          </el-pagination>
        </div>
        </div>
        <!--/放置页码-->
        </div>

        <!--/网友评论-->
        </div>

        </div>

        </div>
        <!--/页面左边-->

        <!--页面右边-->
        <div class="left-220">
        <div class="bg-wrap nobg">
        <div class="sidebar-box">
        <h4>推荐商品</h4>
        <ul class="side-img-list">

        <li v-for='item in ginfo.hotgoodslist' :key='item.id'>
        <div class="img-box">
            <router-link v-bind="{to:'/site/goodsinfo/'+item.id}">
                <a href="/goods/show-98.html">
                    <img :src="item.img_url">
                </a>
            </router-link>

        </div>
        <div class="txt-box">
                <router-link v-bind="{to:'/site/goodsinfo/'+item.id}">
                        <a href="/goods/show-98.html">{{item.title}}</a>
                 </router-link>
        <span>{{item.add_time | datefmt('YYYY-MM-DD')}}</span>
        </div>
        </li>

        </ul>
        </div>
        </div>
        </div>
        <!--/页面右边-->
        </div>
        </div>
        </div>
</div>
</template>

<script>
    //导入localStorageKit.js
    import {
        setItem
    } from '../../kits/localStorageKit.js'

    //引入vm.js
    import {
        vm,
        key
    } from '../../kits/vm.js';


    //按需引入iview中的Affix图钉组件
    import Affix from 'iview/src/components/affix'
    //导入jquery图片放大镜插件
    import '../../../statics/site/js/jqplugins/imgzoom/magnifier.js';
    $(function() {
        $('#magnifier1').imgzoon({
            magnifier: '#magnifier1'
        });
    })

    export default {
        // 将Affix组件注册到goodsinfo.vue的私有组件中
        components: {
            Affix,
        },
        data() {
            return {
                ginfo: {},
                isContent: true,
                content: '',
                pageIndex: 1,
                pageSize: 10,
                totalcount: 0,
                commentList: [], //接收后台返回的评论数据，v-for循环生成
                buyCount: 1

            }
        },
        created() {
            this.getginfo(); //写完之后记得调用
            this.getcommentlist();
        },
        //watch监视路由参数变化立即刷新---之前只改变id页面未能刷新
        watch: {
            '$route': function() {
                this.getginfo();
            }
        },
        methods: {

            addCar() {
                //方式1： 通过vm.js中实例化的vm $emit触发事件,把buyCount的变化，实时更新到layout.vue的购物车中的数据
                // vm.$emit(key, this.buyCount);

                //方式2：通过vuex触发changeBuyCount   注意这里的this.buyCount是goodsinfo.vue组件中定义的
                this.$store.dispatch('changeBuyCount', this.buyCount);

                setItem({
                    gid: this.$route.params.goodsid,
                    bCount: this.buyCount
                })
            },
            //分页功能
            sizeChange(val) {
                this.pageSize = val;
                this.getcommentlist();
            },
            currentChange(val) {
                this.pageIndex = val;
                this.getcommentlist();
            },
            //获取评论信息
            getcommentlist() {
                var goodsid = this.$route.params.goodsid;
                var url = '/site/comment/getbypage/goods/' + goodsid + '?pageIndex=' + this.pageIndex + '&pageSize=' + this.pageSize;
                this.$http.get(url).then(res => {
                    if (res.data.status == 1) {
                        return this.$message.error(res.data.message);
                    }
                    // console.log(res.data.message)
                    //获取接口返回的评论数据并赋值
                    this.commentList = res.data.message;
                    //把返回的总条数赋值给初始化后的totalcount
                    this.totalcount = res.data.totalcount;
                })
            },
            //提交评论思路：主要是url+商品id，发送的参数是v-model绑定的评论内容
            submitComment() {
                // 没写评论给出错误提示
                if (this.content.length <= 0) {
                    return this.$message.error('评论信息不能为空');
                }
                var goodsid = this.$route.params.goodsid;
                var url = '/site/validate/comment/post/goods/' + goodsid;
                this.$http.post(url, {
                    "commenttxt": this.content
                }).then(res => {
                    if (res.data.status == 1) {
                        return this.$message.error(res.data.message);
                    }
                    this.content = '';
                    this.$message({
                        message: '评论新增成功',
                        type: 'success'
                    })
                    this.getcommentlist(); //重新获取评论信息
                })

            },

            // 商品介绍和评论切换
            changeContent(val) {
                this.isContent = val;
            },
            getginfo() {
                var goodsid = this.$route.params.goodsid;
                var url = '/site/goods/getgoodsinfo/' + goodsid; //易错点：这里不要写成this.goodsid
                this.$http.get(url).then(res => {
                    if (res.data.status == 1) {
                        return this.$message.error(res.data.message);
                    }
                    this.ginfo = res.data.message;
                })
            }
        }
    }
</script>
<style scoped>
    /* 导入jquery插件的css样式 */
    
    @import url('../../../statics/site/js/jqplugins/imgzoom/css/magnifier.css');
</style>