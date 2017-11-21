import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let routes = [
  {
    path: '/demo',
    name: 'demo',
    meta:{
      title:"演示页面"
    },
    component: resolve => require(['V/Demo'], resolve)
  },
  {
    path: '*',
    redirect: '/demo'
  }
]

export default new Router({
  routes
})