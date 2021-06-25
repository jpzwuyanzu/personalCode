var router = require('express').Router()
var sql  = require('./../sql/')
var Banner = require('./../sql/modules/Banner')
var utils = require('./../utils')



 router.get('/',(req,res,next) => {
     sql.find(Banner, {}, {_id: 0, __v: 0}).then(data => {
        res.status('200').send({
            code : 200,
            message:'查询轮播图',
            data: data
        })
     })
 })

 router.post('/add',(req,res,next) => {
     let insertData = req.body;
     insertData.bannerid = 'banner_' + utils.getUuid()
     sql.insert(Banner, insertData).then(() => {
        res.status('200').send({
            code:'200',
            message:'添加轮播图'
        })
     })
})

router.get('/delete',(req,res,next) => {
    const {bannerid} = req.query
    sql.delete(Banner, {bannerid}).then(() => {
        res.status(200).send({
            code:'200',
            message:'删除轮播图'
        })
    })
})

router.post('/deleteAll',(req,res,next) => {
    const deletearr = req.body.deletearr
    const arr = []
    deletearr.forEach(item => {
        arr.push(sql.delete(Banner,{bannerid : item}))
    })
    Promise.all(arr).then(() => {
        res.status(200).send({
            code:'200',
            message:'批量删除选中的轮播图'
        })
    })
})

 module.exports = router