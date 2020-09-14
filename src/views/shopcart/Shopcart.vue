<template>
  <div class="cart">
    <!--导航栏-->
    <nav-bar class="cart-navbar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <!--购物车列表展示-->
    <cart-list></cart-list>

    <!--底部工具栏-->
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

import cartList from './childComps/cartList'

import { mapGetters } from 'vuex'

export default {
  name:'Shopcart',
  components: {
    NavBar,
    cartList
  },
  computed:{
    //方法一：如果很多vue都需要用到这个属性，这样写的话，代码长，而且重复的比较多。
    // cartLength(){
    //   return this.$store.state.cartList.length
    // }
    //方法二：用vuex中的mapGetters，它是将store中的getters映射到局部计算属性中。(新知识点！)
    ...mapGetters(['cartLength'])
  }
}
</script>

<style scoped>
  .cart{
    height: 100vh;
  }
  .cart-navbar{
    background-color: var(--color-tint);
    color: #fff;
  }
  
</style>