/**
 * 通用组件封装
 * Created by zengxm on 3/21/2017.
 */
import ExportButton from './export.vue'
import Chart from 'C/chart/basic.vue'
import CodeMirror from "./codemirror.vue"

const views = {
    ExportButton,
    Chart,
    CodeMirror
}

const install = function (Vue, opts = {}) {
    Object.keys(views).forEach((key) => {
        if(key==='install') return
        console.log("注册组件：",key)
        Vue.component(key, views[key]);
    });
};

export default Object.assign(views, {install})
