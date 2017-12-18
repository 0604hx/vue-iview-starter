import Vue from 'vue'
import Router from 'vue-router'

import Main from "./Manage.vue"

Vue.use(Router)

let loginRouter = {
  path: '/login',name: 'login',meta:{title:"登录"},
  component: resolve => require(['./views/Login'], resolve)
}

let page404 = { path: '/*', meta:{title: '404-页面不存在'}, name: 'error-404', component: resolve => require(['@/views/common/404.vue'], resolve) }

let appRouter = {
  path: "/",
  name: "manage",
  title: "manage-main",
  component: Main,
  children:[
    { path: '/demo', meta:{title:"演示页面"}, name: 'demo', component: resolve => require(['./views/Demo'], resolve) },
    page404
  ]
}

let routes = [
  loginRouter,
  appRouter
]

export default new Router({
  routes
})