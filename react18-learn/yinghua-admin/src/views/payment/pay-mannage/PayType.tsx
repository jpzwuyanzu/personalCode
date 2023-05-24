import React, { useState, useEffect, useCallback, Fragment } from "react";
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
  Select,
  Tag,
  Statistic,
  Watermark
} from "antd";
import { respMessage } from "@/utils/message";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import PagiNation from "@/components/PagiNation";
import { upStreamMerchant, upDateUpStreamMerchant, payTypeList } from "@/api/index";
// import dayjs from "dayjs";
import PayTypeModule from "./modules/PayTypeModule";
import JudgePemission from "@/components/JudgePemission";
import styles from "./PayType.module.scss";
import { TestList } from "@/utils/test";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  status: number;
}

const PayType: React.FC = () => {
  const [total, setTotal] = useState<number>(0);
  const [page, setpage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  //[1]:"IOS" [2]:"ANDROID" [3]:"WINPHONE" [4]: "website" [5]: "Applets" [6]:"OFFCIAL WEBSITE"
  const [tableList, setTableList] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [moduleWidth, setModuleWidth] = useState("");
  const [payTypeInfo, setPayTypeInfo] = useState({});
  const [loading, setLoading] = useState<boolean>(false);
  const [searchMerchantForm] = Form.useForm();
  /**
   * 根据moduleType区分 1:"IOS" 2:"ANDROID" 3:"WINPHONE" 4: "website" 5: "Applets" 6:"OFFCIAL WEBSITE"
   *
   */
  const loadTestData = () => {
    if (TestList && TestList.length) {
      let typeList: any = [
        { type: 1, title: "IOS支付方式管理", data: [] },
        { type: 2, title: "ANDROID支付方式管理", data: [] },
        { type: 3, title: "WINPHONE支付方式管理", data: [] },
        { type: 4, title: "WEBSITE支付方式管理", data: [] },
        { type: 5, title: "Applets支付方式管理", data: [] },
        { type: 6, title: "OFFCIAL WEBSITE支付方式管理", data: [] },
      ];
      TestList.forEach((element) => {
        switch (element.moduleType) {
          case 1:
            typeList[0].data.push(element);
            break;
          case 2:
            typeList[1].data.push(element);
            break;
          case 3:
            typeList[2].data.push(element);
            break;
          case 4:
            typeList[3].data.push(element);
            break;
          case 5:
            typeList[4].data.push(element);
            break;
          case 6:
            typeList[5].data.push(element);
            break;
        }
      });
      setTableList(typeList ? typeList : [])
    }
  };
  const fetchData = async (params?: any) => {
    setLoading(true);
    const data: any = await payTypeList(params);
    setLoading(false);
    console.log(data);
    if (data && data.code && data.code === 200) {
      if(data.data) {
        let typeList: any = [
          { type: 1, title: "IOS支付方式管理", data: [] },
          { type: 2, title: "ANDROID支付方式管理", data: [] },
          { type: 3, title: "WINPHONE支付方式管理", data: [] },
          { type: 4, title: "网站支付方式管理", data: [] },
          { type: 5, title: "小程序支付方式管理", data: [] },
          { type: 6, title: "官网支付方式管理", data: [] },
        ];
        data.data.forEach((element: any) => {
          switch (element.moduleType) {
            case 1:
              typeList[0].data.push(element);
              break;
            case 2:
              typeList[1].data.push(element);
              break;
            case 3:
              typeList[2].data.push(element);
              break;
            case 4:
              typeList[3].data.push(element);
              break;
            case 5:
              typeList[4].data.push(element);
              break;
            case 6:
              typeList[5].data.push(element);
              break;
          }
        });
        setTableList(typeList ? typeList : [])
      }
      // setTableList(data.page.list ? data.page.list : []);
      // setTotal(data.page.totalCount ? data.page.totalCount : 0);
    } else {
      message.open({
        type: "error",
        content: respMessage[String(data.code)],
      });
    }
  };

  const switchMerchantStatus = async (checked: boolean, channelId: any) => {
    setLoading(true);
    const resp: any = await upDateUpStreamMerchant({
      id: channelId,
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

  // const confirmDelChannel = async (userId: any) => {
  //   const resp: any = await delUser({ id: userId })
  //   if(resp && resp.code && resp.code === 200) {
  //     fetchData({})
  //   } else {
  //     message.open({
  //       type: 'error',
  //       content: respMessage[String(resp.code)]
  //     })
  //   }
  // }

  const columns: ColumnsType<DataType> = [
    {
      title: "支付方式名称",
      dataIndex: "payName",
      key: "payName",
      align: "center",
      render: (text) => <span style={{ whiteSpace: "nowrap" }}>{text}</span>,
      width: 150,
    },
    {
      title: "支付方式",
      dataIndex: "payType",
      align: "center",
      key: "payType",
      width: 100,
    },
    // {
    //   title: "支付渠道列表",
    //   dataIndex: "channelList",
    //   key: "channelList",
    //   align: "center",
    //   render: () => <a>查看</a>,
    //   width: 150,
    // },
    {
      title: "状态",
      dataIndex: "status",
      align: "center",
      key: "status",
      width: 100,
      render: (text, record: any) => (
        <>
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            checked={Number(text) === 1 ? true : false}
            onClick={(checked: boolean) =>
              switchMerchantStatus(checked, record.id)
            }
          />
        </>
      ),
    },
    {
      title: "操作",
      key: "action",
      align: "center",
      fixed: "right",
      width: 150,
      render: (_, record: any) => (
        <Space size="middle">
          <JudgePemission pageUrl={"/payment/channellist_361"}>
            <Button type="primary" size="small" onClick={() => openDrawer("large", record)}>
              支付通道详情
            </Button>
          </JudgePemission>
          {/* <JudgePemission pageUrl={'/payment/userlist_134'}>
          <Popconfirm
            title="删除"
            description="你确认删除该用户吗?"
            onConfirm={ () => confirmDelChannel(record.id) }
            onCancel={() => {}}
            okText="是"
            cancelText="否"
          >
            <Button type="primary" danger>删除渠道</Button>
          </Popconfirm>
          </JudgePemission> */}
        </Space>
      ),
    },
  ];

  //新增/编辑用户
  const openDrawer = (moduleWidth: string, payTypeInfo: any) => {
    setModuleWidth(moduleWidth);
    setPayTypeInfo(payTypeInfo);
    setOpen(true);
  };
  //关闭抽屉
  const closeDrawer = useCallback(() => {
    setOpen(false);
    fetchData({});
  }, [open]);

  useEffect(() => {
    fetchData({})
    // loadTestData();
  }, []);

  return (
    <div className={styles.TableCom_Container}>
      <div className={styles.Table_ContentArea}>
        {
          tableList && tableList.map((itm: any, inx: any) => (
            itm.data && itm.data.length ? (<Fragment key={inx}>
              <h2 style={{ padding: '20px', fontSize: '20px' }}>{itm.title}</h2>
            <div style={{ padding: '20px', background: 'rgba(231,232,237,1)', borderRadius: '5px'}}>
            <Watermark content="猜猜我是谁">
            <Table
              bordered
              columns={columns}
              dataSource={itm.data}
              pagination={false}
              rowKey={(record: any) => record.id}
            />
            </Watermark>
            </div>
            </Fragment>) : null))
        }
        
      </div>
      <PayTypeModule
        moduleWidth={moduleWidth}
        payTypeInfo={payTypeInfo}
        open={open}
        closeDrawer={closeDrawer}
      />
    </div>
  );
};

export default PayType;
