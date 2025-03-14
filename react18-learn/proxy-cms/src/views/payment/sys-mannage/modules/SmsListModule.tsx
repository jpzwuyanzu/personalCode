import { useEffect } from "react";
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Row,
  Space,
  message,
} from "antd";
import { respMessage } from "@/utils/message";
import { updateSmsList } from "@/api/index";

interface IProps {
  moduleWidth?: any;
  data?: {
    title?: string;
    status?: number;
    id?: number;
  };
  closeDrawer?: () => void;
  open?: boolean;
  smsInfo?: any;
}

export default function SmsListModule({
  moduleWidth,
  smsInfo,
  open,
  closeDrawer,
}: IProps) {
  const [gampkgForm] = Form.useForm();

  const fetchData = async () => {
    if (open) {
      if (gampkgForm) {
        //编辑
        if (Object.keys(smsInfo).length) {
          gampkgForm.setFieldsValue({
            userName: (smsInfo as any).userName,
            pwd: (smsInfo as any).pwd,
            userId: (smsInfo as any).userId,
            getaway: (smsInfo as any).getaway,
            params1: (smsInfo as any).params1,
            params2: (smsInfo as any).params2,
            params3: (smsInfo as any).params3,
          });
        } else {
          //新增
          gampkgForm.setFieldsValue({
            userName: '',
            pwd: '',
            userId: '',
            getaway: '',
            params1: '',
            params2: '',
            params3: '',
          });
        }
      }
    }
  };

  const confirmEditGame = async () => {
    gampkgForm
      ?.validateFields()
      .then(async (values) => {
        let params = {
          ...values
        };
        if (Object.keys(smsInfo).length) {
          const res: any = await updateSmsList({
            id: smsInfo.id,
            ...params,
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
              content: respMessage[String(res.code)],
            });
          }
        } else {
          const res: any = await updateSmsList({
            ...params,
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
              content: respMessage[String(res.code)],
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
      title={Object.keys(smsInfo).length === 0 ? "新增配置" : "编辑配置"}
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
        <div style={{ overflowY: "scroll" }}>
          <Form
            layout="horizontal"
            form={gampkgForm}
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 17 }}
            initialValues={{
              status: true,
              sort: 0,
            }}
          >
            <Row>
              <Col span={24}>
                <Form.Item
                  name="userName"
                  label="平台名称"
                  rules={[{ required: true, message: "请输入平台名称" }]}
                >
                  <Input placeholder="请输入平台名称" />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item
                  name="userId"
                  label="短信账号"
                  rules={[{ required: true, message: "请输入短信账号" }]}
                >
                  <Input placeholder="请输入短信账号" />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item
                  name="pwd"
                  label="短信密码"
                  rules={[{ required: true, message: "请输入短信密码" }]}
                >
                  <Input placeholder="请输入短信密码" />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item
                  name="getaway"
                  label="网关地址"
                  rules={[{ required: true, message: "请输入网关地址" }]}
                >
                  <Input placeholder="请输入网关地址" />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item
                  name="params1"
                  label="参数1"
                >
                  <Input placeholder="请输入参数1" />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item
                  name="params2"
                  label="参数2"
                >
                  <Input placeholder="请输入参数2" />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item
                  name="params3"
                  label="参数3"
                >
                  <Input placeholder="请输入参数3" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      ) : null}
    </Drawer>
  );
}
