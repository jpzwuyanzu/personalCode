import React, { Component } from 'react'
import Swiper, { Navigation, Pagination } from 'swiper'
import 'swiper/css'
Swiper.use([Navigation, Pagination])

export default class App extends Component {

    state = {
        list: ['111','222','3333']
    }

    componentDidMount() {
        new Swiper('.swiper', {
            pagination: {
                el: '.swiper-pagination',
              },
        })
    }
    

    render() {
        return (
            <div>
               <div className="swiper" style={{ height: '100px', background: 'yellow' }}>
                    <div className="swiper-wrapper">
                        {
                            this.state.list.map((item) => <div className="swiper-slide" key={ item }>{ item }</div>)
                        }
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
            </div>
        )
    }
}
