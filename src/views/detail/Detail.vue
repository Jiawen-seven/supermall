<template>
  <div id="detail">
    <detail-navbar class="detail-nav" @titleClick="titleClick" ref="navbar"></detail-navbar>
    <scroll class="content" ref="scroll" :probeType="3" @scroll="titleScroll"> <!--用scroll的时候，必须要给一个固定的高度-->
      <detail-swiper :top-image="topImage"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :param-info="paramInfo" ref="param"/>
      <detail-comment-info :comment-info="commentInfo" ref="comment"/>
      <good-list :goods="recommends" ref="recommend"/>
    </scroll>
    <detail-bottom-bar class="bottom-bar" @addCart="addToCart"/>
    <back-top @click.native="backClick" v-show="isShow"></back-top>
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
import DetailBottomBar from './childComps/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll'
import GoodList from 'components/content/goods/GoodList'
import BackTop from 'components/content/backTop/BackTop'

import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail'
import {debounce} from 'common/utils'

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
    DetailBottomBar,
    Scroll,
    GoodList,
    BackTop
  },
  data() {
    return {
      iid: null,
      topImage: [], //存放商品轮播图
      goods: {}, //存放商品基本信息
      shop: {}, //存放商家信息
      detailInfo: {}, //存放商品详情数据
      paramInfo: {}, //存放商品参数信息（尺码等这类信息）
      commentInfo: {},//存放评论信息
      recommends: [],//存放推荐信息
      themeToYs: [0,1000,2000,3000],//存放标题（商品、参数、评价、推荐）的位置
      getThemeTopY: null,//存放图片加载完之后再重新赋值的offsetTop（防抖）
      currentTitle: 0,//记录当前标题
      isShow: false,//判断返回顶部按钮是否显示
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

    //3.请求推荐数据
    getRecommend().then(res => {
      console.log(res)
      this.recommends = res.data.list
    })

    //4.给 getThemeTopY赋值(对给this.themeToYs赋值的操作进行防抖)
    this.getThemeTopY = debounce(() => {
      //获取标题的位置
      this.themeToYs = []
      this.themeToYs.push(0)
      this.themeToYs.push(this.$refs.param.$el.offsetTop-44)
      this.themeToYs.push(this.$refs.comment.$el.offsetTop-44)
      this.themeToYs.push(this.$refs.recommend.$el.offsetTop-44)
      console.log(this.themeToYs)
    })
  },
  mounted() {
    //1.图片加载完成的事件监听
    const refresh = debounce(this.$refs.scroll.refresh,200) //200ms
    //监听图片加载完成的事件。（因为这个函数最好是一开始就写好，但不能放在created中，不然$refs.Scroll有可能没有值）
    this.$bus.$on('detailItemImageLoad',() => {
      refresh() //每200ms后，进行刷新，不再是每加载完一张图片就刷新一次了，这样浏览器负担重。
    })
  },
  methods: {
    imageLoad() { //监听详情页商品详情图片是否加载完成（对应DetailGoodsInfo）
      this.$refs.scroll.refresh()//等图片加载完之后刷新，这里只刷新了一次，因为那边只发射了一次。
      this.getThemeTopY() //等图片加载完之后再重新赋值offsetTop，且使用了防抖函数，避免多次调用。
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0,-this.themeToYs[index],200)
    },
    titleScroll(position){//监听滚动
      //1.滚动内容显示对应标题（商品、参数、评论、推荐）
      const positionY = -position.y
      const length = this.themeToYs.length
      for(var i = 0; i < length; i++){
        if(this.currentTitle != i && (i < length-1 && positionY >= this.themeToYs[i] && positionY < this.themeToYs[i+1] || i === length-1 && positionY >= this.themeToYs[i])){
          this.currentTitle = i
          //console.log(this.currentTitle) //this.currentTitle != i -> 是用于确保这里只打印一次,那么if语句这里面的东西就只执行一次，不会重复执行。
          this.$refs.navbar.currentTitle = this.currentTitle
        }
      }
      //2.返回顶部按钮是否显示
      this.isShow = (-position.y) > 1000
    },
    backClick() { /**返回顶部组件的监听事件 */
      //要拿到组件对象scroll,用ref
      this.$refs.scroll.scrollTo(0,0)//这是调用了组件对象中的scrollTo的方法
    },
    addToCart() {/*加入购物车的按钮事件 */
      //1.获取购物车需要的信息
      const product = {} //创建一个对象来存放
      product.image = this.topImage[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid; //这个id必须传，判断商品的时候需要用。

      //2.将商品添加到购物车里
      this.$store.dispatch('addCart',product)
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
  .detail-nav{ /*上方的导航栏 */
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content{/*滚动区域内容 */
    height: calc(100% - 44px - 49px);
  }
  .bottom-bar{/*底部的工具栏 */
    height: 49px;

    position: relative;
    /* 以下这种方式也可以，但上面就简单的一句。 */
    /* position: fixed;
    left: 0;
    right: 0;
    bottom: 0; */

    background-color: #fff;
  }
</style>