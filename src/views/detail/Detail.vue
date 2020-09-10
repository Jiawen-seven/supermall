<template>
  <div id="detail">
    <detail-navbar class="detail-nav"></detail-navbar>
    <scroll class="content" ref="scroll"> <!--用scroll的时候，必须要给一个固定的高度-->
      <detail-swiper :top-image="topImage"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :param-info="paramInfo"/>
      <detail-comment-info :comment-info="commentInfo"/>
    </scroll>
  </div>
</template>

<script>
import DetailNavbar from './childComps/DetailNavbar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'

import Scroll from 'components/common/scroll/Scroll'

import {getDetail, Goods, Shop,GoodsParam} from 'network/detail'

export default {
  name:'Detail',
  components: {
    DetailNavbar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    Scroll
  },
  data() {
    return {
      iid: null,
      topImage: [], //存放轮播图
      goods: {}, //存放商品基本信息
      shop: {}, //存放商家信息
      detailInfo: {}, //存放商品详情数据
      paramInfo: {}, //存放商品参数信息（尺码等这类信息）
      commentInfo: {},//存放评论信息
    }
  },
  created() {
    //1.保存传入的iid
    this.iid = this.$route.params.id  //获取地址中的id
    //query的方法
    //this.iid = this.$route.query.iid

    //2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      console.log(res)//查看所请求的数据
      const data = res.result

      //1).获取顶部的图片轮播数据
      this.topImage = data.itemInfo.topImages

      //2).获取商品信息(用类来保存了)
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      //3).创建店铺信息的对象（用类来保存了）
      this.shop = new Shop(data.shopInfo)

      //4).保存商品的详情数据（直接在这里保存）
      this.detailInfo = data.detailInfo;

      //5).获取参数的信息
      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

      //6).获取评论的信息(有一些是没有评论信息的，先判断)
      if(data.rate.cRate !== 0){
        this.commentInfo = data.rate.list[0]
      }
    })
  },
  methods: {
    imageLoad() { //等图片加载完之后刷新
      this.$refs.scroll.refresh()
    }
  }
}
</script>

<style scoped>
  #detail{
    /*因为导航栏是脱离标准流的，这里要设置相对布局 */
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;/*等于100视口 */
  }
  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content{
    height: calc(100% - 44px);
  }
</style>