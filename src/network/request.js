import axios from 'axios'

//axios的拦截器的使用
export function request(config){
  //1.创建axios实例
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timeout: 5000
  })
  //2.axios的请求拦截
  instance.interceptors.request.use(config => {
    //console.log(config)
    return config //拦截之后要返回哦！
  },err => {
    //console.log(err)
  })
  //3.axios的响应拦截
  instance.interceptors.response.use(res => {
    //console.log(res)
    return res.data  //返回有用信息data即可，其他可以不返回~
  },err => {
    //console.log(err)
  })

  //4.发送真正的网络请求
  return instance(config) //instance本身返回值就是promise
}