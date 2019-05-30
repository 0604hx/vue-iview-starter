<template>
    <div>
        <Alert type="info">
            <h3>
                <i class="fa fa-windows"></i> 新窗口打开的页面
            </h3>
            <div slot="desc" class="mt10">
                此页面使用 <code>H.open('/#/demo/window', 800)</code> 打开。当前时间：{{msg}}
            </div>
        </Alert>

        <Card title="方法定义" icon="ios-cog-outline">
            <pre v-html="openFun" class="h">
            </pre>
        </Card>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                msg: D.datetime(),
                openFun: H.open
            }
        }
    }
</script>