import React, { useEffect, useState } from 'react';
import { Transfer,Space, Image, message } from 'antd';

const NavigatorHomelist = () => {
  const [targetKeys, setTargetKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [mockData, setMockData] = useState([])

  useEffect(()=>{
    fetch('/navgatorlist.json').then(res => res.json()).then(result => {
        console.log(result)
        setMockData(result.result)
    })
  },[])

 //将选中的key添加到已经选中的数组中
  const onChange = (nextTargetKeys, direction, moveKeys) => {
    console.log('targetKeys:', nextTargetKeys);
    console.log('direction:', direction);
    console.log('moveKeys:', moveKeys);
    setTargetKeys(nextTargetKeys);
    //在这里保存数据到后台
  };

  //点击勾选的事件
  const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    console.log('sourceSelectedKeys:', sourceSelectedKeys);
    console.log('targetSelectedKeys:', targetSelectedKeys);
    //在这里可以控制最多只能选择多少项
    if(sourceSelectedKeys.length + targetKeys.length > 10 ) {
        message.error('最多只能选择10项')
    } else {
        setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
    }
  };

  const onScroll = (direction, e) => {
    console.log('direction:', direction);
    console.log('target:', e.target);
  };

  return (
    <Transfer
      listStyle={{
          width:300,
          height:600
      }}
      dataSource={mockData}
      titles={['所有导航', '选中的导航']}
      targetKeys={targetKeys}
      selectedKeys={selectedKeys}
      onChange={onChange}
      onSelectChange={onSelectChange}
      onScroll={onScroll}
      rowKey = {
          record => record.id
      }
      render={item => 
        <Space>
            <Image width={20} height={20} src={ item.icon } />
            <span>{item.name}</span>
        </Space>
      }
    />
  );
};

export default NavigatorHomelist