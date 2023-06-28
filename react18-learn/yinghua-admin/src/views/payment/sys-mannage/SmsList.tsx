import React, {
  useEffect,
  useState,
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
} from "antd";
import { respMessage } from "@/utils/message";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import PagiNation from "@/components/PagiNation";
import { smsList, switchSmsStatus, delSmsList } from "@/api/index";
import dayjs from "dayjs";
import SmsListModule from "./modules/SmsListModule";
import JudgePemission from "@/components/JudgePemission";
import styles from "./SmsList.module.scss";


const SmsList: React.FC = () => {
  const [total, setTotal] = useState<number>(0);
  const [page, setpage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [tableList, setTableList] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [moduleWidth, setModuleWidth] = useState("");
  const [smsInfo, setSmsInfo] = useState({});
  const [loading, setLoading] = useState<boolean>(false);
  const [searchSmsInfoForm] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Success:", values);
    fetchData(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const resetParams = () => {
    searchSmsInfoForm?.setFieldsValue({ userName: "" });
    fetchData({});
  };

  const loadData = async (page: number, pageSize: number) => {
    setpage(page);
    setPageSize(pageSize);
    fetchData({ page, pageSize });
  };
  const fetchData = async (params?: any) => {
    setLoading(true);
    const data: any = await smsList({ page, pageSize, ...params });
    setLoading(false);
    console.log(data);
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

  const switchGameStatus = async (checked: boolean, id: any) => {
    setLoading(true);
    const resp: any = await switchSmsStatus({
      id: id,
      status: Number(Boolean(checked) ? 1 : 2)
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

  const confirmDelGamepkg = async (id: any) => {
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
      title: "平台名称",
      dataIndex: "userName",
      key: "userName",
      align: "center",
      render: (text: any) => (
        <span style={{ whiteSpace: "nowrap" }}>{text}</span>
      ),
      width: 200,
    },
    {
      title: "短信账号",
      dataIndex: "userId",
      key: "userId",
      align: "center",
      width: 200
    },
    {
      title: "网关地址",
      dataIndex: "getaway",
      align: "center",
      key: "getaway",
      width: 200
    },
    {
      title: "状态",
      dataIndex: "status",
      align: "center",
      key: "status",
      width: 130,
      render: (text: any, record: any) => (
        <>
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            checked={Number(text) === 1 ? true : false}
            onClick={(checked: boolean) => switchGameStatus(checked, record.id)}
          />
        </>
      ),
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      align: "center",
      key: "createTime",
      render: (text: any) => <>{dayjs(text).format("YYYY-MM-DD hh:mm:ss")}</>,
    },
    {
      title: "更新时间",
      dataIndex: "updateTime",
      align: "center",
      key: "updateTime",
      render: (text: any) => <>{dayjs(text).format("YYYY-MM-DD hh:mm:ss")}</>,
    },
    {
      title: "操作",
      key: "action",
      align: "center",
      fixed: "right",
      width: 250,
      render: (_: any, record: any) => (
        <Space size="middle">
          <JudgePemission pageUrl={"/payment/upstream_362"}>
            <Button type="primary" onClick={() => openDrawer("375px", record)}>
              编辑
            </Button>
          </JudgePemission>
          <JudgePemission pageUrl={"/payment/userlist_134"}>
            <Popconfirm
              title="删除"
              description="你确认删除该配置吗?"
              onConfirm={() => confirmDelGamepkg(record.id)}
              onCancel={() => {}}
              okText="是"
              cancelText="否"
            >
              <Button type="primary" danger>
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
          form={searchSmsInfoForm}
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          initialValues={{
            status: 0,
            creditType: "",
          }}
        >
          <Row justify="start">
            <Col span={4}>
              <Form.Item
                label="平台名称"
                name="userName"
                rules={[{ required: false, message: "请输入平台名称!" }]}
              >
                <Input placeholder="请输入平台名称" allowClear={true} />
              </Form.Item>
            </Col>
            {/* <Col span={4}>
        
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
      </Col> */}
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
                <Button
                  type="primary"
                  style={{ marginLeft: "13px" }}
                  onClick={() => resetParams()}
                >
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
       </div>
        <div className={styles.table_content}>
        <Table
          rowClassName={() => "editable-row"}
          columns={columns}
          dataSource={tableList}
          loading={loading}
          pagination={false}
          rowKey={(record) => record.id}
          scroll={{ x: true,y: "34vw" }}
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
      <SmsListModule
        moduleWidth={moduleWidth}
        smsInfo={smsInfo}
        open={open}
        closeDrawer={closeDrawer}
      />
    </div>
  );
};

export default SmsList;
