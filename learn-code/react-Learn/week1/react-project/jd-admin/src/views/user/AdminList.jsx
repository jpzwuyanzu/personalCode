import React, { useState } from "react";
import { Table, Button, Drawer, Form, Input, Select, Tree } from "antd";
import menus from "./../../router/menus";
import {setStorage} from './../../utils/storage'

menus.splice(0, 1);

const AdminList = () => {
  const [adminlist, setAdminlist] = useState([]);
  const [visible, setVisible] = useState(false);
  const [adminname, setAdminname] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(2);
  const [checkedKeys, setCheckedKeys] = useState([])

  const columns = [];


  const handleChecked = (checkedKeys, info) => {
    console.log("onCheck", checkedKeys, info);
    let tempArr = Array.from(new Set([...checkedKeys, ...info.halfCheckedKeys])).sort()
    setCheckedKeys(tempArr)
    
  }

  const addAdmin = () => {
    // console.log(adminname,password,role,checkedKeys)
    // 在这里将结果存入到sessionStorege
    setStorage('session' , 'newPermission', checkedKeys)
    setVisible(false)
  }

  

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        添加管理员
      </Button>
      <Table dataSource={adminlist} columns={columns} rowKey="adminid" />
      <Drawer
        width="500"
        title="添加管理员"
        placement="right"
        closable={true}
        onClose={() => setVisible(false)}
        visible={visible}
        footer={
          <div
            style={{
              textAlign: "right",
            }}
          >
            <Button type="primary" onClick={ addAdmin }>添加</Button>
          </div>
        }
      >
        <Form>
          <Form.Item
            rules={[
              {
                required: true,
                message: "请输入管理员账号",
              },
            ]}
          >
            <Input placeholder="请输入管理员账号" onChange={ (e) => {
              setAdminname(e.target.value)
            } } />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "请输入密码",
              },
            ]}
          >
            <Input.Password placeholder="请输入密码" onChange={ (e) => {
              setPassword(e.target.value)
            } } />
          </Form.Item>
          <Form.Item>
            <Select defaultValue={role}  onChange={ (value, option) => setRole(value) }>
              <Select.Option value={2}>超级管理员</Select.Option>
              <Select.Option value={1}>管理员</Select.Option>
            </Select>
          </Form.Item>
        </Form>
        <Tree
          checkable
          defaultExpandAll={true}
          defaultSelectedKeys={[]}
          defaultCheckedKeys={[]}
          onCheck={handleChecked}
          treeData={menus}
        />
      </Drawer>
    </>
  );
};

export default AdminList;
