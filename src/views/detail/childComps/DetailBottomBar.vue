<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div @click="shopClick">
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div @click="collectClick">
        <i class="icon select" :class="{collect: isCollect}"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
export default {
  name:'DetailBottomBar',
  data(){
    return{
      isCollect: false //是否收藏，默认是不收藏
    }
  },
  methods: {
    addToCart() {
      this.$emit('addCart');//商品信息需要在Detail中获取，所以发射事件到Detail中。
    },
    shopClick() {
      this.$emit('shopClick');
    },
    collectClick() {
      this.isCollect = !this.isCollect
    }
  }
}
</script>

<style scoped>
  .bottom-bar{
    display: flex;
    text-align: center;
  }
  .bar-item{
    flex: 1;
    display: flex;
  }
  .bar-item>div{
    flex: 1;
  }
  .bar-left .text{
    font-size: 13px;
  }
  .bar-left .icon{
    display: block;
    width: 22px;
    height: 22px;
    margin: 6px auto 2px;
    background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
  }
  .bar-left .service{
    background-position:0 -53px;
  }
  .bar-left .shop{
    background-position: 0 -98px;
  }
  .bar-left .select{
    background-position: 0 1px;
  }
  .bar-left .collect{
    background-position: 0 -26px;
  }
  .bar-right{
    font-size: 15px;
    line-height: 49px;
  }
  .bar-right .cart{
    background-color: #ffe817;
    color: #333;
  }
  .bar-right .buy{
    background-color: #f69;
    color: #fff;
  }
  /* .sport-ball{
    position: absolute;
    left: 225px;
    bottom: 20px;
  } */
</style>