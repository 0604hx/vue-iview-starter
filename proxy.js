/*
 * 开发阶段代理设置，根据开发阶段服务端地址填写 clusterHost、context 两个常量即可
 * 
 * @Author: 集成显卡 
 * @Date: 2019-01-18 09:19:37 
 * @Last Modified by: 集成显卡
 * @Last Modified time: 2019-03-07 09:36:32
 */

const yargs = require('yargs')
const chalk = require('chalk')

let log = function(){
  console.log(chalk.cyan(...arguments))
}

/** 
 * 后端服务器 IP，对于不同的环境可以通过 
 *  npm run dev --server=xxxx
 * 来改变
*/
let clusterHost = "localhost:9999"
let context = ""      //如果端口后面有工程名，如 tomcat:8080/xxx

let customClusterHost = (cmdOptions={})=>{
  let getValue = v=> typeof(v) === 'string'?v:v.pop()

  if(cmdOptions.server)
    clusterHost = getValue(cmdOptions.server)
  
  log("后端服务地址 = ", clusterHost)
}

try{
  //优先使用 命令行参数，然后是 package.json 配置的 script 参数
  let argsMap = process.argv.slice(3).concat(JSON.parse(process.env.npm_config_argv)['original'].slice(2))
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
const prefixs = ['/dashboard', '/attach', '/sys', '/captcha-code','/login','/logout','/token','/menuController','/bankmgr']
//后端服务器地址

const server = `http://${clusterHost}/`
log("===========================================================\n")
log("代理地址： "+server+"\n")

let basicProxy = {}
//如果远程服务器存在工程名，则需要对 proxy 进行配置
if(!!context){
  basicProxy.pathRewrite = { '^/': `/${context}/`}
  basicProxy.cookiePathRewrite = {}
  basicProxy.cookiePathRewrite.push(`/${context}`, '/')
}

for(var i=0;i<prefixs.length;i++){
    log("[HTTP代理] "+prefixs[i])
    proxies[prefixs[i]] = Object.assign(basicProxy, {
        target: server,
        changeOrigin: true,
        secure: false
        //ws: true,//websocket支持
    })
}
log("\n===========================================================")

module.exports = proxies