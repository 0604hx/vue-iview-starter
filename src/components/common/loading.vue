<template>
    <Spin size="large" fix v-if="value">
        <Icon type="load-c" class="loading" size="20"></Icon>
        <div v-text="text"></div>
    </Spin>
</template>

<script>
    export default {
        props: {
            value:{type:Boolean, default:true},
            text:{type:String, default:"数据加载中..."},
            size:{type:Number, default:20},
            icon:{type:String, default:"load-c"}
        }
    }
</script>