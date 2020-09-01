<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style scoped>
  .nav-bar{ /*导航栏*/
    display: flex;
    height: 44px;
    line-height: 44px;/*文字的高度，设置这个属性，文字也会居中*/
    text-align: center;
    box-shadow: 0 -1px 1px rgba(100,100,100,.2);
  }
  .left,.right{
    width: 60px;
  }
  .center{
    flex: 1;
  }
</style>