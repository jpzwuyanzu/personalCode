import React  from 'react';
import { Text, View, SafeAreaView, SectionList } from 'react-native';


//FlatList 优先渲染屏幕的可见区域的数据，类似与懒加载

export default function App() {

  //设计数据结构的时候必须为data字段

  const data = [
    { title: '深圳市', data: ['南山区', '福田区', '宝安区']},
    { title: '广州市', data: ['天河区', '海珠区', '越秀区']}
  ]

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor:'#efefef', paddingTop:20 }}>
      {/* SafeAreaView应用在苹果手机的刘海屏幕，在这里判断如果是安卓需要加上padding， */}
    <View style={{
      flex: 1,
      justifyContent:'flex-start',
      alignItems: 'left'
    }}>
      <SectionList sections = { data }
      renderItem = { (obj) => {
        // console.log(item)
        const item  = obj.item
        // console.log(obj)
        return(
          <Text style={{ height: 44, padding: 10, backgroundColor:'#fff' }} >{ item }</Text>
        )
      } }
      keyExtractor = { (item, index) => item + index }
      renderSectionHeader = {(obj) => {
        const section = obj.section
        // console.log(section)
        return <Text>{section.title}</Text>
      }}
       />
    </View>
    </SafeAreaView>
  );
}
