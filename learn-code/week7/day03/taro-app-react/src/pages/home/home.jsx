import { Component } from 'react'
import { View, Text, Swiper, SwiperItem, Image } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import { getBannerlist } from './../../api/banner'
import { getNavlist } from './../../api/nav'
import { getProlist } from './../../api/pro'


import "taro-ui/dist/style/components/button.scss" // 按需引入
import './home.scss'

export default class Home extends Component {

  state = {
    bannerlist: [],
    navlist: [],
    prolist: []
  }
  componentWillMount () { }

  async componentDidMount () { 
    const bannerres = await getBannerlist()
    console.log(bannerres)
    this.setState({
      bannerlist: bannerres.data
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='home'>
        <Swiper
        circular={ true }
        indicatorDots={ true }
        autoplay={ true }
        interval = { 4000 }
        duration ={ 400 }
        style={{ height: '160px' }}
        >
        {
          this.state.bannerlist.map(item => (
            <SwiperItem key={ item.bannerid }>
              <Image style={{ width: '100%', height: '100%' }} src={ item.bannerimg } mode="aspectFill"/>
            </SwiperItem>
          ))
        }
        </Swiper>
        <Text>23233</Text>
      </View>
    )
  }
}
