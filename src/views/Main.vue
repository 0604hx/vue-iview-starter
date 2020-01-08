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
    .sidebar-menu-con {
        box-shadow: 0 14px 28px rgba(0,0,0,.25), 0 10px 10px rgba(0,0,0,.22);
        transition: margin-left .3s ease-in-out,width .3s ease-in-out;
    }
    .sidebar-menu-con .shrinkable-menu {
        transition: margin-left .3s ease-in-out,width .3s ease-in-out;
    }
    .single-page {
        min-height: calc( 100% - 55px ) !important;
    }
</style>

<template>
    <div class="main" :class="{'main-hide-text': shrink}">
            <div class="sidebar-menu-con" :style="{width: shrink?'60px':'240px', overflow: shrink ? 'hidden' : 'hidden'}">
                <div class="shrinkable-menu" :style="{width: shrink?'74px':'254px'}">
                    <Menubar :shrink="shrink" style="padding-bottom: 40px;"></Menubar>
                </div>
            </div>

        <div class="main-header-con" :style="{paddingLeft: shrink?'60px':'240px'}" style="height:50px">
            <div class="main-header" :class="theme" style="height:50px;">
                <div class="navicon-con">
                    <Icon type="md-menu" size="24" :style="{transform: 'rotateZ(' + (this.shrink ? '-90' : '0') + 'deg)'}" 
                        style="cursor:pointer; line-height:38px;color:white;"
                        @click="toggleClick" />
                </div>
                <div class="header-middle-con">
                    <Menu v-if="topMenu"  ref="topMenu" :active-name="topMenuName" mode="horizontal" theme="primary" class="topMenu" :class="theme">
                        <li class="topMenuTitle ivu-menu-item"><Icon :type="topMenuIcon"></Icon> {{menuName}} </li>
                        <MenuItem v-for="(item,index) in topMenus" :key="index" :name="item.name" :to="item.to" :title="item.tip||item.text">
                            <i :class="item.icon"></i> {{item.text}}
                        </MenuItem>
                    </Menu>
                    <div v-else class="main-breadcrumb">
                        {{menuName}}
                    </div>
                </div>
                <div class="header-avator-con">
                    <div class="user-dropdown-menu-con" style="width:auto;">
                        <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon" style="padding-right:6px;font-size: 1.5rem;color:white;padding-bottom: 6px;">
                            <!--用户菜单在右上角-->
                            <!--<MenuUser></MenuUser>-->
                            <!-- <img src="@/assets/cib/cib-white.svg" style="height:60px;"> -->
                            {{C.name}}
                        </Row>
                    </div>
                </div>
            </div>
        </div>

        <div class="single-page-con" :style="{left: shrink?'60px':'240px'}" style="top:50px">
            <div class="single-page">
                <router-view></router-view>
            </div>
            <Footer></Footer>
        </div>

        <Global></Global>
    </div>
</template>

<script>
    import Menubar from '@C/menubar.vue'
    import Global from '@V/Global.vue'
    import Footer from "@C/footer/footer"

    let TOP_HIDE = 100
    let TOP_CHANGE = 101
    
    export default {
        components: {
            Menubar, Global, Footer
        },
        data() {
            return {
                theme:"bg-primary",
                shrink: false,
                userName: '未授权',
                menuList: [],
                pageTitle:"",
                menuName: "",
                topMenu: false,
                topMenus: [],
                topMenuIcon: "",
                topMenuName: ""
            };
        },
        computed: {
        },
        methods: {
            toggleClick(value) {
                if(value != undefined && typeof(value) === 'boolean'){
                    if(this.shrink != value)
                        this.shrink = value
                }else
                    this.shrink = !this.shrink
            },
            breadcrumb (r){
                if(r===TOP_HIDE){
                    this.topMenu = false
                    this.topMenus = []
                    this.menuName = ""
                    return
                }else if(this.topMenu && r==TOP_CHANGE){
                    this.topMenuName = n
                }else if(this.topMenu==true){
                    console.debug(`顶部菜单正在显示中，忽略此操作...`)
                    return
                }
                
                if(typeof(r)=='string'){
                    this.menuName = r
                    this.topMenu = false
                }
                else if(r.meta){
                    this.menuName = r.meta.title
                    this.topMenu = false
                }
                else if(r.title && r.menus){
                    this.menuName = r.title
                    this.topMenu = r.menus.length>0
                    this.topMenus = r.menus
                    this.topMenuName = r.name
                    this.topMenuIcon = r.icon || "fa fa-circle success2"
                }else
                    this.menuName = ""
            },
            navigateTo (path, replace=false, ps={}){
                let p = {params:ps}
                if(path.indexOf("/")==0)
                    p.path = path
                else
                    p.name = path
                if(replace==true)
                    this.$router.replace(p)
                else
                    this.$router.push(p)
            }
        },
        mounted() {
            E.$on("breadcrumb", this.breadcrumb)
            E.$on("navigateTo", this.navigateTo)
            E.$on("menu-toggle", this.toggleClick)

            setTimeout(()=>this.breadcrumb(this.$route), 500)
            
            //判断是否需要关闭菜单
            if(this.$route.query.menu==='false'){
                this.shrink = true
            }

            let localTheme = S.get("THEME")||"primary"
            this.theme = `bg-${localTheme}`
            document.body.classList.add("theme-"+localTheme)
        },
        destroyed () {
            E.$off("breadcrumb", this.breadcrumb)
            E.$off("navigateTo", this.navigateTo)
            E.$off("menu-toggle", this.toggleClick)
        }
    }
</script>