<template>
<div>
  <grid-view :cols="3" :v-margin="20" :line-space="15">
    <div class="item" v-for="(item,index) in subcategories.list" :key="index">
      <a :href="item.link">
        <img class="item-image" :src="item.image" alt="">
        <div class="item-title">{{item.title}}</div>
      </a>
    </div>
  </grid-view>
</div>
</template>

<script>
import GridView from "components/common/gridView/GridView"
export default {
  name:'TabContentCategory',
  components:{
    GridView
  },
  props:{
    subcategories: Object
  }
}
</script>

<style>
.item{
  text-align: center;
  font-size: 12px;
}
.item-image{
  width: 80%;
}
.item-title{
  margin-top: 5px;
}
</style>