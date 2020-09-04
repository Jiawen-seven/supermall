<template>
  <div id="detail">
    <detail-navbar></detail-navbar>
    <detail-swiper :top-image="topImage"></detail-swiper>
    <detail-info :goods="goods"></detail-info>
  </div>
</template>

<script>
import DetailNavbar from './childComps/DetailNavbar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailInfo from './childComps/DetailInfo'

import {getDetail, Goods} from 'network/detail'

export default {
  name:'Detail',
  components: {
    DetailNavbar,
    DetailSwiper,
    DetailInfo
  },
  data() {
    return {
      iid: null,
      topImage: [], //存放轮播图
      goods: null //存放商品基本信息
    }
  },
  created() {
    //1.保存传入的iid
    this.iid = this.$route.params.id  //获取地址中的id

    //2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      const data = res.result
      console.log(res)
      //1).获取顶部的图片轮播数据
      this.topImage = data.itemInfo.topImages

      //2).获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
    })
  }
}
</script>

<style>

</style>