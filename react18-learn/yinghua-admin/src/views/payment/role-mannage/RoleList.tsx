import React, { useState, useEffect, useCallback } from "react";
import { Space, Table, Button,Form, Input, Col, Row, message, Switch, Popconfirm, Select } from "antd";
import { respMessage } from '@/utils/message'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import type { ColumnsType } from "antd/es/table";
import PagiNation from "@/components/PagiNation";
import { loadRoleList, editRole, delRole } from '@/api/index'
import JudgePemission from "@/components/JudgePemission";
import dayjs from "dayjs";
import RoleListModule from "./modules/RoleListModule";
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
  const [open, setOpen] = useState(false);
  const [moduleWidth, setModuleWidth] = useState('');
  const [roleInfo, setRoleInfo] = useState({});
  const [loading, setLoading] = useState<boolean>(false);
  
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const loadData = useCallback((page: number, pageSize: number) => {
    setpage(page)
    setPageSize(pageSize)
    fetchData({page, pageSize})
  }, [page, pageSize])
  const fetchData = async (params:any) => {
    setLoading(true)
    const data: any = await loadRoleList({ page, pageSize, ...params})
    setLoading(false)
    if(data.code && data.code === 200) {
      setTableList(data.page.list ? data.page.list : []);
      setTotal(data.page.totalCount ? data.page.totalCount : 0);
    } else {
      message.open({
        type: 'error',
        content: respMessage[String(data.code)]
      })
    }
  }

  const switchRoleStatus = async (checked: boolean, roleId: any) => {
    setLoading(true)
    const resp: any = await editRole({ id:roleId,  status: Number(Boolean(checked)) })
    setLoading(false)
    if(resp.code && resp.code === 200) {
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

  const confirmDelRole = async (roleId: any) => {
    const resp: any = await delRole({ id: roleId })
    if(resp.code && resp.code === 200) {
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
            disabled
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
          <JudgePemission pageUrl={'/payment/rolelist_123'}>
          <Button type="primary" onClick={() => openDrawer('378px', record)}>编辑角色</Button>
          </JudgePemission>
          <JudgePemission pageUrl={'/payment/rolelist_124'}>
          <Popconfirm
            title="删除"
            description="你确认要删除该角色, 以及属于该角色的所有用户吗?"
            onConfirm={ () => confirmDelRole(record.id) }
            onCancel={() => {}}
            okText="是"
            cancelText="否"
          >
            <Button type="primary" danger>删除角色</Button>
          </Popconfirm>
          </JudgePemission>
        </Space>
      ),
    },
  ];

  useEffect( () => {
    fetchData({})
  }, [])

  //新增/编辑角色
  const openDrawer = useCallback((moduleWidth: string, roleInfo: any) => {
    setModuleWidth(moduleWidth)
    setRoleInfo(roleInfo)
    setOpen(true)
  }, [open])
  //关闭抽屉
  const closeDrawer = useCallback(() => {
    setOpen(false)
    fetchData({})
  }, [open])

  return (
    <div className={styles.TableCom_Container}>
      <div className={styles.Table_ContentArea}>
       <div className={styles.table_search}>
       <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
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
            {/* <JudgePemission pageUrl={'/payment/rolelist_121'}> */}
            <Col span={1}>
              <Form.Item wrapperCol={{ offset: 0, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  搜索
                </Button>
              </Form.Item>
            </Col>
            {/* </JudgePemission> */}
            {/* <JudgePemission pageUrl={'/payment/rolelist_122'}> */}
            <Col span={1}>
              <Form.Item wrapperCol={{ offset: 0, span: 16 }}>
                <Button type="primary" style={{ marginLeft: '13px' }} onClick={() => openDrawer('378px', {})}>
                  新增角色
                </Button>
              </Form.Item>
            </Col>
            {/* </JudgePemission> */}
          </Row>
        </Form>
       </div>
       <div className={styles.table_content}>
       <Table columns={columns} dataSource={tableList} loading={loading} pagination={false} rowKey={(record) => record.id} />
       </div>
       {
        tableList && tableList.length ? ( <div className={styles.bottom_Pag_area}>
          <PagiNation current={page} pageSize={pageSize} total={total} loadData={loadData}/>
        </div>) : null
      }
      </div>
      <RoleListModule  moduleWidth={moduleWidth} roleInfo={roleInfo} open={open} closeDrawer={closeDrawer}/>
    </div>
  )
};

export default RoleList;
