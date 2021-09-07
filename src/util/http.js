/**
 * 每次发送请求都附带 TOKEN
 */

import iView from 'view-design'
import axios from 'axios'
import querystring  from 'querystring'

//默认的 server 前缀为空
window.SERVER = ""

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
    console.log(!!onFail && typeof(onFail)=='function', error.response)
    
    //如果 onFail 返回 true 则中断后续的异常处理
    if(!!onFail && typeof(onFail)=='function')
        if(onFail(error?error.response:null)) return

    if(error && !error.response){
        //触发 网络无效 的事件
        E.$emit("network.bad",error)
        return M.notice.error("网络请求发送失败，请检查你的网络是否通畅，服务端地址是否设置："+error,"网络请求失败",10)
    }
    if(error.response.status==504) return M.notice.error("接口地址无法找到: "+url+"<br>"+error, "HTTP 504")
    if(error.response.status===403) return M.notice.error(error.response.data.message||"你没有操作权限")
    if(error.response.status===511) {
        console.log("=.=...请先登录...=.=")
        M.notice.error("你没有权限执行此操作（可能需要先登录）："+error.response.data.message, "服务器拒绝")
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
 * @param json
 * @constructor
 */
window.POST=(url,data,onOk,onFail,json)=>{
    //提交数据到服务器
    axios.post(window.SERVER + url, json?data:querystring.stringify(data||{})).then(function (response) {
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
 * @param json
 * @constructor
 */
window.RESULT=(url,data,onOk,onFail,json=false)=>{
    POST(url,data,function (res) {
        if(res.success === true && onOk) onOk(res)
        else{
            //打印错误信息
            console.log('RESULT 请求<b class="error">'+url+"</b>时失败:"+res.message)
            // M.notice.error(res.message,"操作失败",10)
            // if(onFail) onFail(res)

            //当自定义了异常处理函数，就优先调用，当 onFail 返回 true 时不显示系统级别的错误提示
            let notShowError = onFail && onFail(res)===true
            if(!notShowError)
                M.notice.error(res.message,"操作失败",10)
        }
    },onFail, json)
}

/**
 * 直接用 json 提交数据
 */
window.RESULT2=(url,data,onOk,onFail)=>{
    RESULT(url,data,onOk,onFail,true)
}

/**
 * 使用 axios 上传文件
 * 需要设置头部
 */
 window.UPLOAD = (url, data, onOk, onFail)=>{
    let form = new FormData()
    Object.keys(data).forEach(k=> form.append(k, data[k]))
    RESULT(url, form, onOk, onFail, true, {'Content-Type': "multipart/form-data"})
}

/**
 * 下载文件到本地（使用 axios）
 * 程序如何判断是否为异常（后端异常返回的是 JSON 格式的异常信息）
 * 1. 后端没有返回文件名
 * 2. 返回的格式为 application/json
 * 
 * ----------------------------------------------------------------------------
 * 另外一种下载方式：
 * window.open("/attach/zipDownload")
 * 
 * @param url       
 * @param data      表单参数
 * @param onOk      默认成功后：M.notice({文件名}, "文件下载成功")
 * @param onFail    默认失败后通过 alert 打印错误信息
 * @param json
 * @constructor
 */
window.DOWNLOAD=(url, data, onOk, onFail,json=false)=>{
    //提交数据到服务器
    axios.post(window.SERVER + url, json?data:querystring.stringify(data||{}), {responseType: 'blob'}).then(function (response) {
        let headers = response.headers
        let contentType = headers['content-type']

        console.debug("下载响应头部：", headers)
        console.debug("下载响应内容：", response)
        if(!response.data){
            console.error("服务器响应异常", response)
            return onFail && onFail(response)
        }

        const blob = new Blob([response.data], {type: contentType})
        const contentDisposition = headers['content-disposition']
        const length = headers['content-length']
        let fileName = undefined
        if (contentDisposition) {
            fileName = window.decodeURI(contentDisposition.split('=')[1])
        }

        //判断是否为后端出错
        if(!fileName && response.data.type=="application/json"){
            let fileReader = new FileReader()
            fileReader.onload = e=>{
                let jsonText = fileReader.result
                let result = JSON.parse(jsonText)

                console.debug("来自后端的下载响应：", result)
                if(onFail) onFail(result)
                else {
                    let msg = `服务器响应内容：<br><br><div class="error">${result.message}</div><br>
                    <span class="h">1. 请确认您提交的参数是否正确后再重试<br>2. 若错误依旧请联系<b class="info">信息科技部</b>。</span>`
                    M.alert(msg, "文件下载失败", "error")
                }
            }
            fileReader.readAsText(response.data)
        }
        else {
            fileName = fileName || ("文件下载-"+D.datetime(D.now(), "YYYYMMDDHHmmss"))

            let link = document.createElement('a')
            // 非IE下载
            if ('download' in document.createElement('a')) {
                link.href = window.URL.createObjectURL(blob)    // 创建下载的链接
                link.download = fileName                        // 下载后文件名
                link.style.display = 'none'
                document.body.appendChild(link)
                link.click()                                    // 点击下载
                window.URL.revokeObjectURL(link.href)           // 释放掉blob对象
                document.body.removeChild(link)                 // 下载完成移除元素
            } else {
                // IE10+下载
                window.navigator.msSaveBlob(blob, fileName)
            }
            
            if(onOk)
                onOk({fileName, contentType, headers, length})
            else
                M.notice(fileName, "文件下载成功")
        }
    }).catch(function (error) {
        _dealWithErrorRequest(url,error, onFail)
    })
}

_initAxios(iView)

export default {}