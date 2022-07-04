const Login = require('../model/regin')
const Token = require('../model/token')
const StringRandom = require('string-random');

const login = async(ctx) => {
    console.log(ctx.request.body);
    /* 
    1.获取用户名和密码
    2.查询用户名和密码是否正确
    3.确定用户登陆成功或者失败 result
    4.登录成功--生成token--把token加载到result响应
    5.ctx.body = result
    */
    let result = {
            code: 1,
            text: '登录失败'
        }
        //获取数据
    let name = ctx.request.body.name
    let pass = ctx.request.body.pass
        // 查询数据
    let Loginfind = await Login.findOne({ name: name, pass: pass }).exec()
        //判断登录状态
    if (Loginfind) {
        //登录正常
        result.code = 0
        result.text = '登录成功'
            //生成token
        let tokenid = StringRandom(32)
        let settime = Date.now()
        let gettime = settime + (1000 * 60 * 60 * 24) //24小时后过期

        //查询tokens集合中有没有用户相关的登录记录
        //没有--新增一条数据
        //有--在原来数据中修改tokenid和gettime
        let lgToken = await Token.findOne({ name: name }).exec()
        if (!lgToken) {
            //没有--新增一条数据
            // 把token写入数据库
            const newToken = new Token({
                name: name,
                tokenid: tokenid,
                settime: settime,
                gettime: gettime
            })
            await newToken.save()
                .then(res => {
                    result.text = '登录成功'
                    result.tokenid = tokenid
                }).catch(err => {
                    result.text = '登录成功，登录状态写入失败'
                })
        } else {
            // 有--在原来数据中修改tokenid和gettime
            await Token.updateOne({ name: name }, { $set: { tokenid: tokenid, gettime: gettime } })
                .then(res => {
                    result.text = '登录成功'
                    result.tokenid = tokenid
                }).catch(err => {
                    result.text = '登录成功，登录状态写入失败'
                })
        }
    } else {
        // 用户名或者密码错误
        result.code = 1
        result.text = '用户名或者密码错误'
    }
    ctx.body = result
}

module.exports = login