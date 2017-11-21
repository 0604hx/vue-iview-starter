// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'


//引入常量
import Consts from 'S/Const'
global.C = window.C = Consts


//引入通用工具类
import 'U'


// 引入 iview
import iview from 'iview'
import 'iview/dist/styles/iview.css'
// import './assets/main.css'
Vue.use(iview)


import moment from 'moment'
moment.locale('zh_cn')


Vue.prototype.today = (d) => { return window.D.today() }
Vue.prototype.date = (d) => { return window.D.date(d) }
Vue.prototype.datetime = (d) => { return window.D.datetime(d) }
Vue.prototype.filesize = (mem) => { return window.H.filesize(mem) }


router.beforeEach((to, from, next) => {
  iview.LoadingBar.start();
  if(to.meta.title)  window.document.title = to.meta.title

  next()

  iview.LoadingBar.finish();
})
router.afterEach(route => {
  iview.LoadingBar.finish();
})


Vue.config.productionTip = false
// Vue.config.silent = true
// Vue.config.devtools = false


/**
 * 创建全局的事件调度器，详见：https://vuejs.org/v2/guide/migration.html#dispatch-and-broadcast-replaced
 *
 * 监听事件： E.$on("event-name", [func])
 * 发布事件：E.$emit("event-name", [data])
 * 取消监听：E.$off("event-name",[func])
 */
global.E = window.E = new Vue()


//创建 Vue 实例
import App from './App'
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
