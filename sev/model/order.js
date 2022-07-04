const mongoose = require('../mongo/mongo')

const Order = mongoose.Schema({
    name: String,
    list: String,
    time: Date,
    stste: String
})

module.exports = mongoose.model('Order', Order)