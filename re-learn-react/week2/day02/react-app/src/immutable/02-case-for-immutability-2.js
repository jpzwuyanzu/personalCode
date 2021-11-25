import { Map } from 'immutable'

const map1 = Map({ a: 1, b: 2, c: 3 })

const map2 = map1.set('b', 2) //b的值并没有改变（数据的持久化， 结构共享---》 ---公用同一个引用地址

console.log(map1.equals(map2)) //true --- 》 值是否一样
console.log(map1 === map2) //true---》引用地址和值以及类型否一样
// console.log(map1 == map2) //true --- 》 引用和值是否一样