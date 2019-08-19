/*
 * @Author: 集成显卡(https://github.com/0604hx) 
 * @Date: 2019-08-19 11:42:07 
 * @Last Modified by: 集成显卡
 * @Last Modified time: 2019-08-19 17:33:47
 */

//默认的列宽
let COL_WIDTH = 200
export default {
    /**
     * 根据二维数组及展示方式计算适配 iview 的表头
     * 数据格式：
     *  [
     *    [编号、业务指标/名称、总额],
     *    [001、订单总数、10],
     *    [002、退款总额、10000]
     *  ]
     * 对于 列模式 ，有两行表头
     * 
     * 返回数据：{  columns, nds }
     * 对数字进行千位符处理
     * 
     * @param {*} ds 
     * @param {*} displayType   是否为列模式，即将二位数据翻转，赋值 col、1、true 时视为列模式
     * @param {*} ps
     */
    buildHeader (ds, displayType, ps){
        ps = Object.assign({
            colWidth: COL_WIDTH,        //列宽 
            align:"center",             //对齐方式
            colHead:2,                  //列模式标题行数
            errorCls: "error b",        //异常单元格的样式（数值为负数的视为异常格）
            colFixed: i=>i==0,          //列模式下左固定列的判断函数，默认固定第一列
            rowFixed: i=>i<2,           //行模式下左固定列的判断函数，默认固定第一、二列
            ellipsis: false,            //超出列宽的文本显示省略号！！！ 此项目大大影响性能，慎用！！！
            format  : (v,row,col)=> v   //内容处理
        }, ps)

        let isCol = displayType === "col" || displayType === 1 || displayType === true
        let nds = []
        if(isCol){
            for(let i=0;i<ds[0].length;i++){
                nds.push(ds.map(v=>v[i]))
            }
        }else
            nds = JSON.parse(JSON.stringify(ds))
        
        let columns = []
        let colSize = Object.keys(nds[0]).length

        for(let i=0;i<nds[0].length;i++){
            let colWidth = typeof(ps.colWidth)==='function'?ps.colWidth(nds[0][i],i):ps.colWidth
            columns.push(
                isCol?
                {
                    title: nds[0][i],
                    align:"center",
                    children:[
                        { 
                            title:nds[1][i], 
                            align: ps.align,
                            key: i,
                            minWidth: (i==0?100:0) + colWidth,
                            fixed:i==0?"left":"",
                            tooltip: ps.ellipsis
                        }
                    ],
                    fixed: ps.colFixed(i)?"left":""
                }
                :
                //对于行模式，只显示第一条数据作为列标题
                {
                    title: nds[0][i],
                    align: ps.align,
                    key: i+"",
                    width: nds[0][i]=='编号' ? 140 : colWidth,//nds[0][i].length * 25,
                    tooltip: ps.ellipsis,
                    fixed:ps.rowFixed(i)?"left":""
                }
            )
        }
        nds.splice(0, isCol? ps.colHead : 1)
        for(let i=0;i<nds.length;i++){
            let t={}
            nds[i].forEach((v,j)=>t[j]=v)
            nds[i] = t
            nds[i]['cellClassName'] = {}
        }
        
        for(let i=0;i<nds.length;i++){
            for(let j=0;j<colSize;j++){
                let v = nds[i][j]
                if(!!v.toFixed && v != 0){
                    //显示红色
                    if(v<0){
                        nds[i]['cellClassName'][j] = ps.errorCls
                    }
                }

                nds[i][j] = ps.format(nds[i][j],i,j)
            }
            //固定_index/_rowKey 提高性能（防止 iview 后台刷新表格）
            nds[i]._index = i
            nds[i]._rowKey = i
        }
        return {  columns, nds }
    }
}