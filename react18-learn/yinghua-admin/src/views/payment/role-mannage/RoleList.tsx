import React, { useState, useEffect } from "react";
import { Space, Table, Button,Form, Input, Col, Row, message, Switch, Popconfirm, Divider,Select } from "antd";
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import type { ColumnsType } from "antd/es/table";
import PagiNation from "./../../../components/PagiNation";
import { loadRoleList, editRole, delRole } from './../../../api/index'
import dayjs from "dayjs";
import styles from "./RoleList.module.scss";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  status: number;
}

const RoleList: React.FC = () => {
  const [total, setTotal] = useState<number>(0);
  const [page, setpage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [tableList, setTableList] = useState<any[]>([]);

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const loadData = async(page: number, pageSize: number) => {
    console.log('加载分页数据', page, pageSize)
    setpage(page)
    setPageSize(pageSize)
  }
  const fetchData = async () => {
    const data: any = await loadRoleList({ page, pageSize })
    console.log(data)
    if(data.code && data.code === 200) {
      setTableList(data.page.list ? data.page.list : []);
      setTotal(data.page.totalCount ? data.page.totalCount : 0);
    } else {
      message.open({
        type: 'error',
        content: data.msg
      })
    }
  }

  const switchRoleStatus = async (checked: boolean, roleId: any) => {
    console.log(checked, roleId)
    const resp: any = await editRole({ id:roleId,  status: Number(Boolean(checked)) })
    console.log(resp)
    if(resp.code && resp.code === 200) {
      message.open({
        type: 'success',
        content: '修改成功'
      })
      fetchData()
    } else {
      message.open({
        type: 'error',
        content: resp.msg
      })
    }
  }

  const confirmDelRole = async (roleId: any) => {
    const resp: any = await delRole({ id: roleId })
    if(resp.code && resp.code === 200) {
      fetchData()
    } else {
      message.open({
        type: 'error',
        content: resp.msg
      })
    }
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "角色名称",
      dataIndex: "name",
      key: "name",
      align: 'center',
      render: (text) => <a>{text}</a>,
    },
    {
      title: "角色ID",
      dataIndex: "id",
      align: 'center',
      key: "id",
    },
    {
      title: "状态",
      dataIndex: "status",
      align: 'center',
      key: "status",
      render: (text, record: any) => (
        <>
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            checked={ Boolean(Number(text)) }
            onClick={ (checked: boolean) => switchRoleStatus(checked, record.id) }
          />
        </>
      )
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      align: 'center',
      key: "createTime",
      render: (text) => <>{dayjs(text).format('YYYY-MM-DD hh:mm:ss')}</>
    },
    {
      title: "更新时间",
      key: "updateTime",
      align: 'center',
      dataIndex: "updateTime",
      render: (text) => <>{dayjs(text).format('YYYY-MM-DD hh:mm:ss')}</>
    },
    {
      title: "操作",
      key: "action",
      align: 'center',
      render: (_, record: any) => (
        <Space size="middle">
          <Button type="primary">编辑角色</Button>
          <Divider type="vertical"/>
          <Popconfirm
            title="删除"
            description="你确认要删除该条数据吗?"
            onConfirm={ () => confirmDelRole(record.id) }
            onCancel={() => {}}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger>删除</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

 

  useEffect( () => {
    fetchData()
  }, [])
  return (
    <div className={styles.TableCom_Container}>
      <div className={styles.Table_ContentArea}>
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          initialValues={{
              roleState: -1
            }}
        >
          <Row justify="start">
            <Col span={4}>
              <Form.Item
                label="名称"
                name="rolename"
                rules={[
                  { required: false, message: "Please input your rolename!" },
                ]}
              >
                <Input placeholder="请输入角色名称" allowClear={true}/>
              </Form.Item>
            </Col>
            <Col span={4}>
              
              <Form.Item
                label="状态"
                name="roleState"
                rules={[
                  { required: false, message: "Please input your roleState!" },
                ]}
              >
                <Select
                style={{ width: '100%' }}
                onChange={() => {}}
                options={[
                  { value: -1, label: '全部' },
                  { value: 1, label: '启用' },
                  { value: 0, label: '禁用' },
                ]}
              />
              </Form.Item>
            </Col>
            <Col span={1}>
              <Form.Item wrapperCol={{ offset: 0, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  搜索
                </Button>
              </Form.Item>
            </Col>
            <Col span={1}>
              <Form.Item wrapperCol={{ offset: 0, span: 16 }}>
                <Button type="primary" style={{ marginLeft: '13px' }}>
                  新增角色
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Table columns={columns} dataSource={tableList} pagination={false} rowKey={(record) => record.id} />
      </div>
      <div className={styles.bottom_Pag_area}>
        <PagiNation current={page} pageSize={pageSize} total={total} loadData={loadData}/>
      </div>
    </div>
  )
};

export default RoleList;
