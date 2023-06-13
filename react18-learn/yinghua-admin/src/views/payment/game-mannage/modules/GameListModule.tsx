import { useEffect } from "react";
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
} from "antd";
import { respMessage } from '@/utils/message'
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { upDateUpStreamMerchant } from "@/api/index";
import styles from './GameListModule.module.scss'

interface IProps {
  moduleWidth?: any;
  data?: {
    name?: string;
    status?: number;
    id?: number;
  };
  closeDrawer?: () => void;
  open?: boolean;
  gameInfo?: any;
}

const creditTypeArr: any = [{value: 0,label: '信用模式'},{value: 1,label: '非信用模式'}] //商户模式

export default function GameListModule({
  moduleWidth,
  gameInfo,
  open,
  closeDrawer,
}: IProps) {
  const [merchantForm] = Form.useForm();




  const fetchData = async () => {
    if (open) {
      if (merchantForm) {
        //编辑
        if (Object.keys(gameInfo).length) {
          merchantForm.setFieldsValue({
            channelName: (gameInfo as any).channelName,
            creditType: (gameInfo as any).creditType,
            status: Number((gameInfo as any).status) === 1 ? true : false,
            
            
          });
        } else {
          //新增
          merchantForm.setFieldsValue({
            channelName: "",
            creditType: undefined,
            status: true
          });
        }
      }
    }
  };

  const confirmEditChannel = async () => {
    merchantForm
      ?.validateFields()
      .then(async (values) => {
        if (Object.keys(gameInfo).length) {
          const res: any = await upDateUpStreamMerchant({
            ...values,
            status: Boolean(values.status) ? 1 : 2,
            id: gameInfo.id
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
            const res: any = await upDateUpStreamMerchant({
              ...values,
              status: Boolean(values.status) ? 1 : 2,
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
      getContainer={false}
      title={Object.keys(gameInfo).length === 0 ? "新增商户" : "编辑商户"}
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
            <Button type="primary" onClick={confirmEditChannel}>
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
          form={merchantForm}
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 17 }}
          initialValues={{
            status: true,
            rate: 0
          }}
        >
           <Row>
            <Col span={24}>
              <Form.Item
                name="channelName"
                label="商户名称"
                rules={[{ required: true, message: "请输入商户名称" }]}
              >
                <Input placeholder="请输入商户名称" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                name="creditType"
                label="商户模式"
                rules={[{ required: true, message: "请选择商户模式" }]}
              >
                <Select
                  style={{ width: "100%" }}
                  onChange={() => {}}
                  placeholder="请选择商户模式"
                  options={[...creditTypeArr]}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item name="status" label="商户状态" valuePropName="checked">
                <Switch
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        </div>
      ) : null}
    </Drawer>
  );
}
