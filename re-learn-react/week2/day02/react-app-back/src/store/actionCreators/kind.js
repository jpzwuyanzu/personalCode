import * as types from './../actionTypes'

const getKindListAction = (dispatch, getState) => {
    fetch('http://39.99.182.33/api/pro/category').then(res => res.json()).then(result => {
        // console.log(result)
        dispatch({
            type: types.CHNAGE_KIND_LIST,
            payload: result.data
        })
    })
}

export {
    getKindListAction 
}