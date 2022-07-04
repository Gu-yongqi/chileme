const mongoose = require('../mongo/mongo')

const Token = mongoose.Schema({
    name: String,
    tokenid: String,
    settime: Date,
    gettime: Date
})

module.exports = mongoose.model('Token', Token)