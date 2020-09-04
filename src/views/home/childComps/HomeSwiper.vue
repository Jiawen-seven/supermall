<template>
  <swiper>
    <swiper-item v-for="item in banners" :key="item.title"> 
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'

export default {
  name:'HomeSwiper',
  props: {
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      isLoad: false
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    imageLoad() {//图片有多张，我只需要加载完成一张就可以确定高度，所以发射一次即可，无需发射多次事件。
      if(!this.isLoad){
        this.$emit('swiperImageLoad')//监听图片，传给home，告诉home图片加载完成
        this.isLoad = true
      }
    }
  }
}
</script>

<style>

</style>