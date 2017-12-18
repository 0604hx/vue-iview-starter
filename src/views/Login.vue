<!--用户登录-->
<template>
    <Modal class="loginM" v-model="show" width="550" :maskClosable="false" :closable="false">
        <div slot="header" class="c warning">
            <h2><Icon type="ios-locked" class="mr10"></Icon>请先登录</h2>
        </div>
        <Row class="">
            <i-col class="p10" span="12">
                <div>
                    <i-form ref="accountForm" :model="account" :rules="ruleValidate" :label-width="0" slot="left">
                        <Form-item prop="name">
                            <i-input v-model="account.name" placeholder="请输入姓名">
                                <Icon type="ios-person-outline" slot="prepend"></Icon>
                            </i-input>
                        </Form-item>
                        <Form-item prop="password">
                            <i-input v-model="account.password" type="password" placeholder="请输入登录密码">
                                <Icon type="ios-locked-outline" slot="prepend"></Icon>
                            </i-input>
                        </Form-item>

                        <Form-item style="margin-bottom: 0px;">
                            <b>记住我</b>
                            <i-switch v-model="account.remember"></i-switch>
                            <span class="h">方便下次自动登录</span>
                        </Form-item>
                    </i-form>
                </div>
            </i-col>
            <div class="example-split"></div>
            <i-col class="example-code" span="12">
                <header class="example-header">
                    <span class="info">没有账号？</span>
                </header>
                <p>请联系管理员获取登录帐密！</p>
                <header class="example-header">
                    <span class="warning">登录失败？</span>
                </header>
                <div>
                    <ol>
                        <li>1.请检查密码是否输入正确（注意大小写）</li>
                        <li>2.是否有空格</li>
                    </ol>
                </div>
            </i-col>
        </Row>

        <div slot="footer">
            <i-button type="primary" size="large" long :loading="working" @click.native="handleSubmit()">登录</i-button>
        </div>
    </Modal>
</template>
<style>
    .loginM .ivu-modal-header-inner {color:#3399ff;text-align:center;font-weight: normal}
</style>
<script>
    export default{
        data(){
            return{
                account:{
                    name:'',
                    password:'',
                    remember:false
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '姓名不能为空', trigger: 'blur' },
                        { type: 'string', min: 2, message: '登录名不能少于2个字', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '密码不能为空', trigger: 'blur' },
                        { type: 'string', min: 5, message: '密码不能少于5个字', trigger: 'blur' }
                    ]
                },
                show:true,
                working:false
            }
        },
        created (){
        },
        methods:{
            handleSubmit (name) {
                this.$refs.accountForm.validate(valid => {
                    if (valid) {
                        this.$router.push("/demo")
                        M.notice.ok("在这里编写您的登录逻辑（默认跳转到 /demo)","登录成功")
                    } else {
                        M.warn("请填写登录信息")
                    }
                })
            },
            handleReset () {
                this.$refs.accountForm.resetFields();
            }
        }
    }
</script>
