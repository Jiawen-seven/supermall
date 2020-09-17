<template>
  <nav-bar>
    <div slot="left" class="back" @click="backClick">
      <img src="~assets/img/common/back.svg" alt="">
    </div>
    <div slot="center" class="text">更多评论</div>
  </nav-bar>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
  name: 'CommentNavbar',
  components: {
    NavBar
  },
  methods: {
    backClick() {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
  .back img{
    margin-top: 12px;
    color: #fff;
  }
  .text{
    line-height: 45px;
  }
</style>