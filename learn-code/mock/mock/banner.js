const Mock = require('mockjs')

const data = Mock.mock({
    "list|10": [{
        "bannerid|+1": 100,
        // "age|18-30": 10,
        // "sex|1": ['男', '女'],
        "proname": '@cname()' + '_' + '@string("upper", 5)' + '_' + '@integer(0,100)',
        // "avatar": Mock.Random.image('200x100', '@color()', '#50B347', '#fff', 'png', 'Mock.js')
        "bannerimg": "@img('200x200', '@color', '#fff', '@cname')"
    }]
})

// console.log(data)

module.exports = data