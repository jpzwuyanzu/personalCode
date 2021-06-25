import { Map } from 'immutable'
/////////1
// const state = Map({
//     a:1,b:2,c:3
// })

// const newState = state.set('b' , 200)


////////////2


const state = Map(
    {
        name:'qwe',
        obj:{
            a:1,
            b:2
        }
    }
)


// const newState = state.set('b' , 200) //修改第一层级参数 set()
const newState = state.setIn(['obj','b'] , 200) //修改多层级参数用setIn（[],）

console.log(state, newState)