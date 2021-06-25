import React from 'react'
import { View, Text, Image } from 'react-native'
import TabNavigator from 'react-native-tab-navigator';
import styles from './style_index.js'
// 载入模块
import * as Device from 'expo-device'

import cookbook from './../../assets/images/011.png'
import cookbookActive from './../../assets/images/01.png'
import kind from './../../assets/images/033.png'
import kindActive from './../../assets/images/03.png'
import more from './../../assets/images/044.png'
import moreActive from './../../assets/images/04.png'
import map from './../../assets/images/022.png'
import mapActive from './../../assets/images/02.png'

// https://reactnavigation.org/docs/hello-react-navigation

console.log(Device)

interface Props {}
interface State {
    selectedTab: string
}

class Index extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props)
    }
    state: State = {
        selectedTab: 'home'
    }
    componentDidMount() {}
    render () {
        return (
            <TabNavigator
            tabBarStyle = { Device.deviceName === 'iPhone 12 Pro Max' ?  styles.tabBarStyle : {} }
            >
            <TabNavigator.Item
              selected={this.state.selectedTab === 'home'}
              title="菜谱大全"
              renderIcon={() => <Image source={cookbook} style={ styles.icon } />}
              renderSelectedIcon={() => <Image source={cookbookActive} style={ styles.icon } />}
              onPress={() => this.setState({ selectedTab: 'home' })}>
              <View>
                  <Text>菜谱大全</Text>
              </View>
            </TabNavigator.Item>
            <TabNavigator.Item
              selected={this.state.selectedTab === 'kind'}
              title="分类"
              renderIcon={() => <Image source={kind}  style={ { width: 28, height: 28 } }/>}
              renderSelectedIcon={() => <Image source={kindActive} style={ { width: 28, height: 28 } } />}
              onPress={() => this.setState({ selectedTab: 'kind' })}>
              <View>
                  <Text>分类</Text>
              </View>
            </TabNavigator.Item>
            <TabNavigator.Item
              selected={this.state.selectedTab === 'map'}
              title="地图"
              renderIcon={() => <Image source={map}  style={ { width: 28, height: 28 } }/>}
              renderSelectedIcon={() => <Image source={mapActive} style={ { width: 28, height: 28 } } />}
              onPress={() => this.setState({ selectedTab: 'map' })}>
              <View>
                  <Text>地图</Text>
              </View>
            </TabNavigator.Item>
            <TabNavigator.Item
              selected={this.state.selectedTab === 'more'}
              title="更多"
              renderIcon={() => <Image source={more} style={ styles.icon } />}
              renderSelectedIcon={() => <Image source={moreActive}  style={ styles.icon }/>}
              onPress={() => this.setState({ selectedTab: 'more' })}>
              <View>
                  <Text>更多</Text>
              </View>
            </TabNavigator.Item>
          </TabNavigator>
        )
    }
}

export default Index