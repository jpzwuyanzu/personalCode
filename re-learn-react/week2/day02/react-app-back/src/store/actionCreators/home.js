import * as types from './../actionTypes'

const getBannerListAction = (dispatch, getState) => {
    fetch('http://39.99.182.33/api/pro').then(res => res.json()).then(result => {
        // console.log(result)
        dispatch({
            type: types.CHNAGE_BANNER_LIST,
            payload: result.data
        })
    })
}

export {
    getBannerListAction
}