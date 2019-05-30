/*
 * @Author: 集成显卡(https://github.com/0604hx) 
 * @Date: 2019-02-27 10:36:52 
 * @Last Modified by: 集成显卡
 * @Last Modified time: 2019-05-30 15:50:15
 */
import Vue from 'vue'
import Router from 'vue-router'

import initCheck from './CheckLogin'
import Main from "@V/Main.vue"
import WindowView from "@V/Window.vue"

Vue.use(Router)

let loginRouter = [
    { path: '/login',name: 'login',meta:{title:"登录"}, component: resolve => require(['@V/login/Login'], resolve)},
    { path: '/login-v2',name: 'login2',meta:{title:"登录-v2"}, component: resolve => require(['@V/login/Login.2'], resolve)},
    { path: '/login-v3',name: 'login3',meta:{title:"登录-v3"}, component: resolve => require(['@V/login/Login.3'], resolve)},
]

let page404 = { path: '/404', meta:{title: '404-页面不存在'}, name: 'error-404', component: resolve => require(['@/views/common/404.vue'], resolve) }

let appRouter = {
  path: "/",
  name: "manage",
  title: "manage-main",
  redirect:"/demo/index",
  component: Main,
  children:[
    { path: '/demo/index', meta:{title:"演示页面"}, name: 'demo', component: resolve => require(['@V/demo/Index'], resolve) },
    { path: '/demo/list', meta:{title:"列表演示"}, name: 'demo-list', component: resolve => require(['@V/demo/List'], resolve) },
    { path: '/demo/chart', meta:{title:"图表、地图演示"}, name: 'demo-chart', component: resolve => require(['@V/demo/Chart'], resolve) },
    { path: '/demo/code-editor', meta:{title:"代码编辑器"}, name: 'demo-code-editor', component: resolve => require(['@V/demo/CodeEditor'], resolve) },
    { path: '/demo/upload', meta:{title:"文件上传"}, name: 'demo-upload', component: resolve => require(['@V/demo/Upload'], resolve) },

    // 系统相关
    { path: '/sys/log', meta:{title:"日志-系统管理"}, name: 'sys-log', component: resolve => require(['@V/system/Log'], resolve) },
  ]
}

let blankRouter = {
  path: '',
  component: WindowView,
  children: [
    { path: '/demo/window', meta:{title:"新窗口颜色"}, name: 'demo-window', component: resolve => require(['@V/demo/NewWindow'], resolve) },
  ]
}

let routes = [
  ...loginRouter,
  appRouter,
  blankRouter,
  {
    path:"/*",
    redirect:"/404",
    component: Main,
    children:[
      page404
    ]
  }
]

let router = new Router({
    routes
  })

// initCheck(router)

export default router