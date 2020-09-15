<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  // props: {
  //   message: {
  //     type: String,
  //     default: ''
  //   },
  //   isShow: {
  //     type: Boolean,
  //     default: false
  //   }
  // },
  data(){
    return{
      message: '',
      isShow: false
    }
  },
  methods: {
    show(message="默认内容",time=2000){
      this.isShow = true
      this.message = message
      setTimeout(() => {
        this.isShow = false
        this.message = ''
      }, time);
    }
  }
}
</script>

<style scoped>
  .toast{
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 10px 15px;
    color: #fff;
    background-color: rgba(0,0,0,.7);
    border-radius: 15px;
    font-size: 14px;
    z-index: 999;
  }
</style>