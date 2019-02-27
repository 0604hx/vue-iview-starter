<template>
    <Menu active-key="dashboard" theme="dark" width="auto" class="mainMenu" :class="{shrink}">
        <div class="layout-logo-left" style="color:aliceblue;font-size: 1.5rem; text-align:center; line-height:30px;">
            <template v-if="shrink" style="font-weight: bold; ">F.DT</template>
            <template v-else >iview-starter</template>
        </div>
        <i class="fa fa-user"></i>
        <template v-for="(menu, $i) in menus">
            <MenuGroup v-if="menu.type=='Group'" :title="menu.text">
                <router-link v-for="(m, $mi) in menu.child" :key="$mi" v-if="!!m.to" :to="m.to" :title="m.text">
                    <MenuItem :name="menuName(m.to)">
                    <Icon :type="m.icon" :color="m.color" :size="iconSize"></Icon>
                    <span class="layout-text" v-text="m.text"></span>
                    </MenuItem>
                </router-link>
            </MenuGroup>

            <Submenu v-if="menu.type=='Sub'" :name="$i">
                <template slot="title">
                    <Icon :type="menu.icon" :color="menu.color" :size="iconSize" :title="menu.text"></Icon>
                    <span class="layout-text" v-text="menu.text"></span>
                </template>
                <router-link v-for="(m, $mi) in menu.child" :key="$mi" v-if="!!m.to" :to="m.to" :title="m.text">
                    <MenuItem :name="menuName(m.to)">
                    <Icon :type="m.icon" :color="m.color" :size="iconSize"></Icon>
                    <span class="layout-text" v-text="m.text"></span>
                    </MenuItem>
                </router-link>
            </Submenu>

            <router-link  v-if="!!menu.to" :to="menu.to" :title="menu.text">
                <MenuItem :name="menuName(menu.to)">
                <Icon :type="menu.icon" :color="menu.color" :size="iconSize"></Icon>
                <span class="layout-text" v-text="menu.text"></span>
                </MenuItem>
            </router-link>
        </template>
    </Menu>
</template>

<style lang="less">
    .mainMenu {
        .ivu-menu-item {
            font-size: 14px;
            padding: 10px 20px;

            i {
                color:white
            }
        }

        .ivu-menu-submenu-title {
            /* color: wheat !important; */
            padding-left:14px;
            font-size: 14px;
            padding: 10px 20px;
        }

        .ivu-menu-submenu {
            .ivu-menu-item{
                padding-left: 26px;
            }
        }
        .ivu-menu-item-group-title{
            height: 32px;line-height: 32px;
            font-size: 16px;padding-left:14px;
            /* color: wheat !important; */
        }

        &.shrink {
            .ivu-icon {
                font-size: 1.2rem !important;
            }
        }
    }
</style>

<script>
    //菜单的 to 属性为必填
    let menus = [
        {
            type:"Group",
            text:"通用页面",
            child:[
                {to:"/login", icon:"ios-lock-outline", color:"yellow",title:"打开登录页面",text:"登录页面"},
                {to:"/404", icon:"ios-alert", color:"red",title:"浏览404页面",text:"404"},
            ]
        },
        {
            type:"Group",
            text:"演示功能",
            child:[
                {to:"/demo/index", icon:"ios-home",text:"演示主页"},
                {to:"/demo/list", icon:"ios-list-box-outline",text:"列表演示"},
                {to:"/demo/chart", icon:"ios-pie-outline",text:"图表、地图"},
                {to:"/demo/code-editor", icon:"ios-code-working",text:"代码编辑器"},
                {to:"/demo/upload", icon:"md-cloud-upload",text:"文件上传"},
            ]
        },
        {
            type:"Sub",
            text:"系统管理",
            icon:"ios-cog",
            child:[
                {to:"/sys/log", icon:"ios-paper-outline",text:"系统日志"},
            ]
        }
    ]

    export default {
        props: ["shrink"],
        data(){
            return {
                iconSize: 16,
                menus:menus
            }
        },
        methods: {
            /**
             * 根据 to 获取 Menu 的名称（用于 iview）
             * 规则： 去掉开头的 / ，并将剩余的 / 全部替换成 -
             */  
            menuName(to){
                return !!to?to.substring(1).replace(/\//g,""):""
            }
        }
    }
</script>