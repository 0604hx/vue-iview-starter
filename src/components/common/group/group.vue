<template>
    <div class="group">
        <div class="group-title" :class="color">{{title}}</div>
        <div class="group-content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import './group.less'

    export default {
        props: {
            title: {type:String, default:""},
            color:{type:String, default:"info"}
        }
    }
</script>