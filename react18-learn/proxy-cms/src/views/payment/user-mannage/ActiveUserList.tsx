import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Form,
  Input,
  Col,
  Row,
  message,
  Select,
  Radio,
  DatePicker
} from "antd";
import type { RadioChangeEvent } from 'antd';
import { respMessage } from "@/utils/message";
import PagiNation from "@/components/PagiNation";
import { laodActiveUserList } from "@/api/index";
import dayjs from "dayjs";
import styles from "./PreUserList.module.scss";


const { RangePicker } = DatePicker;


const ActiveUserList: React.FC = () => {
  const [total, setTotal] = useState<number>(0);
  const [page, setpage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [tableList, setTableList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [mode, setMode] = useState<any>('rate');
  const [dataModel, setDataModel] = useState<any>(0);
  const [searchPreUserListForm] = Form.useForm();

  const onFinish = (values: any) => {
    values.startTime = values['filterDate'] ? dayjs(values['filterDate'][0]).format("YYYY-MM-DD") : '';
    values.endTime = values['filterDate'] ? dayjs(values['filterDate'][1]).format("YYYY-MM-DD") : '';
    fetchData({ startTime: values.startTime, endTime: values.endTime, channel: values.channel, platform: values.platform });
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
    const data: any = await laodActiveUserList({ page, pageSize, ...params });
    setLoading(false);
    if (data && data.code && data.code === 200) {
      setTableList(data.data.list ? data.data.list : []);
      setTotal(data.data.list ? data.data.list.length : 0);
    } else {
      message.open({
        type: "error",
        content: respMessage[String(data.code)],
      });
    }
  };
  const setRetentionRate = (info: any, day: number) =>  {
    let result: any = null;
    if (!day) {
      result = '0%';
      return result;
    }
    if (!dataModel) {
      if (info.userCount) {
        result = `${parseFloat(String((day / info.userCount) * 100)).toFixed(2)}%`;
      } else {
        result = '0%';
      }
    } else {
      if (info.loginCount) {
        result = `${parseFloat(String((day / info.loginCount) * 100)).toFixed(2)}%`;
      } else {
        result = '0%';
      }
    }
    return result;
  }

  const columns: any = [
    {
      title: "日期",
      dataIndex: "registerDate",
      key: "registerDate",
      align: "center",
      render: (text: any) => <>{dayjs(text).format("YYYY-MM-DD")}</>,
      width: 150,
      fixed: "left",
    },
    {
      title:  dataModel === 0 ?  "新增用户" : "活跃用户",
      dataIndex: dataModel === 0 ? "registerCount" : "loginCount",
      key: dataModel === 0 ? "registerCount" : "loginCount",
      align: "center",
      width: 100,
    },
    {
      title: "1天后",
      dataIndex: "loginCountDay1",
      key: "loginCountDay1",
      align: "center",
      width: 150,
      render: (text: any, record: any) =>  mode === 'rate' ?  setRetentionRate(record, text) : text
    },
    {
      title: "2天后",
      dataIndex: "loginCountDay2",
      align: "center",
      key: "loginCountDay2",
      width: 150,
      render: (text: any, record: any) =>  mode === 'rate' ?  setRetentionRate(record, text) : text
    },
    {
      title: "3天后",
      dataIndex: "loginCountDay3",
      align: "center",
      key: "loginCountDay3",
      width: 130,
      render: (text: any, record: any) =>  mode === 'rate' ?  setRetentionRate(record, text) : text
    },
    {
      title: "4天后",
      dataIndex: "loginCountDay4",
      align: "center",
      key: "loginCountDay4",
      width: 100,
      render: (text: any, record: any) =>  mode === 'rate' ?  setRetentionRate(record, text) : text
    },
    {
      title: "5天后",
      dataIndex: "loginCountDay5",
      align: "center",
      key: "loginCountDay5",
      width: 150,
      render: (text: any, record: any) =>  mode === 'rate' ?  setRetentionRate(record, text) : text
    },
    {
      title: "6天后",
      dataIndex: "loginCountDay6",
      align: "center",
      key: "loginCountDay6",
      width: 150,
      render: (text: any, record: any) =>  mode === 'rate' ?  setRetentionRate(record, text) : text
    },
    {
      title: "7天后",
      dataIndex: "loginCountDay7",
      align: "center",
      key: "loginCountDay7",
      width: 130,
      render: (text: any, record: any) =>  mode === 'rate' ?  setRetentionRate(record, text) : text
    },
    {
      title: "14天后",
      dataIndex: "loginCountDay14",
      align: "center",
      key: "loginCountDay14",
      width: 130,
      render: (text: any, record: any) =>  mode === 'rate' ?  setRetentionRate(record, text) : text
    },
    {
      title: "30天后",
      dataIndex: "loginCountDay30",
      align: "center",
      key: "loginCountDay30",
      width: 130,
      render: (text: any, record: any) =>  mode === 'rate' ?  setRetentionRate(record, text) : text
    }
  ];



  const handleModelChange = (e: RadioChangeEvent) => {
    setDataModel(e.target.value);
  };
  const handleModeChange = (e: RadioChangeEvent) => {
    setMode(e.target.value);
  };

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
              filterDate: [],
              platform: "",
              channel: ""
            }}
          >
            <Row justify="start">
            <Col span={6}>
                <Form.Item
                  label="日期"
                  name="filterDate"
                  rules={[{ required: false, message: "请选择日期!" }]}
                >
                 <RangePicker format={'YYYY-MM-DD'} />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  label="渠道"
                  name="channel"
                  rules={[{ required: false, message: "请输入渠道!" }]}
                >
                  <Input placeholder="请输入渠道" allowClear={true} />
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
              <Col span={4}>
                <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                <Radio.Group onChange={handleModelChange} value={dataModel} optionType="button" style={{ marginBottom: 8 }}>
                  <Radio.Button value={0}>新增用户</Radio.Button>
                  <Radio.Button value={1}>活跃用户</Radio.Button>
                </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item wrapperCol={{ offset: 3, span: 16 }}>
                <Radio.Group onChange={handleModeChange} value={mode} optionType="button" style={{ marginBottom: 8 }}>
                  <Radio.Button value='rate'>留存率</Radio.Button>
                  <Radio.Button value='num'>留存数</Radio.Button>
                </Radio.Group>
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
            rowKey={(record:any) => record.registerDate}
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
    </div>
  );
};

export default ActiveUserList;
