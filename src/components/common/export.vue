<!--导出数据的下拉菜单-->
<template>
    <Dropdown trigger="click" @on-click="selectExport" placement="bottom-end">
        <Button type="primary" icon="ios-download-outline">
            导出当前结果
            <Icon type="arrow-down-b"></Icon>
        </Button>
        <DropdownMenu slot="list">
            <DropdownItem name="json">JSON 格式</DropdownItem>
            <DropdownItem name="xlsx">Excel 格式</DropdownItem>
        </DropdownMenu>
    </Dropdown>
</template>

<script>
    export default {
        props: {
            entity:String,
            form: Object
        },
        methods: {
            selectExport(name){
                E.$emit("export", this.entity, this.form, name)
            }
        }
    }
</script>