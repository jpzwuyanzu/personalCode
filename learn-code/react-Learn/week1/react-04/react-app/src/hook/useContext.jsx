import React, {createContext, useContext} from 'react'

const nameContext = createContext()
const ageContext = createContext()
// 使用usecontex可以解决多状态嵌套的问题
const Child = () => {
    const name = useContext(nameContext)
    const age = useContext(ageContext)
    return (
        <>
        {name} --- {age}
       </>
    )
}
const Com = () => (
        <ageContext.Provider value = "18">
            <Child/>
        </ageContext.Provider>)


class Usecontext extends React.Component {
    render () {
        return (
            <nameContext.Provider value = "西蒙">
                <Com/>
            </nameContext.Provider>
        )
    }
}

export default Usecontext