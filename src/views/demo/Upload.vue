<template>
    <div>
        <FileUpload :data="uploadData" accept=".txt,.json,.zip" url="import/upload" 
            title="文件上传组件演示" ref="upload" @upload-done="onUploadDone"></FileUpload>
    </div>
</template>

<script>
    import FileUpload from 'C/upload.vue'

    export default {
        components: {
            FileUpload
        },
        data () {
            return {
                uploadData:{
                    uid: Math.floor(Math.random()*1000)
                }
            }
        },
        methods: {
            onUploadDone (){
                M.notice.ok("文件上传成功")
            }
        }
    }
</script>