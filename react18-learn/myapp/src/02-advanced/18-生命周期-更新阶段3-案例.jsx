import React, { Component } from 'react'
import axios from 'axios'

class FilmList extends Component{

    state = {
        list: []
    }

    // 初始化生命周期，只会执行一次
    componentDidMount() {
        console.log(this.props.type)
        if(this.props.type === 1) {
            //请求正在热映数据
            console.log('请求正在热映数据')
            axios({
                url: 'https://m.maizuo.com/gateway?cityId=440300&pageNum=1&pageSize=10&type=2&k=6456987',
                headers:{
                    'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.0","e":"16558863921792667809742849"}',
                    'X-Host': 'mall.film-ticket.film.list'
                }
            }).then(res => {
                console.log(res.data.data.films)
                this.setState({
                    list: res.data.data.films
                })
            })
        }else{
            //请求即将上映数据
            console.log('请求即将上映数据')
            axios({
                url: 'https://m.maizuo.com/gateway?cityId=440300&pageNum=1&pageSize=10&type=1&k=4000929',
                headers:{
                    'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.0","e":"16558863921792667809742849"}',
                    'X-Host': 'mall.film-ticket.film.list'
                }
            }).then(res => {
                console.log(res.data.data.films)
                this.setState({
                    list: res.data.data.films
                })
            })
        }
        
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if(nextProps.type === 1) {
            //请求正在热映数据
            console.log('请求正在热映数据')
            axios({
                url: 'https://m.maizuo.com/gateway?cityId=440300&pageNum=1&pageSize=10&type=2&k=6456987',
                headers:{
                    'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.0","e":"16558863921792667809742849"}',
                    'X-Host': 'mall.film-ticket.film.list'
                }
            }).then(res => {
                console.log(res.data.data.films)
                this.setState({
                    list: res.data.data.films
                })
            })
        }else{
            //请求即将上映数据
            console.log('请求即将上映数据')
            axios({
                url: 'https://m.maizuo.com/gateway?cityId=440300&pageNum=1&pageSize=10&type=1&k=4000929',
                headers:{
                    'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.0","e":"16558863921792667809742849"}',
                    'X-Host': 'mall.film-ticket.film.list'
                }
            }).then(res => {
                console.log(res.data.data.films)
                this.setState({
                    list: res.data.data.films
                })
            })
        }
    }
    render() {
        return <ul>
            {
                this.state.list.map((item) => <li key={ item.filmId }>{ item.name }</li>)
            }
        </ul>
    }
}

export default class App extends Component {

    state = {
        type: 1
    }
    render() {
        return (
            <div>
                <ul>
                    <li onClick={ () => {
                        this.setState({
                            type: 1
                        })
                    } }>正在热映</li>
                    <li onClick={ () => {
                        this.setState({
                            type: 2
                        })
                    } }>即将上映</li>
                </ul>
                <FilmList type={ this.state.type }></FilmList>
            </div>
        )
    }
}
