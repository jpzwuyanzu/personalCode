import React, { Component } from 'react'
import withRouter from '../../components/withRouter'

 class FilmItem extends Component {

    handleClick = (id) => {
        // console.log(id)
        //this.props.history.push  跳转页面
        //this.props.history.match  获取参数
        //this.props.history.location  获取路径
        this.props.history.push(`/detail/${id}`)
    }

    render() {
        // console.log(this.props.history)
        return (
            <li onClick={ () => this.handleClick(this.props.filmId) }>{ this.props.name }</li>
        )
    }
}

export default withRouter(FilmItem)

//  在路由v6中没有withRouter， 需要使用class组件的时候自己定一个