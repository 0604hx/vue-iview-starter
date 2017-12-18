<!---->
<template>
    <Row style="width:50%;margin-left: auto;margin-right:auto;margin-top:50px; margin-bottom: 30px">
        <Alert type="error" show-icon>
            <h2>404</h2>
            <span slot="desc">

            <blockquote>
                <p>你访问的资源不存在: <b>{{$route.path}}</b></p>

                <pre>
                 _____________
                (  <router-link to="" @click.native="$router.go(-1)">返回上一页</router-link>  )
                (  <router-link to="/">返回主页？</router-link>  )
                 -------------
                       O
                        O   ^__^
                         o  (oo)\_______
                            (__)\       )\/\
                                ||----w |
                                ||     ||
                </pre>
            </blockquote>
        </span>
        </Alert>
    </Row>
</template>
<style>
</style>
<script>
    export default{
        data(){
            return{

            }
        },
        methods:{
        },
        created(){

        }
    }
</script>
