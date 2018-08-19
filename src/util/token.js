/**
 * Token 处理类（使用 JWT）
 */
import axios from 'axios'
import S from './store'

/**
 * 刷新 Token
 */
let refreshToken = (newToken, cb)=>{
    if(!!newToken){
        console.log(`[${D.time()}] Token refresh :${newToken}`)
        window.TOKEN = newToken
        axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`

        S.setupToken(newToken)

        if(typeof(cb)==='function')
            cb()
    }
}

/**
 * 清空 TOKEN
 */
let cleanToken = ()=>{
    window.TOKEN = undefined
    axios.defaults.headers.common['Authorization'] = ``

    S.setupToken(null)
}

/**
 * 从服务端中获取最新的 token
 */
let refreshTokenFromServer = ()=>{
    if(!S.isNeedRefreshToken()) return
    
    console.log(`[${D.time()}] start to refresh token from server...`)
    RESULT("/token/refresh",{}, d=>{
        refreshToken(d.data)
    }, d=>{
        if(window.location.hash !== '#/login')
            E.$emit('navigateTo', 'login')
            // return window.location.href="#/login"
    })
}

/**
 * 开始 token 定时刷新
 * @param {*} interval  时间间隔，默认为 25 分钟
 */
let schedule = (interval)=>{
    interval = interval || 25*60*1000
    setInterval(refreshTokenFromServer, interval)
}

/**
 * 加载用户
 * @param {*} loginCb
 * @param {*} notLoginCb
 */
let loadAccount = (loginCb, notLoginCb)=>{
    if(!!window.TOKEN){
        GET(
            "/whoami?detail=true",{},
            d=>{
                if(d.success===true && !!d.data){
                    window.ACCOUNT = d.data
                    log("login done：account=" + d.data.name)

                    if(loginCb) loginCb(d.data)
                }
                else
                    if(notLoginCb) notLoginCb()
            },
            notLoginCb
        )
    }else{
        log("检测到 TOKEN 为空，直接调用 notLoginCb ...")
        if(notLoginCb) notLoginCb()
    }
}

let getAuthHeader = ()=>{
    return {
        Authorization:"Bearer "+window.TOKEN
    }
}

export default {
    loadAccount,
    refreshToken,
    cleanToken,
    schedule,
    getAuthHeader
}