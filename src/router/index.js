/*
 * @Descripttion: 
 * @version: 
 * @Author: zkc
 * @Date: 2023-05-04 16:33:30
 * @LastEditors: zkc
 * @LastEditTime: 2023-06-15 13:39:42
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
    return VueRouterPush.call(this, to).catch(err => err)
}

const routes = [
  {
    path: '/',
    redirect: '/home', //必须有配置这个路径，否则转发无效
},
{
  path: '/home',
  name: 'home',
  component: () => import('../views/HomeView.vue')
}
]

const router = new VueRouter({
  mode: 'hash', //去除#号
  base: process.env.NODE_ENV == 'development' ? '' : 'wkkhtml/',
  routes
})

export default router
