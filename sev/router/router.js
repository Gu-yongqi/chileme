const KoaRouter = require('koa-router')
const router = new KoaRouter()
const regin = require('../controller/regin')
const login = require('../controller/login')
const goods = require('../controller/goods')
const { order, orders, dorder } = require('../controller/order')

//路由信息
router.post('/regin', regin)
router.post('/login', login)
router.get('/goods', goods)
router.post('/order', order)
router.get('/orders', orders)
router.delete('/orders', dorder)

module.exports = router