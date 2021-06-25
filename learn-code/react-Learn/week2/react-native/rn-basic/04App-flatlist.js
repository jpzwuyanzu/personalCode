import React  from 'react';
import { Text, View, SafeAreaView, SectionList } from 'react-native';


//FlatList 优先渲染屏幕的可见区域的数据，类似与懒加载

export default function App() {

  const data = [
    {key: '1212'},
    {key: '4234'},
    {key: '2323'},
    {key: '34'}
  ]

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <View style={{
      flex: 1,
      justifyContent:'flex-start',
      alignItems: 'left'
    }}>
      <Text>hello flatList</Text>
      <FlatList data = { data }
      renderItem = { ({ item }) => {
        return(
          <Text style={{ height: 44, padding: 10 }} >{ item.key }</Text>
        )
      } }
      keyExtractor = { item => item.key }
       />
    </View>
    </SafeAreaView>
  );
}
