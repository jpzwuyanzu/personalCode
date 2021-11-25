// console.log('0')
//***********************案例1************************** */
// const state = {
//     name: '小伙子',
//     obj: {
//         a: 1,
//         b: 2
//     }
// }

// const newState = state


// //由于js的对象和数组都是引用类型。所以newState的state实际上是指向于同一块内存地址的, 所以结果是newState和state是相等的。
// console.log(newState === state) // true ->>>>公用内存地址



//***********************案例2************************** */

// const state = {
//     name: '小伙子',
//     obj: {
//         a: 1,
//         b: 2
//     }
// }

// const newState = state
// newState.name = 'TMD'

// //由于js的对象和数组都是引用类型。所以newState的state实际上是指向于同一块内存地址的, 所以结果是newState和state是相等的。
// console.log(state.name, newState.name) // TMD TMD



//***********************案例3************************** */

// 递归深拷贝
// function clone(o) {
//     var temp = {}
//     for(var k in o) {
//         if(typeof o[k] == 'object') {
//             temp[k] = clone(o[k]);
//         } else {
//             temp[k] = o[k]
//         }
//         //再判断是否为函数时，这个时不完整的
//     }
//     return temp
// }

// const state = {
//     name: '小伙子',
//     obj: {
//         a: 1,
//         b: 2
//     }
// }

// // const newState = JSON.parse(JSON.stringify(state)) //深拷贝
// // const newState = Object.assign({}, state) //深拷贝
// // const newState = { ...state } //深拷贝
// const newState = clone(state) //深拷贝
// newState.name = 'TMD'

// console.log(state.name, newState.name) //小伙子 TMD



//***********************案例4************************** */

// const state = {
//     name: '小伙子',
//     obj: {
//         a: 1,
//         b: 2
//     }
// }


// // const newState = Object.assign({}, state) //深拷贝- 如果修改深层级对象，这个也会影响原对象的 
// // 可以看到，当在更改newState更深层次的数据的时候，还是会影响到state的值。
// //如果要深层复制，就得一层一层的做递归拷贝，这是一个复杂的问题。
// //虽然有些第三方的库已经帮我们做好了，比如lodash的cloneDeep方法。深拷贝是非常消耗性能的。
// // const newState = JSON.parse(JSON.stringify(state)) // 如果修改深层级对象，这个不会影响原对象的 
// const newState = { ...state } // 如果修改深层级对象，这个也会影响原对象的 
// newState.obj.b = 200

// console.log(state, newState) 


//***********************案例5************************** */
import { cloneDeep } from 'loadsh'
const state = {
    name: '小伙子',
    obj: {
        a: 1,
        b: 2
    }
}
const newState = cloneDeep(state) 
newState.obj.b = 200

console.log(state, newState) //可以实现真正意义的深拷贝