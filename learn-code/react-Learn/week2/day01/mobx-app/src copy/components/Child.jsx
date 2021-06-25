import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

@inject('store') //这里注入store
@observer //还要装饰成observer
class Child extends Component {

  componentDidMount() {
    this.props.store.getBannerlist()
      console.log(this.props)
  }

  render () {
    return (
      <div>
        {
        this.props.store.bannerlist && this.props.store.bannerlist.map((item, index) => {
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