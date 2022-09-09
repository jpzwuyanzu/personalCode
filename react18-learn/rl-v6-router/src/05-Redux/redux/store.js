//创建store

//1，引入redux
//2. createStore(reducer)
import {
    createStore
} from 'redux'

const reducer = (prevState = {
    show: true
}, action) => {
    console.log(action)
    let newState = {
        ...prevState
    }
    switch (action.type) {
        case "hide-tabbar":
            newState.show = false
            return newState
        case "show-tabbar":
            newState.show = true
            return newState
        default: 
        return prevState
    }
    
}

const store = createTestStore(reducer)
/**
 * store.dispatch
 * store.subscribe
 * store.getState
 */

function createTestStore(reducer){
    var list = [];
    var state = reducer(undefined, {})
    function subscribe(callback) {
        list.push(callback)
    }
    function dispatch(action) {
        state = reducer(state, action)
        for(var i in list) {
            list[i] && list[i]()
        }
    }
    function getState() {
        return state
    }
    return{
        getState,
        dispatch,
        subscribe
    }
}


export default store


/**
 * 纯函数:对外界没有副作用
 * var obj = {
 *   myName: 'test'
 * }
 * function test(obj2) {
 *    obj2.myName = 'xiaoming'
 *    return obj2
 * }
 * test(obj)
 * 
 */