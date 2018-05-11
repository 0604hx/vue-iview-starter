<template>
    <Card>
        <p slot="title">{{title}}</p>
        <i-form :label-width="width" class="thin">
            <Form-item :label="label">
                <Upload ref="upload" :max-size="maxSize" :before-upload="beforeUpload" :on-success="onUploadSuccess" :on-error="onUploadError"
                    type="drag" :data="data" :accept="accept" :headers="headers" :action="url">
                    <div style="padding-top: 20px">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                        <div v-if="file" class="l p10" style="border-top:1px dashed #dedede;;line-height:1rem">
                            <div>文件名称：{{file.path}}</div>
                            <div>文件大小：{{filesize(file.size)}}</div>
                            <div>最后修改：{{datetime(file.lastModified)}}</div>
                        </div>
                        <div v-else class="h" style="line-height:22px">
                            点击或将文件拖拽到这里上传
                            <br>
                            <span style="color:red; font-weight:bold;">
                                注意：<template v-if="accept">仅支持 {{accept}} 后缀的文件 ，</template>文件大小不超过 {{sizeInfo}}
                                <br> 上传期间请勿切换到其他页面
                            </span>
                        </div>
                    </div>
                </Upload>
                <Button long type="primary" :loading="uploading" @click.native="uploadDo">上传数据文件</Button>
            </Form-item>
        </i-form>
    </Card>
</template>

<script>
    export default {
        props: {
            url: {type:String, default:""},
            accept:{type:String, accept:"*"},
            data:{type:Object, default:undefined},
            title:{type:String, default:"文件上传"},
            maxSize:{type:Number, default:1048576},
            headers:{type:Object, default:()=>{return {}}},
            label:{type:String, default:undefined}
        },
        data() {
            return {
                uploading: false,
                file: null
            }
        },
        computed: {
            width (){
                return this.label?80:0
            },
            sizeInfo (){
                console.log(H.filesize(parseInt(this.maxSize)))
                return this.filesize(parseInt(this.maxSize))
            }
        },
        methods: {
            uploadDo() {
                if (!!this.uploading) return M.warn("文件正在上传中，请耐心等待...")
                if (!!this.file) {
                    this.uploading = true
                    this.$refs['upload'].post(this.file)
                }
                else
                    M.warn("请先选择文件")
            },
            onUploadSuccess(resp, file, fileList) {
                this.uploading = false
                if (resp.success === true) {
                    this.file = null
                    this.$emit("upload-done", resp)
                } else {
                    M.notice.error(resp.message + (file.size == 0 ? "（检测到你上传的文件内容为空，系统不支持空文件上传哦）" : ""), "文件上传失败")
                }
            },
            onUploadError(err, file, fileList) {
                this.uploading = false
                if (err.status === 511) {
                    M.notice.error("服务端拒绝本次请求，请检查您是否已登录（若已登录尝试刷新当前页面后重试）", "上传失败")
                }
                else
                    M.notice.error("服务端拒绝本次请求，响应码 " + err.status, "上传失败")
            },
            beforeUpload(f) {
                this.file = f
                return false
            }
        }
    }
</script>