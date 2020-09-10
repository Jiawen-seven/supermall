<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
    <div class="info-desc clear-fix">
      <div class="start"></div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div v-for="(item,index) in detailInfo.detailImage" :key="index">
      <div class="info-key">{{item.key}}</div>
      <div class="info-list">
        <img v-for="(item, index) in item.list" :key="index" :src="item" @load="imgLoad" alt="">
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'DetailGoodsInfo',
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      counter: 0,
      imagesLength: 0
    }
  },
  methods: {
    imgLoad() {
      //判断所有的图片都加载完了，那么进行一次回调就可以了。
      //this.counter += 1  直接在if语句前面加++ 就可以简写这一句
      if(++this.counter === this.imagesLength){
        this.$emit('imageLoad'); //等加载完，才发射事件，这样那个详情内容浏览的时候才不会卡顿。
      }
    }
  },
  watch: {//监听detailInfo这个对象的变化（watch可以监听某个属性的变化）
    //获取图片个数
    detailInfo() {
      this.imagesLength = this.detailInfo.detailImage[0].list.length
    }
  }
}
</script>

<style scoped>
  .goods-info {/*整个详情页面 */
    padding: 20px 0;
    border-bottom: 5px solid #f2f5f8;
  }
  .info-desc {/*商品描述*/
    padding: 0 15px;
  }
  .info-desc .start, .info-desc .end {/*描述内容中的长线 */
    width: 90px;
    height: 1px;
    background-color: #a3a3a5;
    position: relative;
  }
  .info-desc .start {
    float: left;
  }
  .info-desc .end {
    float: right;
  }
  .info-desc .start::before, .info-desc .end::after {/*描述内容中的小方块 ，伪元素*/
    content: '';/*伪元素必需的属性 */
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: #333;
    bottom: 0;
  }
  .info-desc .end::after {
    right: 0;
  }
  .info-desc .desc {/**描述内容 */
    padding: 15px 0;
    font-size: 14px;
  }
  .info-key {/**穿着效果这四个字 */
    margin: 10px 0 10px 15px;
    color: #333;
    font-size: 15px;
  }
  .info-list img {/**图片 */
    width: 100%;
  }
</style>
