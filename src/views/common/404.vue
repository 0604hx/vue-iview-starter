<template>
    <div>
        <div class="p404 c">
            <div style="border:2px dashed #404040; font-size:2rem" class="p20">
                <div style="font-size: 4.5rem;">404</div>
                <i :class="icon"></i>
                {{text}}
            </div>
        </div>
    </div>
</template>

<style scoped>
    .p404 {
        margin: 0px auto 0;
        max-width: 650px;
        min-height: 200px;
        padding-top: 100px;
        font-family: Verdana, Arial, Helvetica, sans-serif;
        font-size: 14px;
    }

    p {
        color: #555;
        margin: 10px 10px;
    }

    img {
        border: 0px;
    }

    .d {
        color: #404040;
    }
</style>

<script>
    export default {
        data() {
            return {
                /**
                 * 默认文本：此功能正在开发中，敬请期待...
                 * 默认图标：fa fa-gear fa-spin
                 */
                text: "此功能不存在或暂未开放...",
                icon: "fa fa-meh-o"
            }
        },
        methods: {
            toIndex() {
                this.$router.replace("/")
            }
        }
    }
</script>