import M from './tips'
import D from './date'
import HTTP from './http'
import Store from './store'
import Token from './token'
import H from './help'

window.log = window.log || function (msg){
    console.log(`[${window.D.time()}] ${msg}`)
}

export {
    M,D,HTTP,Store,Token
}