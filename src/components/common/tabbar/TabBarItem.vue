<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <!-- <div :class="{active: isActive}"><slot name="item-text"></slot></div> -->
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name:'TarBarItem',
  props: {  //（父传子）子组件需要用到父组件的东西
    path: String,
    activeColor: {
      type: String,
      default: 'PaleVioletRed'  //默认值
    }
  },
  data(){
    return{
      //isActive: true
    }
  },
  computed:{
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1  //$route.path:当前活跃的路径; this.path：是item的path， indexOf等于-1 就是没找到，不等于就是找到了（匹配）。
    },
    activeStyle() {
      return this.isActive ? {color: this.activeColor} : {}
    }
  },
  methods:{
    itemClick(){
      this.$router.replace(this.path)
    }
  }
}
</script>

<style>
  .tab-bar-item{
    flex: 1; /*让所有弹性盒模型对象的子元素都有相同的长度，且忽略它们内部的内容*/
    text-align: center;
    height: 49px; /*所有tabbar的高度基本都是这个，不用纠结 */
    font-size: 14px;
  }
  .tab-bar-item img{
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
  /* .active{
    color:#ff8800;
  } */
</style>