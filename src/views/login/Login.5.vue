<template>
    <div class="login-page">
        <div class="login-head">
            <div class="container">
                <img src="@/assets/logo-blue.svg" style="float: left;">
                <div class="branch ml20">
                    基于 vue2 + view-design 的脚手架
                </div>
            </div>
        </div>
        <div class="login-view">
            <div class="container">
                <div style="position: absolute; top:-230px;">
                    <img src="@P/special/jiandang100.png" />
                </div>
                <div class="login-content">
                    <Tabs @on-click="onChange">
                        <TabPane name="pwd" icon="ios-people" label=" 用户名/邮件登录"></TabPane>
                        <TabPane name="phone" icon="md-phone-portrait" label="手机验证码"></TabPane>
                    </Tabs>
                    <div style="color: #9ea7b4;font-size: 14px; font-weight: normal;padding:0px 20px 0px 20px;height: 40px;">
                        {{loginTip}}
                    </div>
                    
                    <i-form ref="accountForm" :model="this" :rules="ruleValidate" :label-width="0" slot="left" class="c mini">
                        <div class="login-form">
                            <div class="input">
                                <Input type="text" v-model="username" prefix="ios-contact" size="large" placeholder="请输入账号" />
                            </div>
                            <div class="input">
                                <Input v-model="password" prefix="ios-lock" size="large" type="password" @on-enter="handleSubmit" :placeholder="loginType=='phone'?'请输入手机验证码':'请输入密码'" />
                            </div>
                            <div>
                                <Button @click="handleSubmit" long size="large" type="primary" :loading="working">点 此 登 录</Button>
                            </div>
                            <div class="mt10 l">
                                <a @click.stop="tip(0)">忘记密码</a>
                                <span style="float: right;">
                                    还没有账号？
                                    <a @click.stop="tip(1)">创建一个账号</a>
                                </span>
                            </div>
                        </div>
                    </i-form>
                   
                    <div class="counter">
                        欢迎使用，今天是{{date}}
                    </div>
                </div>
            </div>
        </div>
        <div class="login-foot">
            <FooterText></FooterText>
        </div>
    </div>
</template>

<script>
    import mixin from './mixin'

    export default {
        mixins: [mixin],
        data () {
            return {
                showHelp: false,
                queue: 0,
                date: "",
            }
        },
        methods: {
            onChange (name){
                name = name==1?"":name
                this.loginType = name
            }
        },
        updated () {
            this.date = D.today("YYYY年MM月DD日")
        }
    }
</script>

<style lang="less">
    .container {
        width: 1300px;
        margin-left: auto;
        margin-right: auto;
    }
    .tabs-style2 > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab{
        border-radius: 0;
        background: #fff;
    }
    .tabs-style2 > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active{
        border-top: 1px solid #3399ff;
    }
    .tabs-style2 > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active:before{
        content: '';
        display: block;
        width: 100%;
        height: 1px;
        background: #3399ff;
        position: absolute;
        top: 0;
        left: 0;
    }

    .login-page {
        position:fixed;
        top:0;
        z-index: 1;
        bottom:0;
        width:100%;
        min-height: 600px;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
        /* background-color: #fbbfbe; */
        
        /* background-image: linear-gradient(to bottom right, #fed3dc, #fbbfbe); */
        /* rgb(226,17,0) 暗红色 */
        /* background-image: linear-gradient(to bottom right, #bf0c2c, #9b1f1a);    */
        background: #f1f2f3;

        .login-head {
            height: 60px;
            background-color: #fff;

            img {
                margin-top: 8px;
                margin-left: 30px;
                height: 45px;
            }
            .branch {
                float: left;
                font-weight: 500;
                font-size: 1.4rem;
                color: #2D8cF0;
                line-height: 60px;
                height: 60px;
            }
        }

        .login-view {
            position: absolute;
            top: 50%;
            left: 0;
            width: 100%;

            .ivu-tabs-bar {
                margin-bottom: 8px;
            }
            .ivu-tabs-nav {
                .ivu-icon {
                    font-size: 24px;
                    margin-right:15px;
                }
                .ivu-tabs-tab {
                    font-size: 16px;
                    &.ivu-tabs-tab-active {
                        font-weight: 600;
                    }
                }
            }

            .login-form {
                padding: 10px 40px;

                .input {
                    margin-bottom: 20px;
                }
                input {
                    background-color: white;
                    height: 40px;
                    line-height: 20px;
                    width: 100%;
                    border: 1px solid #dedede;
                }
                input, .ivu-btn-large {
                    border-radius: 0px;
                }
            }

            .counter {
                border-top: 1px solid #eaeaea;
                padding: 10px;
                background-color: #f6f6f6;
                position: absolute;
                bottom: 0px;
                width: 100%;
                text-align: center;
            }
        }

        .login-content {
            position: absolute;
            top: 0;
            right: 40px;
            margin-top: -180px;
            width: 36rem;
            min-height: 364px;
            color: #333;
            background-color: #fff;
            padding: 10px 0;
        }

        .container {
            position: relative;
            width: auto;
            max-width: 1400px;
        }
    }

    .login-foot {
        position: fixed;
        z-index: 2;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: #333;
        background-color: #fff;
    }
</style>