<template>
    <div>
        <Alert type="warning" show-icon>
            <div>
                编辑器使用 <code>vue-codemirror-lite</code>，默认配置为：
                <pre style="background:#fefefe">
        {
            readOnly:false,
            tabSize: 2,
            lineNumbers: true,
            lineWrapping: true
        }</pre>
            </div>
        </Alert>
        <codemirror style="height:600px" v-model="content" :options="options"></codemirror>
    </div>
</template>

<style>
    .CodeMirror {height: 450px}
</style>

<script>
    import { codemirror } from 'vue-codemirror-lite'
    require('codemirror/mode/javascript/javascript.js')

    export default {
        components: {
            codemirror
        },
        data () {
            return {
                content:
                `public class CacheBean{
    String name;
    String spec;

    public String getName() {
        return name;
    }

    public CacheBean setName(String name) {
        this.name = name;
        return this;
    }

    public String getSpec() {
        return spec;
    }

    public CacheBean setSpec(String spec) {
        this.spec = spec;
        return this;
    }

    @Override
    public String toString() {
        return "{" +
                "name='" + name + '\'' +
                ", spec='" + spec + '\'' +
                '}';
    }
}
                `,
                options: window.C.getCodeOptions({mode:'javascript'})
            }
        }
    }
</script>