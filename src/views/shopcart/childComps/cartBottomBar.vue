<template>
  <div class="bottom-bar">
    <div class="bottom-button">
      <check-button :is-check="isCheckedAll" @click.native="checkedAll"/>
      <span>全选</span>
    </div>
    <div class="bottom-sum">
      合计:￥{{sum}}
    </div>
    <div class="bottom-count" @click="countClick">
      去计算({{count}})
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
import {mapGetters} from 'vuex'

export default {
  name:'cartBottomBar',
  components: {
    CheckButton
  },
  computed:{
    ...mapGetters(['cartList']),
    sum(){
      return this.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => { //reduce对数组中所有内容进行汇总
        return preValue + item.price * item.count
      },0).toFixed(2) //preValue的初始值为0，结果保留两位小数
    },
    count(){
      return this.cartList.filter(item => {
        return item.checked
      }).length
    },
    isCheckedAll(){//判断是否全选
      if(this.cartList.length === 0){
        return false
      }
      else{
        //1.filter方法
        // return !(this.cartList.filter(item => !item.checked).length) //先寻找没有选中的，如果存在没有选中，则返回的是true，再对该结果取反。
        
        //2.find方法
        return !(this.cartList.find(item => !item.checked))

        //3. 普通遍历方法
        // for(let item of this.cartList){
        //   if(!item.checked){
        //     return false
        //   }
        // }
        // return true
      }
    }
  },
  methods: {
    checkedAll(){//监听全选按钮的点击
      //我的方法
      //1.存在不选中的
      if(this.cartList.find(item => !item.checked)){
        //当点击全选的时候，全部都选中
        this.cartList.forEach(item => item.checked = true)
      }
      //2.全部都已经选中的
      else{
        //当点击全选时，全部都不选中
        this.cartList.forEach(item => item.checked = false)
      }
      
      // //老师的方法
      // //1.全部选中
      // if(this.isCheckedAll){//因为上面计算属性已经判断过了，就直接用。
      //   this.cartList.forEach(item => item.checked = false)
      // }
      // //2.全部没选中或部分选中
      // else{
      //   this.cartList.forEach(item => item.checked = true)
      // }
    },
    countClick(){
      if(this.sum == 0) { //如果没有选择的商品(则说明合计是0~)
        this.$toast.show('请选择购买的商品！',2000)
      }
    }
  }
}
</script>

<style scoped>
  .bottom-bar{
    display: flex;
    background-color: #eee;
    height: 40px;
  }
  .bottom-button{
    display: flex;
    line-height: 45px;
    margin-left: 10px;
    width: 60px;
  }
  .bottom-button span{
    margin-left: 5px;
    line-height: 40px;
  }
  .bottom-sum{
    margin-left: 20px;
    line-height: 40px;
    flex: 1;
  }
  .bottom-count{
    width: 100px;
    line-height: 40px;
    text-align: center;
    color: #fff;
    background-color: orangered;
  }
</style>