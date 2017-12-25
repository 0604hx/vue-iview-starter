<template>
    <div style="width:100%;overflow:hidden"></div>
</template>

<script>
    let Highcharts = require('highcharts')
    import loadMap from 'highcharts/modules/map'
    import WorldGEO from '@/assets/world.json'

    loadMap(Highcharts)

    export default {
        props: {
            title: String,   //地图大标题
            subtitle: String, //次标题
            legendTitle: String, //图例名称
            data: Array,
            hoverColor: { type: String, default: "#a4edba" },
            navigation: { type: Boolean, default: true },
            tipFormat: { type: String, default: '{point.code}: <b>{point.value}</b>' },
            serieName: String
        },
        data() {
            return {
                chart: null,
            }
        },
        methods: {
            figureLimit() {
                let ds = this.data.map(v => v.value).sort((a, b) => a - b)
                return { min: ds[0], max: ds[ds.length - 1] }
            },
            draw() {
                let { min, max } = this.figureLimit()
                this.chart = Highcharts.mapChart(this.$el, {
                    title: {
                        text: this.title
                    },
                    subtitle: {
                        text: this.subtitle
                    },
                    legend: {
                        title: {
                            text: this.legendTitle,
                            style: {
                                color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                            }
                        }
                    },
                    mapNavigation: {
                        enabled: this.navigation,
                        buttonOptions: {
                            verticalAlign: 'bottom'
                        }
                    },
                    tooltip: {
                        backgroundColor: 'none',
                        borderWidth: 0,
                        shadow: false,
                        useHTML: true,
                        padding: 0,
                        pointFormat: this.tipFormat,
                        positioner: function () {
                            return { x: 0, y: 250 }
                        }
                    },
                    colorAxis: {
                        min: 1,
                        max: max,
                        type: 'logarithmic'
                    },
                    series: [{
                        name: this.serieName || this.title,
                        data: JSON.parse(JSON.stringify(this.data)), //此处需要clone 一份数据给 highcharts，否则会发现被填充到 213 个国家
                        mapData: WorldGEO,
                        joinBy: ['iso-a2', 'code'],
                        states: {
                            hover: {
                                color: this.hoverColor
                            }
                        }
                    }]
                })
            }
        },
        mounted () {
            if(this.data)
                this.draw()
        },
        watch: {
            data(v) {
                this.draw()
            }
        }
    }
</script>