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
      click: true, //其他监听事件的参数
      probeType: this.probeType, //监听的参数
      pullUpLoad: this.pullUpLoad  //上拉下载的参数
    })
    //2.监听滚动的位置
    if (this.probeType == 2 || this.probeType == 3) {
      this.scroll.on('scroll',(position) => {
        this.$emit('scroll',position)//这个位置信息在scroll页面是不需要用到的，传出去给home (子传父)和Detail
      })
    }
    //3.监听上拉下载更多
    if (this.pullUpLoad) {
      this.scroll.on('pullingUp',() => {
        this.$emit('pullingUp')//同样是传出去给home,因为要在home中做事情
      })
    }
    
  },
  methods: {
    /**
     * 下面这三个方法都是为了封装起来，方便home那里直接调用，就可以不用一大串东西了。
     * 如：“this.$refs.Scroll.scroll.finishPullUp()” 直接改为“this.$refs.Scroll.finishPullUp()”
     * “this.scroll && ” 是用于先判断this.scroll有没有值，有值才进行后面的函数。
     * 因为在refresh那里，图片数据传的太快，但scroll还没有值，导致无法使用refresh，从而报错。
     * */
    scrollTo(x,y,time=1000) { //这是一个自定义的函数，命名和scrollTo函数一样而已。es6语法中，可以这样(time=1000)来设置默认的参数值。
      this.scroll && this.scroll.scrollTo(x,y,time) //这是scroll自带的scrollTo方法，该方法的前两个参数是代表位置x和y，第三个参数代表时间。
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp()//这样才能保证可以加载多次数据
    },
    refresh() {
      //console.log('-----')
      this.scroll && this.scroll.refresh()//每200ms就进行一次刷新。
    },
    getScrollY() {  //获取值，所以要return
      return this.scroll ? this.scroll.y : 0 
    }
  }
}
</script>

<style>

</style>