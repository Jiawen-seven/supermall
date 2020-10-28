<template>
  <div class="gridview" ref="gridview">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'GridView',
  props: {
    cols: { //列数
      type:Number,
      default: 2
    },
    hMargin: { //整体距离两边的距离（左右padding）
      type: Number,
      default: 8
    },
    vMargin:{ //整体距离顶部和底部的距离（上下的padding）
      type: Number,
      default: 8
    },
    itemSpace: { //每个item之间的距离
      type:Number,
      default: 8
    },
    lineSpace: {  //每行的间距
      type:Number,
      default: 8
    }
  },
  mounted(){  //template挂载到整个dom上面才回调
    this._autoLayout()
  },
  updated(){  //页面刷新的时候回调
    this._autoLayout()
  },
  methods:{
    _autoLayout(){
      //1.获取gridEL和children
      //这里不用document.querySelector，因为可能多出用到这个gridview组件，那么获取的东西就具有不确定性了。
      let gridEl = this.$refs.gridview;
      let children = gridEl.children;

      //2.设置gridEl的内边距
      gridEl.style.padding = `${this.vMargin}px ${this.hMargin}px`


      //3.计算item的宽度
      let itemWidth = (gridEl.clientWidth - 2 * this.hMargin - (this.cols-1) * this.itemSpace) / this.cols;
      // clientWidth实际宽度 = width+左右padding 
      //item的实际宽度= (clientWidth- 左右padding - 每个item之间的间距) /每行的个数既列数

      //4.循环将上面所求的所有相关值赋给每个孩子
      for(let i = 0; i<children.length;i++){
        //1.将上面所求的itemWidth赋值给每个孩子的宽度
        let item = children[i];
        item.style.width = itemWidth + 'px';

        //2.赋值间距
        if((i+1) % this.cols !==0){//除了每行的最后一个item不用赋值margin-right  （每行最后一个item的index+1 实际就是列数的倍数，所以如果i+1 和cols 求余等于0， 说明就是每行的最后一个了。）
          item.style.marginRight = this.itemSpace + 'px'; //每个item的间距实际是给item的margin-right赋值，但每行的最后一个不需要赋值
        }

        //3.赋值行距
        if(i >= this.cols){//除了第一行的item不赋值margin-top  （假设cols是3，代表三列，就是一行有三个，当i>=3才赋值，说明0,1,2这前三个是在第一行的，它们的margin-top不用赋值）
          item.style.marginTop = this.lineSpace + 'px';//行间距实际是给每个item的margin-top赋值了，但第一行的item不需要赋值
        }
      }

    }
  }
}
</script>

<style>
  .gridview{
    display: flex;
    flex-wrap: wrap;
  }
</style>