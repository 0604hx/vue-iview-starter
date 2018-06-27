<template>
    <div style="width:100%; overflow:hidden" :style="{height:height+'px'}"></div>
</template>

<script>
    let Highcharts = require('highcharts')

    export default {
        props: {
            name: String,
            options: Object,
            type: String,
            data: Array,
            title: String,
            subtitle: String,
            ytitle: String,
            //是否显示百分比，只针对 pie 图表
            per: {
                type: Boolean,
                default: true
            },
            height: {
                type: Number,
                default: 400
            }
        },
        data() {
            return {
                chart: null,
                ops: this.options
            }
        },
        methods: {
            refresh() {
                if (this.data)
                    this.figureOption()

                if (this.ops && this.ops.series)
                    this.chart = Highcharts.chart(this.$el, this.ops)
            },
            figureOption() {
                let type = this.type || 'line'
                let isPie = this.type == 'pie'
                let maped = isPie ?
                    v => { return { name: v.name || v.code, y: v.value || v.count } }
                    :
                    v => { return v.value || v.count }

                let ds = this.data.map(maped)
                if (isPie && ds.length > 0) {
                    ds[0] = Object.assign(ds[0], {
                        sliced: true,
                        selected: true
                    })
                }

                let ops = {
                    chart: {
                        type: type
                    },
                    title: { text: this.title },
                    subtitle: { text: this.subtitle },
                    yAxis: {
                        title: { text: this.ytitle }
                    },
                    xAxis: {
                        categories: this.data.map(v => v.name || v.code)
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                format: this.per ? '{point.name} ({point.percentage:.1f}%)' : undefined
                            },
                            showInLegend: true
                        }
                    },
                    series: [
                        {
                            name: this.name || this.title || '未命名',
                            data: ds
                        }
                    ]
                }
                if (isPie) {
                    let tooltip = ops.tooltip || {}
                    if (this.per)
                        tooltip.pointFormat = '<span style="color:{series.color}">\u25CF</span> {series.name}: <b>{point.y}</b> ({point.percentage:.1f}%)<br/>.'
                    ops.tooltip = tooltip
                }

                this.ops = ops
            }
        },
        mounted() {
            this.refresh()
        },
        watch: {
            data(v) {
                this.refresh()
            },
            options() {
                this.ops = v
            }
        }
    }
</script>