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
    // import echarts from 'echarts'
    let echarts = require("echarts/lib/echarts")
    //引入柱状图跟折线图
    require("echarts/lib/chart/bar")
    require("echarts/lib/chart/line")
    //引入工具
    require("echarts/lib/component/tooltip")
    require("echarts/lib/component/title")
    require("echarts/lib/component/toolbox")
    require("echarts/lib/component/legend")
    require("echarts/lib/component/markPoint")

    // require("echarts/theme/macarons")

    let color = ['#2ec7c9','#b6a2de','#5ab1ef','#ffb980','#d87a80',
        '#8d98b3','#e5cf0d','#97b552','#95706d','#dc69aa',
        '#07a2a4','#9a7fd1','#588dd5','#f5994e','#c05050',
        '#59678c','#c9ab00','#7eb00a','#6f5553','#c14089'
    ]
    let grid = {
        left: '1%',
        bottom:'1%',
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
    let toolbox = {
        feature: { dataZoom:{}, dataView:{readOnly:true}, magicType:{type:['line','bar']},saveAsImage:{}, restore:{},  }
    }

    export default {
        data () {
            return {
                data: {},
                chart: null
            }
        },
        mounted () {
            this.chart = echarts.init(this.$refs['chart'])//macarons
        },
        methods: {
            showLoading (text="数据正在努力加载..."){
                this.chart.showLoading({
                    text,
                    textStyle:{fontSize: 30, color:"#444"},
                    effectOption: {backgroundColor:'rgba(0,0,0,0)'}
                })
            },
            update (title, legend=[], xItems=[],series=[], type="line", danwei=""){
                let option = {
                    title:{ text: title},
                    legend:{ data: legend },
                    tooltip,
                    grid,
                    toolbox,
                    xAxis:{ data: xItems, boundaryGap: false },
                    yAxis:{
                        type:"value",
                        splitLine:{show: true, lineStyle:{width:1}},
                        axisLabel:{
                            formatter:'{value} '+danwei
                        }
                    },
                    color,
                    series: series.map(s=>{
                        return Object.assign({
                            type,
                            smooth:true,
                            areaStyle:{},
                            markLine: {data:[{type:'average'}]},
                            markPoint:{ data:[{type: 'max'},{type: 'min'}]}
                        }, Array.isArray(s)? {data: s}: s)
                    })
                }
                this.chart.setOption(option)
                this.chart.hideLoading()
            },
            //直接覆盖配置
            setOption (opts){
                this.chart.setOption(Object.assign({color}, opts))
                this.chart.hideLoading()
            },
            redraw (title, legend=[], xs,ys, series){
                this.chart.setOption({
                    title:{ text: title},
                    legend:{ data: legend },
                    tooltip,
                    grid,
                    toolbox,
                    xAxis:{ data: xs, boundaryGap: true },
                    yAxis: ys,
                    color,
                    series
                })
                this.chart.hideLoading()
            }
        }
    }
</script>