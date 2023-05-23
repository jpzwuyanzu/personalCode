import React, { useState, useEffect, useCallback } from "react";
import { Space, Table, Button,Form, Input, Col, Row, message, Switch, Popconfirm,Select, Tag } from "antd";
import { respMessage } from '@/utils/message'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import type { ColumnsType } from "antd/es/table";
import PagiNation from "@/components/PagiNation";
import { upStreamChannelList, createUser, delUser } from '@/api/index'
import dayjs from "dayjs";
import ChannelModule from "./modules/ChannelModule";
import JudgePemission from "@/components/JudgePemission";
import styles from "./UpStream.module.scss";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  status: number;
}

const ChannelList: React.FC = () => {

  const [total, setTotal] = useState<number>(0);
  const [page, setpage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [tableList, setTableList] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [moduleWidth, setModuleWidth] = useState('');
  const [channelInfo, setChannelInfo] = useState({});
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

  const loadData = async(page: number, pageSize: number) => {
    setpage(page)
    setPageSize(pageSize)
    fetchData({page, pageSize})
  }
  const fetchData = async (params?: any) => {
    setLoading(true)
    const data: any = await upStreamChannelList({ page, pageSize, ...params })
    setLoading(false)
    console.log(data)
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
      title: "渠道名称",
      dataIndex: "channelName",
      key: "channelName",
      align: 'center',
      render: (text) => <span style={{ 'whiteSpace': 'nowrap' }}>{text}</span>,
      width: 180,
      fixed: 'left'
    },
    {
      title: "渠道CODE",
      dataIndex: "payCode",
      align: 'center',
      key: "payCode",
      width: 150,
    },
    {
      title: "上游商户ID",
      dataIndex: "merchantId",
      align: 'center',
      key: "merchantId",
      width: 150
    },
    {
      title: "支付类型",
      dataIndex: "payType",
      align: 'center',
      key: "payType",
      width: 150,
      render: (text: any) => {
        if(text) {  
          let tem = text.split(',');
          return tem.map((itm: any, inx: any) => <Tag key={inx} color="cyan">{itm === 'WX_PAY' ? '微信支付' : (itm === 'ALI_PAY' ? '支付宝' : '银联支付')}</Tag>)
        } else {
          return '暂无数据'
        }
      }
    },
    {
      title: "支持金额",
      dataIndex: "amountList",
      align: 'center',
      key: "amountList",
      width: 150,
      render: (text: any) => text  ? text.map((item: any, index: any) => <Tag key={index} color="green">{item}</Tag>) : <Tag  color="#f50">暂无数据</Tag>
    },
    {
      title: "支持平台",
      dataIndex: "platformType",
      align: 'center',
      key: "platformType",
      width: 150,
      render: (text: any) => {
        if(text) {  
          let tem = text.split(',');
          return tem.map((itm: any, inx: any) => <Tag key={inx} color="#2db7f5">{itm}</Tag>)
        } else {
          return '暂无数据'
        }
      }
    },
    {
      title: "支持产品",
      dataIndex: "channelMode",
      align: 'center',
      key: "channelMode",
      width: 150,
      render: (text: any) => <Tag color={ text === 0 ? 'gold' : (text === 1 ? 'orange' : 'volcano' )}>{text === 0 ? '所有产品' : (text === 1 ? '色站' : 'BC')}</Tag>
    },
    {
      title: "是否拉新",
      dataIndex: "isNew",
      align: 'center',
      key: "isNew",
      width: 150,
      render: (text: any) => <Tag color={ text === 0 ? 'purple' : '#f50' }>{text === 0 ? '是' : '否'}</Tag>
    },
    {
      title: "是否内层保护",
      dataIndex: "inside",
      align: 'center',
      key: "inside",
      width: 150,
      render: (text: any) => <Tag color={ text === 0 ? 'purple' : '#f50' }>{text === 0 ? '是' : '否'}</Tag>
    },
    {
      title: "费率",
      dataIndex: "rate",
      align: 'center',
      key: "rate",
      width: 150
    },
    {
      title: "渠道状态",
      dataIndex: "status",
      align: 'center',
      key: "status",
      width: 150,
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
      title: "最小金额",
      dataIndex: "minAmount",
      align: 'center',
      key: "minAmount",
      width: 150
    },
    {
      title: "最大金额",
      dataIndex: "maxAmount",
      align: 'center',
      key: "maxAmount",
      width: 150
    },
    {
      title: "三方账户",
      dataIndex: "merchantNo",
      align: 'center',
      key: "merchantNo",
      width: 300
    },
    {
      title: "回调IP",
      dataIndex: "callbackIp",
      align: 'center',
      key: "callbackIp",
      width: 300
    },
    
    {
      title: "创建时间",
      dataIndex: "createTime",
      align: 'center',
      key: "createTime",
      width: 180,
      render: (text) => <>{dayjs(text).format('YYYY-MM-DD hh:mm:ss')}</>
    },
    {
      title: "更新时间",
      key: "updateTime",
      align: 'center',
      dataIndex: "updateTime",
      width: 180,
      render: (text) => <>{dayjs(text).format('YYYY-MM-DD hh:mm:ss')}</>
    },
    {
      title: "操作",
      key: "action",
      align: 'center',
      fixed: 'right',
      width: 150,
      render: (_, record: any) => (
        <Space size="middle">
          <JudgePemission pageUrl={'/payment/userlist_133'}>
          <Button type="primary" onClick={() => openDrawer('378px', record)}>编辑渠道</Button>
          </JudgePemission>
          {/* <JudgePemission pageUrl={'/payment/userlist_134'}>
          <Popconfirm
            title="删除"
            description="你确认删除该用户吗?"
            onConfirm={ () => confirmDelRole(record.id) }
            onCancel={() => {}}
            okText="是"
            cancelText="否"
          >
            <Button type="primary" danger>删除渠道</Button>
          </Popconfirm>
          </JudgePemission> */}
        </Space>
      ),
    },
  ];

  //新增/编辑用户
  const openDrawer = (moduleWidth: string, channelInfo: any) => {
    setModuleWidth(moduleWidth)
    setChannelInfo(channelInfo)
    setOpen(true)
  }
  //关闭抽屉
  const closeDrawer = useCallback(() => {
    setOpen(false)
    fetchData({})
  }, [open])

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
            status: 0,
            payType: 0
            }}
        >
          <Row justify="start">
            <Col span={4}>
              <Form.Item
                label="渠道名称"
                name="channelName"
                rules={[
                  { required: false, message: "请输入渠道名称!" },
                ]}
              >
                <Input placeholder="请输入渠道名称" allowClear={true}/>
              </Form.Item>
            </Col>
            <Col span={4}>
              
              <Form.Item
                label="渠道状态"
                name="status"
                rules={[
                  { required: false, message: "请选择渠道状态!" },
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
            <Col span={4}>
            <Form.Item
                label="支付类型"
                name="payType"
                rules={[
                  { required: false, message: "请选择支付类型!" },
                ]}
              >
                <Select
                style={{ width: '100%' }}
                onChange={() => {}}
                options={[
                  { value: 0, label: '全部' },
                  { value: 'WX_PAY', label: '微信支付' },
                  { value: 'ALI_PAY', label: '支付宝' },
                  { value: 'UNION_PAY', label: '银联支付' },
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
            {/* <JudgePemission pageUrl={'/payment/userlist_132'}>
            <Col span={1}>
              <Form.Item wrapperCol={{ offset: 0, span: 16 }}>
                <Button type="primary" style={{ marginLeft: '19px' }} onClick={() => openDrawer('378px', {})}>
                  新增用户
                </Button>
              </Form.Item>
            </Col>
            </JudgePemission> */}
          </Row>
        </Form>
        <Table columns={columns} dataSource={tableList} loading={ loading }  pagination={false} rowKey={(record) => record.id} scroll={{x: 3800, y:'34vw'}}/>
      </div>
      <div className={styles.bottom_Pag_area}>
        <PagiNation current={page} pageSize={pageSize} total={total} loadData={loadData}/>
      </div>
      <ChannelModule moduleWidth={moduleWidth} channelInfo={channelInfo} open={open} closeDrawer={closeDrawer}/>
    </div>
  )
};

export default ChannelList;
