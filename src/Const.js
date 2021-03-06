/**
 * 系统常量
 */
export default {
    name:"view-design-starter",
    company:"",
    developer:"集成显卡",
    email:"zxingming@foxmail.com",
    footerTip:"点此查看0604hx的主页",
    version: "2.3.0",

    /**
     * 定制 codemirror 选项
     */
    getCodeOptions: (ps)=>{
        return Object.assign({
            readOnly:false,
            tabSize: 2,
            lineNumbers: true,
            lineWrapping: true
        }, ps)
    }
}