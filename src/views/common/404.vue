<!---->
<template>
    <div class="div404">
        <div class="container">
            <div class="error404">
                <div class="error__face">{{face}}</div>
                <div class="error__message">I'm so sorry,
                    <br> but this page doesn't exist.</div>
                <div class="error__code">Error code: 404</div>
            </div>
        </div>
    </div>

</template>
<style scoped>
    .div404 {
        /* background-color: #1E6CCE; */
        /* color: #FFFFFF; */
        font-family: 'Arvo', serif;
    }

    .container {
        /*max-width: 960px;*/
        height: auto;
        margin: 0 10px;
        display: table;
    }

    .error404 {
        display: table-cell;
        vertical-align: middle;
    }

    .error__face {
        font-size: 96px;
    }

    .error__message {
        font-size: 48px;
        margin-top: 52px;
    }

    .error__code {
        font-size: 18px;
        margin-top: 52px;
        color: #999999;
    }

    @media screen and (min-width: 980px) {
        .container {
            width: auto;
            margin: 0 auto !important;
        }
    }
</style>
<script>
    var faces = [
        'ಥ_ಥ',
        '(≥o≤)',
        '(^-^*)',
        '(>_<)',
        'ಠ_ಠ',
        'ಠ╭╮ಠ',
        '( ͠° ͟ʖ ͠°)'
    ]

    export default {
        data() {
            return {
                face: ""
            }
        },
        methods: {
        },
        activated () {
            this.face = faces[Math.floor(Math.random() * faces.length)]
        }
    }
</script>