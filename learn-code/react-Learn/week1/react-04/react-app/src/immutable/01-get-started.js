import { Map } from 'immutable'


const map1 = Map({a:1,b:2,c:3})

const map2 = Map({a:1,b:2,c:3})

console.log(map1.equals(map2)) // true值是否一样
console.log(map1 === map2) // true 引用和值以及类型是否一样
console.log(map1 == map2) // false  引用和值是否一样