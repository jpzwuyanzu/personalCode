import React, { useState, useEffect, useCallback } from "react";
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
  DatePicker,
  Statistic,
} from "antd";
import { respMessage } from "@/utils/message";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  MinusCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import PagiNation from "@/components/PagiNation";
import { proxyOrderList, orderCallBack } from "@/api/index";
import dayjs from "dayjs";
import { getRecentMounth } from "@/utils/common";
import { useAppSelector } from '@/hooks/hooks'
import styles from "./ProxyOrder.module.scss";

const { RangePicker } = DatePicker;
const { Countdown } = Statistic;

const ProxyOrder: React.FC = () => {
  const [total, setTotal] = useState<number>(0);
  const [page, setpage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [tableList, setTableList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchUserForm] = Form.useForm();
  const userType = useAppSelector((state) => state.user.userType)

  //初始化查询时间
  const initSearchDate = () => {
    let temp: any = searchUserForm.getFieldsValue()["createTime"];
    let params: any = {};
    console.log(dayjs(new Date(temp[0])).format('YYYY-MM-DD') + ' 00:00:00')
    if (temp && temp.length) {
      params["startMs"] = new Date(dayjs(new Date(temp[0])).format('YYYY-MM-DD') + ' 00:00:00').getTime();
      params["endMs"] = new Date(dayjs(new Date(temp[1])).format('YYYY-MM-DD') + ' 23:59:59').getTime();
    }
    fetchData(params);
  };

  const onFinish = (values: any) => {
    console.log(values);
    if (values["createTime"] && values["createTime"].length) {
      values["startMs"] = new Date(dayjs(new Date(values["createTime"][0])).format('YYYY-MM-DD') + ' 00:00:00').getTime();
      values["endMs"] = new Date(dayjs(new Date(values["createTime"][1])).format('YYYY-MM-DD') + ' 23:59:59').getTime();
    } else {
      values["startMs"] = "";
      values["endMs"] = "";
    }
    setpage(1)
    fetchData({page: 1, ...values});
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const resetParams = () => {
    searchUserForm?.setFieldsValue({
      platformOrderId: "",
      merchantOrderId: "",
      agentId: "",
      agentName: "",
      playerName: "",
      status: 0,
      payStatus: "",
      payCode: "",
      createTime: [
        dayjs(getRecentMounth()[0], "YYYY-MM-DD"),
        dayjs(getRecentMounth()[1], "YYYY-MM-DD"),
      ],
    });
    let temp: any = searchUserForm.getFieldsValue()["createTime"];
    let params: any = {};
    if (temp && temp.length) {
      params["startTime"] = dayjs(new Date(temp[0]).getTime()).format(
        "YYYY-MM-DD"
      );
      params["endTime"] = dayjs(new Date(temp[1]).getTime()).format(
        "YYYY-MM-DD"
      );
    }
    fetchData(params);
  };

  const loadData = useCallback(
    (page: number, pageSize: number) => {
      setpage(page);
      setPageSize(pageSize);
      console.log(searchUserForm.getFieldsValue());
      let temp: any = searchUserForm.getFieldsValue()["createTime"];
      let params: any = {};
      if (temp && temp.length) {
        params["startMs"] = new Date(dayjs(new Date(temp[0])).format('YYYY-MM-DD') + ' 00:00:00').getTime();
        params["endMs"] = new Date(dayjs(new Date(temp[1])).format('YYYY-MM-DD') + ' 23:59:59').getTime();
      }
      fetchData({ page, pageSize, ...params });
    },
    [page, pageSize]
  );

  const fetchData = async (params?: any) => {
    setLoading(true);
    console.log({ page, pageSize, ...params })
    const data: any = await proxyOrderList({ page, pageSize, ...params });
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

  const handleCallback = async({merchantOrderId, amount, realAmount, payStatus, callbackStatus, ms, orderType, merchantId}:any) => {
    const res: any = await orderCallBack({merchantOrderId,amount,realAmount,payStatus,callbackStatus,ms,orderType, merchantId})
    console.log(res)
    if(res && res.code === 200) {
      message.open({
        type: 'success',
        content: '操作成功',
      })
    }
  }


  const columns: any = [
    {
      title: "来源订单号",
      dataIndex: "merchantOrderId",
      key: "merchantOrderId",
      align: "center",
      width: 300,
      fixed: "left",
      render: (text: any) => (
        <span style={{ whiteSpace: "nowrap" }}>{text}</span>
      ),
    },
    {
      title: "订单来源",
      dataIndex: "merchantName",
      align: "center",
      width: 100,
      // fixed: "left",
      key: "merchantName",
    },
    {
      title: "平台订单号",
      dataIndex: "platformOrderId",
      align: "center",
      width: 400,
      // fixed: "left",
      key: "platformOrderId",
      render: (text: any) => (
        <span style={{ whiteSpace: "nowrap" }}>{text}</span>
      ),
    },
    {
      title: "用户ID",
      dataIndex: "playerId",
      align: "center",
      key: "playerId",
      with: 200,
    },
    {
      title: "用户昵称",
      dataIndex: "playerName",
      align: "center",
      key: "playerName",
      with: 200,
    },
    {
      title: "代理ID",
      dataIndex: "agentId",
      align: "center",
      with: 200,
      key: "agentId",
    },
    {
      title: "代理昵称",
      dataIndex: "agentName",
      align: "center",
      with: 200,
      key: "agentName",
    },
    {
      title: "用户来源",
      dataIndex: "merchantName",
      align: "center",
      key: "merchantName",
      with: 200,
      render: (text: any) => (text === "WD" ? "挖洞" : "加藤"),
    },
    {
      title: "订单类型",
      dataIndex: "orderType",
      align: "center",
      key: "orderType",
      with: 200,
      render: (text: any) => (
        <span>
          {text === 1 ? "游戏订单" : text === 2 ? "会员订单" : "金币订单"}
        </span>
      ),
    },
    {
      title: "订单金额(¥)",
      dataIndex: "amount",
      align: "center",
      key: "amount",
      with: 200,
      render: (text: any) => (
        <span>{text ? (Number(text) / 100).toFixed(2) : "0.00"}</span>
      ),
    },
    {
      title: "实付金额(¥)",
      dataIndex: "realAmount",
      align: "center",
      key: "realAmount",
      with: 200,
      render: (text: any) => (
        <span>{text ? (Number(text) / 100).toFixed(2) : "0.00"}</span>
      ),
    },
    {
      title: "支付方式",
      dataIndex: "payCode",
      align: "center",
      key: "payCode",
      with: 200,
      render: (text: any) =>
        text === "UNION_PAY" ? "银联" : text === "ALI_PAY" ? "支付宝" : "微信",
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      align: "center",
      key: "createTime",
      width: 180,
      render: (
        text: string | number | Date | dayjs.Dayjs | null | undefined
      ) => <>{text ? dayjs(text).format("YYYY-MM-DD hh:mm:ss") : "--"}</>,
    },
    {
      title: "更新时间",
      key: "updateTime",
      align: "center",
      dataIndex: "updateTime",
      width: 180,
      render: (
        text: string | number | Date | dayjs.Dayjs | null | undefined
      ) => <>{dayjs(text).format("YYYY-MM-DD hh:mm:ss")}</>,
    },
    {
      title: "订单状态",
      dataIndex: "payStatus",
      align: "center",
      key: "payStatus",
      with: 200,
      fixed: 'right',
      render: (text: any, record: any) => {
        //payStatus:0:待支付，显示倒计时 1:已支付 2:未支付，订单超时可以关闭 3:已关闭
        let res: any = "";
        switch (text) {
          case 1:
            if (record.callbackStatus === 0) {
              res = (
                <div style={{ whiteSpace: "nowrap" }}>
                  <Tag icon={<SyncOutlined spin />} color="processing">
                    等待回调
                  </Tag>
                </div>
              );
            } else if (record.callbackStatus === 1) {
              res = (
                <div style={{ whiteSpace: "nowrap" }}>
                  <Tag icon={<CheckCircleOutlined />} color="success">
                    已完成
                  </Tag>
                </div>
              );
            } else {
              res = (
                <div style={{ whiteSpace: "nowrap" }}>
                  <Tag icon={<CloseCircleOutlined />} color="error">
                    回调失败
                  </Tag>
                </div>
              );
            }
            break;
            case 2:
            res = (
              <div style={{ whiteSpace: "nowrap" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignContent: "center",
                    justifyContent: "center",
                    color: "#52C41A",
                    fontSize: "15px",
                  }}
                >
                  进行中 (
                  <Countdown
                    value={
                      new Date(record.ms).getTime() + 1000 * 30 * 60
                    }
                    format="mm:ss"
                    valueStyle={{ fontSize: "15px", color: "#52C41A" }}
                  />
                  )
                </div>
              </div>
            );
            break;
            case 3:
            res = (
              <div style={{ whiteSpace: "nowrap" }}>
                <Tag icon={<MinusCircleOutlined />} color="default">
                  取消订单
                </Tag>
              </div>
            );
            break;
          case 4:
            res = (
              <div style={{ whiteSpace: "nowrap" }}>
                <Tag icon={<MinusCircleOutlined />} color="default">
                  已关闭
                </Tag>
              </div>
            );
            break;
          default:
            break;
        }
        return res;
      },
    },
    {
      title: "操作",
      key: "action",
      align: "center",
      width: 120,
      fixed: "right",
      render: (_: any, record: any) => (
        <Space size="middle">
          {/* <Button type="primary" onClick={() => openModal(record)}>
            充值
          </Button> */}
          {/* <JudgePemission pageUrl={"/payment/userlist_133"}> */}
          {
            (record.payStatus === 1 && record.callbackStatus === 3) ? <>
            <Button type="primary" onClick={() => handleCallback(record)}>
            手动回调
          </Button></> : '---'
          }
          
          {/* </JudgePemission> */}
          {/* <Button type="dashed" danger onClick={() => openModal(record)}>
            重置密码
          </Button> */}
          {/* <Popconfirm
              title="删除"
              description="你确认删除该用户吗?"
              onConfirm={() => confirmDelRole(record.id)}
              onCancel={() => {}}
              okText="是"
              cancelText="否"
            >
              <Button type="primary" danger>
                删除
              </Button>
            </Popconfirm> */}
        </Space>
      ),
    },
  ];

  useEffect(() => {
    initSearchDate();
    return () => {};
  }, []);

  return (
    <div className={styles.TableCom_Container}>
      <div className={styles.Table_ContentArea}>
        <div className={styles.table_search}>
          <Form
            form={searchUserForm}
            name="basic"
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 15 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            initialValues={{
              createTime: [
                dayjs(getRecentMounth()[0], "YYYY-MM-DD"),
                dayjs(getRecentMounth()[1], "YYYY-MM-DD"),
              ],
              // createTime: '',
              payStatus: "",
              payCode: ""
            }}
          >
            <Row justify="start">
              <Col span={4}>
                <Form.Item
                  label="用户ID"
                  name="playerId"
                  rules={[{ required: false, message: "请输入用户ID!" }]}
                >
                  <Input
                    placeholder="输入用户ID"
                    allowClear={true}
                  />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  label="用户昵称"
                  name="playerName"
                  rules={[{ required: false, message: "请输入用户昵称!" }]}
                >
                  <Input
                    placeholder="输入用户昵称"
                    allowClear={true}
                  />
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item
                  label="订单号"
                  name={ userType === 1 ? 'merchantOrderId' : 'platformOrderId' }
                  rules={[{ required: false, message: "请输入订单号!" }]}
                >
                  <Input
                    placeholder="输入订单号"
                    allowClear={true}
                  />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  label="订单状态"
                  name="payStatus"
                  rules={[{ required: false, message: "请选择订单状态!" }]}
                >
                  <Select
                    placeholder="订单状态"
                    onChange={() => {}}
                    options={[
                      { value: "", label: "全部" },
                      { value: 1, label: "已支付" },
                      { value: 2, label: "未支付" },
                      { value: 3, label: "已关闭" },
                    ]}
                  />
                </Form.Item>
              </Col>
            <Col span={4}>
                <Form.Item
                  label="支付方式"
                  name="payCode"
                  rules={[{ required: false, message: "请选择支付方式!" }]}
                >
                  <Select
                    placeholder="支付方式"
                    onChange={() => {}}
                    options={[
                      { value: "", label: "全部" },
                      { value: "WX_PAY", label: "微信" },
                      { value: "UNION_PAY", label: "银联" },
                      { value: "ALI_PAY", label: "支付宝" },
                    ]}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row justify="start">
              {
                 userType !== 1 && <Col span={4}>
                 <Form.Item
                   label="代理ID"
                   name="agentId"
                   rules={[{ required: false, message: "请输入代理ID!" }]}
                 >
                   <Input
                     placeholder="输入代理ID"
                     allowClear={true}
                   />
                 </Form.Item>
               </Col>
              }
              {
                userType !== 1 &&  <Col span={4}>
                <Form.Item
                  label="代理昵称"
                  name="agentName"
                  rules={[{ required: false, message: "请输入代理昵称!" }]}
                >
                  <Input
                    placeholder="输入代理昵称"
                    allowClear={true}
                  />
                </Form.Item>
              </Col>
              }
              <Col span={5}>
                <Form.Item
                  label="交易时间"
                  name="createTime"
                  rules={[{ required: false, message: "请选择交易时间!" }]}
                >
                  <RangePicker style={{ width: '250px' }}/>
                </Form.Item>
              </Col>
              {/* <JudgePemission pageUrl={'/payment/userlist_131'}> */}
              <Col span={1}>
                <Form.Item wrapperCol={{ offset: 10, span: 10 }} style={{ marginLeft: '20px' }}>
                  <Button type="primary" htmlType="submit">
                    搜索
                  </Button>
                </Form.Item>
              </Col>
              {/* </JudgePemission> */}
              {/* <JudgePemission pageUrl={'/payment/userlist_131'}> */}
              <Col span={4}>
                <Form.Item wrapperCol={{ offset: 4, span: 12 }}>
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
            rowKey={(record) => record.platformOrderId}
            scroll={{ x: 2960, y: "60vh" }}
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

export default ProxyOrder;
