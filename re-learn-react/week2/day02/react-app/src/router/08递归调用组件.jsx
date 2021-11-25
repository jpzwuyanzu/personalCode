import React from 'react'
import { Switch, Route, Redirect, useParams, useLocation, useHistory, Link, useRouteMatch } from 'react-router-dom'

const list = [
    { id: 0, name: '张三', firends: [1,2] },
    { id: 1, name: '李四', firends: [0,1] },
    { id: 2, name: '王武', firends: [0,1] },
    { id: 3, name: '赵六',firends: [0] }
]

const find = (id) => {
    return list.find(item => item.id === id)
}

const Person = (props) => {
    // console.log(useHistory(), props.history)
    // console.log(useParams(), props.match.params)
    // console.log(useLocation(), props.location)
    // console.log(useRouteMatch(), props.match)
    const { url } = useRouteMatch()
    const { id } = useParams()  //如果在类组件中使用this.props.match.params
    const person = find(id*1)
    // console.log(useParams())
    // console.log(person)
    return (
        <>
            { person.name }的朋友有:
            <ul>
                {
                    person.firends.map((item, index) => {
                        let per = find(item*1)
                        return(
                            <li key={ index }>
                                <Link to={ `${url}/${item}` }>{ per.name }</Link>
                            </li>
                        )
                    })
                }
            </ul>
            {/* 组件的递归调用 -- 不常见 */}
            <Route path={ `${url}/:id` } component={ Person }></Route>
        </>
    )
}

const App = () => {
    return (
        <Switch>
            <Route path="/:id" component={ Person }></Route>
            <Redirect path="/" exact to="/0"></Redirect>
        </Switch>
    )
}

export default App