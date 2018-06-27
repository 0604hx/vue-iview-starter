<template>
    <div>
        <i-form inline class="thin">
            <Form-item>
                <i-input type="text"  v-model="form.s_Like_un" placeholder="用户名"></i-input>
            </Form-item>
            <Form-item >
                <i-select v-model="form.s_EQ_t_" style="width:70px" placeholder="类型">
                    <i-option v-for="(item, $i) in types" :key="$i" :value="$i">{{ item }}</i-option>
                </i-select>
            </Form-item>
            <Form-item>
                <i-input type="text"  v-model="form.s_Like_on" placeholder="模块名"></i-input>
            </Form-item>
            <Form-item>
                <Date-picker style="width:120px" type="date" placeholder="选择开始日期" @on-change="GtDate"></Date-picker>
                -
                <Date-picker style="width:120px" type="date" placeholder="选择截止日期" @on-change="LtDate"></Date-picker>
            </Form-item>
            <Form-item>
                <i-button type="primary" shape="circle" icon="ios-search" @click.native="_search()"></i-button>
                <span class="ml10 info">{{page.info}}</span>
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

    export default  P.extend({
        data () {
            return {
                errorShow:false,
                error:"",
                types:['默认','新增','更新','删除','系统','错误','数据','清洗','登出','登录','上传','下载','后退'],
                columns: [
                    { title: "", type: "index", width: 40 },
                    { 
                        title: "用户名", key: "un", width: 120, sortable: true,
                        render:(h,p)=>{
                            return h("span",{
                                attrs:{title:"用户ID: "+p.row.uid}
                            }, p.row.un)
                        }
                    },
                    { title: "模块名", key: "on", width:180 },
                    { 
                        title:"类型", key:"t", sortable:true, width: 100,
                        render:(h,p)=> {
                            return h('span', this.types[p.row.t])
                        }
                    },
                    { title: "描述", key: "m",
                        render:(h,p)=>{
                            const cs =[]
                            if(p.row.e) cs.push(h('Button',{
                                'class':"mr10",
                                props:{type:'error',size:"small"},
                                on:{
                                    click:()=>this.showError(p.index)
                                }
                              }, "错误信息")
                            )
                            if(p.row.m) cs.push(h('span',p.row.m))
                            return h('p',cs)
                        }
                    },
                    { title: "记录日期", key: "d", width: 155, sortable: true, render: (h, p) => { return h('p', D.datetime(p.row.d)) } },

                ]
            }
        },
        methods: {
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
