<!--
  管理主界面，参考：https://github.com/iview/iview-admin/blob/dev/src/views/Main.vue
-->
<style lang="less">
  @import "./Manage.less";
</style>
<style>
  .main-hide-text .layout-text, .main-hide-text .ivu-menu-item-group-title {
    display: none;
  }
  .main-hide-text .ivu-menu-vertical .ivu-menu-submenu-title-icon {float: none !important}
</style>

<template>
  <div class="main" :class="{'main-hide-text': shrink}">
    <div class="sidebar-menu-con" :style="{width: shrink?'60px':'200px', overflow: shrink ? 'visible' : 'auto'}">
      <div class="shrinkable-menu" style="background: rgb(73, 80, 96);">
        <Menubar :shrink="shrink"></Menubar>
      </div>
    </div>

    <div class="main-header-con" :style="{paddingLeft: shrink?'60px':'200px'}">
      <div class="main-header">
        <div class="navicon-con">
          <Button :style="{transform: 'rotateZ(' + (this.shrink ? '-90' : '0') + 'deg)'}" type="text" @click="toggleClick">
            <Icon type="navicon" size="32"></Icon>
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
                    <Avatar size="large" style="background: #619fe7;">{{userName}}</Avatar>
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem name="ownSpace">个人中心</DropdownItem>
                  <DropdownItem name="loginout" divided>退出登录</DropdownItem>
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
  </div>
</template>
<script>
  import Menubar from 'C/menubar.vue'

  export default {
    components: {
      Menubar
    },
    data() {
      return {
        shrink: false,
        userName: '请先登录',
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
        } else if (name === 'loginout') {
          // 退出登录
          this.$store.commit('logout', this);
          this.$store.commit('clearOpenedSubmenu');
          this.$router.push({
            name: 'login'
          });
        }
      }
    },
    mounted() {
    }
  };
</script>