/**
 * 基于 iviewui 实现的对话框、确认框等组件
 * Created by zengxm on 4/28/2017.
 */
import iView from 'view-design'

let showMsg = (type, m,d)=>{
    let ops = {duration: d||5,background: true}     //默认显示背景色
    ops[typeof(m)==='function'?"render":"content"] = m
    iView.Message[type](ops)
}

let showNotice = (type, m, t, d)=>{
    let ops = {duration: d||10, title: t}
    ops[typeof(m)==='function'?"render":"desc"] = m
    iView.Notice[type](ops)
}

const M = {
    duration : 3000,
    ok (m,d){
        showMsg('success', m, d)
    },
    info (m,d){
        showMsg('info', m, d)
    },
    warn (m,d=5){
        showMsg('warning', m, d)
    },
    error (m,d=10){
        showMsg('error', m, d)
    },
    alert (m,t, type="info"){
        iView.Modal[type]({title:t, content:m})
    },
    confirm (t,m,onOk,onCancel){
        iView.Modal.confirm({
            title: t,
            content: m||'',
            okText: '确定',
            cancelText: '我再想想',
            onOk: () => {
                if(onOk) onOk()
            },
            onCancel: () => {
                if(onCancel) onCancel()
            }
        });
    },
    notice:{
        ok (m,t="操作成功",d){
            showNotice("success", m, t, d)
        },
        warn (m,t="警告",d){
            showNotice("warning", m, t, d)
        },
        info (m,t="",d){
            showNotice("info", m, t, d)
        },
        error (m,t="操作失败",d){
            showNotice("error", m, t, d)
        }
    },
    loadingStart (tips="加载中..."){
        window.Loading = iView.Message.loading(tips,0)
    },
    loadingClose (){
        if(window.Loading)  window.Loading()
    }
}

window.M = window.M || M
export default M