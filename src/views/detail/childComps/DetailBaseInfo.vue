<template>
<!--先判断goods是不是一个空对象-->
  <div v-if="Object.keys(goods).length !== 0 " class="base-info">
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="n-price">{{goods.newPrice}}</span>
      <span class="o-price">{{goods.oldPrice}}</span>
      <span v-if="goods.discount" class="discount" :style="{backgroundColor: goods.discountBgColor}">{{goods.discount}}</span>
    </div>
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <!--这里显示最后一个-->
      <span>{{goods.services[goods.services.length-1].name}}</span> 
    </div>
    <div class="info-service">
      <!--这个循环显示services数组的内容，除了最后一个（因为在上面已经显示过了）。
      这里因为v-for的是一个数字，所以从1到该数字，而不是从0开始的。因此有下面的[index-1]-->
      <span class="info-service-item" v-for="index in goods.services.length-1" :key="index">
        <img :src="goods.services[1].icon"><!--原本是动态的，但是有些数据它第一个没有提供图标，图标其实都是一样的，所以这里就固定用第二个。-->
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name:'DetailBaseInfo',
  props:{
    goods:{
      type: Object,
      default() {
      return {}
      }
    }
  }
}
</script>

<style scoped>
  .base-info{
    margin-top: 15px;
    padding: 0 8px;
    color: #999;
    border-bottom: 5px solid #f2f5f8;
  }
  .info-title{
    color: #222;
  }
  .info-price{
    margin-top: 10px;
  }
  .info-price .n-price{
    font-size: 24px;
    color: var(--color-high-text);
  }
  .info-price .o-price{
    font-size: 13px;
    margin-left: 5px;
    text-decoration: line-through;
  }
  .info-price .discount{
    font-size: 12px;
    padding: 2px 5px;
    color: #fff;
    /* 把背景颜色调成动态，因为接口数据有给这个颜色 */
    /* background-color: var(--color-high-text); */
    border-radius: 8px;
    margin-left: 5px;

    /*让元素上浮一些，使用相对定位 */
    position: relative;
    top: -8px;
  }
  .info-other{
    margin-top: 15px;
    line-height: 30px;
    display: flex;
    font-size: 13px;
    border-bottom: 1px solid rgba(100,100,100,.1);
    justify-content: space-between;
  }
  .info-service{
    display: flex;
    justify-content: space-between;
    line-height: 60px;
  }
  .info-service-item img{
    width: 14px;
    height: 14px;
    position: relative;
    top: 2px;
  }
  .info-service-item span{
    font-size: 12px;
    color: #333;
  }
</style>