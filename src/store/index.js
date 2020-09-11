import Vue from 'vue'
import Vuex from 'vuex'

//1.安装插件
Vue.use(Vuex)

//2.创建store对象
const store = new Vuex.Store({
  state: {
    cartList: [] //存放购物车数据
  },
  mutations: {
    addCart(state,payload){
      //这里面要做判断，商品是否已经存在购物车，如果存在就数量加一，如果不存在就push进去。
      //payload为新添加商品
      let oldProduct = null; //用于记录该商品是否已经存在
      for (let index = 0; index < state.cartList.length; index++) {//要遍历完才能确定购物车里面是否存在该商品
        if(state.cartList[index].iid == payload.iid){//如果存在(用id来判断，所以前面传id是必须的)
          oldProduct = state.cartList[index] //记录下来
        }
      }
      if(oldProduct){//说明已经存在该商品
        //该商品原有的数量上加一
        oldProduct.count += 1
      } else{
        //把该商品加入购物车，并且数量为1
        payload.count = 1
        state.cartList.push(payload);
      }
    }
  }
})

//3.导出store独享，挂载到vue实例上
export default store