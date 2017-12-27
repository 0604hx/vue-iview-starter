<template>
    <div>
        <i-form inline class="thin">
            <Form-item>
                <i-input type="text"  v-model="form.search_Like_un" placeholder="用户名"></i-input>
            </Form-item>
            <Form-item >
                <i-select v-model="form.search_EQ_t_" style="width: 110px" placeholder="任务类型">
                    <i-option v-for="item in logType" :value="item.value">{{ item.text }}</i-option>
                </i-select>
            </Form-item>
            <Form-item>
                <Row>
                    <i-col span="11">
                        <Date-picker type="date" placeholder="选择日期" @on-change="GtDate"></Date-picker>
                    </i-col>
                    <i-col span="2" style="text-align: center">-</i-col>
                    <i-col span="11">
                        <Date-picker type="date" placeholder="选择日期" @on-change="LtDate"></Date-picker>
                    </i-col>
                </Row>
            </Form-item>
            <Form-item>
                <i-button type="primary" shape="circle" icon="ios-search" @click.native="_search()"></i-button>
            </Form-item>
            <Form-item class="fr">
                <ExportButton :form="form" entity="日志"></ExportButton>
            </Form-item>
        </i-form>

        <i-table :data="datas" :columns="columns" stripe></i-table>
        <TablePage v-model="page"></TablePage>

        <Modal v-model="showLogDetail" title="错误日志详细内容">
          <p>{{logDetail.e}}</p>
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
                showLogDetail:false,
                logDetail:{},
                columns: [
                    { title: "", type: "index", width: 40 },
                    { title: "用户名", key: "un", width: 120, sortable: true },
                    { title: "用户id", key: "uid" },
                    { title: "对象名称", key: "on" },
                    { title:"操作类型", key:"t", sortable:true, width:100,
                        render:(h,p)=>{
                            return h('span',this._logType(p.row.t))
                        }
                    },
                    { title: "操作描述", key: "m" },
                    { title: "操作字段", key: "df" },
                    { title: "操作前的值", key: "dv" },
                    { title: "操作后的值", key: "dc" },
                    { title: "录入日期", key: "d", width: 155, sortable: true, render: (h, p) => { return h('p', D.datetime(p.row.d)) } },
                    { title: "操作", width: 150,
                        render:(h,p)=>{
                            return h('div',[
                                h('ButtonGroup',[
                                    h('Button', {
                                        attrs:{title:"查看错误日志详细信息",disabled:this.disabled(p.index)},
                                        props: {type: "ghost",icon: "eye"},
                                        nativeOn: {
                                            click: () => {
                                                this.showDetail(p.index)
                                            }
                                        }
                                      }
                                    ),
                                ]),
                            ]);
                        }
                    }
                ],
                logType:[
                    {text:"默认",value:0},
                    {text:"类型_1",value:1},
                    {text:"类型_2",value:2},
                    {text:"类型_3",value:3},
                    {text:"类型_4",value:4},
                    {text:"错误",value:5},
                ],
            }
        },
        methods: {
            _logType (c){
                const cc = this.logType[c]
                return cc?cc.text:""
            },
            GtDate (v) {
                this.form.search_GT_d = v
            },
            LtDate (v) {
                this.form.search_LT_d = v
            },
            showDetail (i){
                const t=this.datas[i]
                this.logDetail = t
                this.showLogDetail = true
            },
            disabled (i){
                if(this.datas[i].t == 5){
                    return false
                }else{
                    return true
                }
            }
        },
        mounted () {
            this.api = ""
            this.datas = [
                {un:"Suffer", uid:"xx_xxx_xxxx", on:"测试", t:0, m:"xx做了yy事情", e:"发现了异常!", df:"zz字段", dv:"0", dc:"1", d:1513152313000},
                {un:"Suffer_1", uid:"xx_xxx_xxxx", on:"测试1", t:1, m:"xx做了yy事情", e:"发现了异常!", df:"zz字段", dv:"0", dc:"1", d:1513152313000},
                {un:"Suffer_2", uid:"xx_xxx_xxxx", on:"测试2", t:2, m:"xx做了yy事情", e:"发现了异常!", df:"zz字段", dv:"0", dc:"1", d:1513152313000},
                {un:"Suffer_3", uid:"xx_xxx_xxxx", on:"测试3", t:3, m:"xx做了yy事情", e:"发现了异常!", df:"zz字段", dv:"0", dc:"1", d:1513152313000},
                {un:"Suffer_4", uid:"xx_xxx_xxxx", on:"测试4", t:4, m:"xx做了yy事情", e:"发现了异常!", df:"zz字段", dv:"0", dc:"1", d:1513152313000},
                {un:"Suffer_5", uid:"xx_xxx_xxxx", on:"测试5", t:5, m:"xx做了yy事情", e:"发现了异常!", df:"zz字段", dv:"0", dc:"1", d:1513152313000},
            ]
            this.page.total = 100
            this.page.info = `共 ${this.datas.length} 条数据`
        }
    })

</script>
