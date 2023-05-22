import React, { useState, useEffect } from "react";
import { Space, Table, Button,Form, Input, Col, Row, message, Switch, Popconfirm, Divider,Select } from "antd";
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import type { ColumnsType } from "antd/es/table";
import PagiNation from "@/components/PagiNation";
import { userList, createUser, delUser } from '@/api/index'
import dayjs from "dayjs";
import UserListModule from "./modules/UserListModule";
import JudgePemission from "@/components/JudgePemission";
import { useLocation } from 'react-router-dom'
import styles from "./UserList.module.scss";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  status: number;
}

const UserList: React.FC = () => {
  const [total, setTotal] = useState<number>(0);
  const [page, setpage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [tableList, setTableList] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [moduleWidth, setModuleWidth] = useState('');
  const [userInfo, setUserInfo] = useState({});
  const { pathname } = useLocation()

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const loadData = async(page: number, pageSize: number) => {
    setpage(page)
    setPageSize(pageSize)
  }
  const fetchData = async () => {
    const data: any = await userList({ page, pageSize })
    if(data && data.code && data.code === 200) {
      setTableList(data.page.list ? data.page.list : []);
      setTotal(data.page.totalCount ? data.page.totalCount : 0);
    } else {
      message.open({
        type: 'error',
        content: data.msg
      })
    }
  }

  const switchUserStatus = async (checked: boolean, userId: any) => {
    const resp: any = await createUser({ id:userId,  status: Number(Boolean(checked)) })
    if(resp && resp.code && resp.code === 200) {
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

  const confirmDelRole = async (userId: any) => {
    const resp: any = await delUser({ id: userId })
    if(resp && resp.code && resp.code === 200) {
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
      title: "用户账号",
      dataIndex: "username",
      key: "username",
      align: 'center',
      render: (text) => <a>{text}</a>,
    },
    {
      title: "用户角色",
      dataIndex: "roleName",
      align: 'center',
      key: "roleName",
    },
    {
      title: "用户状态",
      dataIndex: "status",
      align: 'center',
      key: "status",
      render: (text, record: any) => (
        <>
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            checked={ Boolean(Number(text)) }
            onClick={ (checked: boolean) => switchUserStatus(checked, record.id) }
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
          <JudgePemission pageUrl={'/payment/userlist_133'}>
          <Button type="primary" onClick={() => openDrawer('378px', record)}>编辑用户</Button>
          <Divider type="vertical"/>
          </JudgePemission>
          <JudgePemission pageUrl={'/payment/userlist_134'}>
          <Popconfirm
            title="删除"
            description="你确认删除该用户吗?"
            onConfirm={ () => confirmDelRole(record.id) }
            onCancel={() => {}}
            okText="是"
            cancelText="否"
          >
            <Button type="primary" danger>删除</Button>
          </Popconfirm>
          </JudgePemission>
        </Space>
      ),
    },
  ];

  useEffect( () => {
    fetchData()
  }, [])

  //新增/编辑用户
  const openDrawer = (moduleWidth: string, userInfo: any) => {
    setModuleWidth(moduleWidth)
    setUserInfo(userInfo)
    setOpen(true)
  }
  //关闭抽屉
  const closeDrawer = () => {
    setOpen(false)
    fetchData()
  }

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
                <Input placeholder="请输入用户名称" allowClear={true}/>
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
            <JudgePemission pageUrl={'/payment/userlist_131'}>
            <Col span={1}>
              <Form.Item wrapperCol={{ offset: 0, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  搜索
                </Button>
              </Form.Item>
            </Col>
            </JudgePemission>
            <JudgePemission pageUrl={'/payment/userlist_132'}>
            <Col span={1}>
              <Form.Item wrapperCol={{ offset: 0, span: 16 }}>
                <Button type="primary" style={{ marginLeft: '13px' }} onClick={() => openDrawer('378px', {})}>
                  新增用户
                </Button>
              </Form.Item>
            </Col>
            </JudgePemission>
          </Row>
        </Form>
        <Table columns={columns} dataSource={tableList} pagination={false} rowKey={(record) => record.id} />
      </div>
      <div className={styles.bottom_Pag_area}>
        <PagiNation current={page} pageSize={pageSize} total={total} loadData={loadData}/>
      </div>
      <UserListModule moduleWidth={moduleWidth} userInfo={userInfo} open={open} closeDrawer={closeDrawer}/>
    </div>
  )
};

export default UserList;
