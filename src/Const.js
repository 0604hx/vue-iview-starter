/**
 * 系统常量
 */
export default {
    name:"iview-starter",
    company:"",
    developer:"集成显卡",
    email:"zxingming@foxmail.com",
    version: "2.1.0",

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