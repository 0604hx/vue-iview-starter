<template>
    <div>
        <!-- <Card :padding="0">
            <p slot="title" class="card-title">
                <Icon type="map"></Icon>
                全球人口密度统计
            </p>
            <Row>
                <Col :xs="24" :sm="6" class="p10">
                    <i-table :height="380" :columns="mapCountryColumns" :data="countryData"></i-table>
                </Col>
                <Col :xs="24" :sm="18">
                    <MapCountry :data="countryData" serieName="全球人口密度统计" subtitle="鼠标移动以获取详细信息" legendTitle="单位：人/平方公里"></MapCountry>
                </Col>
            </Row>
        </Card> -->

        <Card class="mt10" :padding="0">
            <p slot="title" class="card-title">
                <Icon type="map"></Icon>
                柱状图（通过 <em>options</em> 定义）
            </p>
            <Chart ref="barChart" style="height: 400px;"></Chart>
        </Card>

        <Card class="mt10" :padding="0">
            <p slot="title" class="card-title">
                <Icon type="map"></Icon>
                柱状图（通过 <em>data</em> 快速定义，只处理单个 series）
            </p>
            <!-- <Chart title="全球人口密度" :data="columnData" type="area" ytitle="人口" :height="400"></Chart> -->
            <Chart ref="renKouChart" style="height:400px"></Chart>
        </Card>
    </div>
</template>

<script>
    // import MapCountry from '@C/chart/map.world.vue'
    // import Chart from '@C/chart/basic.vue'
    import Chart from "@C/common/chart.vue"

    export default {
        components: {
            // MapCountry,Chart，
            Chart
        },
        data () {
            return {
                mapCountryColumns:[{title:'地区',key:'code'},{title:'扫描设备数',key:'value',sortable: true}],
                countryData:[{"code":"AF","value":53,"name":"Afghanistan"},{"code":"AL","value":117,"name":"Albania"},{"code":"DZ","value":15,"name":"Algeria"},{"code":"AS","value":342,"name":"American Samoa"},{"code":"AD","value":181,"name":"Andorra"},{"code":"AO","value":15,"name":"Angola"},{"code":"AI","value":202,"name":"Antigua and Barbuda"},{"code":"AR","value":15,"name":"Argentina"},{"code":"AM","value":109,"name":"Armenia"},{"code":"AW","value":597,"name":"Aruba"},{"code":"AU","value":3,"name":"Australia"},{"code":"AT","value":102,"name":"Austria"},{"code":"AZ","value":110,"name":"Azerbaijan"},{"code":"BS","value":34,"name":"Bahamas, The"},{"code":"BH","value":1660,"name":"Bahrain"},{"code":"BD","value":1142,"name":"Bangladesh"},{"code":"BB","value":636,"name":"Barbados"},{"code":"BY","value":47,"name":"Belarus"},{"code":"BE","value":359,"name":"Belgium"},{"code":"BZ","value":15,"name":"Belize"},{"code":"BJ","value":80,"name":"Benin"},{"code":"BM","value":1292,"name":"Bermuda"},{"code":"BT","value":19,"name":"Bhutan"},{"code":"BO","value":9,"name":"Bolivia"},{"code":"BA","value":73,"name":"Bosnia and Herzegovina"},{"code":"BW","value":4,"name":"Botswana"},{"code":"BR","value":23,"name":"Brazil"},{"code":"BN","value":76,"name":"Brunei Darussalam"},{"code":"BG","value":69,"name":"Bulgaria"},{"code":"BF","value":60,"name":"Burkina Faso"},{"code":"BI","value":326,"name":"Burundi"},{"code":"KH","value":80,"name":"Cambodia"},{"code":"CM","value":41,"name":"Cameroon"},{"code":"CA","value":4,"name":"Canada"},{"code":"CV","value":123,"name":"Cape Verde"},{"code":"KY","value":234,"name":"Cayman Islands"},{"code":"CF","value":7,"name":"Central African Republic"},{"code":"TD","value":9,"name":"Chad"},{"code":"CL","value":23,"name":"Chile"},{"code":"CN","value":143,"name":"China"},{"code":"CO","value":42,"name":"Colombia"},{"code":"KM","value":395,"name":"Comoros"},{"code":"CD","value":29,"name":"Congo, Dem. Rep."},{"code":"CG","value":12,"name":"Congo, Rep."},{"code":"CR","value":91,"name":"Costa Rica"},{"code":"CI","value":62,"name":"Cote d'Ivoire"},{"code":"HR","value":79,"name":"Croatia"},{"code":"CU","value":106,"name":"Cuba"},{"code":"CW","value":321,"name":"Curacao"},{"code":"CY","value":119,"name":"Cyprus"},{"code":"CZ","value":136,"name":"Czech Republic"},{"code":"DK","value":131,"name":"Denmark"},{"code":"DJ","value":38,"name":"Djibouti"},{"code":"DM","value":90,"name":"Dominica"},{"code":"DO","value":205,"name":"Dominican Republic"},{"code":"EC","value":58,"name":"Ecuador"},{"code":"EG","value":81,"name":"Egypt, Arab Rep."},{"code":"SV","value":299,"name":"El Salvador"},{"code":"GQ","value":25,"name":"Equatorial Guinea"},{"code":"ER","value":52,"name":"Eritrea"},{"code":"EE","value":32,"name":"Estonia"},{"code":"ET","value":83,"name":"Ethiopia"},{"code":"FO","value":35,"name":"Faeroe Islands"},{"code":"FJ","value":47,"name":"Fiji"},{"code":"FI","value":18,"name":"Finland"},{"code":"FR","value":118,"name":"France"},{"code":"PF","value":74,"name":"French Polynesia"},{"code":"GA","value":6,"name":"Gabon"},{"code":"GM","value":173,"name":"Gambia, The"},{"code":"GE","value":78,"name":"Georgia"},{"code":"DE","value":234,"name":"Germany"},{"code":"GH","value":107,"name":"Ghana"},{"code":"GR","value":88,"name":"Greece"},{"code":"GL","value":0.02,"name":"Greenland"},{"code":"GD","value":307,"name":"Grenada"},{"code":"GU","value":333,"name":"Guam"},{"code":"GT","value":134,"name":"Guatemala"},{"code":"GN","value":41,"name":"Guinea"},{"code":"GW","value":54,"name":"Guinea-Bissau"},{"code":"GY","value":4,"name":"Guyana"},{"code":"HT","value":363,"name":"Haiti"},{"code":"HN","value":68,"name":"Honduras"},{"code":"HK","value":6783,"name":"Hong Kong SAR, China"},{"code":"HU","value":112,"name":"Hungary"},{"code":"IS","value":3,"name":"Iceland"},{"code":"IN","value":394,"name":"India"},{"code":"ID","value":132,"name":"Indonesia"},{"code":"IR","value":45,"name":"Iran, Islamic Rep."},{"code":"IQ","value":73,"name":"Iraq"},{"code":"IE","value":65,"name":"Ireland"},{"code":"IM","value":145,"name":"Isle of Man"},{"code":"IL","value":352,"name":"Israel"},{"code":"IT","value":206,"name":"Italy"},{"code":"JM","value":250,"name":"Jamaica"},{"code":"JP","value":350,"name":"Japan"},{"code":"JO","value":69,"name":"Jordan"},{"code":"KZ","value":6,"name":"Kazakhstan"},{"code":"KE","value":71,"name":"Kenya"},{"code":"KI","value":123,"name":"Kiribati"},{"code":"KP","value":202,"name":"Korea, Dem. Rep."},{"code":"KR","value":504,"name":"Korea, Rep."},{"code":"XK","value":167,"name":"Kosovo"},{"code":"KW","value":154,"name":"Kuwait"},{"code":"KG","value":28,"name":"Kyrgyz Republic"},{"code":"LA","value":27,"name":"Lao PDR"},{"code":"LV","value":36,"name":"Latvia"},{"code":"LB","value":413,"name":"Lebanon"},{"code":"LS","value":72,"name":"Lesotho"},{"code":"LR","value":41,"name":"Liberia"},{"code":"LY","value":4,"name":"Libya"},{"code":"LI","value":225,"name":"Liechtenstein"},{"code":"LT","value":53,"name":"Lithuania"},{"code":"LU","value":195,"name":"Luxembourg"},{"code":"MO","value":19416,"name":"Macao SAR, China"},{"code":"MK","value":82,"name":"Macedonia, FYR"},{"code":"MG","value":36,"name":"Madagascar"},{"code":"MW","value":158,"name":"Malawi"},{"code":"MY","value":86,"name":"Malaysia"},{"code":"MV","value":1053,"name":"Maldives"},{"code":"ML","value":13,"name":"Mali"},{"code":"MT","value":1291,"name":"Malta"},{"code":"MH","value":300,"name":"Marshall Islands"},{"code":"MR","value":3,"name":"Mauritania"},{"code":"MU","value":631,"name":"Mauritius"},{"code":"YT","value":552,"name":"Mayotte"},{"code":"MX","value":58,"name":"Mexico"},{"code":"FM","value":159,"name":"Micronesia, Fed. Sts."},{"code":"MD","value":124,"name":"Moldova"},{"code":"MC","value":17704,"name":"Monaco"},{"code":"MN","value":2,"name":"Mongolia"},{"code":"ME","value":47,"name":"Montenegro"},{"code":"MA","value":72,"name":"Morocco"},{"code":"MZ","value":30,"name":"Mozambique"},{"code":"MM","value":73,"name":"Myanmar"},{"code":"NA","value":3,"name":"Namibia"},{"code":"NP","value":209,"name":"Nepal"},{"code":"NL","value":492,"name":"Netherlands"},{"code":"NC","value":14,"name":"New Caledonia"},{"code":"NZ","value":17,"name":"New Zealand"},{"code":"NI","value":48,"name":"Nicaragua"},{"code":"NE","value":12,"name":"Niger"},{"code":"NG","value":174,"name":"Nigeria"},{"code":"MP","value":132,"name":"Northern Mariana Islands"},{"code":"NO","value":16,"name":"Norway"},{"code":"OM","value":9,"name":"Oman"},{"code":"PK","value":225,"name":"Pakistan"},{"code":"PW","value":45,"name":"Palau"},{"code":"PA","value":47,"name":"Panama"},{"code":"PG","value":15,"name":"Papua New Guinea"},{"code":"PY","value":16,"name":"Paraguay"},{"code":"PE","value":23,"name":"Peru"},{"code":"PH","value":313,"name":"Philippines"},{"code":"PL","value":126,"name":"Poland"},{"code":"PT","value":116,"name":"Portugal"},{"code":"PR","value":449,"name":"Puerto Rico"},{"code":"WA","value":152,"name":"Qatar"},{"code":"RO","value":93,"name":"Romania"},{"code":"RU","value":9,"name":"Russian Federation"},{"code":"RW","value":431,"name":"Rwanda"},{"code":"WS","value":65,"name":"Samoa"},{"code":"SM","value":526,"name":"San Marino"},{"code":"ST","value":172,"name":"Sao Tome and Principe"},{"code":"SA","value":14,"name":"Saudi Arabia"},{"code":"SN","value":65,"name":"Senegal"},{"code":"RS","value":83,"name":"Serbia"},{"code":"SC","value":188,"name":"Seychelles"},{"code":"SL","value":82,"name":"Sierra Leone"},{"code":"SG","value":7252,"name":"Singapore"},{"code":"SK","value":113,"name":"Slovak Republic"},{"code":"SI","value":102,"name":"Slovenia"},{"code":"SB","value":19,"name":"Solomon Islands"},{"code":"SO","value":15,"name":"Somalia"},{"code":"ZA","value":41,"name":"South Africa"},{"code":"SS","value":13,"name":"South Sudan"},{"code":"ES","value":92,"name":"Spain"},{"code":"LK","value":333,"name":"Sri Lanka"},{"code":"KN","value":202,"name":"St. Kitts and Nevis"},{"code":"LC","value":285,"name":"St. Lucia"},{"code":"MF","value":556,"name":"St. Martin (French part)"},{"code":"VC","value":280,"name":"St. Vincent and the Grenadines"},{"code":"SD","value":16,"name":"Sudan"},{"code":"SR","value":3,"name":"Suriname"},{"code":"SZ","value":69,"name":"Swaziland"},{"code":"SE","value":23,"name":"Sweden"},{"code":"CH","value":196,"name":"Switzerland"},{"code":"SY","value":111,"name":"Syrian Arab Republic"},{"code":"TJ","value":49,"name":"Tajikistan"},{"code":"TZ","value":51,"name":"Tanzania"},{"code":"TH","value":135,"name":"Thailand"},{"code":"TP","value":76,"name":"Timor-Leste"},{"code":"TG","value":111,"name":"Togo"},{"code":"TO","value":145,"name":"Tonga"},{"code":"TT","value":261,"name":"Trinidad and Tobago"},{"code":"TN","value":68,"name":"Tunisia"},{"code":"TR","value":95,"name":"Turkey"},{"code":"TM","value":11,"name":"Turkmenistan"},{"code":"TC","value":40,"name":"Turks and Caicos Islands"},{"code":"TV","value":328,"name":"Tuvalu"},{"code":"UG","value":170,"name":"Uganda"},{"code":"UA","value":79,"name":"Ukraine"},{"code":"AE","value":90,"name":"United Arab Emirates"},{"code":"GB","value":257,"name":"United Kingdom"},{"code":"US","value":34,"name":"United States"},{"code":"UY","value":19,"name":"Uruguay"},{"code":"UZ","value":66,"name":"Uzbekistan"},{"code":"VU","value":20,"name":"Vanuatu"},{"code":"VE","value":33,"name":"Venezuela, RB"},{"code":"VN","value":280,"name":"Vietnam"},{"code":"VI","value":314,"name":"Virgin Islands (U.S.)"},{"code":"PS","value":690,"name":"West Bank and Gaza"},{"code":"EH","value":2,"name":"Western Sahara"},{"code":"YE","value":46,"name":"Yemen, Rep."},{"code":"ZM","value":17,"name":"Zambia"},{"code":"ZW","value":32,"name":"Zimbabwe"}],
                columnData: [],
                columnOptions:{
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: 'Monthly Average Rainfall'
                    },
                    subtitle: {
                        text: 'Source: WorldClimate.com'
                    },
                    xAxis: {
                        categories: [
                            'Jan',
                            'Feb',
                            'Mar',
                            'Apr',
                            'May',
                            'Jun',
                            'Jul',
                            'Aug',
                            'Sep',
                            'Oct',
                            'Nov',
                            'Dec'
                        ],
                        crosshair: true
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Rainfall (mm)'
                        }
                    },
                    tooltip: {
                        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                        footerFormat: '</table>',
                        shared: true,
                        useHTML: true
                    },
                    plotOptions: {
                        column: {
                            pointPadding: 0.2,
                            borderWidth: 0
                        }
                    },
                    series: [{
                        name: 'Tokyo',
                        data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
                    }]
                }
            }
        },
        mounted () {
            this.columnData = this.countryData.map(v=>{
                return {name:v.code, value:v.value}
            })

            this.$refs['renKouChart'].update("全球人口密度",[], this.countryData.map(v=>v.code), [this.countryData.map(v=>v.value)])

            this.$refs['barChart'].setOption({
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '直接访问',
                        type: 'bar',
                        data: [10, 52, 200, 334, 390, 330, 220]
                    },
                    {
                        name: '门户跳转',
                        type: 'bar',
                        data: [8, 90, 100, 234, 190, 430, 120]
                    },
                    {
                        name: '公众号引流',
                        type: 'bar',
                        data: [40, 100, 200, 434, 300, 300, 280]
                    }
                ]
            })
        }
    }
</script>