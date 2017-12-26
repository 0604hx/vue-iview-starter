<template>
    <div style="width:100%; overflow:hidden" :style="{height:height+'px'}"></div>
</template>

<script>
    let Highcharts = require('highcharts')

    export default {
        props: {
            options:Object,
            type:String,
            data:Object, 
            title:String,
            subtitle:String,
            ytitle:String,
            height:{
                type:Number,
                default: 400
            }
        },
        data() {
            return {
                chart: null,
                ops:this.options
            }
        },
        methods: {
            refresh() {
                if(this.data)
                    this.figureOption()

                console.log(this.data, this.ops)
                if(this.ops && this.ops.series)
                    this.chart = Highcharts.chart(this.$el, this.ops)
            },
            figureOption(){
                let type = this.type || 'line'
                let maped = this.type == 'pie'? 
                    v=>{return {name:v.name||v.code, y:v.value||v.count}}
                    :
                    v=>{return v.value||v.count}
                this.ops = {
                    chart: {
                        type: type
                    },
                    title:{text:this.title},
                    subtitle:{text:this.subtitle},
                    yAxis: {
                        title: {text: this.ytitle}
                    },
                    xAxis: {
                        categories: this.data.map(v=>v.name || v.code)
                    },
                    series: [
                        {
                            name: this.title||'未命名',
                            data: this.data.map(maped)
                        }
                    ]
                }
            }
        },
        mounted () {
            this.refresh()
        },
        watch: {
            data (v){
                console.log("data 变化了")
                this.refresh()
            },
            options (){
                this.ops = v
            }
        }
    }
</script>