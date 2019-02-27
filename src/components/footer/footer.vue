<template>
    <!-- Main Footer -->
    <footer class="main-footer" :class="fixed?'fixed':''">
        <!-- To the right -->
        <div class="pull-right hidden-xs">
            <b>VERSION</b> {{C.version}}
        </div>

        <FooterText></FooterText>
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