<template>
    <FormItem>
        <div slot="label" :title="tip">
            <b v-if="required" class="error">*</b>
            {{label}} <i v-if="!!tip" class="fa fa-question-circle primary"></i>
        </div>
        <slot>
            <Input v-if="!radio" v-model="content" :type="rows>1?'textarea':'text'" :rows="rows" :placeholder="tip" />
            <i-switch v-else v-model="content"></i-switch>
        </slot>
        <slot name="right"></slot>
    </FormItem>
</template>

<script>
    export default {
        props: {
            label:      {type:String},
            value:      {default:""},
            radio:      {type:Boolean, default:false},
            tip:        {type:String, default:""},
            rows:       {type:Number, default:1},
            required:   {type:Boolean, default:false}
        },
        data () {
            return {
                content: this.value
            }
        },
        watch: {
            content (){
                this.$emit('input', this.content)
            },
            value (v){
                this.content = v
            }
        }
    }
</script>