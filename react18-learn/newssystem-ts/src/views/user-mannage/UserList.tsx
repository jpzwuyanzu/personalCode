import React, { useState, useEffect } from "react";
import { Table, Space, Button, Modal, Form, Input, Select } from "antd";
import axios from "axios";
const { Option } = Select;

const UserList = () => {
  const [dataSource, setDataSource] = useState([]);
  const [regions, setRegions] = useState([]);
  const [roleList, setRoleList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const columns: any = [
    {
      title: "用户名",
      dataIndex: "username",
      key: "username",
      align: "center",
    },
    {
      title: "地区",
      dataIndex: "region",
      key: "region",
      align: "center",
    },
    {
      title: "角色ID",
      dataIndex: "roleId",
      key: "roleId",
      align: "center",
    },
    {
      title: "操作",
      align: "center",
      render: () => {
        return (
          <>
            <Space>
              <Button type="primary">编辑</Button>
              <Button type="primary" danger>
                删除
              </Button>
            </Space>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    axios.get("user.json").then((res) => {
      setDataSource(res.data.users);
    });
  }, []);
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

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };


  return (
    <div>
      <Button
        type="primary"
        onClick={showModal}
        style={{ marginBottom: "20px" }}>
        新增用户
      </Button>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey={(item: any) => item.id}/>
      <Modal
        title="新增用户"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}>
        <Form
          name="basic"
          labelCol={{ span: 5 }}
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
      </Modal>
    </div>
  );
};

export default UserList;
