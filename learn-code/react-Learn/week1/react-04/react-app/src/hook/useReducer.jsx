import React, { useReducer } from 'react';

const defaultState = {
    count : 0
}

//state不给初始值，--跟redux不一样
const reducer = (state , action) => {
    switch (action.type) {
        case 'increment':
            return  { ...state, count: state.count + 1 }
        case 'decrement':
            return  { ...state, count: state.count  -  1 }
        default:
            return state
    }
}


const UseReducer = () => {
    const [state, dispatch] = useReducer(reducer, defaultState)
    return (
        <div>
            <button onClick = { () => {
                dispatch({type: 'increment'})
            } }>+</button>
            { state.count }
            <button onClick = { () => {
                dispatch({type: 'decrement'})
            } }>-</button>
            <Com count = { state.count } />
        </div>
    );
}

function Com ({count}) {
    return (
        <>
            <h1>com- {count}</h1>
        </>
    )
}

export default UseReducer;
