
import { cloneDeep } from 'loadsh'
const state = {
    name:'小伙子',
    obj: {
        a:1,
        b:2
    }
}

//深拷贝
// const newState = JSON.parse(JSON.stringify(state)) //可以实现多层级深拷贝
// const newState = Object.assign({},state) //只能拷贝第一层级，更深的不行
// const newState = { ...state } //只能拷贝第一层级，更深的不行
   const newState = cloneDeep(state) //可以实现多层级深拷贝
   newState.obj.b = 200
   console.log(state, newState)