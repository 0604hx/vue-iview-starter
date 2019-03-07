// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'


//引入常量
import Consts from '@/Const'
global.C = window.C = Consts
Vue.prototype.C = Consts


//引入通用工具类
import '@U'
import commonViews from '@C/common'


// 引入 iview
import iview from 'iview'
import '@T/theme.less'
import "@T/app.less"

// 实际打包时应该不引入mock
// if (process.env.NODE_ENV !== 'production') require('@/mock')

Vue.use(iview)
Vue.use(commonViews)

import moment from 'moment'
moment.locale('zh_cn')


Vue.prototype.today = (d) => { return window.D.today() }
Vue.prototype.date = (d) => { return window.D.date(d) }
Vue.prototype.datetime = (d) => { return window.D.datetime(d) }
Vue.prototype.filesize = (mem) => { return window.H.filesize(mem) }
Vue.prototype.thousand = t=> window.H.toThousands(t)

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
