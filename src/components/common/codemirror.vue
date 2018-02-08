<template>
    <codemirror :style="{'max-height':height+'px', height:height+'px'}" v-model="content" :options="options"></codemirror>
</template>
<style>
    /* 通过 .CodeMirror 进行高度设置，注意要加限定条件，否则全局的 codeMirror 都会统一高度 .CodeMirror {height: 100px} */
    .CodeMirror-scroll {overflow-x: hidden !important}
</style>
<script>
    import { codemirror } from 'vue-codemirror-lite'
    require('codemirror/mode/javascript/javascript.js')

    export default {
        components: {
            codemirror
        },
        props: {
            value:{type:String, default:""},
            height:{type:Number, default:300},
            readOnly:{type:Boolean, default:false},
            lineNumber:{type:Boolean, default:true}
        },
        data () {
            return {
                content:this.value,
                options: {
                    readOnly:this.readOnly,
                    tabSize: 4,
                    lineNumbers: this.lineNumber,
                    lineWrapping: true
                }
            }
        },
        watch: {
            value (v){
                this.content = v
            },
            content (v){
                this.$emit('input', v)
            }
        }
    }
</script>