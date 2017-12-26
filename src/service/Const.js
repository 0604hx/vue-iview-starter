/**
 * 系统常量
 */
export default {
    version: "1.0.0",

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