import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from 'fastclick' //导入fastclick，减少点击的延迟（移动端）
import VueLazyLoad from 'vue-lazyload'

import toast from 'components/common/toast' //这里会直接找到toast文件下的index.js

Vue.config.productionTip = false //阻止启动生产消息
Vue.prototype.$bus = new Vue() //定义全局变量，将new vue()赋给$bus，new vue()可作为事件总线，且能发射事件。

//安装toast插件
Vue.use(toast)  //当main.js一启动，就把toast安装好。
//当调用vue.use的时候，本质上是会去调用toast对象的install
//而toast对象就是components/common/toast/index.js中导入的对象obj
//所以会去执行obj的install函数

//解决移动端300ms的延迟
FastClick.attach(document.body)

//图片懒加载，用到时才加载
Vue.use(VueLazyLoad,{ //可以给它传东西
  loading: require('./assets/img/common/placeholder.png')//添加一个预加载的图片
}) 

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
