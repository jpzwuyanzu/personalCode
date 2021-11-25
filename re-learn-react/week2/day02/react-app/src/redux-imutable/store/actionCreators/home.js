
import * as types from './../actionTypes'

const getBannerlistAction = (dispatch, getState) => {
    fetch('http://39.99.182.33/api/pro').then(res => res.json()).then(result => {
        console.log(result.data)
        dispatch({
            type: types.CHANGE_BANNER_LIST,
            payload: result.data
        })
    })
}
const getProlistAction = (dispatch, getState) => {
    fetch('http://39.99.182.33/api/pro').then(res => res.json()).then(result => {
        console.log(result)
        dispatch({
            type: types.CHANGE_PRO_LIST,
            payload: result.data
        })
    })
}
export {
    getBannerlistAction,
    getProlistAction
}