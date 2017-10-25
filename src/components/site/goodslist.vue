<template>
<div class="tmpl">
    <div class="section">
        <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="/goods.html">购物商城</a>
        </div>
    </div>
    <div class="section">
            <div class="wrapper">
                <div class="wrap-box">
                    <!--类别菜单-->
                    <div class="left-220" style="margin:0;">
                        <div class="banner-nav">
                            <ul>
                            <!--此处声明下面可重复循环-->
                             
                                <li v-for='item in topdata.catelist' :key='item.id'>
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>{{item.title}}</span>
                                        <p>
                                            <!-- 用span标签包起来，显示成行内 -->
                                            <span v-for='subitem in item.subcates' :key='subitem.id'>{{subitem.title}}&nbsp;</span>
                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <!--如有三级分类，此处可循环-->
                                        <dl>
                                            <dt><a href="/goods/40.html">{{item.title}}</a></dt>
                                            <dd>
                                                 
                                                <a href="/goods/43.html" v-for='subitem in item.subcates' :key='subitem.id'>{{subitem.title}}&nbsp;</a>

                                            </dd>
                                        </dl>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--/类别菜单-->
                     
                    <!--幻灯片-->
                    <div class="left-705">
                        <div class="banner-img">
                            <div id="focus-box" class="focus-box">
                                    <el-carousel :interval="5000" arrow="always">
                                            <el-carousel-item v-for="item in topdata.sliderlist" :key="item.id">
                                                <img :src="item.img_url" alt="">
                                              <h3>{{ item.title }}</h3>
                                            </el-carousel-item>
                                    </el-carousel>
                             </div>
                        </div>
                    </div>
                    <!--/幻灯片-->
                     
                    <!--推荐商品-->
                    <div class="left-220">
                        <ul class="side-img-list">
                         
                            <li v-for='(item,index) in topdata.toplist':key='item.id'>
                                <div class="img-box">
                                    <label>{{index+1}}</label>
                                    <!-- <img v-bind="{src:item.img_url}"> -->
                                    <img :src="item.img_url" >
                                </div>
                                <div class="txt-box">
                                    <a href="/goods/show-98.html">{{item.title}}</a>
                                    <span>{{item.add_time | datefmt('YYYY-MM-DD')}}</span>
                                </div>
                            </li>
                         
                        </ul>
                    </div>
                    <!--/推荐商品--> 
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
    export default {
        data() {
            return {
                topdata: {}
            }
        },
        created() {
            this.gettopdata();
        },
        methods: {
            gettopdata() {
                var url = '/site/goods/gettopdata/goods';
                this.$http.get(url).then(res => {
                    if (res.data.status == 1) {
                        return this.$message.error(res.data.message);
                    }
                    this.topdata = res.data.message;
                })
            }
        }
    }
</script>
<style scoped>
    /* 修改轮播的高度 */
    
    .el-carousel__container {
        height: 343px;
    }
    
    .el-carousel__item h3 {
        color: #475669;
        font-size: 18px;
        opacity: 0.75;
        line-height: 30px;
        margin: 0;
    }
</style>