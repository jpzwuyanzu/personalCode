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
} from "antd";
import { respMessage } from "@/utils/message";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import PagiNation from "@/components/PagiNation";
import { proxyOrderList } from "@/api/index";
import dayjs from "dayjs";
import { getRecentMounth } from "@/utils/common";
import styles from "./ProxyOrder.module.scss";

const { RangePicker } = DatePicker;

const ProxyOrder: React.FC = () => {
  const [total, setTotal] = useState<number>(0);
  const [page, setpage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [tableList, setTableList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchUserForm] = Form.useForm();

  //初始化查询时间
  const initSearchDate = () => {
    let temp: any = searchUserForm.getFieldsValue()["createTime"];
    let params: any = {};
    if (temp && temp.length) {
      params["startMs"] = new Date(temp[0]).getTime();
      params["endMs"] = new Date(temp[1]).getTime();
    }
    fetchData(params);
  };

  const onFinish = (values: any) => {
    console.log(values);
    if (values["createTime"] && values["createTime"].length) {
      values["startMs"] = new Date(values["createTime"][0]).getTime();
      values["endMs"] = new Date(values["createTime"][1]).getTime();
    } else {
      values["startMs"] = "";
      values["endMs"] = "";
    }
    fetchData(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const resetParams = () => {
    searchUserForm?.setFieldsValue({
      platformOrderId: "",
      agentId: "",
      agentName: "",
      status: 0,
      changeType: "",
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
        params["startMs"] = new Date(temp[0]).getTime();
        params["endMs"] = new Date(temp[1]).getTime();
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

  const columns: any = [
    {
      title: "代理订单号",
      dataIndex: "merchantOrderId",
      key: "merchantOrderId",
      align: "center",
      width: 200,
      fixed: "left",
      render: (text: any) => <span style={{ whiteSpace: 'nowrap' }}>{text}</span>
    },
    {
      title: "平台订单号",
      dataIndex: "platformOrderId",
      align: "center",
      width: 200,
      fixed: "left",
      key: "platformOrderId",
      render: (text: any) => <span style={{ whiteSpace: 'nowrap' }}>{text}</span>
    },
    {
      title: "用户ID",
      dataIndex: "playerId",
      align: "center",
      key: "playerId",
      with: 200
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
      render: (text: any) => text === 'WD' ? '挖洞' : '加藤'
    },
    {
      title: "订单类型",
      dataIndex: "agentName",
      align: "center",
      key: "agentName",
      with: 200,
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
      render: (text: any) => (text === 'UNION_PAY' ? '银联' : (text === 'ALI_PAY' ? '支付宝' : '微信'))
    },
    {
      title: "订单状态",
      dataIndex: "payStatus",
      align: "center",
      key: "payStatus",
      with: 200,
      render: (text: number) =>
        text === 2 ? (
          <Tag icon={<ExclamationCircleOutlined />} color="success">
            未支付
          </Tag>
        ) : text === 0 ? (
          <Tag icon={<CloseCircleOutlined />} color="error">
            待转账
          </Tag>
        ) : (
          <Tag icon={<CheckCircleOutlined />} color="success">
            已支付
          </Tag>
        ),
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      align: "center",
      key: "createTime",
      width: 180,
      fixed: "right",
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
      fixed: "right",
      render: (
        text: string | number | Date | dayjs.Dayjs | null | undefined
      ) => <>{dayjs(text).format("YYYY-MM-DD hh:mm:ss")}</>,
    },
    {
      title: "操作",
      key: "action",
      align: "center",
      width: 100,
      fixed: "right",
      render: (_: any, record: any) => (
        <Space size="middle">
          {/* <Button type="primary" onClick={() => openModal(record)}>
            充值
          </Button> */}
          {/* <JudgePemission pageUrl={"/payment/userlist_133"}> */}
          <Button type="primary" onClick={() => {}}>
            上分
          </Button>
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
  }, []);

  return (
    <div className={styles.TableCom_Container}>
      <div className={styles.Table_ContentArea}>
        <div className={styles.table_search}>
          <Form
            form={searchUserForm}
            name="basic"
            labelCol={{ span: 1 }}
            wrapperCol={{ span: 23 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            initialValues={{
              createTime: [
                dayjs(getRecentMounth()[0], "YYYY-MM-DD"),
                dayjs(getRecentMounth()[1], "YYYY-MM-DD"),
              ],
              // createTime: '',
              changeType: "",
            }}
          >
            <Row justify="start">
              <Col span={3.5}>
                <Form.Item
                  label=""
                  name="playerId"
                  rules={[{ required: false, message: "请输入用户ID!" }]}
                >
                  <Input
                    placeholder="输入用户ID"
                    allowClear={true}
                    style={{ width: "130px", margin: "0 8px" }}
                  />
                </Form.Item>
              </Col>
              <Col span={3.5}>
                <Form.Item
                  label=""
                  name="playerName"
                  rules={[{ required: false, message: "请输入用户昵称!" }]}
                >
                  <Input
                    placeholder="输入用户昵称"
                    allowClear={true}
                    style={{ width: "130px", margin: "0 8px" }}
                  />
                </Form.Item>
              </Col>
              <Col span={3.5}>
                <Form.Item
                  label=""
                  name="agentId"
                  rules={[{ required: false, message: "请输入代理ID!" }]}
                >
                  <Input
                    placeholder="输入代理ID"
                    allowClear={true}
                    style={{ width: "130px", margin: "0 8px" }}
                  />
                </Form.Item>
              </Col>
              <Col span={3.5}>
                <Form.Item
                  label=""
                  name="agentName"
                  rules={[{ required: false, message: "请输入代理昵称!" }]}
                >
                  <Input
                    placeholder="输入代理昵称"
                    allowClear={true}
                    style={{ width: "130px", margin: "0 8px" }}
                  />
                </Form.Item>
              </Col>
              <Col span={3.5}>
                <Form.Item
                  label=""
                  name="agentName"
                  rules={[{ required: false, message: "请输入订单号!" }]}
                >
                  <Input
                    placeholder="输入订单号"
                    allowClear={true}
                    style={{ width: "140px", margin: "0 8px" }}
                  />
                </Form.Item>
              </Col>
              <Col span={3.5}>
                <Form.Item
                  label=""
                  name="changeType"
                  rules={[{ required: false, message: "请选择订单状态!" }]}
                >
                  <Select
                    style={{ width: "120px", margin: "0 8px" }}
                    placeholder="请选择订单类型"
                    onChange={() => {}}
                    options={[
                      { value: "", label: "全部" },
                      { value: 1, label: "预付款缴纳" },
                      { value: 2, label: "追分" },
                      { value: 3, label: "下单" },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={3.5}>
                <Form.Item
                  label=""
                  name="changeType"
                  rules={[{ required: false, message: "请选择支付方式!" }]}
                >
                  <Select
                    style={{ width: "120px", margin: "0 8px" }}
                    placeholder="请选择订单类型"
                    onChange={() => {}}
                    options={[
                      { value: "", label: "全部" },
                      { value: 1, label: "预付款缴纳" },
                      { value: 2, label: "追分" },
                      { value: 3, label: "下单" },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={3.5}>
                <Form.Item
                  label=""
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
            scroll={{ x: 2100, y: "60vh" }}
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
