<template>
    <div>
        <Card>
            <p slot="header">
                基于Html5的多文件上传示例
            </p>

            <input type="file" multiple="multiple" accept=".xls,.xlsx,.doc,.docx,.ppt,.pdf" @change="onSelect" />
            
            <table class="data-table mt10" style="width: 99%;">
                <tr>
                    <th width="60">序号</th>
                    <th>文件名</th>
                    <th width="130">修改日期</th>
                    <th width="100">文件大小</th>
                    <th width="80">状态</th>
                </tr>
                <tr v-for="(file,index) in files">
                    <td>{{index+1}}</td>
                    <td class="l">{{file.name}}</td>
                    <td>{{datetime(file.lastModified)}}</td>
                    <td>{{filesize(file.size)}}</td>
                    <td :title="fileStatus[index].text">
                        <i v-if="fileStatus[index].value==0" class="fa fa-clock-o"></i>
                        <i v-else-if="fileStatus[index].value==1" class="fa fa-spinner fa-spin info"></i>
                        <i v-else-if="fileStatus[index].value==2" class="fa fa-check-circle success"></i>
                        <i v-else class="fa fa-hand-stop-o  error"></i>
                    </td>
                </tr>
                <tr>
                    <td colspan="5" v-if="files.length==0" class="h c">
                        请选择文件（支持xls、xlsx、doc、docx、pdf、ppt）
                    </td>
                </tr>
            </table>

            <div class="mt20 c">
                <Button type="primary" @click="uploadDo" icon="fa fa-upload">上传</Button>
            </div>
        </Card>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                max: 10,
                files:[],
                fileStatus:[]
            }
        },
        methods: {
            onSelect (){
                let files = event.target.files
                if(files.length > this.max) return M.notice.warn(`一次最多选择${this.max}个文件`)

                let fileStatus = []
                for (let index = 0; index < files.length; index++) {
                    fileStatus[index] = {text:"等待上传",value:0}
                }
                this.files = files
                this.fileStatus = fileStatus
            },
            uploadDo (){
                if(this.files.length<=0)    return M.notice.warn(`请先选择文件`)

                for (let index = 0; index < this.files.length; index++) {
                    let file = this.files[index]
                    if(this.fileStatus[index].value==0){
                        this.$set(this.fileStatus, index, {text:"上传中...", value:1})

                        setTimeout(()=>{
                            if(Math.random()>0.5){
                                this.$set(this.fileStatus, index, {text:"已上传", value:2})
                                M.notice.ok(`${file.name}上传成功`)
                            }
                            else{
                                let randomCode = (""+Math.floor(Math.random()*100000)).substr(1)
                                this.$set(this.fileStatus, index, {text:"上传失败：错误代码 "+randomCode, value:-1})
                                M.notice.error(`${file.name}上传失败：错误代码 ${randomCode}`)
                            }

                        }, Math.floor(Math.random()*5000))
                    }
                    else
                        M.notice.warn(`文件${file.name}已上传或者失败，请重新选择`)
                }
            },
        },
        mounted () {
            
        }
    }
</script>