<!--list 演示程序，继承于 macro/page.tpl.vue-->
<template>
    <div>
        <i-form inline class="thin">
            <Form-item>
                <i-input type="text" v-model="form.name" placeholder="用户名"></i-input>
            </Form-item>
            <Form-item>
                <i-button type="primary" shape="circle" icon="ios-search" @click.native="_search()"></i-button>
            </Form-item>
        </i-form>

        <i-table :data="datas" :columns="columns" stripe></i-table>
        <TablePage v-model="page"></TablePage>

        <Modal v-model="addModal.show" title="编辑用户" :loading="addModal.work" @on-ok="_addDo">
            <div>
                <i-form ref="entity" :model="entity" :label-width="70" class="thin">
                    <Form-item label="名称">
                        <i-input ref="name" v-model="entity.name" placeholder="用户名称，不能为空"></i-input>
                    </Form-item>
                    <Form-item label="地址">
                        <i-input v-model="entity.address" placeholder="联系地址"></i-input>
                    </Form-item>
                    <Form-item label="描述">
                        <i-input type="textarea" :rows="4" v-model="entity.remark" placeholder="简要说明"></i-input>
                    </Form-item>
                </i-form>
            </div>
        </Modal>
    </div>
</template>

<style>
    .menuBtn {
        padding: 6px 8px;
    }
</style>

<script>
    import P from '@M/page.tpl.vue'

    export default P.extend({
        data () {
            return {
                columns: [
                    { title: "", type: "index", width: 40 },
                    { title: "名称应用名", key: "name", width: 120, sortable: true },
                    { title: "地址", key: "address", width: 280 },
                    { title: "备注信息", key: "remark" },
                    { title: "录入日期", key: "addDate", width: 155, sortable: true, render: (h, p) => { return h('p', D.datetime(p.row.addDate)) } },
                    {
                        title: "操作", width: 150,
                        renderHeader: (h, p) => {
                            return h('div', [
                                h('span', "操作"),
                                h('Button', {
                                    'class': {
                                        ml10: true,
                                    },
                                    attrs: { title: "新增业务员" },
                                    props: { size: "small", type: "ghost", shape: "circle", icon: "ios-plus-empty" },
                                    nativeOn: {
                                        click: () => this._add("name")
                                    }
                                })
                            ])
                        },
                        render: (h, p) => {
                            let stat = p.row.stat
                            return h('div',[
                                h('ButtonGroup', [
                                    h('Button', {
                                        attrs: { title: "编辑此数据"},
                                        props: { type: "ghost", icon: "edit"},
                                        nativeOn: {
                                            click: () => this._edit(p.index)
                                        }
                                    }),
                                    h('Button', {
                                        attrs: { title: "修改密码"},
                                        props: { type: "ghost", icon: "ios-locked"},
                                        nativeOn: {
                                            click: () => M.info("此功能正在开发中...")
                                        }
                                    })
                                ]),
                                h(
                                    'Dropdown',
                                    {
                                        props:{placement:"bottom-end",trigger:"click"}
                                    },
                                    [
                                        h('Button',{
                                            class:'menuBtn',
                                            attrs: {title:"点击展开更多菜单"},
                                            props:{type:"ghost",icon:'arrow-down-b'}
                                        }),
                                        h('Dropdown-menu',
                                            {slot:"list"},
                                            [
                                                h('Dropdown-item',{
                                                    class:'error',
                                                    props:{divided:true},
                                                    nativeOn: {
                                                        click: ()=>this._del(p.index)
                                                    }
                                                },[h('Icon', {props:{type:"ios-trash-outline", size:14}})," 删除此数据"]),
                                            ]
                                        )
                                    ]
                                )
                            ])
                        }
                    }
                ]
            }
        },
        mounted () {
            this.api = ""
            this.datas = [
                {name:"集成显卡", address:"中国 广西 南宁市", remark:"https://github.com/0604hx", addDate:1513152313000},
                {name:"集成显卡002", address:"中国 广西 南宁市", remark:"https://github.com/0604hx", addDate:1513152313000},
                {name:"集成显卡003", address:"中国 广西 南宁市", remark:"https://github.com/0604hx", addDate:1513152313000},
                {name:"集成显卡004", address:"中国 广西 南宁市", remark:"https://github.com/0604hx", addDate:1513152313000},
                {name:"集成显卡005", address:"中国 广西 南宁市", remark:"https://github.com/0604hx", addDate:1513152313000},
                {name:"集成显卡006", address:"中国 广西 南宁市", remark:"https://github.com/0604hx", addDate:1513152313000},
            ]
            this.page.total = 100
            this.page.info = `共 ${this.datas.length} 条数据`
        }
    })
</script>