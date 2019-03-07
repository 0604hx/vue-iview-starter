<template>
    <div>
        <div class="demo-upload-list" v-for="(item,$index) in uploadList" :title="item.name">
            <div v-if="item.status === 'finished'" class="imgWrap" :title="item.filename">
                <img v-if="item.thumb" :src="item.thumb">
                <Icon v-else :custom="icon(item.format.toLowerCase())" size="48" style="padding-bottom:20px"></Icon>
                
                <div class="filename">{{item.filename}}</div>
                <div class="demo-upload-list-cover">
                    <Icon type="ios-eye-outline" @click.native="handleView(item.thumb)"></Icon>
                    <Icon type="ios-download-outline" @click.native="handleDownload(item.origin)"></Icon>
                    <Icon type="ios-trash-outline" @click.native="handleRemove(item,$index)"></Icon>
                </div>
            </div>
            <template v-else>
                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
            </template>
        </div>

        <Upload v-if="!disabled" ref="upload" :show-upload-list="false" :default-file-list="defaultList" 
            :on-success="handleSuccess" 
            :format="['jpg','jpeg','png','gif','bmp', 'pdf', 'doc', 'docx', 'xls', 'xlsx']"
            :max-size="10240" 
            :on-format-error="handleFormatError" 
            :on-exceeded-size="handleMaxSize" 
            :before-upload="handleBeforeUpload"
            multiple
            :data="form"
            type="drag" 
            action="attach/upload" 
            style="display: inline-block;width:98px;">
            <div style="width: 98px;height:98px;line-height:98px;">
                <Icon type="ios-camera" size="60" style="line-height:98px"></Icon>
            </div>
        </Upload>
        <span v-if="disabled && !uploadList.length" class="h">暂无内容</span>
    </div>
</template>
<script>
    let MAX = 30

    export default {
        props:{
            value:{type:Array, default:()=>[]},
            form:{type:Object, default:()=>{ return {case:null} }},
            disabled:{type:Boolean, default:false}
        },
        data() {
            return {
                defaultList: [],
                uploadList: []
            }
        },
        methods: {
            handleView(name) {
                if(!!name)
                    E.$emit("show-image", name.replace(".thumb.",".standard."))
                else
                    M.warn("此类附件不支持预览")
            },
            handleDownload (url){
                M.info("下载窗口已打开，若未显示请允许弹出窗口")
                window.open(url)
            },
            //不会物理删除，需要在后台人工删除
            handleRemove(file,i) {
                M.confirm("移除附件","确定移除此附件（文档或者图片）吗？ <br><br>注意： 附件移除后并不能撤销，请慎重操作！",() => {
                    // 从 upload 实例删除数据
                    //const fileList = this.$refs.upload.fileList;
                    //this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
                    let callback = ()=>{
                        this.uploadList.splice(i,1)
                        this.value.splice(i, 1)
                    }
                    let id = this.uploadList[i].id
                    if(!!id)
                        RESULT("attach/delete", {ids:[this.uploadList[i].id]}, d=>{
                            M.info("移除图片成功")
                            callback()
                        })
                    else
                        callback()
                })
            },
            handleSuccess(res, file) {
                if(res.success===true){
                    const p = res.data
                    file.thumb = p.thumb
                    file.name = p.filename
                    file.size = p.size
                    file.id = p.id

                    this.value.push(p)
                }else
                    M.notice.error(res.message, "附件上传出错")
            },
            handleFormatError(file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg、png、gif、bmp 格式的图片。'
                });
            },
            handleMaxSize(file) {
                this.$Notice.warning({
                    title: '超出文件大小限制',
                    desc: '文件 ' + file.name + ' 太大，不能超过 10M。'
                });
            },
            handleBeforeUpload() {
                const check = this.uploadList.length < MAX
                if (!check) {
                    this.$Notice.warning({
                        title: `最多只能上传 ${MAX} 张图片。`
                    });
                }
                //自动赋值
                if(window.CASEID)
                    this.form['case'] = window.CASEID
                return check;
            },
            refresh (){
                this.uploadList = this.$refs.upload.fileList;
            },
            /**
             * 获取图片ID集合
             */ 
            getIds (){
                return this.uploadList.map(item=>{
                    return item.id
                })
            },
            refreshList(nv){
                //重新计算 defaultList
                this.uploadList = !nv?[]:nv.map(item=>{
                    if(typeof(item) === 'string') return {}
                    item.status = 'finished';
                    item.percentage = 100;
                    return item;
                })
            },
            icon (t){
                if(t=='doc'||t=='docx') return "i i-word3"
                else if(t=='xls'||t=='xlsx') return "i i-excel"
                else return 'i i-'+t
            }
        },
        mounted() {
            // this.uploadList = this.$refs.upload.fileList;
            this.refreshList(this.value)
        },
        watch: {
            value (nv){
                this.refreshList(nv)
            }
        }
    }

</script>
<style>
    .demo-upload-list {
        display: inline-block;
        width: 100px;
        height: 100px;
        text-align: center;
        border: 3px solid #fafafa;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 3px rgba(0, 0, 0, .3);
        margin-right: 4px;
    }

    .demo-upload-list .imgWrap {
        width: 100px;
        height: 100px;
        display: table-cell;
        vertical-align: middle;
        text-align: center;
    }

    .demo-upload-list img {
        width: 100%;
        max-width: 100px;
        /*height: 100%;*/
    }
    .demo-upload-list .filename {
        position: absolute;
        bottom: 0px;
        background: rgba(220,220,220,0.6);
        color: black;
        line-height: 12px;
        font-size: 12px;
        overflow-y: hidden;
        max-height: 25px;
        word-break: break-all;
        width: 100%;
        text-align: center;
    }

    .demo-upload-list-cover {
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, .6);
    }

    .demo-upload-list:hover .demo-upload-list-cover {
        display: block;
    }

    .demo-upload-list-cover i {
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
        line-height: 100px;
    }
</style>
