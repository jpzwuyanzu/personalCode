import React, {
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  Space,
  Table,
  Button,
  Form,
  Input,
  Col,
  Row,
  message,
  Switch,
  Popconfirm,
  Select,
  Image,
} from "antd";
import { respMessage } from "@/utils/message";
import {
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import PagiNation from "@/components/PagiNation";
import { agentReciveType, updateAgentReciveType, delAgentReciveType } from "@/api/index";
import dayjs from "dayjs";
import PaymentTypeModule from "./modules/PaymentTypeModule";
import styles from "./Paymenttype.module.scss";

const UserList: React.FC = () => {
  const [total, setTotal] = useState<number>(0);
  const [page, setpage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [tableList, setTableList] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [moduleWidth, setModuleWidth] = useState("");
  const [paymentTypeInfo, setPaymentTypeInfo] = useState({});
  const [loading, setLoading] = useState<boolean>(false);
  const [fastHeadHost, setFastHeadHost] = useState("");
  const [searchUserForm] = Form.useForm();

  const onFinish = (values: any) => {
    setpage(1)
    fetchData({page: 1, ...values});
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const resetParams = () => {
    searchUserForm?.setFieldsValue({ payName: "", payCode: "" });
    fetchData({});
  };
  const loadData = useCallback(
    (page: number, pageSize: number) => {
      setpage(page);
      setPageSize(pageSize);
      fetchData({ page, pageSize });
    },
    [page, pageSize]
  );

  const fetchData = async (params?: any) => {
    setLoading(true);
    const data: any = await agentReciveType({ page, pageSize, ...params });
    setLoading(false);
    if (data && data.code && data.code === 200) {
      setTableList(data.page.list ? data.page.list : []);
      setTotal(data.page.totalCount ? data.page.totalCount : 0);
      setFastHeadHost(data.fastUrl);
    } else {
      message.open({
        type: "error",
        content: respMessage[String(data.code)],
      });
    }
  };

  const switchUserStatus = async (checked: boolean, userId: any) => {
    setLoading(true);
    const resp: any = await updateAgentReciveType({
      id: userId,
      status: Number(Boolean(checked) ? 1 : 2),
    });
    setLoading(false);
    if (resp && resp.code && resp.code === 200) {
      message.open({
        type: "success",
        content: "修改成功",
      });
      fetchData({});
    } else {
      message.open({
        type: "error",
        content: respMessage[String(resp.code)],
      });
    }
  };

  const confirmDelRole = async (userId: any) => {
    const resp: any = await delAgentReciveType({ id: userId });
    if (resp && resp.code && resp.code === 200) {
      fetchData({});
    } else {
      message.open({
        type: "error",
        content: respMessage[String(resp.code)],
      });
    }
  };

  const columns: any = [
    // {
    //   title: "代理昵称",
    //   dataIndex: "name",
    //   key: "name",
    //   align: 'center',
    //   render: (text) => <a>{text}</a>,
    // },
    {
      title: "收款账户名称",
      dataIndex: "payName",
      key: "payName",
      align: "center",
      render: (
        text:
          | string
          | number
          | boolean
          | React.ReactElement<any, string | React.JSXElementConstructor<any>>
          | React.ReactFragment
          | React.ReactPortal
          | null
          | undefined
      ) => <span>{text}</span>,
    },
    {
      title: "收款方式",
      dataIndex: "payCode",
      align: "center",
      key: "payCode",
      render: (text: any) => (
        <span>
          {text === "WX_PAY" ? "微信" : text === "ALI_PAY" ? "支付宝" : "银联"}
        </span>
      ),
    },
    {
      title: "收款二维码",
      dataIndex: "payImage",
      align: "center",
      key: "payImage",
      render: (_text: any, record: any) => {
        let res: any = '';
        if(record.jumpType === 2) {
          res = _text
        } else {
          if(record.payCode === 'UNION_PAY') {
            res = '--'
          } else {
            res = <><Image
            width={80}
            style={{ width: "80px", height: "80px", overflow: "hidden" }}
            src={`${fastHeadHost + record.payImage}?${Date.now()}`}
            fallback="data:image/png;base64,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"
          /></>
          }
        }
        return res
      }
      ,
    },
    {
      title: "账号详情",
      align: "center",
      with: 300,
      render: (text: any) =>
        text.payCode !== "WX_PAY" ? (
          <div className={ styles.accountInfoDetail }>
            {text.payCode === "UNION_PAY" ? (
              <div className={styles.payTypeDetail}>
                <div className={styles.info_label}>银行名称: {text.bankName}</div>
              </div>
            ) : null}
            <div className={styles.payTypeDetail}>
              <div className={styles.info_label}>{text.payCode === "ALI_PAY" ? "支付宝名称:" : "持卡人名称:"} {text.bankAccount}</div>
            </div>
            <div className={styles.payTypeDetail}>
              <div className={styles.info_label}>{text.payCode === "ALI_PAY" ? "支付宝账号:" : "银行账号:"} {text.bankNo}</div>
            </div>
          </div>
        ) : (
          "--"
        ),
    },
    {
      title: "账号状态",
      dataIndex: "status",
      align: "center",
      key: "status",
      render: (text: any, record: any) => (
        <>
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            checked={Number(text) === 1 ? true : false}
            onClick={(checked: boolean) => switchUserStatus(checked, record.id)}
          />
        </>
      ),
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
      ) => <>{text ? dayjs(text).format("YYYY-MM-DD hh:mm:ss") : "--"}</>,
    },
    {
      title: "操作",
      key: "action",
      align: "center",
      // width: 30,
      render: (_: any, record: any) => (
        <Space size="middle">
          {/* <Button type="primary" onClick={() => openModal(record)}>
            充值
          </Button> */}
          {/* <JudgePemission pageUrl={"/payment/userlist_133"}> */}
            <Button type="primary" onClick={() => openDrawer("378px", record)}>
              编辑
            </Button>
          {/* </JudgePemission> */}
          {/* <Button type="dashed" danger onClick={() => openModal(record)}>
            重置密码
          </Button> */}
            <Popconfirm
              title="删除"
              description="你确认删除该收款方式吗?"
              onConfirm={() => confirmDelRole(record.id)}
              onCancel={() => {}}
              okText="是"
              cancelText="否"
            >
              <Button type="primary" danger>
                删除
              </Button>
            </Popconfirm>
        </Space>
      ),
    },
  ];


  //新增/编辑用户
  const openDrawer = (moduleWidth: string, paymentTypeInfo: any) => {
    setModuleWidth(moduleWidth);
    setPaymentTypeInfo(paymentTypeInfo.payImage ? { ...paymentTypeInfo, headImage:  paymentTypeInfo.payImage} : {...paymentTypeInfo});
    setOpen(true);
  };
  //关闭抽屉
  const closeDrawer = useCallback(() => {
    setOpen(false);
    fetchData({});
  }, [open]);

  useEffect(() => {
    fetchData({});
  }, []);

  return (
    <div className={styles.TableCom_Container}>
      <div className={styles.Table_ContentArea}>
        <div className={styles.table_search}>
          <Form
            form={searchUserForm}
            name="basic"
            labelCol={{ span: 9 }}
            wrapperCol={{ span: 15 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            initialValues={{
              payName: "",
              payCode: "",
            }}
          >
            <Row justify="start">
              <Col span={7}>
                <Form.Item
                  label="收款账号名称"
                  name="payName"
                  rules={[{ required: false, message: "请输入收款账号名称!" }]}
                >
                  <Input placeholder="请输入收款账号名称" allowClear={true} />
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item
                  label="收款方式"
                  name="payCode"
                  rules={[{ required: false, message: "请选择收款方式!" }]}
                >
                  <Select
                    style={{ width: "100%" }}
                    placeholder="请选择收款方式"
                    onChange={() => {}}
                    options={[
                      { value: "", label: "全部" },
                      { value: "UNION_PAY", label: "银联" },
                      { value: "WX_PAY", label: "微信" },
                      { value: "ALI_PAY", label: "支付宝" },
                    ]}
                  />
                </Form.Item>
              </Col>
              {/* <Col span={4}>
                <Form.Item
                  label="用户状态"
                  name="status"
                  rules={[{ required: false, message: "请选择用户状态!" }]}
                >
                  <Select
                    style={{ width: "100%" }}
                    onChange={() => {}}
                    options={[
                      { value: 0, label: "全部" },
                      { value: 1, label: "启用" },
                      { value: 2, label: "禁用" },
                    ]}
                  />
                </Form.Item>
              </Col> */}
              {/* <JudgePemission pageUrl={'/payment/userlist_131'}> */}
              <Col span={1.5}>
                <Form.Item wrapperCol={{ offset: 2, span: 16 }}>
                  <Button type="primary" htmlType="submit" style={{ marginRight: '10px' }}>
                    搜索
                  </Button>
                </Form.Item>
              </Col>
              {/* </JudgePemission> */}
              {/* <JudgePemission pageUrl={'/payment/userlist_131'}> */}
              <Col span={1.5}>
                <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
                  <Button
                    type="primary"
                    onClick={() => resetParams()}
                    style={{ marginLeft: '10px', marginRight: '10px' }}
                  >
                    重置
                  </Button>
                </Form.Item>
              </Col>
              {/* </JudgePemission> */}
              {/* <JudgePemission pageUrl={"/payment/userlist_132"}> */}
                <Col span={1.5}>
                  <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
                    <Button
                      type="primary"
                      onClick={() => openDrawer("378px", {})}
                    >
                      新增收款方式
                    </Button>
                  </Form.Item>
                </Col>
              {/* </JudgePemission> */}
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
      {
        open && <PaymentTypeModule
        moduleWidth={moduleWidth}
        paymentTypeInfo={paymentTypeInfo}
        fastHeadHost={fastHeadHost}
        open={open}
        closeDrawer={closeDrawer}
      />
      }
      
    </div>
  );
};

export default UserList;
