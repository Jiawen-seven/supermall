<template>
  <div class="recommend-info">
    <div class="recommend-title">热门推荐</div>
    <grid-view>
      <good-list-item v-for="(item,index) in goods"  :key="index" :goods-item="item"/>
    </grid-view>
  </div>
</template>

<script>
import GridView from 'components/common/gridView/GridView'
import GoodListItem from 'components/content/goods/GoodListItem'

export default {
  name: 'DetailRecommendInfo',
  components:{
    GridView,
    GoodListItem
  },
  props:{
    goods: {
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style>
  .recommend-title {
    line-height: 35px;
    padding: 5px 0 0 12px;
    font-size: 15px;
    color: #333;
  }
</style>