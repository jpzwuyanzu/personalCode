const getListAction = () => {
    return (dispatch, getState) => {
        fetch('/pro.json').then(res => res.json()).then(result => {
            console.log(result)
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

//将组件中的异步代码提取到组件外部