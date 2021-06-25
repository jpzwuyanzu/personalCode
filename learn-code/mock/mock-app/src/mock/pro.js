import Mock from 'mockjs'

const data = Mock.mock({
    "data|10": [{
        "proid|+1": 100,
        "proname": "@cname()",
        "proimg": "@img('200x200', '@color', '#fff', '@cname')",
        "price|1-1000.2": 0
    }]
})

// console.log(data)

export default data