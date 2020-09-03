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
  props: {
    probeType: {
      type: Number,
      default: 0 //默认值是不实时监听
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  mounted() {//template挂载到整个dom上会回调
    //1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper,{
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    }),
    //2.监听滚动的位置
    this.scroll.on('scroll',(position) => {
      this.$emit('scroll',position)//这个位置信息在scroll页面是不需要用到的，传出去给home (子传父)
    }),
    //3.监听上拉下载更多
    this.scroll.on('pullingUp',() => {
      this.$emit('pullingUp')//同样是传出去给home 
    })
  },
  methods: {
    /**
     * 下面这两个方法都是为了封装起来，方便home那里直接调用，就可以不用一大串东西了。
     * 如：“this.$refs.Scroll.scroll.finishPullUp()” 直接改为“this.$refs.Scroll.finishPullUp()”
     * */
    scrollTo(x,y,time=1000) { //这是一个自定义的函数，命名和scrollTo函数一样而已。es6语法中，可以这样(time=1000)来设置默认的参数值。
      this.scroll.scrollTo(x,y,time) //这是scroll自带的scrollTo方法，该方法的前两个参数是代表位置x和y，第三个参数代表时间。
    },
    finishPullUp() {
      this.scroll.finishPullUp()//这样才能保证可以加载多次数据
    }
  }
}
</script>

<style>

</style>