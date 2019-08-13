/*
 * 菜单图标
 * @Author: 集成显卡
 * @Date: 2019-05-07 08:39:58 
 * @Last Modified by: 集成显卡
 * @Last Modified time: 2019-08-13 11:26:00
 */

let icons = {    
    //系统管理
    "人员管理": "fa fa-user error"
}

let categories = {
    "报表": "fa fa-bar-chart",
    "导入": "fa fa-upload",
    "下载": "fa fa-download success"
}

/**
 * 对于包含通用性的菜单，返回分组图标，如报表类返回 bar-chart
 * @param {*} m 
 */
let categoryIcon = m=>{
    let keys = Object.keys(categories)
    for (let i = 0; i < keys.length; i++) {
        const k = keys[i]
        if(m.name.indexOf(k)>=0)
            return categories[k]
    }
    return "ios-arrow-dropright"
}

export default {
    icon (m){
        return icons[m.name] || (!m.url?"ios-folder": categoryIcon(m))
    }
}