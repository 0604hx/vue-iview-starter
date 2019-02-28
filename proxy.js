/*
 * 开发阶段代理设置，根据开发阶段服务端地址填写 clusterHost、port 两个常量即可
 * 
 * @Author: 集成显卡@CIB 
 * @Date: 2019-01-18 09:19:37 
 * @Last Modified by: 集成显卡
 * @Last Modified time: 2019-02-28 09:52:28
 */

const yargs = require('yargs')
const chalk = require('chalk')

let log = function(){
  console.log(chalk.cyan(...arguments))
}

/** 
 * 后端服务器 IP，对于不同的环境可以通过 
 *  npm run dev --cluster=xxxx
 * 来改变
*/
let clusterHost = "localhost"
let port = 9000

let customClusterHost = (cmdOptions={})=>{
  if(cmdOptions.cluster)
    clusterHost = cmdOptions.cluster
  
  log("后端服务地址 = ", clusterHost)
}

try{
  let argsMap = JSON.parse(process.env.npm_config_argv)['original'].slice(2)
  
  if(!!Object.keys(argsMap).length){
    log('检测到用户自定义参数：', argsMap)
    argsMap = yargs.parse(argsMap)
  }

  customClusterHost(argsMap)
}catch(e){
}

const proxies = {}
/**
 * 这里填写需要转发的 url 规则，如 /app
 */
const prefixs = ['/dashboard', '/attach', '/sys', '/captcha-code','/login','/logout','/token']
//后端服务器地址

const server = `http://${clusterHost}:${port}/`
log("===========================================================\n")
log("代理地址： "+server+"\n")
for(var i=0;i<prefixs.length;i++){
    log("[HTTP代理] "+prefixs[i])
    proxies[prefixs[i]] = {
        target: server,
        changeOrigin: true,
        secure: false,
        //ws: true,//websocket支持
    }
}
log("\n===========================================================")

module.exports = proxies