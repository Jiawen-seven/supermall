import {request} from './request'
export function getDetail(iid){
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}
export class Goods{ //将所有需要用到的数据封装到一个类里面
  constructor(itemInfo, columns, services){
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
  }
}