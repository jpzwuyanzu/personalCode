import React  from 'react';
import { Text, View, StyleSheet } from 'react-native';

const style = StyleSheet.create({
  color: {
    color: '#f66',
    fontWeight: 'bold'
  },
  test: {
    fontSize: 50,
    color: '#00f'
  }
})

class StyleComponent extends React.PureComponent{
  render () {
    return(
      <View>
      <Text style={style.color}>hello tyle</Text>
      <Text style={style.test}>hello tyle</Text>
      <Text style={[style.test, style.color]}>hello tyle</Text>
    </View>
    )
  }
}


export default function App() {

  return (
    <View style={{
      flex: 1,
      justifyContent:'center',
      alignItems: 'center'
    }}>
      <StyleComponent></StyleComponent>
    </View>
  );
}
