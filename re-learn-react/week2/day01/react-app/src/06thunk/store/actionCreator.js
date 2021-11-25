const getListAction = () => {
    return (dispatch, getState) => {
        console.log(getState())
        fetch('/pro.json').then(res => res.json()).then(result => {
            dispatch({
                type: 'CHANGE_LIST',
                payload: result
            })
        })
    }
}

export {
    getListAction
}