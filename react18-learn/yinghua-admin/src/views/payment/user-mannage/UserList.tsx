import React, { useState, useEffect, useCallback } from "react";
import { Space, Table, Button,Form, Input, Col, Row, message, Switch, Popconfirm,Select } from "antd";
import { respMessage } from '@/utils/message'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import type { ColumnsType } from "antd/es/table";
import PagiNation from "@/components/PagiNation";
import { userList, createUser, delUser } from '@/api/index'
import dayjs from "dayjs";
import UserListModule from "./modules/UserListModule";
import ResetPassModal from '../../../components/ResetPassModal';
import JudgePemission from "@/components/JudgePemission";
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
  const [loading, setLoading] = useState<boolean>(false);
  const [modalStatus, setModalStatus] = useState(false);
  const [searchUserForm] = Form.useForm();


  const onFinish = (values: any) => {
    console.log("Success:", values);
    fetchData(values)
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const resetParams = () => {
    searchUserForm?.setFieldsValue({ 'username': '', status: 0 })
    fetchData({})
  }
  const loadData = useCallback((page: number, pageSize: number) => {
    setpage(page)
    setPageSize(pageSize)
    fetchData({ page, pageSize })
  }, [page, pageSize])


  const fetchData = async (params?: any) => {
    setLoading(true)
    const data: any = await userList({ page, pageSize, ...params })
    setLoading(false)
    if(data && data.code && data.code === 200) {
      setTableList(data.page.list ? data.page.list : []);
      setTotal(data.page.totalCount ? data.page.totalCount : 0);
    } else {
      message.open({
        type: 'error',
        content: respMessage[String(data.code)]
      })
    }
  }

  const switchUserStatus = async (checked: boolean, userId: any) => {
    const resp: any = await createUser({ id:userId,  status: Number(Boolean(checked) ? 1 : 2) })
    if(resp && resp.code && resp.code === 200) {
      message.open({
        type: 'success',
        content: '修改成功'
      })
      fetchData({})
    } else {
      message.open({
        type: 'error',
        content: respMessage[String(resp.code)]
      })
    }
  }

  const confirmDelRole = async (userId: any) => {
    const resp: any = await delUser({ id: userId })
    if(resp && resp.code && resp.code === 200) {
      fetchData({})
    } else {
      message.open({
        type: 'error',
        content: respMessage[String(resp.code)]
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
            checked={ Number(text) === 1 ? true : false }
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
          </JudgePemission>
          <Button type="dashed" danger onClick={() => openModal(record)}>重置密码</Button>
          <JudgePemission pageUrl={'/payment/userlist_134'}>
          <Popconfirm
            title="删除"
            description="你确认删除该用户吗?"
            onConfirm={ () => confirmDelRole(record.id) }
            onCancel={() => {}}
            okText="是"
            cancelText="否"
          >
            <Button type="primary" danger>删除用户</Button>
          </Popconfirm>
          </JudgePemission>
        </Space>
      ),
    },
  ];

  //新增/编辑用户
  const openDrawer = (moduleWidth: string, userInfo: any) => {
    setModuleWidth(moduleWidth)
    setUserInfo(userInfo)
    setOpen(true)
  }
  //关闭抽屉
  const closeDrawer = useCallback(() => {
    setOpen(false)
    fetchData({})
  }, [open])
  
  //打开重置密码
  const openModal = useCallback((userInfo: any)=> {
    setUserInfo(userInfo)
    setModalStatus(true)
  }, [modalStatus])

  //关闭重置密码
  const closeModal = useCallback( () => {
    setModalStatus(false)
    fetchData({})
  }, [modalStatus])

  useEffect( () => {
    fetchData({})
  }, [])

  return (
    <div className={styles.TableCom_Container}>
      <div className={styles.Table_ContentArea}>
        <Form
          form={searchUserForm}
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          initialValues={{
            status: 0
            }}
        >
          <Row justify="start">
            <Col span={4}>
              <Form.Item
                label="用户账号"
                name="username"
                rules={[
                  { required: false, message: "请输入用户账号!" },
                ]}
              >
                <Input placeholder="请输入用户名称" allowClear={true}/>
              </Form.Item>
            </Col>
            <Col span={4}>
              
              <Form.Item
                label="用户状态"
                name="status"
                rules={[
                  { required: false, message: "请选择用户状态!" },
                ]}
              >
                <Select
                style={{ width: '100%' }}
                onChange={() => {}}
                options={[
                  { value: 0, label: '全部' },
                  { value: 1, label: '启用' },
                  { value: 2, label: '禁用' },
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
            <Col span={1}>
              <Form.Item wrapperCol={{ offset: 0, span: 16 }}>
                <Button type="primary" style={{ marginLeft: '13px', }} onClick={() => resetParams()}>
                  重置
                </Button>
              </Form.Item>
            </Col>
            <JudgePemission pageUrl={'/payment/userlist_132'}>
            <Col span={1}>
              <Form.Item wrapperCol={{ offset: 0, span: 16 }}>
                <Button type="primary" style={{ marginLeft: '19px' }} onClick={() => openDrawer('378px', {})}>
                  新增用户
                </Button>
              </Form.Item>
            </Col>
            </JudgePemission>
          </Row>
        </Form>
        <Table columns={columns} dataSource={tableList} loading={ loading }  pagination={false} rowKey={(record) => record.id} />
      </div>
      {
        tableList && tableList.length ? ( <div className={styles.bottom_Pag_area}>
          <PagiNation current={page} pageSize={pageSize} total={total} loadData={loadData}/>
        </div>) : null
      }
     
      <UserListModule moduleWidth={moduleWidth} userInfo={userInfo} open={open} closeDrawer={closeDrawer}/>
      <ResetPassModal  open={modalStatus} userInfo={userInfo} closeModal={closeModal} isTop={false}/>
    </div>
  )
};

export default UserList;
