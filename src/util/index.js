import M from './tips'
import D from './date'
import HTTP from './http'
import Store from './store'
import Token from './token'
import H from './help'

window.log = window.log || function (msg){
    console.log(`[${window.D.time()}] ${msg}`)
}

//若需要使用 token （JWT）可以注释以下代码
/*======================== TOKEN 相关 ==========================

Store.load()

Token.refreshToken(window.TOKEN) //如果存在一个旧的 token 值（不管是否超时）

Token.schedule(process.env.NODE_ENV==='development'?60000:0) //开发模式下，每分钟进行 token 的刷新

======================== TOKEN 相关 ==========================*/

export {
    M,D,HTTP,Store,Token
}