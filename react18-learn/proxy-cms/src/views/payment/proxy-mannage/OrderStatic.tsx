import React, { useState, useEffect, useCallback } from "react";
import {
  Table,
  Button,
  Form,
  Input,
  Col,
  Row,
  message,
  DatePicker,
} from "antd";
import { respMessage } from "@/utils/message";
import PagiNation from "@/components/PagiNation";
import { loadTradeStatic } from "@/api/index";
import dayjs from "dayjs";
import { getRecentMounth } from "@/utils/common";
import { useAppSelector } from "@/hooks/hooks";
import styles from "./OrderStatic.module.scss";

const { RangePicker } = DatePicker;

const OrderDetail: React.FC = () => {
  const [total, setTotal] = useState<number>(0);
  const [page, setpage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [tableList, setTableList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalRecharge, setTotalRecharge] = useState(0);
  const [totalPeople, setTotalPeople] = useState(0);
  const [totalreNum, setTotalReNum] = useState(0);
  const [searchUserForm] = Form.useForm();

  const cusColor = useAppSelector((state) => state.cusColor.color);
  const userType = useAppSelector((state) => state.user.userInfo.userType);



  //初始化查询时间
  const initSearchDate = () => {
    let temp: any = searchUserForm.getFieldsValue()["createTime"];
    let params: any = {};
    if (temp && temp.length) {
      params["startTime"] = dayjs(new Date(temp[0]).getTime()).format(
        "YYYY-MM-DD"
      ) +' 00:00:00';
      params["endTime"] = dayjs(new Date(temp[1]).getTime()).format(
        "YYYY-MM-DD"
      ) + ' 23:59:59';
    }
    fetchData(params);
  };

  const onFinish = (values: any) => {
    if (values["createTime"] && values["createTime"].length) {
      values["startTime"] = dayjs(
        new Date(values["createTime"][0]).getTime()
      ).format("YYYY-MM-DD")+' 00:00:00';
      values["endTime"] = dayjs(
        new Date(values["createTime"][1]).getTime()
      ).format("YYYY-MM-DD")+ ' 23:59:59';
    } else {
      values["startTime"] = "";
      values["endTime"] = "";
    }
    setpage(1)
    fetchData({page: 1, ...values});
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const resetParams = () => {
    searchUserForm?.setFieldsValue({
      agentId: "",
      agentName: "",
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
      )+ ' 00:00:00';
      params["endTime"] = dayjs(new Date(temp[1]).getTime()).format(
        "YYYY-MM-DD"
      )+ ' 23:59:59';
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
        params["startTime"] = dayjs(new Date(temp[0]).getTime()).format(
          "YYYY-MM-DD"
        )+ ' 00:00:00';
        params["endTime"] = dayjs(new Date(temp[1]).getTime()).format(
          "YYYY-MM-DD"
        )+ ' 23:59:59';
      }
      fetchData({ page, pageSize, ...params });
    },
    [page, pageSize]
  );

  const fetchData = async (params?: any) => {
    setLoading(true);
    const data: any = await loadTradeStatic({ page, pageSize, ...params });
    setLoading(false);
    if (data && data.code && data.code === 200) {
      setTableList(data.page.list ? data.page.list : []);
      setTotal(data.page.totalCount ? data.page.totalCount : 0);
      //在这里统计当前页数据
      if(data.page.list.length) {
        let tempTotalRecharge = 0;
        let tempTotalPeople = 0;
        let tempTotalreNum = 0;
        data.page.list.forEach((item:any) => {
          tempTotalRecharge += item.totalRecharge
          tempTotalPeople += item.rechargePeople
          tempTotalreNum += item.rechargeCount
        })
        setTotalRecharge(tempTotalRecharge)
        setTotalPeople(tempTotalPeople)
        setTotalReNum(tempTotalreNum)
      }
    } else {
      message.open({
        type: "error",
        content: respMessage[String(data.code)],
      });
    }
  };

  const columns: any = [
    {
      title: "日期",
      dataIndex: "statisticDate",
      align: "center",
      key: "statisticDate",
      width: 180,
      render: (
        text: string | number | Date | dayjs.Dayjs | null | undefined
      ) => <>{text ? dayjs(text).format("YYYY-MM-DD") : "--"}</>,
    },
    {
      title: "代理昵称",
      dataIndex: "agentName",
      align: "center",
      key: "agentName",
    },
    {
      title: "代理ID",
      dataIndex: "agentId",
      align: "center",
      key: "agentId",
    },
    {
      title: "总充值(¥)",
      dataIndex: "totalRecharge",
      align: "center",
      key: "totalRecharge",
      render: (text: number) => (
        <span>{text ? (Number(text) / 100).toFixed(2) : "0.00"}</span>
      ),
    },
    {
      title: "接待人数",
      dataIndex: "chatPeople",
      align: "center",
      key: "chatPeople",
      render: (text: any) => <span>{text ? Number(text) : "0"}</span>,
    },
    {
      title: "充值人数",
      dataIndex: "rechargePeople",
      align: "center",
      key: "rechargePeople",
      render: (text: any) => <span>{text ? Number(text) : "0"}</span>,
    },
    {
      title: "充值笔数",
      dataIndex: "rechargeCount",
      align: "center",
      key: "rechargeCount",
      render: (text: any) => <span>{text ? Number(text) : "0"}</span>,
    },
    {
      title: "未充值人数",
      align: "center",
      render: (text: any) => (
        <span>
          {Number(text.chatPeople) - Number(text.rechargePeople)}
        </span>
      ),
    },
    {
      title: "未充值笔数",
      align: "center",
      render: (text: any) => (
        <span>
          {Number(text.totalRechargeCount) - Number(text.rechargeCount)}
        </span>
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
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            initialValues={{
              createTime: [
                dayjs(getRecentMounth()[0], "YYYY-MM-DD"),
                dayjs(getRecentMounth()[1], "YYYY-MM-DD"),
              ],
              changeType: "",
            }}
          >
            <Row justify="start">
              {
                userType !== 1 && <Col span={3.5}>
                <Form.Item
                  label="代理昵称"
                  name="agentName"
                  rules={[{ required: false, message: "请输入代理昵称!" }]}
                >
                  <Input placeholder="请输入代理昵称" allowClear={true} />
                </Form.Item>
              </Col>
              }
              {
                userType !== 1 && <Col span={3.5}>
                <Form.Item
                  label="代理ID"
                  name="agentId"
                  rules={[{ required: false, message: "请输入代理ID!" }]}
                >
                  <Input placeholder="请输入代理ID" allowClear={true} />
                </Form.Item>
              </Col>
              }
              <Col span={6}>
                <Form.Item
                  label="统计时间"
                  name="createTime"
                  rules={[{ required: false, message: "请选择时间!" }]}
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
        <div className={styles.tab_static}>
          <div className={styles.static_item}>
            当页总充值金额:
            <span className={styles.staticNum} style={{ color: cusColor }}>
              {(Number(totalRecharge)/100).toFixed(2)}元
            </span>
          </div>
          <div className={styles.static_item}>
            当页总充值人数:
            <span className={styles.staticNum} style={{ color: cusColor }}>
              {totalPeople}人
            </span>
          </div>
          <div className={styles.static_item}>
            当页总充值笔数:
            <span className={styles.staticNum} style={{ color: cusColor }}>
              {totalreNum}笔
            </span>
          </div>
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
    </div>
  );
};

export default OrderDetail;
