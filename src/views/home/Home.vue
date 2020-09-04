<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <!--一个小技巧，滚动到某个位置时，让它代替下面那个tabcontrol-->
    <tab-control :titles="['流行','新款','精选']" 
                  @tabClick="tabClick"
                  ref="tabControl1"
                  class="tab-control"
                  v-show="isFixed"/> 
    <scroll class="content" 
            ref="Scroll" 
            :probeType="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <home-recommend-view :recommends="recommends" />
      <home-feature-view/>
      <tab-control :titles="['流行','新款','精选']" 
                  @tabClick="tabClick"
                  ref="tabControl2"/>
      <good-list :goods="showGoods" />
    </scroll>

    <back-top @click.native="backClick" v-show="isShow"></back-top>
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommendView from './childComps/HomeRecommendView'
import HomeFeatureView from './childComps/HomeFeatureView'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodList from 'components/content/goods/GoodList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

import { getHomeMultidata, getHomeGoods } from 'network/home'
import {debounce} from 'common/utils'

export default {
  name:'Home',
  components: {
    HomeSwiper,
    HomeRecommendView,
    HomeFeatureView,
    NavBar,
    TabControl,
    GoodList,
    Scroll,
    BackTop
  },
  data(){
    return{
      banners: [],
      recommends: [],
      //result: null
      goods: {
        'pop': {page: 0, list: []}, //page是当前加载到第几页，list是当前已经加载到的一些数据。
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop', //点击的类型
      isShow: false,  //返回顶部的图标是否显示
      tabOffsetTop: 0, //用于保存TabControl的offsetTop值
      isFixed: false, //tabcontrol是否吸顶
      saveY: 0 //记录离开时的位置
    }
  },
  computed:{
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  //什么时候发送网络请求呢？
  created(){/*组件创建完之后，发送网络请求 。实现生命周期函数*/
    //1.请求多个数据
    this.getHomeMultidata()
    //2.请求商品数据
    //一次性请求三个，调用三次gethomegoods方法。
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted() {
    //1.图片加载完成的事件监听
    const refresh = debounce(this.$refs.Scroll.refresh,200) //200ms
    //监听图片加载完成的事件。（因为这个函数最好是一开始就写好，但不能放在created中，不然$refs.Scroll有可能没有值）
    this.$bus.$on('itemImageLoad',() => {
      refresh() //每200ms后，进行刷新，不再是没加载完一张图片就刷新一次了，这样浏览器负担重。
    })
  },
  activated() { //进来时
    this.$refs.Scroll.scrollTo(0, this.saveY, 0) //三个参数，第一个是x，第二个是y，第三个是时间，时间不需要就设置为0
    this.$refs.Scroll.refresh()//最好刷新一下
  },
  deactivated() { //离开时
    this.saveY = this.$refs.Scroll.getScrollY()
  },
  methods: {
    /**
     * 事件监听的相关方法
     */
    tabClick(index) {
      //console.log(index)
      switch(index) {
        case 0: 
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      //下面的index直接写，不用加个this，因为在函数里面。
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    backClick() { /**返回顶部组件的监听事件 */
      //要拿到组件对象scroll,用ref
      this.$refs.Scroll.scrollTo(0,0)//这是调用了组件对象中的scrollTo的方法
    },
    contentScroll(position) {//监听滚动
      //1.判断BaclTop是否显示(position.y)
      this.isShow = (-position.y) > 1000

      //2.决定tabcontrol是否吸顶(position:fixed)
      this.isFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore() { //上拉下载更多
      //console.log("上拉加载更多")
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad() {//监听轮播图是否加载完成，来获取offsetTop的准确值
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      //console.log(this.tabOffsetTop)
    },

    /**
     * 网络请求的相关方法
     */
    getHomeMultidata() {
      getHomeMultidata().then(res => {/*怎么拿到真正请求到的数据呢？ .then就可以了。*/
        //这里直接用这些数据不合适，要保存起来。
        //而且这些数据，一旦这个箭头函数调用结束，这些变量都会被释放，即数据都消失了。
        //console.log(res)
        //所以需要对数据进行保存,分类保存，不要全部保存在一个变量中。
        //而且只保存需要的信息即可，可以从网页中自行查看数据的结构
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
        //this.result = res
      })
    },
    getHomeGoods(type) { //加载数据
      const page = this.goods[type].page + 1
      getHomeGoods(type,page).then(res => {
        //console.log(res)
        this.goods[type].list.push(...res.data.list) //把请求的数据加进数组中
        this.goods[type].page += 1  //请求了数据，相应的页码也要加一

        //数据加载完之后，要做一件事情
        this.$refs.Scroll.finishPullUp() //这样才能保证可以加载多次数据
      })
    }
  }
}
</script>

<style scoped>
  #home{
    
    height: 100vh; /**视口高度 */
    position: relative; /**相对定位 */
  }

  .home-nav{
    background-color: var(--color-tint);
    color: white;

    /**原本要fixed是因为用了浏览器的原生滚动方法，
    但现在使用了better-scroll，指定了滚动区域，就没有必要fixed了。 */
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }
  
  .tab-control{ /*tabcontrol的替身 */
    position: relative; /**相对定位，让它保持在自己的位置上 */
    z-index: 9;
  } 

  .content{/**滚动区域必须设置高度的 */
    overflow: hidden;

    position: absolute; /**绝对定位 */
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  /* .content{  //滚动区域设置高度的第二种方法
    height: calc(100%- 93px);
    overflow: hidden;
    margin-top: 44px;
  } */


</style>