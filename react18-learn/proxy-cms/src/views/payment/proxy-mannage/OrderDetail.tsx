import React, { useState, useEffect, useCallback} from "react";
import {
  Space,
  Table,
  Button,
  Form,
  Input,
  Col,
  Row,
  message,
  Popconfirm,
  Select,
  Tag,
  Image,
  DatePicker
} from "antd";
import { respMessage } from "@/utils/message";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined
} from "@ant-design/icons";
import PagiNation from "@/components/PagiNation";
import { loadTradeRecord } from "@/api/index";
import dayjs from "dayjs";
import JudgePemission from "@/components/JudgePemission";
import { getRecentMounth } from '@/utils/common'
import styles from "./OrderDetail.module.scss";

const { RangePicker } = DatePicker;

const OrderDetail: React.FC = () => {
  const [total, setTotal] = useState<number>(0);
  const [page, setpage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [tableList, setTableList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchUserForm] = Form.useForm();


  //初始化查询时间
  const initSearchDate = () => {
    let temp:any = searchUserForm.getFieldsValue()['createTime'];
    let params: any = {}
    if(temp && temp.length) {
      params['startMs'] = (new Date(temp[0])).getTime();
      params['endMs'] = (new Date(temp[1])).getTime();
    }
    fetchData(params);
  }

  const onFinish = (values: any) => {
    console.log(values)
    if(values['createTime'] && values['createTime'].length) {
      values['startMs'] = (new Date(values['createTime'][0])).getTime();
      values['endMs'] = (new Date(values['createTime'][1])).getTime();
    } else {
      values['startMs'] = '';
      values['endMs'] = '';
    }
    fetchData(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const resetParams = () => {
    searchUserForm?.setFieldsValue({platformOrderId: '',agentId: '', agentName: "", status: 0, changeType: '' ,createTime: [dayjs((getRecentMounth()[0]), 'YYYY-MM-DD'), dayjs((getRecentMounth()[1]), 'YYYY-MM-DD')] });
    let temp:any = searchUserForm.getFieldsValue()['createTime'];
      let params: any = {}
      if(temp && temp.length) {
        params['startTime'] = dayjs(new Date(temp[0]).getTime()).format('YYYY-MM-DD');
        params['endTime'] = dayjs(new Date(temp[1]).getTime()).format('YYYY-MM-DD');
      }
      fetchData(params);
  };

  const loadData = useCallback(
    (page: number, pageSize: number) => {
      setpage(page);
      setPageSize(pageSize);
      console.log(searchUserForm.getFieldsValue())
      let temp:any = searchUserForm.getFieldsValue()['createTime'];
      let params: any = {}
        if(temp && temp.length) {
          params['startMs'] = (new Date(temp[0])).getTime();
          params['endMs'] = (new Date(temp[1])).getTime();
        }
      fetchData({ page, pageSize, ...params });
    },
    [page, pageSize]
  );

  const fetchData = async (params?: any) => {
    setLoading(true);
    const data: any = await loadTradeRecord({ page, pageSize, ...params });
    setLoading(false);
    if (data && data.code && data.code === 200) {
      setTableList(data.page.list ? data.page.list : []);
      setTotal(data.page.totalCount ? data.page.totalCount : 0);
    } else {
      message.open({
        type: "error",
        content: respMessage[String(data.code)],
      });
    }
  };

  const columns: any= [
    {
      title: "订单编号",
      dataIndex: "orderNo",
      key: "orderNo",
      align: "center",
      render: (text: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined) => <a>{text ? text : '--'}</a>,
    },
    {
      title: "变动前店铺余额(¥)",
      dataIndex: "beforeAmount",
      align: "center",
      key: "beforeAmount",
      render: (text: number) => <span>{text ? (Number(text) / 100).toFixed(2) : "0.00"}</span>
    },
    {
      title: "订单金额(¥)",
      dataIndex: "amount",
      align: "center",
      key: "amount",
      render: (text: any) => (
        <span>{text ? (Number(text) / 100).toFixed(2) : "0.00"}</span>
      ),
    },
    {
      title: "变动后对店铺余额(¥)",
      dataIndex: "afterAmount",
      align: "center",
      key: "afterAmount",
      render: (text: any) => (
        <span>{text ? (Number(text) / 100).toFixed(2) : "0.00"}</span>
      ),
    },
    {
      title: "订单类型",
      dataIndex: "changeType",
      align: "center",
      key: "changeType",
      render: (text: number) =>
        text === 1 ? (
          <Tag icon={<ExclamationCircleOutlined />} color="success">
            预付款缴纳
          </Tag>
        ) : (
          text === 2 ? <Tag icon={<CloseCircleOutlined />} color="error">
          追分
        </Tag> : <Tag icon={<CheckCircleOutlined />} color="success">
            下单
          </Tag>
        ),
    },
    {
      title: "代理昵称",
      dataIndex: "agentName",
      align: "center",
      key: "agentName"
    },
    {
      title: "代理ID",
      dataIndex: "agentId",
      align: "center",
      key: "agentId"
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      align: "center",
      key: "createTime",
      width: 180,
      render: (text: string | number | Date | dayjs.Dayjs | null | undefined) => <>{ text ? dayjs(text).format("YYYY-MM-DD hh:mm:ss") : '--'}</>,
    },
    // {
    //   title: "更新时间",
    //   key: "updateTime",
    //   align: "center",
    //   dataIndex: "updateTime",
    //   width: 180,
    //   render: (text: string | number | Date | dayjs.Dayjs | null | undefined) => <>{dayjs(text).format("YYYY-MM-DD hh:mm:ss")}</>,
    // },
  ];

  useEffect(() => {
    initSearchDate()
  }, []);

  return (
    <div className={styles.TableCom_Container}>
      <div className={styles.Table_ContentArea}>
        <div className={styles.table_search}>
          <Form
            form={searchUserForm}
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            initialValues={{
              createTime: [dayjs((getRecentMounth()[0]), 'YYYY-MM-DD'), dayjs((getRecentMounth()[1]), 'YYYY-MM-DD')],
              // createTime: '',
              changeType: ''
            }}
          >
            <Row justify="start">
              <Col span={3.5}>
                <Form.Item
                  label="订单号"
                  name="platformOrderId"
                  rules={[{ required: false, message: "请输入订单编号!" }]}
                >
                  <Input placeholder="请输入订单编号" allowClear={true} />
                </Form.Item>
              </Col>
              <Col span={3.5}>
                <Form.Item
                  label="代理昵称"
                  name="agentName"
                  rules={[{ required: false, message: "请输入代理昵称!" }]}
                >
                  <Input placeholder="请输入代理昵称" allowClear={true} />
                </Form.Item>
              </Col>
              <Col span={3.5}>
                <Form.Item
                  label="代理ID"
                  name="agentId"
                  rules={[{ required: false, message: "请输入代理ID!" }]}
                >
                  <Input placeholder="请输入代理ID"  allowClear={true} />
                </Form.Item>
              </Col>
              <Col span={3.5}>
                <Form.Item
                  label="类型"
                  name="changeType"
                  rules={[{ required: false, message: "请选择订单类型!" }]}
                >
                  <Select
                    style={{ width: "120px" }}
                    placeholder="请选择订单类型"
                    onChange={() => {}}
                    options={[
                      { value: '', label: "全部" },
                      { value: 1, label: "预付款缴纳" },
                      { value: 2, label: "追分" },
                      { value: 3, label: "下单" },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="交易时间"
                  name="createTime"
                  rules={[{ required: false, message: "请选择交易时间!" }]}
                >
                  <RangePicker />
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
              {/* <JudgePemission pageUrl={'/payment/userlist_131'}> */}
              <Col span={1}>
                <Form.Item wrapperCol={{ offset: 0, span: 16 }}>
                  <Button
                    type="primary"
                    style={{ marginLeft: "13px" }}
                    onClick={() => resetParams()}
                  >
                    重置
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
        <div className={styles.table_content}>
          <Table
            columns={columns}
            dataSource={tableList}
            loading={loading}
            pagination={false}
            rowKey={(record) => record.id}
            scroll={{ y: "60vh" }}
          />
        </div>
        <div className={styles.bottom_Pag_area}>
          <PagiNation
            current={page}
            pageSize={pageSize}
            total={total}
            loadData={loadData}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
