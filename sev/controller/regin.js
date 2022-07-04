const Regin = require('../model/regin')

const regin = async(ctx) => {
    /* 
    1.获取前端发来的数据
    2.在数据库查找用户名是否重复--通过用户名来查找数据库中的表
    3.如果有--响应一个错误信息   如果没有--添加一条数据
    4.把结果响应给前端
    5.ctx.body = result
    */
    let result = {
            code: 0, //0表示没有重复，1表示有重复
            text: '注册成功'
        }
        //获取数据
    console.log(ctx.request.body);
    let name = ctx.request.body.name
    let pass = ctx.request.body.pass
    let tel = ctx.request.body.tel
        //查询数据
    let Reginfind = await Regin.find({ name: name }).exec()
        //判断查询结果
    if (Reginfind.length > 0) {
        //有重复
        result.code = 1
        result.text = '用户名有重复+注册失败'
    } else {
        //注册正常
        let newRegin = new Regin({
            name: name,
            pass: pass,
            tel: tel
        })
        await newRegin.save().then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    }
    ctx.body = result
}

module.exports = regin