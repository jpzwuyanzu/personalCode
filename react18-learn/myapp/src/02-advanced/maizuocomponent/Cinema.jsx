import React, { Component } from 'react'
import axios from 'axios'

export default class Cinema extends Component {
    state = {
        cinemas: [],
        copyCinemas: []
    }
    constructor() {
        super()
        //axios 请求数据
        // axios.get('请求地址').then(res => {}).catch(err => { console.log(err) })
        // axios.get('https://m.maizuo.com/gateway?cityId=440300&ticketFlag=1&k=7834489').then(res => {
        //     console.log(res)
        // }).catch(err => {
        //     console.log(err)
        // })

        axios({
            url: 'https://m.maizuo.com/gateway?cityId=440300&ticketFlag=1&k=7834489',
            headers: {
                "X-Client-Info": '{"a":"3000","ch":"1002","v":"5.2.0","e":"16558863921792667809742849"}',
                "X-Host": "mall.film-ticket.cinema.list"
            }
        }).then(res => {
            this.setState({
                cinemas: res.data.data.cinemas,
                copyCinemas: res.data.data.cinemas
            })
            console.log(res.data.data.cinemas)
        }).catch(err => {
            console.log(err)
        })
    }

    //后边生命周期函数更适合发送ajax请求
    handleInput = (evt) => {
        console.log('input', evt.target.value)
        let newlist = this.state.copyCinemas.filter(item => item.name.toUpperCase().includes(evt.target.value.toUpperCase()) || item.address.toUpperCase().includes(evt.target.value.toUpperCase()))
        this.setState({
            cinemas: newlist
        })
        // cinemas 每次都会被重新覆盖
        console.log(newlist)
    }


    render() {
        return (
            <div>
                <input type="text" onInput={ this.handleInput } />
                    {
                        this.state.cinemas.map((item, index) => 
                        <dl key={ item.cinemaId }>
                            <dt>{ item.name }</dt>
                            <dd>{ item.address }</dd>
                        </dl>)
                    }
            </div>
        )
    }
}


    /**
     * 
     *  filter
     */
    //  var arr = ['aaa', 'bbb', 'ccc']
    //  var newArr = arr.filter(item => item.includes('a'))
    //  console.log(newArr)