const mongoose = require('../mongo/mongo')

const Goods = mongoose.Schema({
    name: String,
    type: Number,
    img: String,
    fent: Number,
    price: Number,
    count: Number
})

module.exports = mongoose.model('Goods', Goods)