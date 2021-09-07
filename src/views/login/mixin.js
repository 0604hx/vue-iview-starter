import FooterText from '@C/footer/footer-text.vue'

let NEXT = "/"

let buildCodeUrl = () => {
    return "/captcha-code?width=90&r=" + Math.random()
}

let TIPS = {
    "pwd": "使用传统用户名（邮箱）/密码登录，建议升级为手机验证码或者扫一扫登录",
    "phone":"手机验证码登录",
    "scan":"手机客户端扫一扫登录"
}

export default {
    components: {
        FooterText
    },
    data() {
        return {
            working:false,
            username: '',
            password: '',
            loginType:"pwd",
            loginTip: "登录方式",
            remember: false,
            codeUrl: buildCodeUrl(),
            ruleValidate: {
                username: [
                    { required: true, message: '登录名不能为空', trigger: 'blur' },
                    { type: 'string', min: 2, message: '登录名不能少于2个字', trigger: 'blur' }
                ],
                code: [
                    { required: true, message: '验证码不能为空', trigger: 'blur' },
                    { type: 'string', min: 4, message: '验证码不能少于4', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' },
                    { type: 'string', min: 5, message: '密码不能少于5个字', trigger: 'blur' }
                ]
            },
        }
    },
    methods: {
        handleSubmit() {
            this.$refs.accountForm.validate(valid => {
                if (valid) {
                    const { username, password } = this

                    //以下为登录成功后的操作
                    window.check_first_login = false
                    this.$router.replace(NEXT)
                }
            })
        },
        refreshCode() {
            this.codeUrl = buildCodeUrl()
        },
        tip(code) {
            if (code == 0) M.alert("请 <b class='info'>致电或者发送邮件</b> 联系系统管理员重置密码 <div class='mt10 warning'>请妥善保存密码以便造成不必要的损失</div>", "忘记密码")
            else if (code == 1) {
                M.alert("暂无开放新用户注册功能，如有需要请联系系统管理员","请联系需要管理员")
            }
        }
    },
    mounted() {
        let q = this.$route.query
        if (!!q.redirect) {
            NEXT = decodeURIComponent(q.redirect)
            console.log("登录后跳转：", NEXT)
        }
        this.loginTip = TIPS[this.loginType]
    },
    watch: {
        loginType (v){
            this.loginTip = TIPS[this.loginType]
        }  
    },
    destroyed() {
        /**
         * add on 2017年12月19日10:08:31
         * 测试发现，vue-router 改变了 url 但并未切换页面
         * 这里进行强制刷新
         * 
         * 可能是 vue 版本问题
         */
        if (this.$route.name == NEXT)
            window.location.reload()
    }
}