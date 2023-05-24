import React, { useState, useEffect, useCallback } from "react";
import { Space, Table, Button,Form, Input, Col, Row, message, Switch, Select, Tag, Statistic } from "antd";
import { respMessage } from '@/utils/message'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import type { ColumnsType } from "antd/es/table";
import PagiNation from "@/components/PagiNation";
import { upStreamMerchant, upDateUpStreamMerchant } from '@/api/index'
// import dayjs from "dayjs";
import UpStreamModule from "./modules/UpStreamModule";
import JudgePemission from "@/components/JudgePemission";
import styles from "./UpStream.module.scss";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  status: number;
}

const UpStream: React.FC = () => {

  const [total, setTotal] = useState<number>(0);
  const [page, setpage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [tableList, setTableList] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [moduleWidth, setModuleWidth] = useState('');
  const [merchantInfo, setMerchantInfo] = useState({});
  const [loading, setLoading] = useState<boolean>(false);
  const [searchMerchantForm] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Success:", values);
    fetchData(values)
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const resetParams = () => {
    searchMerchantForm?.setFieldsValue({ 'channelName': '', status: 0, creditType: '' })
    fetchData({})
  }

  const loadData = async(page: number, pageSize: number) => {
    setpage(page)
    setPageSize(pageSize)
    fetchData({page, pageSize})
  }
  const fetchData = async (params?: any) => {
    setLoading(true)
    const data: any = await upStreamMerchant({ page, pageSize, ...params })
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

  const switchMerchantStatus = async (checked: boolean, channelId: any) => {
    setLoading(true)
    const resp: any = await upDateUpStreamMerchant({ id: channelId,  status: Number(Boolean(checked) ? 1 : 2) })
    setLoading(false)
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

  // const confirmDelChannel = async (userId: any) => {
  //   const resp: any = await delUser({ id: userId })
  //   if(resp && resp.code && resp.code === 200) {
  //     fetchData({})
  //   } else {
  //     message.open({
  //       type: 'error',
  //       content: respMessage[String(resp.code)]
  //     })
  //   }
  // }

  const columns: ColumnsType<DataType> = [
    {
      title: "商户名称",
      dataIndex: "channelName",
      key: "channelName",
      align: 'center',
      render: (text) => <span style={{ 'whiteSpace': 'nowrap' }}>{text}</span>,
      width: 150,
      fixed: 'left'
    },
    {
      title: "商户模式",
      dataIndex: "creditType",
      align: 'center',
      key: "creditType",
      width: 100,
      render: (text: any) => <Tag  color={ Number(text) === 0 ? 'cyan' : 'volcano' }>{ Number(text) === 0 ? '信用模式' : '非信用模式'  }</Tag>
    },
    {
      title: "商户状态",
      dataIndex: "status",
      align: 'center',
      key: "status",
      width: 100,
      render: (text, record: any) => (
        <>
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            checked={ Number(text) === 1 ? true : false }
            onClick={ (checked: boolean) => switchMerchantStatus(checked, record.id) }
          />
        </>
      )
    },
    {
      title: "预付金额(CNY)",
      dataIndex: "prepaidAmount",
      align: 'center',
      key: "prepaidAmount",
      width: 150,
      render: (text) => <Statistic title="" valueStyle={{ fontSize: '15px' }} value={text} />
    },
    {
      title: "每日跑款金额",
      dataIndex: "todayRunAmount",
      align: 'center',
      key: "todayRunAmount",
      width: 150,
      render: (text) => <Statistic title="" valueStyle={{ fontSize: '15px' }} value={text} />
    },
    {
      title: "总付款金额",
      dataIndex: "totalSuccessAmount",
      align: 'center',
      key: "totalSuccessAmount",
      width: 150,
      render: (text) => <Statistic title="" valueStyle={{ fontSize: '15px' }} value={text} />
    },
    {
      title: "总费用",
      dataIndex: "totalFee",
      align: 'center',
      key: "totalFee",
      width: 150,
      render: (text) => <Statistic title="" valueStyle={{ fontSize: '15px' }} value={text} />
    },
    {
      title: "总成功单数",
      dataIndex: "totalSuccessOrder",
      align: 'center',
      key: "totalSuccessOrder",
      width: 150,
      render: (text) => <Statistic title="" valueStyle={{ fontSize: '15px' }} value={text} />
    },
    {
      title: "总订单数",
      dataIndex: "totalOrder",
      align: 'center',
      key: "totalOrder",
      width: 150,
      render: (text) => <Statistic title="" valueStyle={{ fontSize: '15px' }} value={text} />
    },
    {
      title: "总金额",
      dataIndex: "totalAmount",
      align: 'center',
      key: "totalAmount",
      width: 150,
      render: (text) => <Statistic title="" valueStyle={{ fontSize: '15px' }} value={text} />
    },
    {
      title: "操作",
      key: "action",
      align: 'center',
      fixed: 'right',
      width: 150,
      render: (_, record: any) => (
        <Space size="middle">
          <JudgePemission pageUrl={'/payment/channellist_361'}>
          <Button type="primary" onClick={() => openDrawer('375px', record)}>编辑商户</Button>
          </JudgePemission>
          {/* <JudgePemission pageUrl={'/payment/userlist_134'}>
          <Popconfirm
            title="删除"
            description="你确认删除该用户吗?"
            onConfirm={ () => confirmDelChannel(record.id) }
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
  const openDrawer = (moduleWidth: string, merchantInfo: any) => {
    setModuleWidth(moduleWidth)
    setMerchantInfo(merchantInfo)
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
          form={searchMerchantForm}
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          initialValues={{
            status: 0,
            creditType: ''
            }}
        >
          <Row justify="start">
            <Col span={4}>
              <Form.Item
                label="商户名称"
                name="channelName"
                rules={[
                  { required: false, message: "请输入商户名称!" },
                ]}
              >
                <Input placeholder="请输入商户名称" allowClear={true}/>
              </Form.Item>
            </Col>
            <Col span={4}>
              
              <Form.Item
                label="商户状态"
                name="status"
                rules={[
                  { required: false, message: "请选择商户状态!" },
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
                label="商户模式"
                name="creditType"
                rules={[
                  { required: false, message: "请选择支付类型!" },
                ]}
              >
                <Select
                style={{ width: '100%' }}
                onChange={() => {}}
                options={[
                  { value: '', label: '全部' },
                  { value: 0, label: '信用模式' },
                  { value: 1, label: '非信用模式' },
                ]}
              />
              </Form.Item>
            </Col>
            {/* <JudgePemission pageUrl={'/payment/userlist_131'}> */}
            <Col span={1}>
              <Form.Item wrapperCol={{ offset: 0, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  搜索
                </Button>
              </Form.Item>
            </Col>
            {/* </JudgePemission> */}
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
                <Button type="primary" style={{ marginLeft: '19px' }} onClick={() => openDrawer('375px', {})}>
                  新增商户
                </Button>
              </Form.Item>
            </Col>
            </JudgePemission> */}
          </Row>
        </Form>
        <Table columns={columns} dataSource={tableList} loading={ loading }  pagination={false} rowKey={(record) => record.id} scroll={{ y:'34vw'}}/>
      </div>
      <div className={styles.bottom_Pag_area}>
        <PagiNation current={page} pageSize={pageSize} total={total} loadData={loadData}/>
      </div>
      <UpStreamModule moduleWidth={moduleWidth} merchantInfo={merchantInfo} open={open} closeDrawer={closeDrawer}/>
    </div>
  )
};

export default UpStream;
