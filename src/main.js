/*
 * @Descripttion: 
 * @version: 
 * @Author: zkc
 * @Date: 2023-05-04 16:33:30
 * @LastEditors: zkc
 * @LastEditTime: 2023-05-31 21:09:34
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)
import "./assets/fonts/iconfont.css"
// 导入通用样式
import "./assets/css/style.css";

import VideoPlayer from 'vue-video-player'
import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css'

Vue.use(VideoPlayer)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
