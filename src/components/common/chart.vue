<!--
    基于 ECHARTS 的图表
    使用说明，在 vue 中加入（components 依赖）
    最简单的使用如下：

    let demoChartData = {
        x: ["201901","201902","201903","201904","201905","201906","201907","201908","201909","201910","201911","201912"],
        y: [10,15,11,12,30,21,25,20,20,20,20,20]
    }
    this.$refs['chart'].update(
        `这里是标题`,
        [],
        demoChartData.x,
        [
            demoChartData.y
        ],
        dw
    )

    //绘制饼状图
    this.$refs['chart'].update(
        `标题`,
        ["大众","丰田","本田","奔驰"],
        undefined,
        [
            {
                name:"汽车销量（9月份）",
                type:"pie",
                radius:[20, 100],
                roseType:"area",            // 可选择为空、area、radius
                data: [
                    {value:100, name:"大众"},
                    {value:190, name:"丰田"},
                    {value:10, name:"本田"},
                    {value:10, name:"奔驰"}
                ]
            }
        ]
    )
-->
<template>
    <div style="width: 100%; height:100%;" ref="chart"></div>
</template>

<script>
    /**
     * import echarts from 'echarts'
     * 完整导入 echarts ，打包后单个文件大小 804 kb，总大小 3.05M
     * 
     * 按需导入后，打包单个文件大小 430 kb
     */ 
    // 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
    const echarts = require('echarts/lib/echarts')
    //引入柱状图跟折线图
    require("echarts/lib/chart/bar")
    require("echarts/lib/chart/line")
    require("echarts/lib/chart/pie")
    //引入工具
    require("echarts/lib/component/tooltip")
    require("echarts/lib/component/title")
    require("echarts/lib/component/toolbox")
    require("echarts/lib/component/legend")
    require("echarts/lib/component/markPoint")
    require("echarts/lib/component/grid")

    // let themes = [
    //     "azul", "bee-inspired", "blue", "caravan", "carp", "cool", "dark-blue", "dark-bold", "dark-digerati", "dark-fresh-cut", "dark-mushroom", "dark", 
    //     "eduardo", "forest", "fresh-cut", "fruit", "gray", "green", "helianthus", "infographic", "inspired", "jazz", "london", 
    //     "macarons", "macarons2", "mint", "red-velvet", "red", "roma", "royal", "sakura", "shine", "tech-blue", "vintage"
    // ]
    // themes.forEach(v=>require(`echarts/theme/${v}`))

    let grid = {
        left: '1%',
        bottom:'2%',
        right:'1%',
        containLabel: true
    }
    let tooltip = {
        trigger: "axis",
        axisPointer: { 
            type:"cross", 
            label:{ backgroundColor:"#6a7985", precision:0}
        }
    }
    let pieTooltip = {
        trigger: "item",
        formatter: `{a} <br />{b}：{c} ({d}%)`
    }
    let toolbox = {
        feature: { dataZoom:{}, dataView:{readOnly:true}, magicType:{type:['line','bar']},saveAsImage:{}, restore:{},  }
    }

    export default {
        props: {
            pie: {type:Boolean, default:false},                 //是否显示饼状图
            boundaryGap:{type:Boolean, default:false},
            interval:{type:String, default:"auto"},             //设置为0即可强制显示 X 轴的全部标签
            xRotate: {type:Number, default:0},                  //X轴的文字旋转角度
            legendBottom:{type:Boolean, default:false},         //是否将 legend 在底部显示，默认在顶部
            toolbox:{type:Boolean, default:true},               //是否显示工具栏
        },
        data () {
            return {
                data: {},
                chart: null
            }
        },
        mounted () {
            this.chart = echarts.init(this.$refs['chart'])//macarons

            if(this.legendBottom){
                grid.bottom = "10%"
            }
            if(this.toolbox == false)   toolbox = {}
            console.log(this.chart)
        },
        methods: {
            showLoading (text="数据正在努力加载..."){
                this.chart.showLoading({
                    text,
                    textStyle:{fontSize: 30, color:"#444"},
                    effectOption: {backgroundColor:'rgba(0,0,0,0)'}
                })
            },
            update (title, legend=[], xItems=[],series=[], danwei="", customColor){
                let option = {
                    title:{ text: title},
                    legend:{ data: legend,  bottom: this.legendBottom?0:"auto"},
                    tooltip: this.pie? pieTooltip: tooltip,
                    grid,
                    toolbox,
                    xAxis:this.pie? undefined: { data: xItems, boundaryGap: this.boundaryGap , axisLabel: {interval:this.interval, rotate:this.xRotate}},
                    yAxis:this.pie? undefined: {
                        type:"value",
                        splitLine:{show: true, lineStyle:{width:1}},
                        axisLabel:{
                            formatter:'{value} '+danwei
                        }
                    },
                    series: series.map(s=>{
                        return Object.assign({
                            type:"line",
                            smooth:true,
                            areaStyle:{},
                            markLine:   this.pie?{}:{data:[{type:'average'}]},
                            markPoint:  this.pie?{}: { data:[{type: 'max'},{type: 'min'}]}
                        }, Array.isArray(s)? {data: s}: s)
                    })
                }
                if(customColor) option.color = customColor

                this.chart.setOption(option)
                this.chart.hideLoading()
            },
            //直接覆盖配置
            setOption (opts){
                this.chart.setOption(opts)
                this.chart.hideLoading()
            },
            redraw (title, legend=[], xs,ys, series){
                this.chart.setOption({
                    title:{ text: title},
                    legend:{ data: legend,  bottom: this.legendBottom?0:"auto" },
                    tooltip: this.pie? pieTooltip: tooltip,
                    grid,
                    toolbox,
                    xAxis: this.pie?undefined:{ data: xs, boundaryGap: true },
                    yAxis: this.pie?undefined:ys,
                    series
                })
                this.chart.hideLoading()
            }
        }
    }
</script>