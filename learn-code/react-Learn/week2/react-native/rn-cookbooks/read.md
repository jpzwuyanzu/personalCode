### 1, 创建项目  
expo init rn-cookibooks

选择typescript模版

### 2, 创建pages目录, index.tsx

```tsx
import React from 'react'

import { View, Text, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1 ,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
        
    }
})

interface Props {}
interface State {}

class Index extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props)
    }

    state: State = {}

    componentDidMount() {}

    render () {
        return (
            <View style = { styles.container }>
                <Text>Index</Text>
            </View>
        )
    }
}

export default Index
```
### 3, 修改App.tsx 
```tsx
import React from 'react';
import { View } from 'react-native'
import Index from './pages/index'

function App () {
  return (
    <View style={{ flex: 1 }}>
      <Index/>
    </View>
  )
}

export default App


```
### 4, 引入 react-native-tab-navigator 底部导航

参考地址： https://github.com/ptomasroos/react-native-tab-navigator

yarn add react-native-tab-navigator  @types/react-native-tab-navigator

或者 npm install react-native-tab-navigator @types/react-native-tab-navigator --save  

### 5，在index.tsx中

 import TabNavigator from 'react-native-tab-navigator';

 ```tsx
 import React from 'react'
import { View, Text, StyleSheet, Image, SafeAreaView } from 'react-native'
import TabNavigator from 'react-native-tab-navigator';

import cookbook from './../../assets/images/011.png'
import cookbookActive from './../../assets/images/01.png'
import kind from './../../assets/images/033.png'
import kindActive from './../../assets/images/03.png'
import more from './../../assets/images/044.png'
import moreActive from './../../assets/images/04.png'
import map from './../../assets/images/022.png'
import mapActive from './../../assets/images/02.png'

// https://reactnavigation.org/docs/hello-react-navigation

const styles = StyleSheet.create({
    container: {
        flex: 1 ,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
        
    },
    icon: {
        width: 35,
         height: 35
    }
})

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
            <TabNavigator>
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
 ```

 ### 6 添加一个声明文件images_d.ts
 ```ts
 declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.webp'
 ```


### 7 tabbar兼容处理
 * 1, yarn add  expo-device

 // 载入模块
* 2, import * as Device from 'expo-device'

通过设备信息修改样式






















##  
https://reactnavigation.org/docs/hello-react-navigation
