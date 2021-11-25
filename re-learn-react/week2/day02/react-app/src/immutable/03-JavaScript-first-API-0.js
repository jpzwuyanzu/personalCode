import { List } from 'immutable'

const list1 = List([1,2])
const list2 = list1.push(3,4,5)
const list3 = list2.unshift(10, 100)
const list4 = list3.concat(list2)


console.log(list1.toArray()) // [1,2]
console.log(list2.toArray()) //[1,2,3,4,5]
console.log(list3.toArray()) // [10,100,1,2,3,4,5]
console.log(list4.toArray()) // [10,100,1,2,3,4,5, 1,2,3,4,5]


console.log(list1.size) //2
console.log(list2.size) //5
console.log(list3.size) //7
console.log(list4.size) //12


console.log(list1.toArray().length) //2
console.log(list2.toArray().length)  //5
console.log(list3.toArray().length)  //7
console.log(list4.toArray().length)  //12


console.log(list1.toJS()) //[1,2]
console.log(list1.toJSON()) //[1,2]
console.log(list1.toObject()) //{0: 1, 1: 2}

