<!--登录页面2，参考 inspinia-->
<template>
    <div class="loginColumns animated fadeInDown">
        <Row>
            <Col span="12">
                <h2 class="font-bold">欢迎登录</h2>
                <h3 style="font-size:20px">{{C.name}} {{C.version}}</h3>

                <p style="margin-top:10px">
                    （一）常记溪亭日暮，沉醉不知归路。兴尽晚回舟，误入藕花深处。争渡，争渡，惊起一滩鸥鹭。
                </p>
                <p>
                    （二）昨夜雨疏风骤，浓睡不消残酒。试问卷帘人，却道海棠依旧。知否，知否？应是绿肥红瘦！ 
                </p>
                <p class="b">—— 李清照·如梦令</p>
            </Col>

            <Col span="12">
                <div class="ibox-content">
                    <i-form ref="accountForm" :model="this" :rules="ruleValidate" :label-width="0" slot="left" class="c">
                        <Form-item prop="username">
                            <Input type="text" placeholder="用户名" v-model="username" />
                        </Form-item>
                        <Form-item prop="password">
                            <Input type="password" class="mt10" placeholder="密码" v-model="password" />
                        </Form-item>
                        <Button long type="primary" class="mt10 mb10" @click="handleSubmit">登录</button>
                    </i-form>

                    <a @click.stop="tip(0)">
                        <small>忘记密码?</small>
                    </a>
                    <div class="c mb10">
                        <small>还没有账号?</small>
                    </div>
                    <Button long @click.stop="tip(1)">创建一个帐户</Button>

                    <div class="h r">注：此页面模仿 <a href="http://webapplayers.com/inspinia_admin-v2.8/login_two_columns.html" target="_blank">inspinia 登录页面</a></div>
                </div>
            </Col>
        </Row>
        
        <hr />
        <div class="row">
            <small>
                <FooterText></FooterText>
            </small>
        </div>
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
    .loginColumns {
        max-width: 800px;
        margin: 0 auto;
        padding: 100px 20px 20px 20px;
        font-family: "Segoe UI", "Source Sans Pro", Calibri, Candara, Arial, sans-serif;
    }

    h2,
    p {
        color: #676a6c;
        font-size: 13px;
        margin-top: 0;
        margin-bottom: 1rem;
        font-family: "Segoe UI", "Source Sans Pro", Calibri, Candara, Arial, sans-serif;
    }

    hr {
        -webkit-box-sizing: content-box;
        box-sizing: content-box;
        height: 0;
        overflow: visible;
        margin-top: 1rem;
        margin-bottom: 1rem;
        border: 0;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
    }

    h2 {
        font-size: 24px;
    }

    .font-bold {
        font-weight: 600;
    }

    .ibox-content {
        clear: both;
        background-color: #ffffff;
        color: inherit;
        padding: 15px 20px 20px 20px;
        border-color: #e7eaec;
        border-image: none;
        border-style: solid solid none;
        border-width: 1px 0;
    }

    .form-control,
    .single-line {
        background-color: #FFFFFF;
        background-image: none;
        border-radius: 1px;
        color: inherit;
        display: block;
        padding: 6px 12px;
        transition: border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s;
        width: 100%;
    }
    .ivu-form-item {
        margin-bottom:6px;
    }
</style>
<style>
    .loginColumns .ivu-form-item-error-tip {
        padding-top: 0px;
    }
</style>