//这里是获取评论信息，但老师视频没有提供评论数据的接口，只能用详情页里面展示的那一条来代替。
import {request} from './request'
export function getComment(iid){//根据商品的id来获取对应的评论信息
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}