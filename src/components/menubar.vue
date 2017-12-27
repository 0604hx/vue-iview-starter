<template>
    <Menu active-key="dashboard" theme="dark" width="auto">
        <div class="layout-logo-left" style="color:aliceblue;font-size: 1.5rem;text-align:center;line-height:30px;">
            <template v-if="shrink">F.dt</template>
            <template v-else >iview-starter</template>
        </div>
        <MenuGroup title="通用页面">
            <router-link to="/login">
                <MenuItem key="login" name="login" title="打开登录页面">
                    <Icon type="ios-locked-outline"></Icon>
                    <span class="layout-text">登录页面</span>
                </MenuItem>
            </router-link>
            <router-link to="/404">
                <MenuItem key="404" name="404" title="打开 404 页面">
                    <Icon type="ios-help-outline"></Icon>
                    <span class="layout-text">404</span>
                </MenuItem>
            </router-link>
        </MenuGroup>

        <MenuGroup title="演示功能">
            <router-link to="/demo/index">
                <MenuItem name="demo-index" title="打开演示页面">
                    <Icon type="ios-analytics-outline"></Icon>
                    <span class="layout-text">演示页面</span>
                </MenuItem>
            </router-link>
            <router-link to="/demo/list">
                <MenuItem name="demo-list">
                    <Icon type="ios-analytics-outline"></Icon>
                    <span class="layout-text">列表演示</span>
                </MenuItem>
            </router-link>
            <router-link to="/demo/chart">
                <MenuItem name="demo-chart">
                    <Icon type="ios-pie-outline"></Icon>
                    <span class="layout-text">图表、地图</span>
                </MenuItem>
            </router-link>
            <router-link to="/demo/code-editor">
                <MenuItem name="demo-code-editor">
                    <Icon type="code"></Icon>
                    <span class="layout-text">代码编辑器</span>
                </MenuItem>
            </router-link>
        </MenuGroup>

        <MenuGroup title="系统管理">
            <router-link to="/sys/log">
                <MenuItem name="sys-log">
                <Icon type="ios-paper-outline"></Icon>
                <span class="layout-text">系统日志</span>
                </MenuItem>
            </router-link>
        </MenuGroup>
    </Menu>
</template>

<script>
    export default {
        props: ["shrink"]
    }
</script>