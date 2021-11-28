import React, { useState, useEffect } from 'react';

const UseEffect = () => {
    const [ prolist, setProlist ] = useState([])
    // 数据请求
    // useEffect 其实是三个生命周期钩子的合体
    // componentDidMount 
    // componentDidUpdate
    // componentWillUnmount

    // useEffect(() => {
    //     fetch('/pro.json').then(res => res.json()).then(result => {
    //         // console.log(result) // 一直打印
    //         setProlist(result)
    //     })
    // })


    // 只执行componentDidMount， 给useEffect 添加第二个参数, 添加一个不变的量
    // 要依据初始化数据的类型添加
    // 数组- []
    // useEffect(() => {
    //     fetch('/pro.json').then(res => res.json()).then(result => {
    //         console.log(result) // 添加一个空数组，只执行一次
    //         setProlist(result)
    //     })
    // }, [])


    // componentWillUnmount --- 当组件被销毁的时候会执行return中的内容
    useEffect(() => {
        return () => { //componentWillUnmount
            console.log('组件销毁了')
        }
    })

    return (
        <div>
            {
                prolist.map((item, index) => {
                    return (
                        <p key={ index }>{ item.positionName }</p>
                    )
                })
            }
        </div>
    );
}

export default UseEffect;
