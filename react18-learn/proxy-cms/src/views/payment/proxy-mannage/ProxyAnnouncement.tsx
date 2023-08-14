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
import { loadAnoceMentList, editAnoceMent, delGamePkg } from "@/api/index";
import dayjs from "dayjs";
import ProxyAnnocementModule from "./modules/ProxyAnnocementModule";
import JudgePemission from "@/components/JudgePemission";
import styles from "./ProxyAnnouncement.module.scss";

const ProxyAnnouncement: React.FC = () => {
  const [total, setTotal] = useState<number>(0);
  const [page, setpage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [tableList, setTableList] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [moduleWidth, setModuleWidth] = useState("");
  const [anoceMentInfo, setAnoceMentInfo] = useState({});
  const [loading, setLoading] = useState<boolean>(false);
  const [searchAnoceMentInfoForm] = Form.useForm();

  const onFinish = (values: any) => {
    fetchData(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const resetParams = () => {
    searchAnoceMentInfoForm?.setFieldsValue({ status: '' });
    fetchData({});
  };

  const loadData = async (page: number, pageSize: number) => {
    setpage(page);
    setPageSize(pageSize);
    fetchData({ page, pageSize });
  };
  const fetchData = async (params?: any) => {
    setLoading(true);
    const data: any = await loadAnoceMentList({ page, pageSize, ...params });
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

  const switchAnoceMentInfoStatus = async (checked: boolean, id: any) => {
    setLoading(true);
    const resp: any = await editAnoceMent({
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
    const resp: any = await delGamePkg({ id });
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
      title: "公告ID",
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (text: any) => (
        <span style={{ whiteSpace: "nowrap" }}>{text}</span>
      ),
      width: 200,
    },
    {
      title: "公告内容",
      dataIndex: "noticeContent",
      key: "noticeContent",
      align: "center",
      render: (text: any) => (
        <div dangerouslySetInnerHTML={{ __html: text }}></div>
      ),
    },
    {
      title: "公告状态",
      dataIndex: "status",
      align: "center",
      key: "status",
      width: 200,
      render: (text: any, record: any) => (
        <>
          {/* <JudgePemission pageUrl={"/payment/gamepackage_383"} notBtn={true}> */}
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            checked={Number(text) === 1 ? true : false}
            onClick={(checked: boolean) => switchAnoceMentInfoStatus(checked, record.id)}
          />
          {/* </JudgePemission> */}
        </>
      ),
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      align: "center",
      key: "createTime",
      render: (text: any) => (
        <>{text ? dayjs(text).format("YYYY-MM-DD hh:mm:ss") : "--"}</>
      ),
    },
    {
      title: "更新时间",
      dataIndex: "updateTime",
      align: "center",
      key: "updateTime",
      render: (text: any) => (
        <>{text ? dayjs(text).format("YYYY-MM-DD hh:mm:ss") : "--"}</>
      ),
    },
    {
      title: "操作",
      key: "action",
      align: "center",
      fixed: "right",
      width: 250,
      render: (_: any, record: any) => (
        <Space size="middle">
          {/* <JudgePemission pageUrl={"/payment/gamepackage_383"}> */}
          <Button type="primary" onClick={() => openDrawer("large", record)}>
            编辑公告
          </Button>
          {/* </JudgePemission> */}
          {/* <JudgePemission pageUrl={"/payment/gamepackage_384"}>
            <Popconfirm
              title="删除"
              description="你确认删除该套餐吗?"
              onConfirm={() => confirmDelGamepkg(record.id)}
              onCancel={() => {}}
              okText="是"
              cancelText="否"
            >
              <Button type="primary" danger>
                删除套餐
              </Button>
            </Popconfirm>
          </JudgePemission> */}
        </Space>
      ),
    },
  ];

  //新增/编辑用户
  const openDrawer = (moduleWidth: string, anoceMentInfo: any) => {
    console.log(anoceMentInfo)
    setModuleWidth(moduleWidth);
    setAnoceMentInfo(anoceMentInfo);
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
            form={searchAnoceMentInfoForm}
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            initialValues={{
              status: '',
            }}
          >
            <Row justify="start">
              {/* <Col span={4}>
              <Form.Item
                label="套餐名称"
                name="title"
                rules={[{ required: false, message: "请输入套餐名称!" }]}
              >
                <Input placeholder="请输入套餐名称" allowClear={true} />
              </Form.Item>
            </Col> */}
              <Col span={4}>
                <Form.Item
                  label="公告状态"
                  name="status"
                  rules={[{ required: false, message: "请选择公告状态!" }]}
                >
                  <Select
                    style={{ width: "100%" }}
                    onChange={() => {}}
                    options={[
                      { value: '', label: "全部" },
                      { value: 1, label: "启用" },
                      { value: 2, label: "禁用" },
                    ]}
                  />
                </Form.Item>
              </Col>
              {/* <Col span={4}>
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
              {/* <JudgePemission pageUrl={'/payment/gamepackage_381'}> */}
              <Col span={1}>
                <Form.Item wrapperCol={{ offset: 0, span: 16 }}>
                  <Button type="primary" htmlType="submit">
                    搜索
                  </Button>
                </Form.Item>
              </Col>
              {/* </JudgePemission> */}
              {/* <JudgePemission pageUrl={'/payment/gamepackage_381'}> */}
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
              <Col span={1}>
                <Form.Item wrapperCol={{ offset: 0, span: 16 }}>
                  <Button
                    type="primary"
                    style={{ marginLeft: "19px" }}
                    onClick={() => openDrawer("large", {})}
                  >
                    新增公告
                  </Button>
                </Form.Item>
              </Col>
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
      <ProxyAnnocementModule
        moduleWidth={moduleWidth}
        anoceMentInfo={anoceMentInfo}
        open={open}
        closeDrawer={closeDrawer}
      />
    </div>
  );
};

export default ProxyAnnouncement;
