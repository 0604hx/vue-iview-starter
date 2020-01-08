<template>
    <Menu ref="menubar" :active-name="name" theme="dark" class="mainMenu thin" :class="{shrink}" :open-names="openNames">
        <div class="user-panel">
            <div class="image">
                <!--当右上角不显示个人菜单时，此处有菜单， 否则使用上面的代码。 on 2019年3月12日15:40:42-->
                <MenuUser></MenuUser>
            </div>
            <div class="info"><a href="#" class="d-block">欢迎您，{{username}}</a></div>
        </div> 
        
        <template v-for="(menu, $i) in menus">
            <MenuGroup v-if="menu.type=='Group'" :title="menu.text">
                <router-link v-for="(m, $mi) in menu.child" :key="$mi" v-if="!!m.url" :to="m.url" :title="m.text" :target="m.blank?'_blank':''">
                    <MenuItem :name="menuName(m.url)">
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
                <router-link v-for="(m, $mi) in menu.child" :key="$mi" v-if="!!m.url" :to="m.url" :title="m.text" :target="m.blank?'_blank':''">
                    <MenuItem :name="menuName(m.url)">
                    <Icon :type="m.icon" :color="m.color" :size="iconSize"></Icon>
                    <span class="layout-text" v-text="m.text"></span>
                    </MenuItem>
                </router-link>
            </Submenu>

            <router-link  v-if="!!menu.url" :to="menu.url" :title="menu.text" :target="menu.blank?'_blank':''">
                <MenuItem :name="menuName(menu.url)">
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
        .user-panel {
            border-bottom: 1px solid #4f5962;
            overflow: hidden;
            white-space: nowrap;
            position: relative;
            display: flex;
            padding-bottom: 1rem!important;
            margin-top: 1rem;
            margin-bottom: 1rem;

            .image {
                padding-left: 0.9rem;
                display: inline-block;
            }

            .info {
                transition: margin-left .3s linear,opacity .5s ease;
                display: inline-block;
                padding: 3px 5px 5px 15px;
                overflow: hidden;
                white-space: nowrap;
                font-size: 1rem;

                a {
                    color: #c2c7d0;
                }
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
                margin-left: -4px;
            }
            .layout-logo {
                width:62px;
            }
            .ivu-menu-submenu-title-icon {
                display: none;
            }
            .ivu-menu-opened {
                .ivu-menu {
                    display: none;
                }
            }
        }

        .layout-logo {
            width:242px;
            /* color:aliceblue; */
            color:rgba(255,255,255,.8);
            font-size: 1.25rem; 
            font-weight: 300 !important;
            text-align:center;
            display: flex; 
            align-items: center; 
            justify-content: center;
            /* border-bottom: 1px solid rgba(100, 100, 100, 0.6); */
            border-bottom: 1px solid #4f5962;
            height: 61px;

            img {
                opacity:0.85;max-height: 34px; margin-top: 5px;
                box-shadow:0 10px 20px rgba(0,0,0,.19), 0 6px 6px rgba(0,0,0,.23);
                border-radius: 50%;
            }
        }
    }
</style>

<script>
    import Icons from '@S/icons.js'
    import MenuUser from '@C/menu-user.vue'

    //菜单的 to 属性为必填
    let menus = [
        {
            type:"Group",
            text:"通用页面",
            child:[
                {url:"/login", icon:"ios-lock-outline", color:"yellow",title:"打开登录页面",text:"登录页面"},
                {url:"/404", icon:"ios-alert", color:"red",title:"浏览404页面",text:"404"},
            ]
        },
        {
            type:"Group",
            text:"演示功能",
            child:[
                {url:"/demo/index", icon:"ios-home",text:"演示主页"},
                {url:"/demo/list", icon:"ios-list-box-outline",text:"列表演示"},
                {url:"/demo/data-table", icon:"ios-list-box-outline",text:"二维数组显示"},
                {url:"/demo/chart", icon:"ios-pie-outline",text:"图表、地图"},
                {url:"/demo/code-editor", icon:"ios-code-working",text:"代码编辑器"},
                {url:"/demo/upload", icon:"md-cloud-upload",text:"文件上传"},
            ]
        },
        {
            type:"Sub",
            text:"系统管理",
            icon:"ios-cog",
            child:[
                {url:"/sys/log", icon:"ios-paper-outline",text:"系统日志"},
            ]
        }
    ]

    let getNameOfOpen = (ns, url, m)=>{
        if(m.child){
            ns.push(m.name)
            m.child.forEach(v=>getNameOfOpen(ns, url, v))
        }
        else
            if(m.url==url) ns.push(1)
    }

    export default {
        props: ["shrink"],
        components: {
            MenuUser
        },
        data(){
            return {
                name:"",
                openNames:[],
                iconSize: 18,
                subIconSize: 16,
                menus:[],
                username: window.ACCOUNT?window.ACCOUNT.name || window.ACCOUNT.id:"未登录"
            }
        },
        methods: {
            //判读是否是一个可以点击的菜单
            isLink (m){
                return !m.children
            },
            getIcon : Icons.icon,
            icon(m){
                return m.icon || (m.children?"ios-folder":"ios-arrow-dropright")
            },
            //从 menus 中计算需要展开的子菜单
            refreshMenu (){
                let url = this.$route.path
                this.name = this.menuName(this.$route.path)
                console.log(this.name, this.$route.path)

                let opens = []
                for(let i=0;i<this.menus.length;i++){
                    opens.push(0)
                    getNameOfOpen(opens, url, this.menus[i])
                }
                
                let endIndex = opens.findIndex(v=>v==1)
                let startIndex = 0
                for(let i=endIndex;i>=0;i--){
                    if(opens[i]==0){
                        startIndex = i+1
                        break
                    }
                }
                //考虑到菜单只有三层，此处巧妙地取匹配到的菜单头尾即可
                if(startIndex<=endIndex)
                    this.openNames = startIndex<=endIndex?[opens[startIndex], opens[endIndex-1]]:[]
                
                this.$nextTick(()=>{
                    // this.$refs['menubar'].updateActiveName()
                    this.$refs['menubar'] && this.$refs['menubar'].updateOpened()
                })
            }
        },
        mounted () {
            this.refreshMenu()
            this.menus = menus
        }
    }
</script>