/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'

const NotFound = (props) => {
    useEffect(() => {
        console.log(props)
    }, [])
    return (
        <div>
            404
        </div>
    )
}

//自定义高阶组件

function TestHoc(cb, obj) {
    var value = cb();
    return (MyCom) => {
        return (props) => {
            return <div style={{ color: "red" }}><MyCom { ...value } { ...props } { ...obj } /></div>
        }
    }
}

export default TestHoc(() => {
    return {
        a: 1,
        b: 2
    }
}, {
    aa(){},
    bb(){}
})(NotFound)
