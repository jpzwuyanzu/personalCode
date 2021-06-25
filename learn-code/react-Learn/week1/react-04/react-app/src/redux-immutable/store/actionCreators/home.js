import * as types from '../actionTypes'
const getBannerListAction = () => {
    return (dispatch,getState) => {
        fetch('/pro.json').then(res => res.json()).then(result => {
            console.log(result)
            dispatch({type:types.CHANGE_BANNER_LIST, data: result.result})
     })
    }
}

const getProListAction = () => {
    return (dispatch,getState) => {
        fetch('/pro.json').then(res => res.json()).then(result => {
            console.log(result) 
            dispatch({type:types.CHANGE_PRO_LIST,data: result.result})
        })
    }
}

export {
    getBannerListAction,
    getProListAction
}