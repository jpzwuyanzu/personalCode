import React, { useState, useEffect, useRef } from "react";
import { Table, Space, Button, Modal } from "antd";
import UseForm from '../../components/useForm'
import axios from "axios";

const UserList = () => {
  const [dataSource, setDataSource] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState({});
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
      render: (text: any) => {
        return (
          <>
            <Space>
              <Button type="primary" onClick={ () => updateModal(text) }>编辑</Button>
              <Button type="primary" danger>
                删除
              </Button>
            </Space>
          </>
        );
      },
    },
  ];
  const formRef: any = useRef(null)
  useEffect(() => {
    axios.get("user.json").then((res) => {
      setDataSource(res.data.users);
    });
  }, []);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const updateModal = async (item: any) => {
    setCurrentItem(item);
    //这里要先创建表单元素之后才可以获取到表单方法
    await setIsModalOpen(true); 
    formRef.current.setFieldsValue(item)
    
  }
  const handleOk = () => {
      // validateFields() 触发校验
      // setFieldValue() //设置某一项的值
      // resetFields() // 重置一组字段的值
      formRef.current.validateFields().then((res: any) => {
          console.log(res)
          //在这里将数据提交到后台
          setIsModalOpen(false);
      })
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <Button
        type="primary"
        onClick={() => showModal()}
        style={{ marginBottom: "20px" }}>
        新增用户
      </Button>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey={(item: any) => item.id}/>
      <Modal
        title='新增用户'
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}>
        <UseForm ref={ formRef } currentItem={ currentItem }></UseForm>
      </Modal>
    </div>
  );
};

export default UserList;
