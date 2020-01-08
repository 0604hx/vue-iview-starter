<!--用户点击菜单-->
<template>
    <div>
        <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown" placement="bottom-end">
            <a href="javascript:void(0)" title="点击以查看我的个人菜单">
                <i class="fa fa-user-circle-o faa-spin animated-hover" :class="theme" style="font-size:2rem; color:#c2c7d0"></i>
            </a>
            <DropdownMenu slot="list">
                <DropdownItem name="detail" divided disabled> <i class="fa fa-question-circle"></i> 个人基本信息</DropdownItem>
                <DropdownItem name="pwd"> <i class="fa fa-unlock-alt"></i> 修改登录密码</DropdownItem>
                <DropdownItem name="topTheme"> <i class="fa fa-pie-chart"></i> 配色设置</DropdownItem>
                <DropdownItem name="logout" divided><i class="fa fa-sign-out"></i>退出登录</DropdownItem>
            </DropdownMenu>
        </Dropdown>

        <Modal
            v-model="pwdShow" width="600"
            :mask-closable="false">
            <h3 slot="header"><i class="fa fa-lock"></i> 修改个人登录密码</h3>

            <PasswordTip></PasswordTip>

            <i-form :label-width="70" class="thin">
                <Form-item label="原密码">
                    <i-input autofocus tabindex="0" v-model="pwd.old"></i-input>
                </Form-item>
                <Form-item label="新密码">
                    <i-input tabindex="0" type="password" v-model="pwd.current"></i-input>
                </Form-item>
                <Form-item label="新密码">
                    <i-input tabindex="0" type="password" v-model="pwd.current2"></i-input>
                </Form-item>
            </i-form>

            <div slot="footer">
                <Button type="text" @click="pwdShow=false">先不操作</Button>
                <Button type="primary" @click="pwdDo"><i class="fa fa-check"></i> 确定</Button>
            </div>
        </Modal>

        <Modal v-model="themeShow" title="选择主题色">
            <div>
                <Alert show-icon colseable>
                    <div>
                        修改主题色后，仅在本机有效，清空本地数据缓存或更换电脑后将恢复默认值。
                    </div>
                    <p class="mt10 b warning">此为实验室功能，可能会出现不影响系统功能的界面层面BUG</p>
                </Alert>
                <RadioGroup v-model="theme">
                    <Radio v-for="(item,index) in themes" :key="index" :label="item"> <Tag :class="'bg-'+item" style="width:56px;height:32px"></Tag> </Radio>
                </RadioGroup>
            </div>
            <div slot="footer">
                <Button type="primary" @click="themeDo"><i class="fa fa-check"></i> 确定修改</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import PasswordTip from '@C/password-tip.vue'

    let resetPwd = ()=>{
        return {
            old:"",
            current:"",
            current2:""
        }
    }

    let DEFAULT_THEME = "primary"

    export default {
        components: {
            PasswordTip
        },
        data () {
            return {
                pwdShow: false,
                pwd: resetPwd(),
                themeShow: false,
                themes: ["primary", "purple", "success", "warning","black"],
                theme: S.get("THEME")
            }
        },
        methods: {
            handleClickUserDropdown(name) {
                if (name === 'ownSpace') {
                    util.openNewPage(this, 'ownspace_index');
                    this.$router.push({
                        name: 'ownspace_index'
                    });
                } else if (name === 'logout') {
                    // 退出登录
                    M.confirm("登出", "确定要退出当前账号吗？", () => {
                        RESULT("/user/logout",{},d=>{
                            delete window.ACCOUNT

                            M.notice.ok("你已经退出系统！", "登出成功")
                            this.$router.replace({name: C.loginPage})
                        })
                    })
                } else if(name==='pwd'){
                    this.pwd = resetPwd()
                    this.pwdShow = true
                } else if(name==='detail'){
                    this.$refs["detailModal"].open()
                }else if(name==="topTheme"){
                    this.theme = S.get("THEME", DEFAULT_THEME)
                    this.themeShow = true
                }
            },
            themeDo (){
                S.set("THEME", this.theme)

                M.notice.ok("主题色修改成功，刷新后效果可见")
                this.themeShow = false
            },
            pwdDo (){
                if(!this.pwd.old){
                    return M.warn("原密码不能为空")
                }

                if(!!this.pwd.current && this.pwd.current == this.pwd.current2){
                    if(this.pwd.old == this.pwd.current)  return M.warn("新密码不能与旧密码相同")

                    if(!H.checkPwd(this.pwd.current)){
                        return M.notice.warn(
                        "您输入的新密码不符合总行规范，请重新设计您的密码", 
                        "密码格式不正确")
                    }

                    // RESULT(
                    //     "/user/changepwd", 
                    //     {
                    //         oldpassword: md5(this.pwd.old),
                    //         password: md5(this.pwd.current)
                    //     }, 
                    //     d=>{
                    //         M.ok("密码修改成功")
                    //         this.pwdShow = false
                    //     }
                    // )
                }else
                    M.warn("两次新密码不一致")
            }
        }
    }
</script>