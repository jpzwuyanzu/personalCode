import React, { useState } from 'react';
import { Text, View, Image, Button } from 'react-native';

function Greeter (props) {
  return (
    <View>
      <Text>hello { props.name }</Text>
    </View>
  )
}


export default function App() {

  const [count, setCount] = useState(100)

  return (
    <View style={{
      flex: 1,
      justifyContent:'center',
      alignItems: 'center'
    }}>
      <Text>hello rn!</Text>
      <Image style={{ width: 100, height: 100 }} source={{
        uri: 'https://reactnative.dev/img/tiny_logo.png'
       }}/>
       <Greeter name="张三" />
       <Greeter name="里斯" />
       <Greeter name="王武" />
       <Button 
       title='点击'
       onPress = {() => setCount(count + 10)}
       ></Button>
       <Text>{ count }</Text>
    </View>
  );
}
