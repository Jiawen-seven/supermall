<template>
  <div class="check-button" :class="{check: isCheck}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
  name:'CheckButton',
  props:{
    isCheck: { //不要直接改这里面的，而是修改模型中的属性，先给模型添加一个属性。
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
  .check-button img {/** 没选中*/
    border-radius: 50%;
    border: 1px solid rgb(139, 139, 139);
  }
  .check img {/** 选中*/
    border: 1px solid var(--color-tint);
    background-color: var(--color-tint);
  }
</style>