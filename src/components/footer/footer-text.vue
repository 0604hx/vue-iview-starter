<template>
    <span>
        <strong>Copyright &copy; {{year}} <a href="https://github.com/0604hx" :title="C.footerTip" target="_blank" :style="{color}">{{C.developer}}</a>.</strong> All rights reserved.
    </span>
</template>

<script>
    export default {
        props: ['color'],
        data() {
            return {
                year: 0
            }
        },
        mounted() {
            this.year = new Date().getFullYear()
        }
    }
</script>