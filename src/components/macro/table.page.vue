<!--通用的表格分页-->
<template>
    <div style="overflow: hidden;margin-top:8px;">
        <div class="fl">
            <slot name="left"></slot>
        </div>
        <div style="float: right;">
            <Page placement="top" size="small" :total="value.total" :current="value.current" @on-change="_selectPage"
                    show-sizer show-total show-elevator
                    :page-size="value.pageSize" :page-size-opts="value.pageSizes" @on-page-size-change="_selectPageSize">
                <slot><span class="info">{{value.info}}</span></slot>
            </Page>
        </div>
    </div>
</template>

<style>
    .ivu-page-options .ivu-select-dropdown {width: auto !important;}
</style>

<script>
    export default {
        props:['value'],
        data(){
            return{
            }
        },
        methods:{
            _selectPage (p){
                this.value.current = p
            },
            _selectPageSize (ps){
                this.value.pageSize = ps
            }
        }
    }
</script>
    