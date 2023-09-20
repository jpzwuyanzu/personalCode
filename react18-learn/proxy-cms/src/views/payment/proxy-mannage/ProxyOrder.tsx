import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import {
  Space,
  Table,
  Button,
  Form,
  Input,
  Col,
  Row,
  message,
  Select,
  Tag,
  DatePicker,
  Statistic,
  Popconfirm,
  Modal,
  InputNumber,
} from "antd";
import { respMessage } from "@/utils/message";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  MinusCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import PagiNation from "@/components/PagiNation";
import {
  proxyOrderList,
  orderCallBack,
  changeOrderStatus,
  loadTradeStatic,
  confirmReceiveMoney
} from "@/api/index";
import dayjs from "dayjs";
import { getRecentMounth } from "@/utils/common";
import { useAppSelector } from "@/hooks/hooks";
import styles from "./ProxyOrder.module.scss";
import { useAppDispatch } from "@/hooks/hooks";
import { switchChatPeopleNum } from "@/store/slices/static.slice";

const { RangePicker } = DatePicker;
const { Countdown } = Statistic;

const ProxyOrder: React.FC = () => {
  const { search } = useLocation();
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state: any) => state.user.userInfo);
  const searchParams = new URLSearchParams(search);
  const [total, setTotal] = useState<number>(0);
  const [page, setpage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [tableList, setTableList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); //确认订单
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); //修改订单
  const [editPlatOrderNum, setEditPlatOrderNum] = useState<any>(''); //平台订单号
  const [receive, setReceive] = useState<any>(undefined);
  const [actAmount, setActAmount] = useState<any>(0);
  const [cusOrderInfo, setCusOrderInfo] = useState<any>({})
  const [searchUserForm] = Form.useForm();
  const userType = useAppSelector((state) => state.user.userInfo.userType);
  let isConfirmOrderStatus = false;

  

  //初始化查询时间
  const initSearchDate = () => {
    let temp: any = searchUserForm.getFieldsValue()["createTime"];
    let params: any = {};
    if (searchParams.get("orderNo")) {
      params.merchantOrderId = searchParams.get("orderNo");
      searchUserForm?.setFieldsValue({
        merchantOrderId: searchParams.get("orderNo"),
      });
    }
    if (searchParams.get("hisUserId")) {
      params.playerId = searchParams.get("hisUserId");
      searchUserForm?.setFieldsValue({
        playerId: searchParams.get("hisUserId"),
      });
    }

    if (temp && temp.length) {
      params["startMs"] = new Date(
        dayjs(new Date(temp[0])).format("YYYY-MM-DD") + " 00:00:00"
      ).getTime();
      params["endMs"] = new Date(
        dayjs(new Date(temp[1])).format("YYYY-MM-DD") + " 23:59:59"
      ).getTime();
    }

    fetchData(params);
  };

  const onFinish = (values: any) => {
    if (values["createTime"] && values["createTime"].length) {
      values["startMs"] = new Date(
        dayjs(new Date(values["createTime"][0])).format("YYYY-MM-DD") +
          " 00:00:00"
      ).getTime();
      values["endMs"] = new Date(
        dayjs(new Date(values["createTime"][1])).format("YYYY-MM-DD") +
          " 23:59:59"
      ).getTime();
    } else {
      values["startMs"] = "";
      values["endMs"] = "";
    }
    setpage(1);
    fetchData({ page: 1, ...values });
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
      params["startMs"] = new Date(
        dayjs(new Date(temp[0])).format("YYYY-MM-DD") + " 00:00:00"
      ).getTime();
      params["endMs"] = new Date(
        dayjs(new Date(temp[1])).format("YYYY-MM-DD") + " 23:59:59"
      ).getTime();
    }
    fetchData(params);
  };

  const loadData = useCallback(
    (page: number, pageSize: number) => {
      setpage(page);
      setPageSize(pageSize);
      let temp: any = searchUserForm.getFieldsValue()["createTime"];
      let params: any = {};
      if (temp && temp.length) {
        params["startMs"] = new Date(
          dayjs(new Date(temp[0])).format("YYYY-MM-DD") + " 00:00:00"
        ).getTime();
        params["endMs"] = new Date(
          dayjs(new Date(temp[1])).format("YYYY-MM-DD") + " 23:59:59"
        ).getTime();
      }
      fetchData({ page, pageSize, ...params });
    },
    [page, pageSize]
  );

  const fetchData = async (params?: any) => {
    setLoading(true);
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

  const handleCallback = async ({
    merchantOrderId,
    amount,
    realAmount,
    payStatus,
    callbackStatus,
    ms,
    orderType,
    merchantId,
  }: any) => {
    const res: any = await orderCallBack({
      merchantOrderId,
      amount,
      realAmount,
      payStatus,
      callbackStatus,
      ms,
      orderType,
      merchantId,
    });
    if (res && res.code === 200) {
      message.open({
        type: "success",
        content: "操作成功",
      });
    }
  };

  //获取当前代理的订单信息统计
  const loadCurrentProxyStatic = async () => {
    const res: any = await loadTradeStatic({
      page: 1,
      pageSize: 10,
      startTime: dayjs(new Date()).format("YYYY-MM-DD") + " 00:00:00",
      endTime: dayjs(new Date()).format("YYYY-MM-DD") + " 23:59:59",
      agentId: userInfo.id,
    });
    if (res && res.code === 200) {
      // setProxyorderStatic(res.page.list[0]);
      dispatch(
        switchChatPeopleNum(
          res.page.list.length
            ? res.page.list[0]
            : {
                chatPeople: 0,
                totalRechargeCount: 0,
                rechargePeople: 0,
                rechargeCount: 0,
              }
        )
      );
    }
  };

  //修改订单状态,确认订单或者关闭订单
  const switchOrderStatus = async (merchantOrderId: any, payStatus: any) => {
    const res: any = await changeOrderStatus({ merchantOrderId, payStatus });
    if (res.code === 200) {
      initSearchDate();
      loadCurrentProxyStatic();
    }
  };

  //打开确认收款弹框
  const handleOpenConfirm = (item: any) => {
    setCusOrderInfo(item)
    //把订单信息赋值给支付类型和实际付款金额
    setReceive(item.payCode);
    setActAmount(Number(item.amount) / 100);
    setIsConfirmModalOpen(true);
  };

  //代理确认收款
  const handleConfirmOrder = async () => {
    console.log(cusOrderInfo)
    isConfirmOrderStatus = !isConfirmOrderStatus
    if(isConfirmOrderStatus) {
      const res: any = await confirmReceiveMoney({
        orderNo: cusOrderInfo.merchantOrderId,
        payCode: receive,
        realAmount: Number(actAmount) * 100,
      });
      if (res && res.code === 200) {
        setIsConfirmModalOpen(false);
        // setIsShowCountDown(false);
        // getCusOrderDetail(
        //   cusList[chatUserIndex]["fromUserId"],
        //   cusList[chatUserIndex]["orderNumber"]
        // );
        // loadProxyStatus();
        loadCurrentProxyStatic();
        initSearchDate();
        message.open({
          type: "success",
          content: "确认收款成功",
          className: "custom-class"
        });
      }
    }
    // switchOrderStatus(cusOrderInfo.merchantOrderId, 1);
  };

  //取消确认订单
  const handleCancelOrder = () => {
    setActAmount(0)
    setReceive(undefined)
    setIsConfirmModalOpen(false);
  };

  //打开修改订单弹框
  const handleOpenEdit = () => {
    setActAmount(0)
    setReceive(undefined)
    setEditPlatOrderNum('')
    setIsEditModalOpen(true)
  }

  //确认修改订单
  const handleEditOrder = async() => {
    const res: any = await confirmReceiveMoney({
      orderNo: editPlatOrderNum,
      payCode: receive,
      realAmount: Number(actAmount) * 100,
    });
    if (res && res.code === 200) {
      setIsEditModalOpen(false);
      // setIsShowCountDown(false);
      // getCusOrderDetail(
      //   cusList[chatUserIndex]["fromUserId"],
      //   cusList[chatUserIndex]["orderNumber"]
      // );
      // loadProxyStatus();
      loadCurrentProxyStatic();
      initSearchDate();
      message.open({
        type: "success",
        content: "确认收款成功"
      });
    }
  }

  //取消修改订单
  const handleCancelEdit = () => {
    setActAmount(0)
    setReceive(undefined)
    setEditPlatOrderNum('')
    setIsEditModalOpen(false)
  }


  const handleCloseOrder = (item: any) => {
    setCusOrderInfo(item)
    switchOrderStatus(item.merchantOrderId, 4);
  };

  const columns: any = [
    {
      title: "来源订单号",
      dataIndex: "merchantOrderId",
      key: "merchantOrderId",
      align: "center",
      width: 300,
      render: (text: any) => (
        <span style={{ whiteSpace: "nowrap" }}>{text}</span>
      ),
    },
    // {
    //   title: "用户来源",
    //   dataIndex: "merchantName",
    //   align: "center",
    //   width: 100,
    //   // fixed: "left",
    //   key: "merchantName",
    // },
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
      title: "订单状态",
      dataIndex: "payStatus",
      align: "center",
      key: "payStatus",
      with: 200,
      render: (text: any, record: any) => {
        //payStatus:0:待支付，显示倒计时 1:已支付 2:未支付，订单超时可以关闭 3:已关闭
        let res: any = "";
        switch (text) {
          case 1:
            res = (
              <div style={{ whiteSpace: "nowrap" }}>
                <Tag icon={<CheckCircleOutlined />} color="success">
                  已支付
                </Tag>
              </div>
            );
            // if (record.callbackStatus === 0) {
            //   res = (
            //     <div style={{ whiteSpace: "nowrap" }}>
            //       <Tag icon={<SyncOutlined spin />} color="processing">
            //         等待回调
            //       </Tag>
            //     </div>
            //   );
            // } else if (record.callbackStatus === 1) {
            //   res = (
            //     <div style={{ whiteSpace: "nowrap" }}>
            //       <Tag icon={<CheckCircleOutlined />} color="success">
            //         已完成
            //       </Tag>
            //     </div>
            //   );
            // } else {
            //   res = (
            //     <div style={{ whiteSpace: "nowrap" }}>
            //       <Tag icon={<CloseCircleOutlined />} color="error">
            //         回调失败
            //       </Tag>
            //     </div>
            //   );
            // }
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
                    value={new Date(record.ms).getTime() + 1000 * 30 * 60}
                    format="mm:ss"
                    valueStyle={{ fontSize: "15px", color: "#52C41A" }}
                    onChange={(val) =>
                      Number(val) === 0 &&
                      switchOrderStatus(record.merchantOrderId, 4)
                    }
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
      title: "回调状态",
      dataIndex: "callbackStatus",
      align: "center",
      key: "callbackStatus",
      with: 200,
      render: (text: any, _record: any) => {
        //payStatus:0:待支付，显示倒计时 1:已支付 2:未支付，订单超时可以关闭 3:已关闭
        let res: any = "";
        switch (text) {
          case 1:
            res = (
              <div style={{ whiteSpace: "nowrap" }}>
                <Tag icon={<CheckCircleOutlined />} color="success">
                  已回调
                </Tag>
              </div>
            );
            // if (record.callbackStatus === 0) {
            //   res = (
            //     <div style={{ whiteSpace: "nowrap" }}>
            //       <Tag icon={<SyncOutlined spin />} color="processing">
            //         等待回调
            //       </Tag>
            //     </div>
            //   );
            // } else if (record.callbackStatus === 1) {
            //   res = (
            //     <div style={{ whiteSpace: "nowrap" }}>
            //       <Tag icon={<CheckCircleOutlined />} color="success">
            //         已完成
            //       </Tag>
            //     </div>
            //   );
            // } else {
            //   res = (
            //     <div style={{ whiteSpace: "nowrap" }}>
            //       <Tag icon={<CloseCircleOutlined />} color="error">
            //         回调失败
            //       </Tag>
            //     </div>
            //   );
            // }
            break;
          case 2:
            res = (
              <div style={{ whiteSpace: "nowrap" }}>
                <Tag icon={<SyncOutlined spin />} color="processing">
                  未回调
                </Tag>
              </div>
            );
            break;
          case 3:
            res = (
              <div style={{ whiteSpace: "nowrap" }}>
                <Tag icon={<CloseCircleOutlined />} color="error">
                  回调失败
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
      title: "用户来源",
      dataIndex: "merchantName",
      align: "center",
      key: "merchantName",
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
      render: (text: any, record: any) =>  record.payStatus === 1 ? <span>{ text === "UNION_PAY" ? "银联" : text === "ALI_PAY" ? "支付宝" : "微信"}</span> : '----' ,
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      align: "center",
      key: "createTime",
      width: 180,
      render: (
        text: string | number | Date | dayjs.Dayjs | null | undefined
      ) => <>{text ? dayjs(text).format("YYYY-MM-DD HH:mm:ss") : "--"}</>,
    },
    {
      title: "更新时间",
      key: "updateTime",
      align: "center",
      dataIndex: "updateTime",
      width: 180,
      render: (
        text: string | number | Date | dayjs.Dayjs | null | undefined
      ) => <>{dayjs(text).format("YYYY-MM-DD HH:mm:ss")}</>,
    },
    {
      title: "操作",
      key: "action",
      align: "center",
      width: 250,
      fixed: "right",
      render: (_: any, record: any) => (
        <Space size="middle">
          {/* <Button type="primary" onClick={() => openModal(record)}>
            充值
          </Button> */}
          {/* <JudgePemission pageUrl={"/payment/userlist_133"}> */}

          {userInfo.userType === 1 && record.payStatus === 1 &&
            (record.callbackStatus === 2 || record.callbackStatus === 3) ?  (
              <>
                <Button type="primary" onClick={() => handleCallback(record)}>
                  手动回调
                </Button>
              </>
            ) : (record.payStatus !== 2 && '---')}
          {record.payStatus === 2 && userInfo.userType === 1 && (
            <>
              <Button type="primary" onClick={() => handleOpenConfirm(record)}>
                确认收款
              </Button>
              <Popconfirm
                title="关闭订单"
                description="确认关闭该订单吗?"
                onConfirm={() => handleCloseOrder(record)}
                onCancel={() => {}}
                okText="Yes"
                cancelText="No"
              >
                <Button type="primary" style={{ margin: "0 10px" }}>
                  关闭订单
                </Button>
              </Popconfirm>
            </>
          )}

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
    //判断是否是否带有参数
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
              payCode: "",
            }}
          >
            <Row justify="start">
              <Col span={4}>
                <Form.Item
                  label="用户ID"
                  name="playerId"
                  rules={[{ required: false, message: "请输入用户ID!" }]}
                >
                  <Input placeholder="输入用户ID" allowClear={true} />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  label="用户昵称"
                  name="playerName"
                  rules={[{ required: false, message: "请输入用户昵称!" }]}
                >
                  <Input placeholder="输入用户昵称" allowClear={true} />
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item
                  label="来源订单号"
                  name="merchantOrderId"
                  rules={[{ required: false, message: "请输入订单号!" }]}
                >
                  <Input placeholder="输入订单号" allowClear={true} />
                </Form.Item>
              </Col>
              <Col span={5}>
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
                      { value: 4, label: "已关闭" },
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
              {userType !== 1 && (
                <Col span={4}>
                  <Form.Item
                    label="代理ID"
                    name="agentId"
                    rules={[{ required: false, message: "请输入代理ID!" }]}
                  >
                    <Input placeholder="输入代理ID" allowClear={true} />
                  </Form.Item>
                </Col>
              )}
              {userType !== 1 && (
                <Col span={4}>
                  <Form.Item
                    label="代理昵称"
                    name="agentName"
                    rules={[{ required: false, message: "请输入代理昵称!" }]}
                  >
                    <Input placeholder="输入代理昵称" allowClear={true} />
                  </Form.Item>
                </Col>
              )}
              {userType !== 1 && (
                <Col span={5}>
                  <Form.Item
                    label="平台订单号"
                    name="platformOrderId"
                    rules={[{ required: false, message: "请输入订单号!" }]}
                  >
                    <Input placeholder="输入订单号" allowClear={true} />
                  </Form.Item>
                </Col>
              )}
              <Col span={5}>
                <Form.Item
                  label="交易时间"
                  name="createTime"
                  rules={[{ required: false, message: "请选择交易时间!" }]}
                >
                  <RangePicker style={{ width: "250px" }} />
                </Form.Item>
              </Col>
              {/* <JudgePemission pageUrl={'/payment/userlist_131'}> */}
              <Col span={2}>
                <Form.Item wrapperCol={{ offset: 10 }}>
                  <Button type="primary" htmlType="submit">
                    搜索
                  </Button>
                </Form.Item>
              </Col>
              {/* </JudgePemission> */}
              {/* <JudgePemission pageUrl={'/payment/userlist_131'}> */}
              <Col span={1}>
                <Form.Item wrapperCol={{ offset: 2 }}>
                  <Button type="primary" onClick={() => resetParams()}>
                    重置
                  </Button>
                </Form.Item>
              </Col>
              {
                userInfo.userType === 1 && <Col span={2}>
                <Form.Item wrapperCol={{ offset: 3 }}>
                  <Button type="primary" onClick={() => handleOpenEdit()}>
                    修改订单
                  </Button>
                </Form.Item>
              </Col>
              }
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
            scroll={{ x: 3360, y: "60vh" }}
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
      {/* 确认订单 */}
      <Modal
        width="450px"
        style={{ top: "300px" }}
        title="确认订单"
        open={isConfirmModalOpen}
        onOk={handleConfirmOrder}
        onCancel={handleCancelOrder}
      >
        <div className={styles.confirm_item}>
          <div className={styles.conLabel}>订单类型:</div>
          <div className={styles.ordContent}>
            {cusOrderInfo.orderType === 1
              ? "游戏充值"
              : cusOrderInfo.orderType === 2
              ? "会员充值"
              : "金币充值"}
          </div>
        </div>
        <div className={styles.confirm_item}>
          <div className={styles.conLabel}>订单金额:</div>
          <div className={styles.ordContent}>
            ¥{(Number(cusOrderInfo.amount) / 100).toFixed(2)}
          </div>
        </div>
        <div className={styles.confirm_item}>
          <div className={styles.conLabel}>支付方式:</div>
          <div className={styles.ordContent}>
            <Select
              placeholder="请选择支付方式"
              style={{ width: 150 }}
              onChange={(val) => setReceive(val)}
              value={receive}
              options={[
                { value: "WX_PAY", label: "微信支付" },
                { value: "ALI_PAY", label: "支付宝" },
                { value: "UNION_PAY", label: "银联支付" },
              ]}
            />
          </div>
        </div>
        <div className={styles.confirm_item}>
          <div className={styles.conLabel}>实付金额:</div>
          <div className={styles.ordContent}>
            <InputNumber
              prefix="¥"
              value={actAmount}
              style={{ width: "150px" }}
              min={0}
              placeholder="请输入实收金额"
              onChange={(val) => setActAmount(val)}
            />
          </div>
        </div>
      </Modal>
      {/* 修改订单 */}
      <Modal
        width="550px"
        style={{ top: "300px" }}
        title="修改订单"
        open={isEditModalOpen}
        onOk={handleEditOrder}
        onCancel={handleCancelEdit}
      >
        <p style={{ color: 'red',marginBottom: '10px' }}>说明：修改订单状态：是指将订单状态为【已关闭】但实际已支付的订单激活修改，订单状态修改为【已支付】并且重新上分</p>
        <div className={styles.confirm_item}>
          <div className={styles.conLabel}>来源订单号:</div>
          <div className={styles.ordContent}>
            {/* ¥{(Number(cusOrderInfo.amount) / 100).toFixed(2)} */}
            <Input
              value={editPlatOrderNum}
              style={{ width: "280px" }}
              placeholder="请输入来源订单号"
              onChange={(val) => setEditPlatOrderNum(val.target.value)}
              // onChange={(val) => console.log(val.target.value)}
            />
          </div>
        </div>
        <p style={{ color: 'red',marginBottom: '10px', paddingLeft: '140px', marginTop: '10px' }}>请选择【已关闭】状态的订单进行修改</p>
        <div className={styles.confirm_item}>
          <div className={styles.conLabel}>支付方式:</div>
          <div className={styles.ordContent}>
            <Select
              placeholder="请选择支付方式"
              style={{ width: 180 }}
              onChange={(val) => setReceive(val)}
              value={receive}
              options={[
                { value: "WX_PAY", label: "微信支付" },
                { value: "ALI_PAY", label: "支付宝" },
                { value: "UNION_PAY", label: "银联支付" },
              ]}
            />
          </div>
        </div>
        <div className={styles.confirm_item}>
          <div className={styles.conLabel}>实付金额:</div>
          <div className={styles.ordContent}>
            <InputNumber
              prefix="¥"
              value={actAmount}
              style={{ width: "180px" }}
              min={0}
              placeholder="请输入实收金额"
              onChange={(val) => setActAmount(val)}
            />
          </div>
        </div>
        <p style={{ color: 'red',marginBottom: '10px', paddingLeft: '140px', marginTop: '10px' }}>确定收款前，请确保已经收到款项</p>
      </Modal>
    </div>
  );
};

export default ProxyOrder;
