// 类型注解： 是一种轻量级为函数或者变量添加的约束
(() => {
 function showMsg(str: string) {
     return '窗前明月光'
 }
 let text = '疑似地上霜'
//  let text = [1,2,3]
 console.log(showMsg(text))
})()