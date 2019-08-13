const moment = require("moment")

/**
 * 日期封装
 * @type {{}}
 */
let D = {
    F: "YYYY-MM-DD",   //默认日期格式
    FT: "YYYY-MM-DD HH:mm:ss",
    ago(ds) {
        return ds ? new moment(ds).fromNow() : ""
    },
    datetime(v, df) {
        return v ? moment(v).format(df || (D.F + " HH:mm:ss")) : ""
    },
    //返回 YYYY-MM-DD HH:mm:ss 格式的日期时间
    datetime2(v) {
        return v ? moment(v).format(D.FT) : ""
    },
    date(v, df) {
        return v ? moment(v).format(df || D.F) : ""
    },
    today(df) {
        return moment().format(df || D.F)
    },
    //获取昨日
    yesterday(df) {
        return this.addDay(null, -1, df || this.F)
    },
    toDate(ds, df) {
        return new moment(ds, df || D.F)
    },
    time(df) {
        return moment().format(df || D.FT)
    },
    addDay(ds, step, df) {
        const m = ds ? moment(ds) : moment()
        return m.add(step, "d").format(df || this.F)
    },
    /**
     * 获取指定日期对应的月初
     * @param ds
     * @param df
     */
    monthBegin(ds, df) {
        const m = ds ? moment(ds) : moment()
        return m.date(1).format(df || this.F)
    },
    monthEnd(ds, df) {
        const m = ds ? moment(ds) : moment()
        return m.add(1, "months").date(1).add(-1, 'd').format(df || this.F)
    },
    yearBegin(ds, df) { return new moment(ds).month(0).date(1).format(df || this.F) },
    yearEnd(ds, df) { return new moment(ds).month(11).date(31).format(df || this.F) },
    now() { return new Date().getTime() }
}

window.D = window.D || D
export default D