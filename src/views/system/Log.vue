<template>
    <div>
        <i-form inline class="thin">
            <Form-item>
                <i-input type="text"  v-model="form.s_Like_un" placeholder="用户名"></i-input>
            </Form-item>
            <Form-item >
                <i-select v-model="form.s_EQ_t_" style="width: 110px" placeholder="日志类型">
                    <i-option v-for="item in logType" :value="item.value">{{ item.text }}</i-option>
                </i-select>
            </Form-item>
            <Form-item>
                <i-input type="text"  v-model="form.s_Like_on" placeholder="模块名"></i-input>
            </Form-item>
            <Form-item>
                <Row>
                    <i-col span="11">
                        <Date-picker type="date" placeholder="选择开始日期" @on-change="GtDate"></Date-picker>
                    </i-col>
                    <i-col span="2" style="text-align: center">-</i-col>
                    <i-col span="11">
                        <Date-picker type="date" placeholder="选择截止日期" @on-change="LtDate"></Date-picker>
                    </i-col>
                </Row>
            </Form-item>
            <Form-item>
                <i-button type="primary" shape="circle" icon="ios-search" @click.native="_search()"></i-button>
            </Form-item>
            <Form-item class="fr">
                <ExportButton :form="form" entity="Log"></ExportButton>
            </Form-item>
        </i-form>

        <i-table :data="datas" :columns="columns" stripe></i-table>
        <TablePage v-model="page"></TablePage>

        <Modal v-model="errorShow" :width="1000" title="错误信息">
            <div class="h" v-html="error" style="max-height: 500px;overflow-y: auto"></div>
        </Modal>
    </div>
</template>
<script>
    import P from '@/macro/page.tpl.vue'
    import ExportButton from 'C/common/export.vue'

    export default  P.extend({
        components: {
            ExportButton
        },
        data () {
            return {
                errorShow:false,
                error:"",
                columns: [
                    { title: "", type: "index", width: 40 },
                    { title: "用户名", key: "un", width: 120, sortable: true },
                    { title: "用户id", key: "uid" },
                    { title: "模块名", key: "on" },
                    { title:"类型", key:"t", sortable:true,
                        render:(h,p)=>{
                            return h('p',this._logType(p.row.t))
                        }
                    },
                    { title: "描述", key: "m",
                        render:(h,p)=>{
                            const cs =[]
                            if(p.row.m) cs.push(h('p',p.row.m))
                            if(p.row.e) cs.push(h('Button',{
                                props:{type:'error',size:"small"},
                                on:{
                                    click:()=>{
                                      this.showError(p.index)
                                    }
                                }
                              }, "查看错误信息")
                            )
                            return h('p',cs)
                        }
                    },
                    { title: "记录日期", key: "d", width: 155, sortable: true, render: (h, p) => { return h('p', D.datetime(p.row.d)) } },

                ],
                logType:[
                    {text:"默认",value:0},
                    {text:"新增",value:1},
                    {text:"更新",value:2},
                    {text:"删除",value:3},
                    {text:"系统",value:4},
                    {text:"错误",value:5},
                    {text:"数据",value:6},
                    {text:"清洗",value:7},
                    {text:"导出",value:8},
                    {text:"登录",value:10},
                    {text:"登出",value:11},
                    {text:"上传",value:12},
                    {text:"下载",value:13},
                    {text:"后退",value:14},
                ],
            }
        },
        methods: {
            _logType (c){
                const cc = this.logType[c]
                return cc?cc.text:""
            },
            GtDate (v) {
                this.form.s_GT_d = v
            },
            LtDate (v) {
                this.form.s_LT_d = v
            },
            showError (i){
                const l = this.datas[i]
                this.error = this.html(l.e)
                this.errorShow = true
            },
        },
        mounted () {
            this.api = ""
            this.datas = [
                {un:"Suffer", uid:"xx_xxx_xxxx", on:"测试", t:0, m:"xx做了yy事情", df:"zz字段", dv:"0", dc:"1", d:1513152313000},
                {un:"Suffer_1", uid:"xx_xxx_xxxx", on:"测试1", t:1, m:"xx做了yy事情", df:"zz字段", dv:"0", dc:"1", d:1513152313000},
                {un:"Suffer_2", uid:"xx_xxx_xxxx", on:"测试2", t:2, m:"xx做了yy事情",  df:"zz字段", dv:"0", dc:"1", d:1513152313000},
                {un:"Suffer_3", uid:"xx_xxx_xxxx", on:"测试3", t:3, m:"xx做了yy事情",  df:"zz字段", dv:"0", dc:"1", d:1513152313000},
                {un:"Suffer_4", uid:"xx_xxx_xxxx", on:"测试4", t:4, m:"xx做了yy事情",  df:"zz字段", dv:"0", dc:"1", d:1513152313000},
                {un:"Suffer_5", uid:"xx_xxx_xxxx", on:"测试5", t:5, m:"xx做了yy事情", e:"发现了异常!", df:"zz字段", dv:"0", dc:"1", d:1513152313000},
            ]
            this.page.total = 100
            this.page.info = `共 ${this.datas.length} 条数据`
        }
    })

</script>
