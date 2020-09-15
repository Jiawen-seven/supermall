import { 
  ADD_COUNTER, 
  ADD_TO_CART 
} from './mutation-types'
export default {
  addCart(context,payload){
    return new Promise((resolve,reject) => {
      //这里面要做判断，商品是否已经存在购物车，如果存在就数量加一，如果不存在就push进去。
    //payload为新添加商品
    let oldProduct = null; //用于记录该商品是否已经存在
    for (let index = 0; index < context.state.cartList.length; index++) {//要遍历完才能确定购物车里面是否存在该商品
      if(context.state.cartList[index].iid == payload.iid){//如果存在(用id来判断，所以前面传id是必须的)
        oldProduct = context.state.cartList[index] //记录下来
      }
    }
    if(oldProduct){//说明已经存在该商品
      //oldProduct.count += 1
      context.commit(ADD_COUNTER,oldProduct)
      resolve('当前商品数量+1')
    } else{
      //payload.count = 1
      //context.state.cartList.push(payload);
      context.commit(ADD_TO_CART,payload)
      resolve('添加新商品')
    }
    })
  }
}