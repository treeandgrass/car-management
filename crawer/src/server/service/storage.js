const mongoose = require('mongoose')

const IndexModel = mongoose.model('IndexModel')


// 保存URL document
module.exports = (params) => {
    const urls = params.urls
    IndexModel.insertMany(urls, function (err, docs) {
        if (err) {
            console.log(err)
        }
    })
}