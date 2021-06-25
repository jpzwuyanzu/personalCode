const mongoose = require('./../db')
const Schema = mongoose.Schema

//创建数据库的集合

const schema = new Schema({
    bannerid:{
        type:String,
        required: true
    },
    bannerimg: {
        type:String,
        required: true
    },
    link:{
        type:String,
        required: true
    },
    alt:{
        type:String,
        required: true
    }
})

module.exports = mongoose.model('banner', schema) //会自动在数据库中创建一个集合为banners