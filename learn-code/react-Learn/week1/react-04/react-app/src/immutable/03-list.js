import { List } from 'immutable'

const list1 = List([1,2])
const list2 = list1.push(3,4,5)
const list3 = list2.unshift(10)
const list4 = list3.concat(list2)


console.log(list1.toArray()) // [1,2]
console.log(list2.toArray()) // [1,2,3,4,5]
console.log(list3.toArray()) //[10, 1, 2, 3, 4, 5]
console.log(list4.toArray()) //[10, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5]

console.log(list1.size)
console.log(list2.size)
console.log(list3.size)
console.log(list4.size)