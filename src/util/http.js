/**
 * 每次发送请求都附带 TOKEN
 */

import iView from 'iview'
import axios from 'axios'
import querystring  from 'querystring'

var _closeLoading=(iView)=>{
    //如果存在加载中，关闭
    if(window.Loading)  window.Loading()
    iView.LoadingBar.finish();
}

/*
 -------------------------------------------------------------------
 START axios相关配置
 */
var _initAxios=(iView)=>{
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    axios.interceptors.request.use(function (config) {
        iView.LoadingBar.start();
        return config;
    }, function (error) {
        return Promise.reject(error);
    });
    axios.interceptors.response.use(function (response) {
        _closeLoading(iView)

        return response;
    }, function (error) {
        _closeLoading(iView)
        return Promise.reject(error);
    });
}

var _dealWithErrorRequest = (url,error, onFail)=>{
    iView.LoadingBar.finish();
    console.log('请求<b class="error">'+url+"</b>出错",error)
    if(onFail) onFail()

    if(error && !error.response){
        //触发 网络无效 的事件
        E.$emit("network.bad",error)
        return M.notice.error("网络请求发送失败，请检查你的网络是否通畅，服务端地址是否设置："+error,"网络请求失败",10)
    }
    if(error.response.status===403) return M.notice.error(error.response.data.message||"你没有操作权限")
    if(error.response.status===511) {
        //M.notice.error(error.response.data.message||"请先登录");
        // return window.location.href="#/login"
        E.$emit('navigateTo', 'login')
    }
    if(error.response.status===500) return M.notice.error(error.response.data.message||"[500]服务器内部错误");
    if(error.response.status===404) return M.notice.error("[404]请求的资源不存在："+url);
    if(error.response.status===405) return M.notice.error("[405]服务端拒绝了'"+url+"'的请求:<div style='color:red'>"+error.response.statusText+"</div>");
}

/**
 * 发送POST请求到服务器
 * @param url
 * @param data
 * @param onOk
 * @param onFail
 * @constructor
 */
window.POST=(url,data,onOk,onFail)=>{
    //提交数据到服务器
    axios.post(window.SERVER + url, querystring.stringify(data||{})).then(function (response) {
        if(response.status===200){
            if(onOk) onOk(response.data)
        }
        else{
            M.notice.warn('fail post to'+url+"："+response.status)
        }
    }).catch(function (error) {
        _dealWithErrorRequest(url,error, onFail)
    })
}
window.GET=(url,data,onOk,onFail)=>{
    axios.get(window.SERVER + url, data).then(function (response) {
        if(response.status===200){
            if(onOk) onOk(response.data)
        }else{
            M.notice.warn('fail get '+url+"："+response.status)
        }
    }).catch(function (error) {
        _dealWithErrorRequest(url,error, onFail)
    })
}
/**
 * 对于返回Result对象的请求封装
 * @param url
 * @param data
 * @param onOk
 * @param onFail
 * @constructor
 */
window.RESULT=(url,data,onOk,onFail)=>{
    POST(url,data,function (res) {
        if(res.success === true && onOk) onOk(res)
        else{
            //打印错误信息
            console.log('RESULT 请求<b class="error">'+url+"</b>时失败:"+res.message)
            M.notice.error(res.message,"操作失败",10)
            if(onFail) onFail(res)
        }
    },onFail)
}

_initAxios(iView)

export default {}