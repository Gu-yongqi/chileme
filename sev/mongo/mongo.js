const mongoose = require('mongoose')
const cfg = require('../config')

mongoose.connect(cfg.mgUrl)
    .then(res => {
        console.log('连接数据库成功');
    }).catch(err => {
        console.log('连接数据库失败');
    })

module.exports = mongoose