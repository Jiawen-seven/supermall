import { 
  ADD_COUNTER, 
  ADD_TO_CART 
} from './mutation-types'
export default {
  //1.mutations唯一目的是修改state的值
  //2.mutations中的每个方法尽可能完成的事件是单一的。

  /*之前actions中的addCart函数是直接写在mutations里面，
  但是该函数包含两个功能，所以就写到actions中，
  在mutations里面将两个功能分开。*/
  
  [ADD_COUNTER](state,payload){
    //该商品原有的数量上加一
    payload.count += 1
  },
  [ADD_TO_CART](state,payload){
    //把该商品加入购物车，并且数量为1
    payload.count = 1
    state.cartList.push(payload);
    //在该模型中，添加一个属性，用于是否选中该商品
    payload.checked = true
  }
}