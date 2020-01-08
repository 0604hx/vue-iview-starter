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
        },
        methods: {
            navigateTo (path, replace=false, ps={}){
                let p = {params:ps}
                if(path.indexOf("/")==0)
                    p.path = path
                else
                    p.name = path
                if(replace==true)
                    this.$router.replace(p)
                else
                    this.$router.push(p)
            }
        },
        mounted () {
            //显示页面水印
            // Watermask.set(
            //     "集成显卡", 
            //     {
            //         rotate: Math.random()>0.5?20:-20, 
            //         font:"25px 微软雅黑", 
            //         top:0, 
            //         fillStyle: "rgba(200, 200, 200, 0.45)"
            //     }
            // )

            E.$on("navigateTo", this.navigateTo)

            let localTheme = S.get("THEME")||"primary"
            document.body.classList.add("theme-"+localTheme)
        },
        destroyed () {
            E.$off("navigateTo", this.navigateTo)
        }
    }
</script>