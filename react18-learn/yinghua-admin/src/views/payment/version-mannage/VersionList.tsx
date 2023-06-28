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
  Tag,
  Select,
} from "antd";
import { respMessage } from "@/utils/message";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import PagiNation from "@/components/PagiNation";
import { versionList, updateVersion, delSmsList } from "@/api/index";
import dayjs from "dayjs";
import VersionListModule from "./modules/VersionListModule";
import JudgePemission from "@/components/JudgePemission";
import styles from "./VersionList.module.scss";


const forceList = [
  { value: '', label: '全部' },
  { value: 0, label: "非强制" },
  { value: 1, label: "强制" },
]

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
    searchSmsInfoForm?.setFieldsValue({ forceUpdate: '', platform: '' });
    fetchData({});
  };

  const loadData = async (page: number, pageSize: number) => {
    setpage(page);
    setPageSize(pageSize);
    fetchData({ page, pageSize });
  };
  const fetchData = async (params?: any) => {
    setLoading(true);
    const data: any = await versionList({ page, pageSize, ...params });
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
    const resp: any = await updateVersion({
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
      title: "版本号",
      dataIndex: "version",
      key: "version",
      align: "center",
      fixed: "left",
      render: (text: any) => (
        <span style={{ whiteSpace: "nowrap" }}>{text}</span>
      ),
      width: 120,
    },
    {
      title: "平台",
      dataIndex: "platform",
      key: "platform",
      align: "center",
      width: 120,
      render: (text: any) => {
        let res = "";
        switch (text) {
          case 1:
            res = "IOS";
            break;
          case 2:
            res = "ADROID";
            break;
        }
        return res;
      },
    },
    {
      title: "渠道",
      dataIndex: "channelName",
      align: "center",
      key: "channelName",
      width: 120,
    },
    {
      title: "包下载地址",
      dataIndex: "download",
      align: "center",
      key: "download",
      width: 200,
      render: (text: any) => (
        <span style={{ whiteSpace: "nowrap" }}>{text}</span>
      ),
    },
    {
      title: "备用包下载地址",
      dataIndex: "backUrl",
      align: "center",
      key: "backUrl",
      width: 200,
      render: (text: any) => (
        <span style={{ whiteSpace: "nowrap" }}>{text}</span>
      ),
    },
    {
      title: "是否过审",
      dataIndex: "isPass",
      align: "center",
      key: "isPass",
      width: 100,
      render: (text: any) =>
        text === 0 ? (
          <Tag color="magenta">未过审</Tag>
        ) : (
          <Tag color="#2db7f5">已过审</Tag>
        ),
    },
    {
      title: "强制更新",
      dataIndex: "forceUpdate",
      align: "center",
      key: "forceUpdate",
      width: 100,
      render: (text: any) =>
        text === 0 ? (
          <Tag color="#108ee9">非强制</Tag>
        ) : (
          <Tag color="#f50">强制</Tag>
        ),
    },
    // {
    //   title: "状态",
    //   dataIndex: "status",
    //   align: "center",
    //   key: "status",
    //   width: 100,
    //   render: (text: any, record: any) => (
    //     <>
    //       <Switch
    //         checkedChildren={<CheckOutlined />}
    //         unCheckedChildren={<CloseOutlined />}
    //         checked={Number(text) === 1 ? true : false}
    //         onClick={(checked: boolean) => switchGameStatus(checked, record.id)}
    //       />
    //     </>
    //   ),
    // },
    {
      title: "创建时间",
      dataIndex: "createTime",
      align: "center",
      key: "createTime",
      render: (text: any) => <>{dayjs(text).format("YYYY-MM-DD")}</>,
    },
    {
      title: "更新时间",
      dataIndex: "updateTime",
      align: "center",
      key: "updateTime",
      render: (text: any) => <>{dayjs(text).format("YYYY-MM-DD")}</>,
    },
    {
      title: "操作",
      key: "action",
      align: "center",
      width: 100,
      render: (_: any, record: any) => (
        <Space size="middle">
          <JudgePemission pageUrl={"/payment/upstream_362"}>
            <Button
              type="primary"
              size="small"
              onClick={() => openDrawer("375px", record)}
            >
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
              <Button type="primary" size="small" danger>
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
              forceUpdate: '',
              platform: '',
            }}
          >
            <Row justify="start">
              {/* <Col span={4}>
                <Form.Item
                  label="平台名称"
                  name="userName"
                  rules={[{ required: false, message: "请输入平台名称!" }]}
                >
                  <Input placeholder="请输入平台名称" allowClear={true} />
                </Form.Item>
              </Col> */}
              <Col span={4}>
                <Form.Item
                  label="平台"
                  name="platform"
                >
                  <Select
                    style={{ width: "100%" }}
                    onChange={() => {}}
                    options={[
                      { value: '', label: "全部" },
                      { value: 1, label: "IOS" },
                      { value: 2, label: "ANDROID" },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  label="更新类型"
                  name="forceUpdate"
                >
                  <Select
                    style={{ width: "100%" }}
                    onChange={() => {}}
                    options={[...forceList]}
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
                  <Button
                    type="primary"
                    style={{ marginLeft: "13px" }}
                    onClick={() => resetParams()}
                  >
                    重置
                  </Button>
                </Form.Item>
              </Col>
              <JudgePemission pageUrl={"/payment/userlist_132"}>
                <Col span={1}>
                  <Form.Item wrapperCol={{ offset: 0, span: 16 }}>
                    <Button
                      type="primary"
                      style={{ marginLeft: "19px" }}
                      onClick={() => openDrawer("375px", {})}
                    >
                      新增
                    </Button>
                  </Form.Item>
                </Col>
              </JudgePemission>
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
            scroll={{ x: true, y: "34vw" }}
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
      <VersionListModule
        moduleWidth={moduleWidth}
        smsInfo={smsInfo}
        open={open}
        closeDrawer={closeDrawer}
      />
    </div>
  );
};

export default SmsList;
