<template>
  <div class="tab-control">
    <!--这里只是文字不一样，就不搞插槽了！-->
    <div v-for="(item,index) in titles" 
    :key="item.label" class="tab-control-item"
    :class="{active: index === currentIndex}"
    @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name:'TabControl',
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return{
      currentIndex: 0 //默认当前的值是“流行”
    }
  },
  methods: {
    itemClick(index){
      this.currentIndex = index //把最新点击的赋值给currentIndex
      this.$emit('tabClick',index) //子传父，传回出去home
    }
  }
}
</script>

<style scoped>
  .tab-control{
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    background-color: white;
  }

  .tab-control-item{
    flex: 1;
  }

  .tab-control-item span{
    padding: 5px;
  }

  .tab-control-item.active{  /* “ .tab-control .active ”  另一种写法，如果是同级两个类名不能分开，如果是上一级就要用空格分开*/
    color: var(--color-high-text);

  }
  .tab-control-item.active span{
    border-bottom: 3px solid var(--color-high-text);

  }
</style>