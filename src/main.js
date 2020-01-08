//引入常量
import Consts from '@/Const'
global.C = window.C = Consts
Vue.prototype.C = Consts


//引入通用工具类
import '@U'
import commonViews from '@C/common'

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'

// 引入 iview
import iview from 'view-design'
import '@T/theme.less'
import "@T/app.less"

// 实际打包时应该不引入mock
// if (process.env.NODE_ENV !== 'production') require('@/mock')

//设置 view-design 的全局配置
Vue.use(iview, {
  transfer: true,
  size: 'default',
})
Vue.use(commonViews)

import moment from 'moment'
moment.locale('zh_cn')


Vue.prototype.today = (d) => { return window.D.today() }
Vue.prototype.date = (d) => { return window.D.date(d) }
Vue.prototype.datetime = (d) => { return window.D.datetime(d) }
Vue.prototype.filesize = (mem) => { return window.H.filesize(mem) }
Vue.prototype.thousand = t=> window.H.toThousands(t)
Vue.prototype.thousand2 = (t, len=2)=> t?window.H.toThousands(t.toFixed(len)):""
Vue.prototype.starHide = (v, from, len=4)=>{
  return v.substr(0, from)+(len==4?"****":"******")+v.substr(from+len)
}
Vue.prototype.wrapperHeight = ()=> {
  let element = document.querySelector(".single-page-con")
  return element?element.offsetHeight : 0
}
/**
* 根据 to 获取 Menu 的名称（用于 iview）
* 规则： 去掉开头的 / ，并将剩余的 / 全部替换成 -
*/  
Vue.prototype.menuName = (to)=>{
   return !!to?to.substring(1).replace(/\//g,"-"):""
}
Vue.prototype.simpleMenuName = function(){
  return this.$route.path.split("/").pop()
}
Vue.prototype.winWidth = window.innerWidth
//获取可用的内容高度
Vue.prototype.contentHeight = function(id){
  let top = $("#"+id).offset().top
  let height = (this.wrapperHeight() || window.innerHeight) - top - ($(".main-header-con").length>0?(top>60?-5:-16):34)
  console.debug(`计算高度为 `, height, top, this.wrapperHeight())
  return height
}

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
