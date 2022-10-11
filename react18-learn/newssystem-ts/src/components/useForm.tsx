import React, { useState, useEffect, forwardRef } from 'react'
import axios from 'axios'
import { Form, Input, Select } from 'antd'
const { Option } = Select

const useForm: any = forwardRef((props: any, ref: any) => {
  const [regions, setRegions] = useState([]);
  const [roleList, setRoleList] = useState([]);
  console.log(props)

  useEffect(() => {
    axios.get("regions.json").then((res) => {
        setRegions(res.data.regions);
    });
  }, []);
  useEffect(() => {
    axios.get("role.json").then((res) => {
        setRoleList(res.data.roles);
    });
  }, []);
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
    return (
        <Form
          name="basic"
          labelCol={{ span: 5 }}
          ref={ ref }
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off">
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: "请输入用户名称!" }]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: "请输入密码!" }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item
          label="区域"
          name="region"
          rules={[{ required: true, message: "请选择用户区域!" }]}>
            <Select>
                {
                    regions.map((item: any) => <Option value={ item.value } key={ item.id }>{ item.title }</Option>)
                }
            </Select>
          </Form.Item>
          <Form.Item
          label="角色"
          name="roleId"
          rules={[{ required: true, message: "请选择用户角色!" }]}>
             <Select>
                {
                    roleList.map((item: any) => <Option value={ item.id } key={ item.id }>{ item.roleName }</Option>)
                }
            </Select>
          </Form.Item>
        </Form>
    )
})

export default useForm