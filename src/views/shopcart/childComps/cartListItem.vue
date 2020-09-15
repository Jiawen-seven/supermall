<template>
  <div class="shop-item">
    <div class="item-selector">
      <check-button :is-check="itemInfo.checked" @click.native="checkClick"/><!--监听组件根元素的原生事件需要加native-->
    </div>
    <div class="item-img">
      <img :src="itemInfo.image" alt="">
    </div>
    <div class="item-info">
      <div class="item-title">{{itemInfo.title}}</div>
      <div class="item-desc">{{itemInfo.desc}}</div>
      <div class="info-bottom">
        <div class="item-price">￥{{itemInfo.price}}</div>
        <div class="item-count">×{{itemInfo.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'

export default {
  name:'cartListItem',
  components:{
    CheckButton
  },
  props:{
    itemInfo:{
      type: Object,
      default(){
        return {}
      }
    }
  },
  methods:{
    checkClick(){//取反
      this.itemInfo.checked = !this.itemInfo.checked
    }
  }
}
</script>

<style scoped>
  .shop-item{
    width: 100%;
    display: flex;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }
  .item-selector{
    width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .item-img{
    padding: 5px;
  }
  .item-img img{
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
  }
  .item-info{
    font-size: 16px;
    color: #333;
    padding: 5px 10px;
    overflow: hidden;
  }
  .item-title, .item-desc{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .item-info .item-desc{
    font-size: 14px;
    color:#666;
    margin-top: 15px;
  }
  .info-bottom{
    margin-top: 30px;
    display: flex;
  }
  .info-bottom .item-price{
    flex: 1;
    color: orangered;
  }
</style>