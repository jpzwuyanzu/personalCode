const getListAction = () => {
    return dispatch => {
        fetch('/pro.json').then(res => res.json()).then(result => {
            dispatch({
                type:'CHANGE_LIST',
                payload: result.result
            })
        })
    }
}

export {
    getListAction
}