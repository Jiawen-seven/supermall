<template>
  <div class="category">
    <nav-bar class="category-navbar">
      <div slot="center">商品分类</div>
    </nav-bar>
    <div class="category-content">
      <!-- 1.左侧栏菜单 -->
      <tab-menu :categories="categories" @selectItem="selectItem"/>
      
      <!-- 2.右侧数据内容展示 -->
      <scroll class="tab-content" ref="Scroll" :probeType="3" @scroll="contentScroll">
        <!-- 2.1.圆圈数据的展示 -->
        <tab-content-category :subcategories="showSubcategory"/>
        <!-- 2.2.商品列表数据的展示 -->
        <tab-control :titles="['综合','新品','销量']"
                      @tabClick="tabClick"/>
        <tab-content-detail :category-detail="showCategoyDetail"/>
      </scroll>
      <!-- 组件监听需要.native -->
      <back-top @click.native="backtopclick" v-show="isShow"/> 
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"
import Scroll from "components/common/scroll/Scroll"
import TabControl from "components/content/tabControl/TabControl"
import BackTop from 'components/content/backTop/BackTop'

import TabMenu from "./childComps/TabMenu"
import TabContentCategory from "./childComps/TabContentCategory"
import TabContentDetail from "./childComps/TabContentDetail"

import {getCategory,getSubcategory,getCategoryDetail} from "network/category"

export default {
  name:'Category',
  components:{
    NavBar,
    Scroll,
    TabControl,
    BackTop,

    TabMenu,
    TabContentCategory,
    TabContentDetail
    
  },
  data(){
    return{
      categories: [], //存放分类的数据（分类的标题）
      categoryData: {}, //用于存放每个分类的子类数据
      currentIndex: 0,
      currentType: 'pop', //点击的类型
      isShow: false
    }
  },
  created(){
    //1.请求分类的数据
    this._getCategory()
  },
  computed:{
    showSubcategory(){
      return this.categoryData[this.currentIndex].subcategories;
    },
    showCategoyDetail(){
      return this.categoryData[this.currentIndex].categoryDetail[this.currentType];
    }
  },
  methods:{
    //获取分类的数据
    _getCategory(){
      getCategory().then(res =>{
        // console.log(res)
        //1.获取分类的数据
        this.categories = res.data.category.list;
        //2.初始化每个分类中子类的数据（分为两部分：上面是一些圆圈图类，下面是商品展示类）
        for(let i = 0; i < this.categories.length; i++){
          this.categoryData[i] = {
            subcategories: {}, //存放圆圈图类
            categoryDetail: { //存放商品展示类
              'pop': [],
              'new': [],
              'sell': []
            }
          }
        }

        //3.请求第一个分类的子数据
        this._getSubcategory(0)

      })
    },

    //获取子分类数据中 圆圈类的数据
    _getSubcategory(index){
      this.currentIndex = index //将当前所点击的分类对应的index传给currentIndex
      //1.根据index获取mainKey (请求每个分类的子类圆圈数据是根据这个mainKey)
      const maitKey = this.categories[index].maitKey;
      getSubcategory(maitKey).then(res => {
        //把请求到的数据存放给subcategories，这里请求的主要是圆圈图的数据展示。
        this.categoryData[index].subcategories = res.data; //把圆圈图相关的数据加进数组的对应位置
        this.categoryData = {...this.categoryData} // 这个相当于把当前数组中的每一项循环加进数组中，老师是加了这一句，但有和没有，暂时找不到区别。不知道这一句的用处在哪？（因为上一句已经是加进数组中了..）
        // console.log(res)

        //在这里请求下面商品展示的数据
        this._getCategoryDetail('pop') 
        this._getCategoryDetail('new')
        this._getCategoryDetail('sell')
        
      })
    },


    //获取子分类数据中 商品数据列表的数据
    _getCategoryDetail(type){
      // 1.获取请求的miniWallkey
      const miniWallkey = this.categories[this.currentIndex].miniWallkey;

      // 2.发送请求,传入miniWallkey和type
      getCategoryDetail(miniWallkey,type).then(res => {
        // 3.将获取的数据保存下来
        this.categoryData[this.currentIndex].categoryDetail[type] = res
        this.categoryData = {...this.categoryData}
        // console.log(res)
      })
    },

    //点击分类的标签，显示对应的子类
    selectItem(index){
      this._getSubcategory(index)
    },

    tabClick(index){ //商品展示中标题分类监听事件
      console.log(index)
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

    backtopclick(){  //返回顶部的监听事件
      //要拿到组件对象scroll,用ref
      this.$refs.Scroll.scrollTo(0,0)//这是调用了组件对象中的scrollTo的方法
    },

    contentScroll(position){//监听滚动的位置
      // console.log(position)
      this.isShow = (-position.y) > 1000  //大于1000才显示返回顶部的按钮
    }
  }
}
</script>

<style>
  .category{
    height: 100vh;
  }
  .category-navbar{
    background-color: var(--color-tint);
    color: #fff;
  }
  .category-content{
    height: calc(100% - 49px - 44px);

    overflow: hidden; /* 阻止原生的浏览器滚动 */
    display: flex;
  }
  .tab-content{
    height: 100%;  /*使用scroll必须给高度 */
    flex: 1;
  }

</style>