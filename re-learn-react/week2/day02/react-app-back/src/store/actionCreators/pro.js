import * as types from './../actionTypes'

const getProListAction = (dispatch, getState) => {
    fetch('http://39.99.182.33/api/pro').then(res => res.json()).then(result => {
        // console.log(result)
        dispatch({
            type: types.CHNAGE_PRO_LIST,
            payload: result.data
        })
    })
}

export {
    getProListAction
}