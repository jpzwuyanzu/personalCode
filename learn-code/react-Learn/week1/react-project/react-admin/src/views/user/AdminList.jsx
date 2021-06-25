/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import { Button, Table, Drawer, Form, Tree, Input, Select } from 'antd'
import menus  from './../../router/menus'
 menus.splice(0,1)
    



const { Option } = Select

const AdminList = () => {
    const [columns,setColumns] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [visible, setVisible] = useState(false)
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('');
    const [checkrole, setCheckrole] = useState('1')
    const [form] = Form.useForm()
    const [nameNick, setNameNick] = useState(false)
  const [checkedKeys, setCheckedKeys] = useState([]);

    useEffect(()=>{
        //需要加上这个判断，以及抽屉的visible监听，不然会报错，因为抽屉比form要早渲染，这样就会获取不到form对象
        if(visible) { 
            form.validateFields(username)
        }
    },[visible,nameNick])

    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };
    const handleSubmit = () => {
        setNameNick(true)
        // setVisible(false)
        console.log('username: ', username)
        console.log('password: ', password)
        console.log('checkrole:', checkrole)
        console.log('onCheck', checkedKeys);
    }

    return (
       <>
        <Button type="primary" onClick={showDrawer}>添加管理员</Button>
        <Table columns={columns} dataSource={dataSource} />
        <Drawer
        getContainer={false}
        title="添加管理员"
        width='500'
        placement="right"
        closable={true}
        onClose={onClose}
        visible={visible}
        footer={
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button onClick={handleSubmit} type="primary">
                提交
              </Button>
            </div>
          }
      >
        <Form form={form}
      name="basic"
      
    >
      <Form.Item
        name="username"
        rules={[{ required: nameNick, message: '请输入管理员名称！' }]}
      >
        <Input placeholder="请输入管理员名称！" onChange={e => setUsername(e.target.value)} />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: nameNick, message: '请输入管理员密码！' }]}
      >
        <Input.Password placeholder="请输入管理员密码！" onChange={ e => setPassword(e.target.value)} />
      </Form.Item>
      <Form.Item>
      <Select defaultValue={checkrole} onChange={ e => setCheckrole(e) } placeholder="请选择角色">
      <Option value="1">管理员</Option>
      <Option value="2">测试人员</Option>
    </Select>
      </Form.Item>
    </Form>
    <Tree
      checkable
      defaultExpandAll={true}
      onCheck={(checkedKeysValue) => setCheckedKeys(checkedKeysValue)}
      checkedKeys={checkedKeys}
      treeData={menus}
    />
      </Drawer>
       </>
    );
}

export default AdminList;
