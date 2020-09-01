<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"/>
    <home-recommend-view :recommends="recommends" />
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import {getHomeMultidata} from 'network/home'
import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommendView from './childComps/HomeRecommendView'

export default {
  name:'Home',
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommendView
  },
  data(){
    return{
      banners: [],
      recommends: []
      //result: null
    }
  },
  //什么时候发送网络请求呢？
  created(){/*组件创建完之后，发送网络请求 。实现生命周期函数*/
    //1.请求多个数据
    getHomeMultidata().then(res => {/*怎么拿到真正请求到的数据呢？ .then就可以了。*/
      //这里直接用这些数据不合适，要保存起来。
      //而且这些数据，一旦这个箭头函数调用结束，这些变量都会被释放，即数据都消失了。
      console.log(res)
      //所以需要对数据进行保存,分类保存，不要全部保存在一个变量中。
      //而且只保存需要的信息即可，可以从网页中自行查看数据的结构
      this.banners = res.data.banner.list
      this.recommends = res.data.recommend.list
      //this.result = res
      })
  }
}
</script>

<style scoped>
  .home-nav{
    background-color: var(--color-tint);
    color: white;
  }
</style>