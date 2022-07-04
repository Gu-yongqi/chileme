const Order = require('../model/order')
const Token = require('../model/token')

const order = async(ctx) => {
    console.log(ctx.request.body);
    /* 
    1.验证用户状态
    2.添加订单数据
    3.响应结果
    4.ctx.body = result
    */
    //获取数据
    let tokenid = ctx.request.body.tokenid
    let list = ctx.request.body.list

    let result = {
        code: 1,
        text: '验证失败'
    }

    let lgOrder = await Token.findOne({ tokenid: tokenid }).exec()
    if (!lgOrder) {
        //没有登录
        result.code = 1
        result.text = "用户未登录"
    } else {
        //有登录
        if (Date.now() > new Date(lgOrder.gettime).getTime()) {
            //有登录，登录时间过期了
            result.code = 1
            result.text = "token已过期"
        } else {
            //有登录，登录时间没过期
            result.code = 0
            result.text = "验证通过"
            const newOrder = new Order({
                name: lgOrder.name,
                list: list,
                time: Date.now(),
                stste: '未付款'
            })
            await newOrder.save()
                .then(res => {
                    result.code = 0
                    result.text = "订单创建成功"
                })
                .catch(err => {
                    result.code = 1
                    result.text = "订单创建失败"
                })
        }
    }
    ctx.body = result
}

const orders = async(ctx) => {
    console.log(ctx.request.query);
    /* 
    1.从数据库中查找tokenid相关数据
    2.验证用户的tokenid是否有效
    */
    let tokenid = ctx.request.query.tokenid
    let id = ctx.request.query.id
    let result = {
            code: 1,
            text: '验证失败'
        }
        //验证用户的tokenid是否有效
    let lgOrders = await Token.findOne({ tokenid: tokenid }).exec()
    if (!lgOrders) {
        //tokenid不存在
        result.code = 1
        result.text = "验证失败"
    } else {
        let tokenTime = lgOrders.gettime.getTime()
        let nowTime = Date.now()
            // 查询tokenid是否过期
        if (tokenTime > nowTime) {
            let orderList = []
            if (!id) {
                orderList = await Order.find({ name: lgOrders.name }).exec()

            } else {
                orderList = await Order.findOne({ name: lgOrders.name, id: lgOrders.id }).exec()
            }
            result.code = 0
            result.text = "验证成功"
            result.orderList = orderList
        } else {
            result.text = "toknid已过期"
        }
    }
    ctx.body = result
}

const dorder = async(ctx) => {
    console.log(ctx.request.query);
    let result = {
        code: 1,
        text: '验证失败'
    }
    let id = ctx.request.query.id
    await Order.deleteOne({ _id: id })
        .then(res => {
            result.code = 0
            result.text = "删除成功"
        }).catch(err => {
            result.code = 1
            result.text = "删除失败"
        })
    ctx.body = result
}

module.exports = { order, orders, dorder }