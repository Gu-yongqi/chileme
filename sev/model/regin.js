const mongoose = require('../mongo/mongo')

const Regin = mongoose.Schema({
    name: String,
    pass: String,
    tel: Number
})

module.exports = mongoose.model('Regin', Regin)