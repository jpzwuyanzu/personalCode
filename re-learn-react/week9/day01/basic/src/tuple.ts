//元组： 已知数组的元素个数以及每个元素对应的数据类型的数组

let x: [string, number, boolean]
x = ['323', 22, true]
console.log(x)
console.log(x[0].substring(1))
//console.log(x[1].substring(1)) //number类型不存在substring方法

//x[3] = 'test' //未定义数据类型
//console.log(x[3].substring(1))  //数组的越界