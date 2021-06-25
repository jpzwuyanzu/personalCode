import React, {useState, useEffect} from 'react';

const UseEffect = () => {
    const [prolist, setProlist] = useState([])
    //数据请求
    // useEffect 其实是三个生命周期钩子函数的合体
    // componentDidMount 
    // compoenntDidUpdate 
    // compoenntWillUnmount
    // useEffect(() => {
    //     fetch('/pro.json').then(res => res.json()).then(result => {
    //         // console.log(result) 会一直执行，导致无限死循环
    //         setProlist(result.result)
    //     })
    // })


    //让钩子只执行componentDidMount， 需要添加第二个参数，添加一个不变的量
    //要依据初始化数据的类型 
    // 数组类型--[]
    useEffect(() => {
        fetch('/pro.json').then(res => res.json()).then(result => {
            console.log(result)
            setProlist(result.result)
        })
    },[])


    //执行compoenntWillUnmount
    useEffect(() => {
        return () => {
            console.log('组件即将销毁')
        }
    })


    return (
        <div>
            {
                prolist.map((item => {
                    return (
                        <p key = {item.positionId}>{ item.positionName }</p>
                    )
                }))
            }
        </div>
    );
}

export default UseEffect;
