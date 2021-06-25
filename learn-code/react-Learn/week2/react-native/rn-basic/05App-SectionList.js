import React  from 'react';
import { Text, View, SafeAreaView, SectionList } from 'react-native';


//FlatList 优先渲染屏幕的可见区域的数据，类似与懒加载

export default function App() {

  //设计数据结构的时候必须为data字段

  const data = [
    { title: 'D', data: ['Dass', 'Dxcxc', 'Dojoj']},
    { title: 'C', data: ['Cass', 'Cxcxc', 'Cojoj']}
  ]

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* SafeAreaView应用在苹果手机的刘海屏幕，在这里判断如果是安卓需要加上padding， */}
    <View style={{
      flex: 1,
      justifyContent:'flex-start',
      alignItems: 'left'
    }}>
      <Text>hello flatList</Text>
      <SectionList sections = { data }
      renderItem = { (obj) => {
        // console.log(item)
        const item  = obj.item
        // console.log(obj)
        return(
          <Text style={{ height: 44, padding: 10 }} >{ item }</Text>
        )
      } }
      keyExtractor = { (item, index) => item + index }
      renderSectionHeader = {(obj) => {
        const section = obj.section
        // console.log(section)
        return <Text>{section.title}</Text>
      }}
      renderSectionFooter = { obj => {
        console.log(obj)
        return <Text>12121</Text>
      } }
       />
    </View>
    </SafeAreaView>
  );
}
