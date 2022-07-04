const cfg = require('./config')
const Koa = require('koa')
const app = new Koa()
const KoaStatic = require('koa-static')
const path = require('path')
const router = require('./router/router')
const KoaCors = require('koa-cors')
const KoaBody = require('koa-body')

//创建一个静态资源
const static = KoaStatic(path.join(__dirname, 'public'))
app.use(KoaCors())
app.use(KoaBody())
app.use(static)
app.use(router.routes())
app.listen(cfg.port, () => {
    // console.log('服务器已监听在http://127.0.0.1:' + cfg.port);
    console.log(`服务器已监听在http://127.0.0.1:${cfg.port}`);
})