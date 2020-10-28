<template>
  <scroll class="tab-menu">
    <div class="menu-list">
      <div class="menu-list-item" 
          :class="{active: index === currentIndex}"
          v-for="(item,index) in categories" 
          :key="index"
          @click="itemclick(index)">
        {{item.title}}
      </div>
    </div>
  </scroll>
</template>

<script>
import Scroll from "components/common/scroll/Scroll"
export default {
  name: 'TabMenu',
  components:{
    Scroll
  },
  data(){
    return{
      currentIndex: 0
    }
  },
  props:{
    categories: {
      type: Array,
      default(){
        return []
      }
    }
  },
  methods:{
    itemclick(index){
      //1.改变当前的索引值
      this.currentIndex = index;

      //2.把点击事件发射给category
      this.$emit('selectItem',index);
    }
  }
}
</script>

<style>
  .tab-menu{
    background-color: #f6f6f6;
    height: 100%;
    width: 100px;
    box-sizing: border-box; /*避免所包含的内容中的边框和内边距 改变整体所占宽度*/
  }
  .menu-list-item{
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 14px;
  }
  .menu-list-item.active{ /*要指定具体的active，因为多处用到，否则会互相影响的。  “ .menu-list .active ”  另一种写法，如果是同级两个类名不能分开，如果是上一级就要用空格分开*/
    font-weight: 700;
    color: var(--color-high-text);
    background-color: #fff;
    border-left: 3px solid var(--color-high-text);
  }
</style>