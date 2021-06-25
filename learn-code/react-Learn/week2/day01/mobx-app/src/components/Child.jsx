import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

@inject('store') //这里注入store
@observer //还要装饰成observer
class Child extends Component {

  componentDidMount() {
    this.props.store.home.getBannerlist()
      console.log(this.props)
  }

  render () {
    return (
      <div>
        {
        this.props.store.home.bannerlist && this.props.store.home.bannerlist.map((item, index) => {
           return (
            <div key={index}>{item.categoryname}</div>
           ) 
        })
        }
      </div>
    )
  }
}

export default Child