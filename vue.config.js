const path = require('path')

const proxies = require("./proxy")

function resolve (dir) {
    return path.join(__dirname,dir)
}

module.exports = {
    // baseUrl:"/static/",
    assetsDir:"static",
    //生产环境是否生成 sourceMap 文件，一般情况不建议打开
    productionSourceMap: false,
    configureWebpack: config => {
        config.resolve = {
           extensions: ['.js', '.vue', '.json',".css"],
            alias: {
              '@P':resolve('public'),
              'vue$': 'vue/dist/vue.esm.js',
              '@': resolve('src'),                              //代码目录
              '@M': resolve("src/components/macro"),            //宏组件
              '@C': resolve("src/components"),                  //通用组件
              '@V': resolve("src/views"),                       //视图目录
              '@S': resolve("src/service"),                     //接口相关
              '@T': resolve("src/theme"),                       //主题相关
              '@U': resolve("src/util")                         //通用工具
            }
        }
    },
    lintOnSave: false,
    // webpack-dev-server 相关配置 https://webpack.js.org/configuration/dev-server/
	devServer: {
		host: "0.0.0.0",
		port: 8080, // 端口号
		https: false,
		open: false, //配置自动启动浏览器
        hotOnly: true, // 热更新
        overlay: {
            warnings: false,
            errors: false
        },
        proxy: proxies
    },
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true
            }
        }
    }
}