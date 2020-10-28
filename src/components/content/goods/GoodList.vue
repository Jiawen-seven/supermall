<template>
  <grid-view>
    <good-list-item v-for="item in goods" :key="item.label" :goods-item="item"/>
  </grid-view>
</template>

<script>
import gridView from 'components/common/gridView/GridView'
import GoodListItem from './GoodListItem'

export default {
  name:'GoodList',
  components: {
    gridView,
    GoodListItem
  },
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>

</style>