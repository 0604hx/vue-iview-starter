<style>
    .demoDiv {padding: 10px}
    .demoDiv .section {
        margin-top: 15px;
    }
    .demoDiv .section h3 {
        display: block;
        margin-bottom: 4px;
        border-bottom: 1px solid #ededed;
    }
</style>

<template>
    <div class="demoDiv content">
        <Alert banner closable type="warning">提醒：现已升级到最新的 <b class="info">view-design </b>（iview4） </Alert>

        <h2>欢迎来到 {{name}} <small>version={{version}}</small></h2>
        <div class="section">
            <h3>日期工具</h3>
            <p class="h">封装了 <code>moment.js</code> ,调用 today() 或者 D.today() 得到当天日期</p>
            <small>{{today()}}</small>
        </div>

        <div class="section">
            <h3>计数器</h3>
            <p class="h">代码参考：<a href="https://github.com/iview/iview-admin">iview-admin</a></p>
            <Row :gutter="5">
                <Col :xs="24" :sm="8" :md="6">
                    <InfoCard bg
                        id-name="register-today"
                        :end-val="100"
                        iconType="md-people"
                        color="#ffd572"
                        intro-text="今日注册用户"
                    ></InfoCard>
                </Col>
                <Col :xs="24" :sm="8" :md="6">
                    <InfoCard bg
                        id-name="post-today"
                        :end-val="456"
                        iconType="ios-paper"
                        color="#2d8cf0"
                        intro-text="今日文章发布数量"
                    ></InfoCard>
                </Col>
                <Col :xs="24" :sm="8" :md="6">
                    <InfoCard bg
                        id-name="visit"
                        :end-val="9875841"
                        iconType="ios-unlock"
                        color="#64d572"
                        intro-text="今日访问量"
                    ></InfoCard>
                </Col>
                <Col :xs="24" :sm="8" :md="6">
                    <InfoCard bg
                        id-name="comment"
                        :end-val="78"
                        iconType="ios-chatbubbles"
                        color="#f25e43"
                        intro-text="今日留言&评论"
                    ></InfoCard>
                </Col>
            </Row>
        </div>

        <div class="section">
            <h3>提示信息</h3>
            <div class="h">
                封装基于 <code>iview</code> 的提示工具 <code>window.M</code>, 用法：<br>
                M.ok('message') <br>
                M.notice.ok('message','title')  <br>
            </div>
            <Button @click="tip(false)" type="info">显示简短提醒</Button>
            <Button @click="tip(true)" class="ml10" type="success">显示Notice</Button>
            <Button @click="$router.push('/404')" class="ml10" type="warning">跳转到 404 页面</Button>
        </div>

        <div class="section">
            <h3>新窗口打开</h3>
            
            <Button @click="newWindow">在新窗口打开页面</Button>
            <div class="h">
                示例代码：window.H.open('/#/demo/window', 1250)
            </div>
        </div>

        <div class="section">
            <h3>列表及分页</h3>
            <small>请点击菜单中的”列表演示“</small>
        </div>

    </div>
</template>

<script>
    /*
    引入 component 时，推荐使用 import . from .  的方式
    若使用 require（） 则需要加上 .default
    */
    // import TablePage from 'M/table.page.vue'
    
    import InfoCard from '@C/common/inforCard.vue'

    export default {
        components: {
            TablePage:require('@M/table.page.vue').default,
            InfoCard
        },
        data () {
            return {
                name:"vue + iview4 starter",
                version: C.version,
                page:{
                    total:10,
                    current:1,
                    pageSize:20
                }
            }
        },
        methods: {
            tip(notice=false){
                if(notice)
                    M.notice.ok(`hello ${this.name}`,'Notice 类型提示')
                else{
                    let ts = ["info:普通消息","ok:成功消息","warn:警告消息","error:错误消息"]
                    let t = ts[Math.floor(Math.random()*4)].split(":")
                    M[t[0]](`[${t[1]}] hello ${this.name}`)
                }
                    
            },
            newWindow (){
                window.H.open('/#/demo/window', 1250)
            }
        }
    }
</script>