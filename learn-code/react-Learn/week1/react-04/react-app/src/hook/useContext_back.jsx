import React, {createContext} from 'react'

const nameContext = createContext()

const { Provider, Consumer } = nameContext


const Child = () => {
    return (
        <>
        <Consumer>
            {
                (value) => {
                    return <h1>{ value }</h1>
                }
            }
        </Consumer>
       </>
    )
}
const Com = () => (<div>Com<Child/></div>)


class Usecontext extends React.Component {
    render () {
        return (
            <Provider value = "green">
                <Com/>
            </Provider>
        )
    }
}

export default Usecontext