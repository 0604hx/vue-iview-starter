<!--
    数据展示表格，使用方式：
    ```javascript
    //引入组件
    import DataTable from '@C/data/data-table.vue'
    ```

    ```html
    <template>
        //使用并添加到 ref
        <DataTable ref="table" :value="this" />
    </template>

    <script>
        export default {
            data (){
                return {
                    loading: false,
                    columns:[],
                    datas:[]
                }
            },
            //加载数据
            loadData (){
                RESULT("", {}, d=>{
                    //更新数据方式一：调用 display 方法
                    this.$refs['table'].display(d.data)

                    //更新数据方式二：赋值 columns、datas
                    this.columns = []
                    this.datas = []
                })
            }
        }
    </script>
    ```
-->
<template>
    <div class="mt10">
        <Table :show-header="true" :size="size" :data="value.datas" class="td2" :class="cls" :max-height="height" :columns="value.columns" 
            :no-data-text="emptyText" stripe border :loading="value.loading">
            <div slot="loading" style="font-size: 1.3rem;" v-once>
                <i class="fa fa-gear fa-spin"></i> {{tipText}}
            </div>
        </Table>
        <div style="float: right;" v-if="pageSize>0">
            <Page placement="top" :total="page.total" :page-size="pageSize" :current="page.current" @on-change="_selectPage"
                    :show-sizer="false" show-total show-elevator>
                <slot><span class="info b">{{page.info}}</span></slot>
            </Page>
        </div>
    </div>
</template>

<script>
    import Report from "./DataHelper"

    export default {
        props: {
            value:      {type:Object},
            size:       {type:String, default:"small"},
            emptyText:  {type:String, default:"暂无数据，请先点击查看按钮"},
            tipText:    {type:String, default:"数据正在加载及二次计算中，请稍候..."},
            auto:       {type:Boolean, default:true},                                  //是否自动计算高度，占满屏幕
            cls:        {type:String, default:""},                           
            maxHeight:  {type:Number, default: 0},
            pageSize:   {type:Number, default: 0},                                      //每页显示数据量，若为0则不分页
        },
        data () {
            return {
                height: this.maxHeight,
                page:{
                    current:1,
                    total:0,
                    info:""
                },
                originDatas: []
            }
        },
        methods: {
            /**
             * 显示数据
             * @param data  二维数组（通常第一行为标题）
             * @param ps    表格参数，详见 src/service/Report.js
             */ 
            display (data, ps){
                this.$nextTick(()=>this.value.loading = false)
                this.value.columns = []
                this.value.datas= []

                if(!data) return

                if(!(data && data.length && data[0].length)){
                    M.alert("服务器返回数据格式有误（目前只支持<span class='b info'>二维数组</span>），请联系技术人员以解决", "无可显示数据")
                    return console.error("data 参数必须为二维数组！", data)
                }

                let { columns, nds } = Report.buildHeader(
                    data, 
                    0, 
                    Object.assign(
                        {
                            rowFixed: i=>i==0,      //只固定第一列
                        }, 
                        ps
                    )
                )
                this.page.current = 1
                this.page.total = nds.length

                this.value.columns = columns
                this.originDatas = nds
                this.value.datas = this._getDataToShow()

                console.log("[DataTable] 数据处理完成，共"+this.page.total+"条数据，每页显示"+this.pageSize+"...")

                if(nds.length==0)
                    M.alert("查询不到数据，请确认查询条件后再次尝试", "服务器返回空数据", "info")
            },
            _selectPage (p){
                if(this.value.loading)  return

                this.value.loading = true
                this.page.current = p
                console.debug("[DataTable] 更新页码为：", p)
                // let datas = JSON.parse(JSON.stringify(this._getDataToShow()))
                // datas.forEach((v, i)=>{
                //     v._index = i
                //     v._rowKey = i
                // })
                this.value.datas = this._getDataToShow()

                this.$nextTick(()=>this.value.loading = false)
            },
            _getDataToShow (){
                if(this.pageSize>0){
                    let from = (this.page.current-1) * this.pageSize
                    let end = from + this.pageSize

                    if(end > this.page.total)
                        end = this.page.total
                    
                    this.page.info = `共 ${this.page.total} 则数据，每页显示 ${this.pageSize} 条，当前显示 ${from+1} 到 ${end} 则数据`
                    return this.originDatas.slice(from ,end)
                }else
                    return this.originDatas
            }
        },
        mounted () {
            //计算当前高度（延迟 1 秒计算，保证准确度）
            if(this.auto){
                setTimeout(()=>{
                    let top = this.$el.offsetTop
                    //兼容无 wapper 的情况
                    this.height = (this.wrapperHeight() || window.innerHeight) - top - (top>80?45:42) - (this.pageSize>0?32:0)
                    console.debug("计算 DataTable 高度为：", this.height, " （元素 offsetTop=", this.$el.offsetTop, "）")
                }, 1000)
            }

            if(!("columns" in this.value || "datas" in this.value)){
                console.log("[WARN] 检测到 columns、datas 属性不存在，可能对表格展示造成影响...")
            }
        }
    }
</script>