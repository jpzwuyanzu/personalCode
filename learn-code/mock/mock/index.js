const Mock = require('mockjs')
const axios = require('axios')
const prolist = require('./pro')
const bannerlist = require('./banner')

Mock.mock('htto://www.xiaohai.top/api/pro/list', prolist)
Mock.mock('htto://www.xiaohai.top/api/bannet', bannerlist)

axios.get('htto://www.xiaohai.top/api/pro/list').then(res => {
    console.log(res.data)
})