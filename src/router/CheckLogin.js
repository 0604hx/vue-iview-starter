/*
 * @Author: 集成显卡(https://github.com/0604hx) 
 * @Date: 2019-02-27 11:02:37 
 * @Last Modified by: 集成显卡
 * @Last Modified time: 2019-08-15 08:29:59
 */

/**
 * 检测是否已经登录
 * @param onLogin
 * @param onNoLogin
 */
window.checkLogin = (onLogin, onNoLogin) => {
    POST("/token", { detail: !window.check_first_login }, (d) => {
        if (d.success === true) {
            if (onLogin) onLogin(d)
        } else {
            if (onNoLogin) onNoLogin()
        }
    }, onNoLogin)
}

const _onLoginDone = (account) => {
    if(!account.roles)
        account.roles = []
    Object.keys(account).forEach(k=>{
        Object.defineProperty(account, k, {value: account[k], writable:false, enumerable:true, configurable:true})
    })
    window.ACCOUNT = account
    window.DEPART = window.ACCOUNT.department || { id: 0, name: "" }
    console.log("login done：account=" + account.name)
}

export default router => {
    router.beforeEach((to, from, next) => {
        iview.LoadingBar.start()

        //如果是跳转到登录，则马上前往
        if (to.name === 'login') return next()
        // if (isDev)  return next()
        if (to.meta.title) window.document.title = to.meta.title + "-"+window.C.name

        const redirect = encodeURIComponent(to.fullPath)
        if (!window.check_first_login) {
            window.checkLogin((d) => {
                window.check_first_login = true

                _onLoginDone(d.data)
                E.$emit("login-done", d.data)
                next()
            }, () => {
                M.notice.error("您需要登录后才能进行操作")
                next({ name: 'login', query: { redirect } })
            })
        } else {
            if (window.ACCOUNT && window.ACCOUNT.id) {
                //check if admin, add on 2018.12.12
                if (to.path.startsWith("/chart") && !C.isAdmin())
                    next("/404")
                else
                    next()
            }
            else
                next({ name: 'login', query: { redirect } })
        }
        iview.LoadingBar.finish()
    })

    router.afterEach(route => {
        iview.LoadingBar.finish()

        window.scrollTo(0, 0)
        E.$emit("breadcrumb", route.path)
    })

    return true
}