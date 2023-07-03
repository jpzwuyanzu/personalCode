import React, { useEffect, useState, useCallback } from "react";
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
} from "antd";
import { respMessage } from "@/utils/message";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import PagiNation from "@/components/PagiNation";
import {
  switchSmsStatus,
  delSmsList,
  laodPreUserList,
} from "@/api/index";
import dayjs from "dayjs";
import PreUserListModule from "./modules/PreUserListModule";
import JudgePemission from "@/components/JudgePemission";
import styles from "./PreUserList.module.scss";

const PreUserList: React.FC = () => {
  const [total, setTotal] = useState<number>(0);
  const [page, setpage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [tableList, setTableList] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [moduleWidth, setModuleWidth] = useState("");
  const [smsInfo, setSmsInfo] = useState({});
  const [loading, setLoading] = useState<boolean>(false);
  const [searchPreUserListForm] = Form.useForm();

  const onFinish = (values: any) => {
    fetchData(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const resetParams = () => {
    searchPreUserListForm?.setFieldsValue({
      userName: "",
      platform: "",
      status: "",
    });
    fetchData({});
  };

  const loadData = async (page: number, pageSize: number) => {
    setpage(page);
    setPageSize(pageSize);
    fetchData({ page, pageSize });
  };
  const fetchData = async (params?: any) => {
    setLoading(true);
    const data: any = await laodPreUserList({ page, pageSize, ...params });
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

  const switchPreUserStatus = async (checked: boolean, id: any) => {
    setLoading(true);
    const resp: any = await switchSmsStatus({
      id: id,
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

  const confirmDelPreUser = async (id: any) => {
    const resp: any = await delSmsList({ id });
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
    {
      title: "用户昵称",
      dataIndex: "userName",
      key: "userName",
      align: "center",
      render: (text: any) => (
        <span style={{ whiteSpace: "nowrap" }}>{text}</span>
      ),
      width: 150,
      fixed: "left",
    },
    {
      title: "用户ID",
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (text: any) => (
        <span style={{ whiteSpace: "nowrap" }}>{text}</span>
      ),
      width: 100,
      fixed: "left",
    },
    {
      title: "电话号码",
      dataIndex: "phone",
      key: "phone",
      align: "center",
      width: 150,
    },
    {
      title: "注册平台",
      dataIndex: "platform",
      align: "center",
      key: "platform",
      width: 150,
      render: (text: any) => (
        Number(text) === 1 ? 'IOS' : 'ANDROID'
      )
    },
    {
      title: "状态",
      dataIndex: "status",
      align: "center",
      key: "status",
      width: 130,
      render: (text: any, record: any) => (
        <>
          <JudgePemission pageUrl={"/payment/smslist_378"} notBtn={true}>
            <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              checked={Number(text) === 1 ? true : false}
              onClick={(checked: boolean) =>
                switchPreUserStatus(checked, record.id)
              }
            />
          </JudgePemission>
        </>
      ),
    },
    {
      title: "渠道号",
      dataIndex: "channel",
      align: "center",
      key: "channel",
      width: 100,
    },
    {
      title: "注册IP",
      dataIndex: "registerIp",
      align: "center",
      key: "registerIp",
      width: 150,
    },
    {
      title: "登录IP",
      dataIndex: "loginIp",
      align: "center",
      key: "loginIp",
      width: 150,
    },
    {
      title: "首充金额",
      dataIndex: "firstCharge",
      align: "center",
      key: "firstCharge",
      width: 130,
      render: (text: any) => (
       (Number(text)/100).toFixed(2)
      )
    },
    {
      title: "总充金额",
      dataIndex: "totalCharge",
      align: "center",
      key: "totalCharge",
      width: 130,
      render: (text: any) => (
        (Number(text)/100).toFixed(2)
       )
    },
    {
      title: "首次提现",
      dataIndex: "firstWithdrawal",
      align: "center",
      key: "firstWithdrawal",
      width: 130,
      render: (text: any) => (
        (Number(text)/100).toFixed(2)
       )
    },
    {
      title: "总提现",
      dataIndex: "totalWithdrawal",
      align: "center",
      key: "totalWithdrawal",
      width: 130,
      render: (text: any) => (
        (Number(text)/100).toFixed(2)
       )
    },
    {
      title: "扣量原渠道",
      dataIndex: "oldChannel",
      align: "center",
      key: "oldChannel",
      width: 130,
    },

    {
      title: "创建时间",
      dataIndex: "createTime",
      align: "center",
      key: "createTime",
      width: 180,
      render: (text: any) => <>{dayjs(text).format("YYYY-MM-DD hh:mm:ss")}</>,
    },
    {
      title: "更新时间",
      dataIndex: "updateTime",
      align: "center",
      key: "updateTime",
      width: 180,
      render: (text: any) => <>{dayjs(text).format("YYYY-MM-DD hh:mm:ss")}</>,
    },
    {
      title: "操作",
      key: "action",
      align: "center",
      fixed: "right",
      width: 180,
      render: (_: any, record: any) => (
        <Space size="middle">
          <JudgePemission pageUrl={"/payment/smslist_379"}>
            <Button
              type="primary"
              size="small"
              onClick={() => openDrawer("375px", record)}
            >
              编辑
            </Button>
          </JudgePemission>
          <JudgePemission pageUrl={"/payment/smslist_380"}>
            <Popconfirm
              title="删除"
              description="你确认删除该配置吗?"
              onConfirm={() => confirmDelPreUser(record.id)}
              onCancel={() => {}}
              okText="是"
              cancelText="否"
            >
              <Button size="small" type="primary" danger>
                删除
              </Button>
            </Popconfirm>
          </JudgePemission>
        </Space>
      ),
    },
  ];

  //新增/编辑用户
  const openDrawer = (moduleWidth: string, smsInfo: any) => {
    setModuleWidth(moduleWidth);
    setSmsInfo(smsInfo);
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
            form={searchPreUserListForm}
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            initialValues={{
              status: "",
              userName: "",
              platform: "",
            }}
          >
            <Row justify="start">
              <Col span={4}>
                <Form.Item
                  label="昵称"
                  name="userName"
                  rules={[{ required: false, message: "请输入用户昵称!" }]}
                >
                  <Input placeholder="请输入用户昵称" allowClear={true} />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  label="平台"
                  name="platform"
                  rules={[{ required: false, message: "请选择注册平台!" }]}
                >
                  <Select
                    style={{ width: "100%" }}
                    onChange={() => {}}
                    options={[
                      { value: "", label: "全部" },
                      { value: 1, label: "IOS" },
                      { value: 2, label: "ANDROID" },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  label="状态"
                  name="status"
                  rules={[{ required: false, message: "请选择用户状态!" }]}
                >
                  <Select
                    style={{ width: "100%" }}
                    onChange={() => {}}
                    options={[
                      { value: "", label: "全部" },
                      { value: 1, label: "启用" },
                      { value: 2, label: "禁用" },
                    ]}
                  />
                </Form.Item>
              </Col>
              {/* <JudgePemission pageUrl={'/payment/smslist_386'}> */}
              <Col span={1}>
                <Form.Item wrapperCol={{ offset: 0, span: 16 }}>
                  <Button type="primary" htmlType="submit">
                    搜索
                  </Button>
                </Form.Item>
              </Col>
              {/* </JudgePemission> */}
              {/* <JudgePemission pageUrl={'/payment/smslist_386'}> */}
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
              {/* </JudgePemission> */}
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
        </div>
        <div className={styles.table_content}>
          <Table
            rowClassName={() => "editable-row"}
            columns={columns}
            dataSource={tableList}
            loading={loading}
            pagination={false}
            rowKey={(record) => record.id}
            scroll={{ x: 1800, y: "34vw" }}
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
      <PreUserListModule
        moduleWidth={moduleWidth}
        smsInfo={smsInfo}
        open={open}
        closeDrawer={closeDrawer}
      />
    </div>
  );
};

export default PreUserList;
