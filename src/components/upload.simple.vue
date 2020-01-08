<!--简单上传组件-->
<template>
    <Upload ref="upload" :show-upload-list="false" :on-success="handleSuccess" :on-error="handleError"
        :format="formatter" :max-size="maxSize" :on-format-error="handleFormatError"
        :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload" :multiple="multiple" :data="value" type="drag"
        :action="url" :headers="headers">

        <div class="p20">
            <Icon custom="fa fa-upload" size="64" class="info"></Icon>
            <p class="h" style="font-size:1rem">点击选择或者拖动文件到此以上传</p>
        </div>
    </Upload>
</template>

<script>
    let MAX = 3

    export default {
        props: {
            value: {type:Object, default: undefined},
            url: {type:String, default:""},
            exts: {type:String, default: "xls,xlsx"},
            multiple: {type:Boolean, default: true},
            token: {type:Boolean, default: false}
        },
        data () {
            return {
                headers: this.token?{"UA": window.TOKEN}:{},
                uploadList: [],
                maxSize: 51200,
                formatter: this.exts.split(",")
            }
        },
        methods: {
            handleSuccess(res, file) {
                if (res.success === true) {
                    if (res.message) {
                        M.notice.ok(res.message, "数据文件上传成功")
                    }
                    this.$emit('done', res)
                } else {
                    M.notice.error(res.message, "附件上传出错")
                }
            },
            handleError(e, file, fileList) {
                M.notice.error(
                    h => [
                        h('Tag', { props: { color: "error" } }, '404'),
                        h('span', e.toString()),
                        h('div', { attrs: { 'class': 'mt10 error b' } }, '若重复出现请联系科技部解决问题')
                    ],
                    "文件上传失败"
                )
            },
            handleFormatError(file) {
                M.notice.warn('文件 ' + file.name + `格式不正确，请按照规定的文件格式进行上传。`, '文件格式不正确')
            },
            handleMaxSize(file) {
                M.notice.warn('文件 ' + file.name + ' 太大，不能超过 50M。', '超出文件大小限制')
            },
            handleBeforeUpload(f) {
                //判断格式
                let ext = f.name.split(".").pop()
                if(this.formatter.indexOf(ext)<0){
                    M.notice.warn(`只允许上传 ${this.exts} 格式的文件`)
                    return false
                }

                if (this.uploadList.length > MAX) {
                    M.notice.warn(`最多只能上传 ${MAX} 个文件！`)
                    return false
                }
                //默认返回 false ，需要手动上传
                return true
            }
        }
    }
</script>