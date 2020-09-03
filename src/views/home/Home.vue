<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

    <scroll class="content" 
            ref="Scroll" 
            :probeType="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners"/>
      <home-recommend-view :recommends="recommends" />
      <home-feature-view/>
      <tab-control class="tab-control" 
      :titles="['流行','新款','精选']"
      @tabClick="tabClick"/>
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
      currentType: 'pop',
      isShow: false
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
    const refresh = this.debounce(this.$refs.Scroll.refresh,200) //200ms
    //监听图片加载完成的事件。（因为这个函数最好是一开始就写好，但不能放在created中，不然$refs.Scroll有可能没有值）
    this.$bus.$on('itemImageLoad',() => {
      refresh() //每200ms后，进行刷新
    })
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
    },
    backClick() { /**返回顶部组件的监听事件 */
      //要拿到组件对象scroll,用ref
      this.$refs.Scroll.scrollTo(0,0)//这是调用了组件对象中的scrollTo的方法
    },
    contentScroll(position) {//返回顶部按钮的显示和隐藏
      //判断position.y
      //console.log(position)
      this.isShow = (-position.y) > 1000
    },
    loadMore() { //上拉下载更多
      this.getHomeGoods(this.currentType)
    },
    debounce(func,delay) { /**防抖函数,避免刷新频繁 */
      let timer = null
      return function(...args){//args代表可以传入多个参数，这里暂时没有参数，但不影响
        if(timer) clearTimeout(timer)
        timer = setTimeout(() => {
          func.apply(this, args)
        },delay)
      }
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

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .tab-control{
    position: sticky; /*当这个标签到顶部的时候不跟着移动，固定在顶部。 */
    top: 44px;/*设置这个top的高度，跟这个标签一样高就可以了 */
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

  /* .content{
    height: calc(100%- 93px);
    overflow: hidden;
    margin-top: 44px;
  } */

</style>