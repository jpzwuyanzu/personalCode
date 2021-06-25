const Mock = require('mockjs')

const data = Mock.mock({
    "list|10": [{
        "id|+1": 100,
        "age|18-30": 10,
        "sex|1": ['男', '女'],
        "name": '@cname()' + '_' + '@string("upper", 5)' + '_' + '@integer(0,100)',
        // "avatar": Mock.Random.image('200x100', '@color()', '#50B347', '#fff', 'png', 'Mock.js')
        "avatar": "@img('200x200', '@color', '#fff', '@cname')",
        "borthday": "@date()",
        "tel": /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/,
        "adress": "@county(true)",
        "password": /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/
    }]
})

console.log(data)