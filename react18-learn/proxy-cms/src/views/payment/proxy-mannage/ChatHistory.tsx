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
  DatePicker,
} from "antd";
import { useNavigate } from 'react-router-dom'
import { respMessage } from "@/utils/message";
import PagiNation from "@/components/PagiNation";
import { loadChatRecordHistory } from "@/api/index";
import dayjs from "dayjs";
import { getRecentMounth } from "@/utils/common";
import ChatRoomHistoryIndex from '@/components/ChatRecordHistory/ChatRoomHistoryIndex'
import styles from "./ChatHistory.module.scss";

const { RangePicker } = DatePicker;

const ChatHistory: React.FC = () => {
  const Navigte = useNavigate()
  const [total, setTotal] = useState<number>(0);
  const [page, setpage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [tableList, setTableList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  //消息记录
  const [chatHistoryStatus, setChatHistoryStatus] = useState(false);
  const [searchUserForm] = Form.useForm();

  //初始化查询时间
  const initSearchDate = () => {
    let temp: any = searchUserForm.getFieldsValue()["createTime"];
    let params: any = {chatGroup: 1};
    if (temp && temp.length) {
      params["startMs"] = new Date(dayjs(new Date(temp[0])).format('YYYY-MM-DD') + ' 00:00:00').getTime();
      params["endMs"] = new Date(dayjs(new Date(temp[1])).format('YYYY-MM-DD') + ' 23:59:59').getTime();
    }
    fetchData(params);
  };

  const onFinish = (values: any) => {
    if (values["createTime"] && values["createTime"].length) {
      values["startMs"] = new Date(dayjs(new Date(values["createTime"][0])).format('YYYY-MM-DD') + ' 00:00:00').getTime();
      values["endMs"] = new Date(dayjs(new Date(values["createTime"][1])).format('YYYY-MM-DD') + ' 23:59:59').getTime();
    } else {
      values["startMs"] = "";
      values["endMs"] = "";
    }
    
    setpage(1)
    fetchData({page: 1, chatGroup: 1, ...values});
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
      chatGroup: 1
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
      let temp: any = searchUserForm.getFieldsValue()["createTime"];
      let params: any = {chatGroup: 1};
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
    const data: any = await loadChatRecordHistory({ page, pageSize, ...params });
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

   //打开聊天记录
   const openChatHistory = (item:any) => {
    Navigte(`/payment/chathistory?playerId=${item.playerId}&agentId=${item.agentId}`)
    setChatHistoryStatus(true)
  }

  //关闭聊天记录
  const closeChatRoom =async () => {
    Navigte('/payment/chathistory')
    setChatHistoryStatus(false)
  }

  const columns: any = [
    {
      title: "日期",
      dataIndex: "chatTime",
      align: "center",
      key: "chatTime",
      render: (
        text: string | number | Date | dayjs.Dayjs | null | undefined
      ) => <>{text ? dayjs(text).format("YYYY-MM-DD") : "--"}</>,
    },
    {
      title: "代理ID",
      dataIndex: "agentId",
      align: "center",
      key: "agentId",
    },
    {
      title: "代理昵称",
      dataIndex: "agentName",
      align: "center",
      key: "agentName",
    },
    {
      title: "用户昵称",
      dataIndex: "playerName",
      align: "center",
      key: "playerName",
    },
    {
      title: "用户ID",
      dataIndex: "playerId",
      align: "center",
      key: "playerId",
    },
    {
      title: "操作",
      key: "action",
      align: "center",
      render: (_: any, record: any) => (
        <Space size="middle">
         <a onClick={() => openChatHistory(record)}>查看会话记录</a>
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
            labelCol={{ span: 8 }}
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
            <Col span={3}>
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
              <Col span={3.5}>
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
              <Col span={3.5}>
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
              <Col span={3}>
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
              <Col span={3}>
                <Form.Item
                  label="时间"
                  name="createTime"
                  rules={[{ required: false, message: "请选择时间!" }]}
                >
                  <RangePicker style={{ width: '250px' }}/>
                </Form.Item>
              </Col>
              <Col span={3}>
                <Form.Item wrapperCol={{ offset: 17, span: 10 }} style={{ marginLeft: '20px' }}>
                  <Button type="primary" htmlType="submit">
                    搜索
                  </Button>
                </Form.Item>
              </Col>
              {/* </JudgePemission> */}
              {/* <JudgePemission pageUrl={'/payment/userlist_131'}> */}
              <Col span={1}>
                <Form.Item wrapperCol={{ offset: 2, span: 8 }}>
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
            rowKey={(record) => record.playerId + '_' + record.playerName + '_' + record.chatTime}
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
      <ChatRoomHistoryIndex open={chatHistoryStatus} closeChatRoom={closeChatRoom} />
    </div>
  );
};

export default ChatHistory;
