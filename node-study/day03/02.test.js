const itqf = require('./itqf-tools');

//格式化时间功能
const dt = itqf.dataFormat(new Date())

console.log(dt)
console.log('-------------')
const str = itqf.htmlEscape('<h1 title="name">这里是h1<span>这里是span标签</span></h1>')

console.log(str)
console.log('-------------')

const str2 = itqf.htmlUnEscape(str)

console.log(str2)