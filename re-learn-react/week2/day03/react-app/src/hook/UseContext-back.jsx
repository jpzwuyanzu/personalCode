import React, { createContext, useContext } from 'react';

const nameContext = createContext()
const ageContext = createContext()


const Child = () => {
    const name = useContext(nameContext) //使用useContext跟之前的区别就是在获取值的时候，不需要使用Consumer
    const age = useContext(ageContext)
    return (
        <div>
            { name } --- { age }
        </div>
    )
}
const Com = () => (
    <div>Com
        <ageContext.Provider value="18">
            <Child/>
        </ageContext.Provider>
    </div>
)
class UseContext extends React.Component {
    render() {
        return (
            <nameContext.Provider value='ximeng'>
                <Com/>
            </nameContext.Provider>
        )
    }
}

export default UseContext;
