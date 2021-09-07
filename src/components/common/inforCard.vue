<style lang="less">
    @import './styles/infor-card.less';
</style>

<template>
    <Card :padding="0">
        <div :style="{height:height+'px'}">
            <Row class="height-100" type="flex" align="middle" justify="center">
                <Col span="8" :style="{backgroundColor: bg?color:'inherit', color: bg?'white':color,height:height+'px',lineHeight:height+'px'}">
                    <div class="c">
                        <Icon :type="iconType" :size="iconSize"></Icon>
                        <div v-if="label" style="font-size: 1rem;margin-top:-15px;line-height: 0px;">{{label}}</div>
                    </div>
                </Col>
                <Col span="16">
                    <count-up 
                        class="infor-card-count user-created-count" 
                        :id-name="idName" 
                        :end-val="endVal" 
                        :color="color"
                        :countSize="countSize"
                        :countWeight="countWeight"
                    >
                        <p class="infor-intro-text c" slot="intro" v-html="introText"></p>
                    </count-up>
                </Col>
            </Row>
        </div>
    </Card>
</template>

<script>
import countUp from './countUp.vue';

export default {
    name: 'inforCard',
    components: {
        countUp
    },
    props: {
        //高度
        height: {
            type:Number,
            default: 100
        },
        label: {type:String, default:""},
        idName: String,
        endVal: Number,
        color: String,
        bg:{type:Boolean, default:false},
        iconType: String,
        introText: String,
        countSize: {
            type: String,
            default: '30px'
        },
        countWeight: {
            type: Number,
            default: 700
        },
        iconSize: {
            type: Number,
            default: 40
        }
    }
};
</script>

