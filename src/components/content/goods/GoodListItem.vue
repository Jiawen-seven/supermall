<template>
  <div class="goods-item" @click="itemClick">
    <img v-lazy="showImage" alt="" @load="imageLoad"> <!--v-lazy="showImage"是使用了图片懒加载的方式 @load="imageLoad"用于监听每一张图片是否加载完成-->
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name:'GoodListItem',
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    showImage(){ 
      //一个是分类数据中商品展示数据，一个是详情页最底下的商品推荐数据,一个是首页商品展示的数据 (前两个数据必须放在前面，只有首页的数据可以放最后，我也不知道为啥，否则其它两个无法显示)
      //它们图片的位置不一样，所以弄一个计算属性来设置两种情况。
      return this.goodsItem.img || this.goodsItem.image ||  this.goodsItem.show.img 
    }
  },
  methods: {
    imageLoad() {
      //调用scroll的refresh刷新，但这里没法调用。
      //使用事件总线的办法发射事件（详细可看笔记）
      //但是$bus是空的，怎么给它加东西呢？ 原型，在main.js中加。
      //因为详情页最下面也有商品推荐展示的数据，所以也要监听图片加载完成。
      if(this.$route.path.indexOf('/home')){
        this.$bus.$emit('homeItemImageLoad')//home那边监听这个事件
      } else if (this.$route.path.indexOf('/detail')){
        this.$bus.$emit('detailItemImageLoad')//detail那边监听这个事件
      }
    },
    itemClick() {//商品详情页的点击
      this.$router.push('/detail/' + this.goodsItem.iid) //跳转到详情页页面，动态路由的使用,这里的iid是对应home传给detail的
      //query方法
      // this.$router.push({
      //   path: '/detail',
      //   query: {
      //     iid: this.goodsItem.iid
      //   }
      // })
    }
  }
}
</script>

<style scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;

    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;/*标题太长，用...表示后面的内容 */
    white-space: nowrap;/*标题只显示一行，不换行 */
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>