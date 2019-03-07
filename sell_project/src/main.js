// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import goods from './components/goods/goods.vue'
import ratings from './components/ratings/ratings.vue'
import seller from './components/seller/seller.vue'
import VueResource from 'vue-resource'

Vue.config.productionTip = false
// 模块化中使用路由
Vue.use(VueRouter)
// 模块中使用vue-resource
Vue.use(VueResource)
/* eslint-disable no-new */
// Vue.extend(App)
// 1.定义（ 路由） 组件。     --components文件夹下已定义--
// goods = {template: '<div>goods</div>'}
// 2.定义路由
const routes = [
  { path: '/goods', component: goods },
  { path: '/ratings', component: ratings },
  { path: '/seller', component: seller }
]
// 3.创建 router 实例， 然后传 `routes`配置
const router = new VueRouter({
  routes, // （缩写）相当于 routes: routes
  linkActiveClass: 'active' // 用active替换router-link-active（路由组件router-link自带的选中样式名）样式名
})
// 4.创建和挂载根实例。
new Vue({
  router,
  render: h => h(App) // render函数是渲染一个视图， 然后提供给el[即$mount('#app')]挂载， 如果没有render那页面什么都不会出来
}).$mount('#app')
// 页面加载时自动跳转到商品部分
router.push('goods')
