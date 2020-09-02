<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default { 
  name: 'Scroll',
  data() {
    return{
      scroll: null
    }
  },
  mounted() {//template挂载到整个dom上会回调
    this.scroll = new BScroll(this.$refs.wrapper,{
    })
  }
}
</script>

<style>

</style>