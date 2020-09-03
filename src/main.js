import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false //阻止启动生产消息
Vue.prototype.$bus = new Vue() //定义全局变量，将new vue()赋给$bus，new vue()可作为事件总线，且能发射事件。

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
