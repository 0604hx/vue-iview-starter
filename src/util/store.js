/**
 * 存储工具：https://github.com/marcuswestin/store.js
 */
import store from 'store'
import moment from 'moment'

//默认的token有效期为 25 分钟
let TOKEN_TIMEOUT = 25*60*1000

let server = "server"
let token = "token"
let token_time = "tokenTime"

let _time = ()=> new Date().getTime()

let S = {
    TIMEOUT:24*60*60*1000,  //默认缓存过期时限为一天

    set (k,v){
        return store.set(k,v)
    },
    get (k,dv){
        let v = store.get(k)
        return v===undefined||v===null?dv:v
    },
    instance:store,

    /**
     * 设置全局的SERVER 并保存到文件系统中
     * @param {*} ip 
     */
    setupServer (ip,cb){
        window.SERVER = ip
        store.set(server, ip)
        if(typeof(cb)==='function')
            cb()
    },

    /**
     * token 刷新依据：token_time 与当前时间相差超过 20 分钟
     */
    isNeedRefreshToken (){
        return _time() - store.get(token_time)>= 20*60*1000
    },

    /**
     * 
     * @param {*} newToken 
     * @param {*} cb 
     */
    setupToken (newToken){
        store.set(token, newToken)
        if(!!newToken){
            store.set(token_time, _time())
            log("new token save done!")
        }else
            log("newToken is null, so token had cleaned...")
    },

    /**
     * 初始化本地的缓存，需要加载的内容有：
     * SERVER：server 端IP地址
     * TOKEN ：上次登录的 TOKEN值
     */
    load (){
        window.SERVER = store.get(server) || ""
        if(window.SERVER) console.log(`loaded server ip : ${SERVER}`)

        window.TOKEN = store.get(token)
        let tokenTime = store.get(token_time)
        //判断token是否过期
        if(_time()-store.get(token_time)>=TOKEN_TIMEOUT){
            console.log("token is expired, need to login again")
            window.TOKEN = undefined
        }
    }
}

window.S = window.S || S
export default S