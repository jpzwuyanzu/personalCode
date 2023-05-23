import React, { useState, useEffect } from "react";
import { Space, Table, Button,Form, Input, Col, Row, message, Switch, Popconfirm,Select } from "antd";
import { respMessage } from '@/utils/message'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import type { ColumnsType } from "antd/es/table";
import PagiNation from "@/components/PagiNation";
import { upStreamChannelList, createUser, delUser } from '@/api/index'
import dayjs from "dayjs";
import UpStreamModule from "./modules/UpStreamModule";
import JudgePemission from "@/components/JudgePemission";
import styles from "./UpStream.module.scss";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  status: number;
}

const UpStream: React.FC = () => {

  const [total, setTotal] = useState<number>(0);
  const [page, setpage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [tableList, setTableList] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [moduleWidth, setModuleWidth] = useState('');
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState<boolean>(false);
  const [modalStatus, setModalStatus] = useState(false);
  const [searchUserForm] = Form.useForm();


  const onFinish = (values: any) => {
    console.log("Success:", values);
    fetchData(values)
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const resetParams = () => {
    searchUserForm?.setFieldsValue({ 'username': '', status: 0 })
    fetchData({})
  }

  const loadData = async(page: number, pageSize: number) => {
    setpage(page)
    setPageSize(pageSize)
    fetchData({page, pageSize})
  }
  const fetchData = async (params?: any) => {
    setLoading(true)
    const data: any = await upStreamChannelList({ page, pageSize, ...params })
    setLoading(false)
    console.log(data)
    if(data && data.code && data.code === 200) {
      setTableList(data.page.list ? data.page.list : []);
      setTotal(data.page.totalCount ? data.page.totalCount : 0);
    } else {
      message.open({
        type: 'error',
        content: respMessage[String(data.code)]
      })
    }
  }

  const switchUserStatus = async (checked: boolean, userId: any) => {
    const resp: any = await createUser({ id:userId,  status: Number(Boolean(checked) ? 1 : 2) })
    if(resp && resp.code && resp.code === 200) {
      message.open({
        type: 'success',
        content: '修改成功'
      })
      fetchData({})
    } else {
      message.open({
        type: 'error',
        content: respMessage[String(resp.code)]
      })
    }
  }

  const confirmDelRole = async (userId: any) => {
    const resp: any = await delUser({ id: userId })
    if(resp && resp.code && resp.code === 200) {
      fetchData({})
    } else {
      message.open({
        type: 'error',
        content: respMessage[String(resp.code)]
      })
    }
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "渠道名称",
      dataIndex: "channelName",
      key: "channelName",
      align: 'center',
      render: (text) => <span style={{ 'whiteSpace': 'nowrap' }}>{text}</span>,
      width: 180,
      fixed: 'left'
    },
    {
      title: "渠道CODE",
      dataIndex: "payCode",
      align: 'center',
      key: "payCode",
      width: 150,
    },
    {
      title: "支付类型",
      dataIndex: "payType",
      align: 'center',
      key: "payType",
      width: 150
    },
    {
      title: "支持金额",
      dataIndex: "amountList",
      align: 'center',
      key: "amountList",
      width: 150
    },
    {
      title: "费率",
      dataIndex: "rate",
      align: 'center',
      key: "rate",
      width: 150
    },
    {
      title: "状态",
      dataIndex: "status",
      align: 'center',
      key: "status",
      width: 150
    },
    {
      title: "最小金额",
      dataIndex: "minAmount",
      align: 'center',
      key: "minAmount",
      width: 150
    },
    {
      title: "最大金额",
      dataIndex: "maxAmount",
      align: 'center',
      key: "maxAmount",
      width: 150
    },
    {
      title: "三方账户",
      dataIndex: "merchantNo",
      align: 'center',
      key: "merchantNo",
      width: 300
    },
    // {
    //   title: "三方网关",
    //   dataIndex: "gatewayUrl",
    //   align: 'center',
    //   key: "gatewayUrl",
    //   width: 150
    // },
    // {
    //   title: "商户KEY",
    //   dataIndex: "merchantCert",
    //   align: 'center',
    //   key: "merchantCert",
    //   width: 300
    // },
    {
      title: "回调IP",
      dataIndex: "callbackIp",
      align: 'center',
      key: "callbackIp",
      width: 300
    },
    {
      title: "支持平台",
      dataIndex: "platformType",
      align: 'center',
      key: "platformType",
      width: 150
    },
    {
      title: "支持产品",
      dataIndex: "channelMode",
      align: 'center',
      key: "channelMode",
      width: 150
    },
    {
      title: "是否拉新",
      dataIndex: "isNew",
      align: 'center',
      key: "isNew",
      width: 150
    },
    {
      title: "是否内层展示",
      dataIndex: "inside",
      align: 'center',
      key: "inside",
      width: 150
    },
    {
      title: "上游商户ID",
      dataIndex: "merchantId",
      align: 'center',
      key: "merchantId",
      width: 150
    },
    // {
    //   title: "用户状态",
    //   dataIndex: "status",
    //   align: 'center',
    //   key: "status",
    //   render: (text, record: any) => (
    //     <>
    //       <Switch
    //         checkedChildren={<CheckOutlined />}
    //         unCheckedChildren={<CloseOutlined />}
    //         checked={ Number(text) === 1 ? true : false }
    //         onClick={ (checked: boolean) => switchUserStatus(checked, record.id) }
    //       />
    //     </>
    //   )
    // },
    {
      title: "创建时间",
      dataIndex: "createTime",
      align: 'center',
      key: "createTime",
      width: 180,
      render: (text) => <>{dayjs(text).format('YYYY-MM-DD hh:mm:ss')}</>
    },
    {
      title: "更新时间",
      key: "updateTime",
      align: 'center',
      dataIndex: "updateTime",
      width: 180,
      render: (text) => <>{dayjs(text).format('YYYY-MM-DD hh:mm:ss')}</>
    },
    {
      title: "操作",
      key: "action",
      align: 'center',
      fixed: 'right',
      width: 300,
      render: (_, record: any) => (
        <Space size="middle">
          <JudgePemission pageUrl={'/payment/userlist_133'}>
          <Button type="primary" onClick={() => openDrawer('378px', record)}>编辑用户</Button>
          </JudgePemission>
          <Button type="dashed" danger onClick={() => openModal(record)}>重置密码</Button>
          <JudgePemission pageUrl={'/payment/userlist_134'}>
          <Popconfirm
            title="删除"
            description="你确认删除该用户吗?"
            onConfirm={ () => confirmDelRole(record.id) }
            onCancel={() => {}}
            okText="是"
            cancelText="否"
          >
            <Button type="primary" danger>删除用户</Button>
          </Popconfirm>
          </JudgePemission>
        </Space>
      ),
    },
  ];

  //新增/编辑用户
  const openDrawer = (moduleWidth: string, userInfo: any) => {
    setModuleWidth(moduleWidth)
    setUserInfo(userInfo)
    setOpen(true)
  }
  //关闭抽屉
  const closeDrawer = () => {
    setOpen(false)
    fetchData({})
  }
  //打开重置密码
  const openModal = (userInfo: any) => {
    console.log('0-0-0-')
    setUserInfo(userInfo)
    setModalStatus(true)
  }
  //关闭重置密码
  const closeModal = () => {
    setModalStatus(false)
    fetchData({})
  }

  useEffect( () => {
    fetchData({})
  }, [])

  return (
    <div>上游商户</div>
  )
};

export default UpStream;
