import React from 'react'

interface IProps {
    name: string
}

//父组件
export default function Test() {
const handleParams = (info: any) => {
    console.log('这里获取来自子组件的数据:',info)
}
  return (
    <div>
        <p>test</p>
        <ChildrenItem handleParams={handleParams}/>
    </div>
  )
}


//子组件
const ChildrenItem = ({handleParams }: any) => {
    return (
        <div>
            <button onClick={() => handleParams('传递字符串给父组件')}>子组件</button>
        </div>
    )
}
