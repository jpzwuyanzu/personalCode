import React, { useState, useEffect } from 'react';
import { Transfer, Image, Space, message } from 'antd';


const NavigatorHomeList = () => {
  const [targetKeys, setTargetKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [navlist, setNavList]  = useState([])

  useEffect(() => {
      fetch('/navlist.json').then(res => res.json()).then(result => {
        setNavList(result.result.data)
      })
  }, [])

  // 点击左右箭头时的事件
  const onChange = (nextTargetKeys, direction, moveKeys) => {
    console.log('targetKeys:', nextTargetKeys);
    console.log('direction:', direction);
    console.log('moveKeys:', moveKeys);
    setTargetKeys(nextTargetKeys);
    //在这里把nextTargetKeys用接口传递到后端
  };

  const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
      // 最多选择10条数据
    if((sourceSelectedKeys.length + targetKeys.length) > 10) {
        message.error('最多选择10项数据', 2)
    }else {
        // 表示当前的数据被选中
        setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
    }
  };

  const onScroll = (direction, e) => {
    // console.log('direction:', direction);
    // console.log('target:', e.target);
  };

  return (
    <Transfer
      dataSource={navlist}
      rowKey={ record => record.navid }
      titles={['所有导航', '选中导航']}
      targetKeys={targetKeys}
      selectedKeys={selectedKeys}
      onChange={onChange}
      onSelectChange={onSelectChange}
      onScroll={onScroll}
      listStyle={{ width: '40%', height: 600 }}
      render={ (item) => {
          return (
              <Space>
                  <Image src={ item.icon } width={ 20 } height={ 20 } />
                  <span>{ item.name }</span>
              </Space>
          )
      } }
    />
  );
};

export default NavigatorHomeList;