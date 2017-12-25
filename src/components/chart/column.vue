<template>
    <div style="width:100%; overflow:hidden"></div>
</template>

<script>
    let Highcharts = require('highcharts')

    export default {
        props: ['options','data', 'title','subtitle','ytitle'],
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
                
                this.ops = {
                    chart: {
                        type: 'column'
                    },
                    title:{text:this.title},
                    subtitle:{text:this.subtitle},
                    yAxis: {
                        title: {text: this.ytitle}
                    },
                    xAxis: {
                        categories: this.data.map(v=>v.name || v.code)
                    },
                    series: [{
                        name: this.title||'未命名',
                        data: this.data.map(v=>v.value)
                    }]
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