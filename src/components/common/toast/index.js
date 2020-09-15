import Toast from './Toast'

const obj = {}

//在install里面把所有东西都预备好
obj.install = function (Vue){//这里面它会传入一个Vue 作为参数 ，所以不需要导入Vue
    //1.创建组件的构造器
    const toastContrustor = Vue.extend(Toast)
    //2.以new的方式，根据组件构造器，可以创建一个组件对象
    const toast = new toastContrustor()
    //3.将组件对象，手动挂载到某一个元素上
    toast.$mount(document.createElement('div'))
    //4.toast.$el对应的就是div
    document.body.appendChild(toast.$el)
    //5.定义一个变量指向组件对象
    Vue.prototype.$toast = toast
}

export default obj