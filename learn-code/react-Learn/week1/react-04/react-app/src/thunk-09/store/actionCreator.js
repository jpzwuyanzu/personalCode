const getListAction = ()  => {
    return (dispatch,getState) => { //这里还有一个getState参数
        fetch('/pro.json').then(res => res.json()).then(result => {
            dispatch({
                type:'CHANGE_LIST',
                payload:result.result
            })
        })
    }
}

export {
    getListAction
}