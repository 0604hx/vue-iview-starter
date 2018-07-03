import Vue from 'vue'
import Router from 'vue-router'

import Main from "./Manage.vue"

Vue.use(Router)

let loginRouter = {
  path: '/login',name: 'login',meta:{title:"登录"},
  component: resolve => require(['./views/Login'], resolve)
}

let page404 = { path: '/404', meta:{title: '404-页面不存在'}, name: 'error-404', component: resolve => require(['@/views/common/404.vue'], resolve) }

let appRouter = {
  path: "/",
  name: "manage",
  title: "manage-main",
  redirect:"/demo/index",
  component: Main,
  children:[
    { path: '/demo/index', meta:{title:"演示页面"}, name: 'demo', component: resolve => require(['./views/demo/Index'], resolve) },
    { path: '/demo/list', meta:{title:"列表演示"}, name: 'demo-list', component: resolve => require(['./views/demo/List'], resolve) },
    { path: '/demo/chart', meta:{title:"图表、地图演示"}, name: 'demo-chart', component: resolve => require(['./views/demo/Chart'], resolve) },
    { path: '/demo/code-editor', meta:{title:"代码编辑器"}, name: 'demo-code-editor', component: resolve => require(['./views/demo/CodeEditor'], resolve) },
    { path: '/demo/upload', meta:{title:"文件上传"}, name: 'demo-upload', component: resolve => require(['./views/demo/Upload'], resolve) },

    // 系统相关
    { path: '/sys/log', meta:{title:"日志-系统管理"}, name: 'sys-log', component: resolve => require(['./views/system/Log'], resolve) },
  ]
}

let routes = [
  loginRouter,
  appRouter,
  {
    path:"/*",
    redirect:"/404",
    component: Main,
    children:[
      page404
    ]
  }
]

export default new Router({
  routes
})