import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const Shopcar = () => import('../views/shopcart/Shopcart')
const Profile = () => import('../views/profile/Profile')
const Detail = () => import('../views/detail/Detail')
const Comment = () => import('../views/comment/Comment')

//1.安装插件
Vue.use(VueRouter)

//2.创建router

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/shopcar',
    component: Shopcar
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path:'/detail/:id',
    component: Detail
  },
  {
    path:'/comment/:id',
    component: Comment
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

//3.导出router
export default router