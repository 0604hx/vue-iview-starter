<template>
    <!-- Main Footer -->
    <footer class="main-footer" :class="fixed?'fixed':''">
        <!-- To the right -->
        <span class="hidden-xs">
            <b>VERSION</b> {{C.version}}
        </span>

        <FooterText class="fl"></FooterText>
    </footer>
</template>

<script>
    import FooterText from './footer-text.vue'
    export default {
        props: ['fixed'],
        components: {
            FooterText
        }
    }
</script>

<style>
    .main-footer {
        padding: 6px 12px 6px 12px;
        color: #555;
        border-top: 1px solid #dee2e6;
        background: #fff;
        text-align: right;
    }
    .main-footer.fixed {
        position: fixed;
    }
</style>