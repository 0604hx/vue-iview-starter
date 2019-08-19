<!--
    二维数组展示
    使用 src\components\data\data-table.vue
-->
<template>
    <div>
        <Alert type="info" show-icon>
            二维数组展示
            <div slot="desc">
                <div>1、具体的参数详见：<code>src\components\data\data-table.vue</code></div>
                <div>2、DataTable 自动计算本地高度</div>
            </div>
        </Alert>

        <DataTable ref="table" :value="this" />
    </div>
</template>

<script>
    import DataTable from '@C/data/data-table.vue'

    export default {
        components: {
            DataTable
        },
        data () {
            return {
                loading: false,
                columns:[],
                datas:[]
            }
        },
        mounted () {
            let data = [["序号","用户名","年龄","注册日期","积分余额","会员等级","EMAIL","绑定QQ","最近登录"]]

            for(let i=0;i<20;i++)
                data.push([i+1,"IRONMAN",Math.floor(Math.random()*50+18),"2019-08-19",10000,"VIP5","ironman@admin.com","未绑定","2019年08月19日"])
            this.$refs['table'].display(data, {
                colWidth:(v,i)=>i==0?90:200,
                format:(v,row,col)=>{
                    if(col==2)
                        return v+" 岁"
                    return v
                }
            })
        }
    }
</script>