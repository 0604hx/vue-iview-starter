<!--
  管理主界面，参考：https://github.com/iview/iview-admin/blob/dev/src/views/Main.vue
-->
<style lang="less">
    @import "./Main.less";
      </style>
<style>
    .main-hide-text .layout-text, .main-hide-text .ivu-menu-item-group-title {
        display: none;
    }
    .main-hide-text .ivu-menu-vertical .ivu-menu-submenu-title-icon {float: none !important}
    .navicon-con .ivu-btn-text:focus {box-shadow: 0 0 0 0px rgba(0, 168, 84, 0.2) !important}
</style>

<template>
    <div class="main" :class="{'main-hide-text': shrink}">
        <div class="sidebar-menu-con" :style="{width: shrink?'60px':'200px', overflow: shrink ? 'hidden' : 'hidden'}">
            <div class="shrinkable-menu" :style="{width: shrink?'64px':'204px'}">
                <Menubar :shrink="shrink"></Menubar>
            </div>
        </div>

        <div class="main-header-con" :style="{paddingLeft: shrink?'60px':'200px'}">
            <div class="main-header">
                <div class="navicon-con">
                    <Button :style="{transform: 'rotateZ(' + (this.shrink ? '-90' : '0') + 'deg)'}" type="text" @click="toggleClick">
                        <Icon type="md-menu" size="32"></Icon>
                    </Button>
                </div>
                <div class="header-middle-con">
                    <div class="main-breadcrumb">
                    </div>
                </div>
                <div class="header-avator-con">
                    <div class="user-dropdown-menu-con">
                        <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
                            <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown" placement="bottom-end">
                                <a href="javascript:void(0)">
                                    <Avatar size="large">{{userName}}</Avatar>
                                </a>
                                <DropdownMenu slot="list">
                                    <DropdownItem name="ownSpace" disabled>个人中心</DropdownItem>
                                    <DropdownItem name="logout" divided>退出登录</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </Row>
                    </div>
                </div>
            </div>
        </div>
        <div class="single-page-con" :style="{left: shrink?'60px':'200px'}">
            <div class="single-page">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </div>
        </div>

        <Global></Global>
    </div>
</template>

<script>
    import Menubar from '@C/menubar.vue'
    import Global from '@V/Global.vue'

    export default {
        components: {
            Menubar, Global
        },
        data() {
            return {
                shrink: false,
                userName: '未授权',
                menuList: []
            };
        },
        computed: {
        },
        methods: {
            toggleClick() {
                this.shrink = !this.shrink;
            },
            handleClickUserDropdown(name) {
                if (name === 'ownSpace') {
                    util.openNewPage(this, 'ownspace_index');
                    this.$router.push({
                        name: 'ownspace_index'
                    });
                } else if (name === 'logout') {
                    // 退出登录
                    M.confirm("登出", "确定要退出当前账号吗？", () => {
                        M.notice.ok("你已经退出系统！", "登出成功")
                        this.$router.replace("/login")
                    })
                }
            }
        },
        mounted() {
        }
    }
</script>