import React, { useState, useEffect, useCallback } from "react";
import { Space, Table, Button,Form, Input, Col, Row, message, Switch, Select, Tag, Popconfirm, Image } from "antd";
import { respMessage } from '@/utils/message'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import type { ColumnsType } from "antd/es/table";
import PagiNation from "@/components/PagiNation";
import { gameList, updateGameList, delGameList } from '@/api/index'
import dayjs from "dayjs";
import GameListModule from "./modules/GameListModule";
import JudgePemission from "@/components/JudgePemission";
import styles from "./GameList.module.scss";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  status: number;
}

const GameList: React.FC = () => {

  const [total, setTotal] = useState<number>(0);
  const [page, setpage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [tableList, setTableList] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [moduleWidth, setModuleWidth] = useState('');
  const [gameInfo, setGameInfo] = useState({});
  const [loading, setLoading] = useState<boolean>(false);
  const [searchGameInfoForm] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Success:", values);
    fetchData(values)
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const resetParams = () => {
    searchGameInfoForm?.setFieldsValue({ 'gameName': ''})
    fetchData({})
  }

  const loadData = async(page: number, pageSize: number) => {
    setpage(page)
    setPageSize(pageSize)
    fetchData({page, pageSize})
  }
  const fetchData = async (params?: any) => {
    setLoading(true)
    const data: any = await gameList({ page, pageSize, ...params })
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

  const switchGameStatus = async (checked: boolean, id: any) => {
    setLoading(true)
    const resp: any = await updateGameList({ id: id,  status: Number(Boolean(checked) ? 1 : 2) })
    setLoading(false)
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

  const confirmDelChannel = async (userId: any) => {
    const resp: any = await delGameList({ id: userId })
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
      title: "游戏ID",
      dataIndex: "gameId",
      key: "gameId",
      align: 'center',
      render: (text) => <span style={{ 'whiteSpace': 'nowrap' }}>{text}</span>,
      width: 150,
      fixed: 'left'
    },
    {
      title: "游戏名称",
      dataIndex: "gameName",
      key: "gameName",
      align: 'center',
      render: (text) => <span style={{ 'whiteSpace': 'nowrap' }}>{text}</span>,
      width: 150,
      fixed: 'left'
    },
    {
      title: "游戏封面",
      dataIndex: "creditType",
      align: 'center',
      key: "creditType",
      width: 150,
      render: (text: any) => <Image
      width={80}
      src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    />
    },
    {
      title: "游戏类别",
      dataIndex: "gameType",
      align: 'center',
      key: "gameType",
      width: 150,
      render: (text: any) => {
        let result = '';
               switch (text) {
                 case 1:
                 result = '电子类'
                 break;
                case 2:
                 result = '棋牌对战类'
                 break;
                case 3:
                 result = '捕鱼类'
                 break;
                case 4:
                 result = '视讯类'
                 break;
                case 5:
                 result = '棋牌类'
                 break;
               }
               return result
      }
    },
    {
      title: "游戏排序",
      dataIndex: "sort",
      align: 'center',
      key: "sort",
      width: 150,
      // render: (text: any) => <Tag  color={ Number(text) === 0 ? 'cyan' : 'volcano' }>{ Number(text) === 0 ? '信用模式' : '非信用模式'  }</Tag>
    },
    {
      title: "游戏状态",
      dataIndex: "status",
      align: 'center',
      key: "status",
      width: 150,
      render: (text, record: any) => (
        <>
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            checked={ Number(text) === 1 ? true : false }
            onClick={ (checked: boolean) => switchGameStatus(checked, record.id) }
          />
        </>
      )
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      align: 'center',
      key: "createTime",
      render: (text) => <>{dayjs(text).format('YYYY-MM-DD hh:mm:ss')}</>
    },
    {
      title: "更新时间",
      dataIndex: "createTime",
      align: 'center',
      key: "createTime",
      render: (text) => <>{dayjs(text).format('YYYY-MM-DD hh:mm:ss')}</>
    },
    {
      title: "操作",
      key: "action",
      align: 'center',
      fixed: 'right',
      width: 250,
      render: (_, record: any) => (
        <Space size="middle">
          <JudgePemission pageUrl={'/payment/upstream_362'}>
          <Button type="primary"  onClick={() => openDrawer('375px', record)}>编辑游戏</Button>
          </JudgePemission>
          <JudgePemission pageUrl={'/payment/userlist_134'}>
          <Popconfirm
            title="删除"
            description="你确认删除该游戏吗?"
            onConfirm={ () => confirmDelChannel(record.id) }
            onCancel={() => {}}
            okText="是"
            cancelText="否"
          >
            <Button type="primary" danger>删除游戏</Button>
          </Popconfirm>
          </JudgePemission>
        </Space>
      ),
    },
  ];

  //新增/编辑用户
  const openDrawer = (moduleWidth: string, gameInfo: any) => {
    setModuleWidth(moduleWidth)
    setGameInfo(gameInfo)
    setOpen(true)
  }
  //关闭抽屉
  const closeDrawer = useCallback(() => {
    setOpen(false)
    fetchData({})
  }, [open])

  useEffect( () => {
    fetchData({})
  }, [])

  return (
    <div className={styles.TableCom_Container}>
      <div className={styles.Table_ContentArea}>
        <Form
          form={searchGameInfoForm}
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          initialValues={{
            status: 0,
            creditType: ''
            }}
        >
          <Row justify="start">
            <Col span={4}>
              <Form.Item
                label="游戏名称"
                name="gameName"
                rules={[
                  { required: false, message: "请输入游戏名称!" },
                ]}
              >
                <Input placeholder="请输入游戏名称" allowClear={true}/>
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
                <Button type="primary" style={{ marginLeft: '13px', }} onClick={() => resetParams()}>
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
        <Table columns={columns} dataSource={tableList} loading={ loading }  pagination={false} rowKey={(record) => record.id} scroll={{ y:'34vw'}}/>
      </div>
      <div className={styles.bottom_Pag_area}>
        <PagiNation current={page} pageSize={pageSize} total={total} loadData={loadData}/>
      </div>
      <GameListModule moduleWidth={moduleWidth} gameInfo={gameInfo} open={open} closeDrawer={closeDrawer}/>
    </div>
  )
};

export default GameList;
