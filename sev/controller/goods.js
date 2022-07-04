const Goods = require('../model/goods')

const goods = async(ctx) => {

    /**
     * 1.按照不同的分类返回数据（三个列表）
     * 2.返回一个常用商品的列表
     */
    const goodone = await Goods.find({ type: 1 }).exec()
    const goodtwo = await Goods.find({ type: 2 }).exec()
    const goodthr = await Goods.find({ type: 3 }).exec()
    const goodfor = await Goods.find({ type: 4 }).exec()
    const goodfiv = await Goods.find({ fent: 1 }).exec()

    ctx.body = {
        code: 0,
        text: "数据获取成功",
        data: {
            goodone,
            goodtwo,
            goodthr,
            goodfor,
            goodfiv
        }
    }
}
module.exports = goods