import { Map } from 'immutable'

// const state = Map(
//     {
//         a: 1,
//         b:2,
//         c: 3
//     }
// )

// const newState = state.set( 'b',200)


const state = Map(
    {
        name: '小伙子',
        obj: {
            a:1,
            b:2
        }
    }
)

// const newState = state.set('name', '测试一下') //set() 修改第一层级
const newState = state.setIn(['obj', 'b'], 200) //setIn(['obj', 'b'], value) // 修改第二层级

console.log(state, newState)