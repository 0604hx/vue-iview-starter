<template>
    <div class="window" style="height: 100%">
        <div class="p10" style="min-height: calc( 100% - 32px ) !important">
            <router-view></router-view>
        </div>

        <Footer></Footer>
        <BackTop :bottom="10" :right="10"></BackTop>
    </div>
</template>

<script>
    import Footer from "@C/footer/footer"

    export default {
        components: {
            Footer
        }
    }
</script>