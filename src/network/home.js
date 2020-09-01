import {request} from './request'
/*首页肯定会有多个请求，对所有请求放一个文件，统一管理。
和首页里面的东西就没有耦合在一起，
以后想改url或者查找直接在这个文件改就可以了。*/
export function getHomeMultidata(){
  return request({
    url: '/home/multidata'
  })
}