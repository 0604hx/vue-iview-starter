<template>
    <div>
        <!--导出为 JSON 的对话框-->
        <Modal
                v-model="exportShow"
                title="导出数据"
                :mask-closable="false"
                @on-ok="exportDataDo">
            <div>
                {{exportConfig.message || ("确定导出数据吗（格式为"+exportConfig.format+"）？")}}
            </div>
            <div class="mt10">
                导出文件名：
                <template v-if="exportConfig.name">{{exportConfig.name}}</template>
                <span class="h" v-else>未指定，由系统自动生成（通常是 时间戳.{{exportConfig.format}}）</span>
            </div>
            <div class="mt10 mb10" v-if="exportConfig.format=='json'">
                <Checkbox v-model="exportConfig.pretty"> 格式化（非格式化时，每条数据占据一行，只对 JSON 格式有效）</Checkbox>
            </div>
            <a v-if="exportConfig.id" :href="'export/download/'+exportConfig.id" target="_blank" id="exportJump">
                <Button type="success" long>下载导出的数据文件</Button>
            </a>
        </Modal>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                exportShow   : false,
                exportConfig : {
                    form:{},
                    entity:"",
                    message:"",
                    format:"json",
                    id:"",
                    filename:"",
                    pretty:false 
                }
            }
        },
        methods: {
            /**
             * 导出数据
             * @param entity        对象
             * @param form          查询参数
             * @param filename      文件名，不指定则由系统生成
             * @param message       提示信息
             * @param 
             *
             */
             exportData (entity, form, format, ps){
                if(!entity) return M.notice.error("导出为 JSON 的数据对象必须设置")

                ps = ps || {}
                this.exportConfig.entity = entity
                this.exportConfig.form = form || {}
                this.exportConfig.format = format || 'json'
                this.exportConfig.filename = ps.filename
                this.exportConfig.message = ps.message
                this.exportConfig.id = ""
                this.exportConfig.pretty = false

                this.exportShow = true
            },
            exportDataDo (){
                RESULT(
                    `export/${this.exportConfig.entity}/${this.exportConfig.format}`,
                    Object.assign(this.exportConfig.form,{
                        entity: this.exportConfig.entity,
                        filename:   this.exportConfig.filename,
                        pretty: this.exportConfig.pretty
                    }),
                    d=>{
                        this.exportConfig.id = d.data.id
                        M.notice.ok("数据文件已在服务端导出成功，即将自动跳转到下载页面...")
                        this.$nextTick(()=>document.getElementById("exportJump").click())
                    })
            },
        },
        mounted () {
            E.$on("export", this.exportData)
        },
        destroyed () {
            E.$off("export", this.exportData)
        }
    }
</script>