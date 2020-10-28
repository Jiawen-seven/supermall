<template>
  <grid-view>
    <good-list-item v-for="(item,index) in categoryDetail" :key="index" :goods-item="item"/>
  </grid-view>
</template>

<script>
import GridView from "components/common/gridView/GridView"
import GoodListItem from "components/content/goods/GoodListItem"

export default {
  name:'TabContentDetail',
  components:{
    GridView,
    GoodListItem
  },
  props:{
    categoryDetail:{
      type: Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style>

</style>