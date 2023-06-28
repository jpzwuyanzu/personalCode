import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Row,
  Space,
  Select,
  message,
  Switch,
  InputNumber
} from "antd";
import { respMessage } from '@/utils/message'
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { updateGameList } from "@/api/index";
import CusUpload from '@/components/CusUpload'
import styles from './GameListModule.module.scss'

interface IProps {
  moduleWidth?: any;
  data?: {
    gameName?: string;
    status?: number;
    id?: number;
    sort?: number;
    cover?: string;
  };
  closeDrawer?: () => void;
  open?: boolean;
  gameInfo?: any;
  imagehost?:any;
}
//游戏类型
const gameTypeArr: any = [
  {value: 1,label: '电子类'},
  {value: 2,label: '棋牌对战类'},
  {value: 3,label: '捕鱼类'},
  {value: 4,label: '视讯类'},
  {value: 5,label: '棋牌类'}
]

export default function GameListModule({
  moduleWidth,
  gameInfo,
  imagehost,
  open,
  closeDrawer,
}: IProps) {
  const [gameForm] = Form.useForm();
  const [fastUrl, setFastUrl] = useState<string>('');



  const fetchData = async () => {
    if (open) {
      if (gameForm) {
        //编辑
        if (Object.keys(gameInfo).length) {
          gameForm.setFieldsValue({
            gameName: (gameInfo as any).gameName,
            gameType: (gameInfo as any).gameType,
            status: Number((gameInfo as any).status) === 1 ? true : false,
            sort: (gameInfo as any).sort,
            cover: (gameInfo as any).cover,
          });
        } else {
          //新增
          gameForm.setFieldsValue({
            gameName: "",
            gameType: undefined,
            status: true,
            sort: 0,
            cover: '',
          });
        }
      }
    }
  };
  const saveUploadImgUrl = (url: string) => {
    setFastUrl(url)
  }

  const confirmEditGame = async () => {
    gameForm
      ?.validateFields()
      .then(async (values) => {
        console.log(values)
        let params = {...values, status: Boolean(values.status) ? 1 : 2,}
        if (Object.keys(gameInfo).length) {
          if(fastUrl) {
            params.cover = fastUrl
          }
          const res: any = await updateGameList({
            id: gameInfo.id,
            ...params
          });
          if (res && res.code && res.code === 200) {
            (closeDrawer as any)();
            message.open({
              type: "success",
              content: "编辑成功",
            });
          } else {
            message.open({
              type: "error",
              content: respMessage[String(res.code)]
            });
          }
        } else {
            const res: any = await updateGameList({
              ...params,
              cover: fastUrl
            });
            if (res && res.code && res.code === 200) {
              (closeDrawer as any)();
              message.open({
                type: "success",
                content: "创建成功",
              });
            } else {
              message.open({
                type: "error",
                content: respMessage[String(res.code)]
              });
            }
          
        }
      })
      .catch((errorInfo) => {
        console.log(errorInfo);
      });
  };

  useEffect(() => {
    fetchData();
  }, [open]);

  return (
    <Drawer
      title={Object.keys(gameInfo).length === 0 ? "新增游戏" : "编辑游戏"}
      getContainer={false}
      size={moduleWidth}
      placement="right"
      onClose={closeDrawer}
      open={open}
      extra={
        <div
          style={{
            textAlign: "right",
            paddingBottom: "20px",
            paddingTop: "20px",
            paddingRight: "20px",
          }}
        >
          <Space>
            <Button type="primary" danger onClick={closeDrawer}>
              取消
            </Button>
            <Button type="primary" onClick={confirmEditGame}>
              确认
            </Button>
          </Space>
        </div>
      }
    >
      {open ? (
        <div style={{ overflowY: 'scroll' }}>
          <Form
          layout="horizontal"
          form={gameForm}
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 17 }}
          initialValues={{
            status: true,
            sort: 0
          }}
        >
           <Row>
            <Col span={24}>
              <Form.Item
                name="gameName"
                label="游戏名称"
                rules={[{ required: true, message: "请输入游戏名称" }]}
              >
                <Input placeholder="请输入游戏名称" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                name="gameType"
                label="游戏类型"
                rules={[{ required: true, message: "请选择游戏类型" }]}
              >
                <Select
                  style={{ width: "100%" }}
                  onChange={() => {}}
                  placeholder="请选择游戏类型"
                  options={[...gameTypeArr]}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item name="status" label="游戏状态" valuePropName="checked">
                <Switch
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item name="sort" label="游戏排序">
              <InputNumber  min={0} max={100000} placeholder="游戏序号"/>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item name="cover" label="游戏封面">
                <CusUpload saveUploadImgUrl={saveUploadImgUrl} gameInfo={{'host':imagehost, ...gameInfo}} isAddGame={ Object.keys(gameInfo).length === 0 ? true : false }/>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        </div>
      ) : null}
    </Drawer>
  );
}
