/*
 * @Author: 集成显卡
 * @Date: 2019-07-03 08:11:03 
 * @Last Modified by: 集成显卡
 * @Last Modified time: 2019-08-13 16:15:48
 */
let watermark = {}

/**
 * 网页水印，使用方式：
 *  Watermask.set(
        "水印文本", 
        {rotate: Math.random()>0.5?20:-20, font:"25px 微软雅黑"}
    )
 * 
 * @param {*} str 
 * @param {*} ps 
 */
let setWatermark = (str, ps) => {
    ps = Object.assign({
        font:"24px 仿宋",                            //字体跟大小
        fillStyle: "rgba(200, 200, 200, 0.30)",      //文字样式，格式为 rgba
        rotate: '',                                 //文字旋转角度，建议使用以下值：0,-20，-45,20,45
        left: 0,                                     //左间距
        top: 50,
    }, ps)
    let id = 'CIB-NN-WATERMASK'
    let rotates = [0, 20, 45, 90, -20, -45, -90]
    if(!rotates.includes(ps.rotate))
        ps.rotate = rotates[Math.floor(Math.random() * rotates.length)]

    if (document.getElementById(id) !== null) {
        document.body.removeChild(document.getElementById(id))
    }
    
    let w = 240, h = 90, x = 10, y = 20
    if(ps.rotate == 0){
        h = 120
        y = h / 2 + 10
    }else if(ps.rotate == -20){
        h = 120
        y = h
    }else if(ps.rotate == -45){
        h = w
        y = h - 50
        x = - 50
    }else if(ps.rotate == -90){
        h = w
        y = h / 2
        x = - w + 10
    }else if(ps.rotate == 20){
        h = 120
        y = 20
    }else if(ps.rotate == 45){
        h = w
        y = 30
        x = 40
    }else if(ps.rotate == 90){
        h = w
        y = -h / 2 + 10
        x = 0
    }

    let can = document.createElement('canvas')
    can.width = w
    can.height = h
    let cans = can.getContext('2d')
    cans.width = w
    cans.height = h

    cans.rotate(ps.rotate * Math.PI / 180)
    cans.font = ps.font
    cans.fillStyle = ps.fillStyle
    // cans.textAlign = 'left'
    cans.textBaseline = 'Middle'
    cans.fillText(str, x, y)

    let div = document.createElement('div')
    div.id = id
    div.style.pointerEvents = 'none'
    //侧边栏、顶部导航不显示水印
    div.style.top = ps.top+'px'
    div.style.left = ps.left+'px'
    div.style.position = 'absolute'
    div.style.zIndex = '9999999'
    div.style.width = document.documentElement.clientWidth - 50 + 'px'
    div.style.height = document.documentElement.clientHeight - ps.top + 'px'
    div.style.background = 'url(' + can.toDataURL('image/png') + ') left top repeat'
    document.body.prepend(div)
    return id
}

// 该方法只允许调用一次
watermark.set = (str, ps) => {
    let id = setWatermark(str, ps)
    // setInterval(() => {
    //     if (document.getElementById(id) === null) {
    //         id = setWatermark(str, ps)
    //     }
    // }, 1500)
    // window.onresize = () => {
    //     setWatermark(str, ps)
    // }
}

watermark.clean = ()=>{
    let mark = document.querySelector("#CIB-NN-WATERMASK")
    if(!!mark)
        mark.remove()
}

export default watermark