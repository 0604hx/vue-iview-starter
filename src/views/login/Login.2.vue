<template>
    <div class="loginDiv">
        <div>
            <img src="@/assets/logo.svg" class="center-block logo">
            <div class="title">{{C.name}}</div>
            
            <i-form ref="accountForm" :model="this" :rules="ruleValidate" :label-width="0" slot="left" class="c">
                <Form-item prop="username">
                    <i-input v-model="username" prefix="ios-person-outline" placeholder="请输入姓名"></i-input>
                </Form-item>
                <Form-item prop="password" style="margin-bottom: 16px;">
                    <i-input size="large" v-model="password" type="password" prefix="ios-lock-outline" placeholder="请输入登录密码"> </i-input>
                </Form-item>
                <i-button type="primary" size="large" style="width:210px" @click.native="handleSubmit">登录</i-button>
            </i-form>
        </div>
        <div class="footer">
            <FooterText color="wheat"></FooterText>
        </div>
    </div>
</template>

<script>
    import mixin from './mixin'

    export default{
        mixins: [mixin]
    }
</script>

<style scoped>
    html,
    body,
    .loginDiv{
        background-color: #282b30 !important;
        height: 100%;
    }

    .loginDiv {
        padding: 6em 12em 6em 12em;
    }

    .loginDiv .footer {
        position: fixed;
        left:0px;
        bottom: 0px;
        text-align: center;
        color: #adadad;
        width: 100%;
        background-color: #282b30 !important;
        border-top: 0px;
    }

    .loginDiv .title {
        text-align: center;
        padding-bottom: 1.2rem;
        color: #fafafa;
        font-size: 1.8rem;
    }

    .loginDiv form {
        padding-left: 24em;
        padding-right: 24em;
    }

    .center-block {
        display: block;
        margin-right: auto;
        margin-left: auto;
    }

    .loginDiv .logo {
        width: 8em;
        padding: 0em;
    }
</style>
<style>
    .loginDiv .ivu-input {
        height: 60px;
    }
    .loginDiv .ivu-input-prefix i {
        line-height: 60px;
        font-size: 1.5rem;
    }
</style>