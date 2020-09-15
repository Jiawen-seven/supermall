<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item 
          v-for="(item,index) in cartList" 
          :key="index" 
          :item-info="item"/>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'

import cartListItem from './cartListItem'

import { mapGetters } from 'vuex'

export default {
  name:'cartList',
  components: {
    Scroll,
    cartListItem
  },
  computed: {
    ...mapGetters(['cartList'])
  },
  activated() {//对购物车进行一次刷新，因为一开始scroll计算购物车的高度为0，要刷新一下才能滚动下面的内容。
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
  .cart-list{
    height: calc(100% - 44px - 49px - 40px);
  }
  .content{/**滚动区域必须设置高度 */
    overflow: hidden;
    height: 100%;
  }
</style>