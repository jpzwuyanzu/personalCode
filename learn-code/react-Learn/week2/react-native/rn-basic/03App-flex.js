import React  from 'react';
import { Text, View } from 'react-native';


class FlexComponent extends React.PureComponent{
  render () {
    //如果父元素既没有固定的width和height， 也没有设定flex
    // 则父容器的尺寸为0， 其子组件使用了flex， 也是无法显示
    // react-native中的flex布局默认是垂直方向
    return(
      <View style={{ flex: 1 }}>
       {/* <View style={{ height: 300 }}> */}
        <View style={{ flex: 1 }}><Text>111</Text></View>
        <View style={{ flex: 1 }}><Text>222</Text></View>
        <View style={{ flex: 1 }}><Text>333</Text></View>
    </View>
    )
  }
}


export default function App() {

  return (
    <View style={{
      flex: 1,
      justifyContent:'flex-start',
      alignItems: 'left'
    }}>
      <FlexComponent></FlexComponent>
    </View>
  );
}
