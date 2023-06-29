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
  Switch,
  InputNumber,
} from "antd";
import { respMessage } from "@/utils/message";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { updateGamePkg } from "@/api/index";

interface IProps {
  moduleWidth?: any;
  data?: {
    title?: string;
    status?: number;
    id?: number;
  };
  closeDrawer?: () => void;
  open?: boolean;
  gamepkgInfo?: any;
}

export default function GameListModule({
  moduleWidth,
  gamepkgInfo,
  open,
  closeDrawer,
}: IProps) {
  const [gampkgForm] = Form.useForm();

  const fetchData = async () => {
    if (open) {
      if (gampkgForm) {
        //编辑
        if (Object.keys(gamepkgInfo).length) {
          gampkgForm.setFieldsValue({
            title: (gamepkgInfo as any).title,
            status: Number((gamepkgInfo as any).status) === 1 ? true : false,
            amount_cny: Number((gamepkgInfo as any).amount) / 100,
            giveAmount_cny: Number((gamepkgInfo as any).giveAmount) / 100,
          });
        } else {
          //新增
          gampkgForm.setFieldsValue({
            title: "",
            status: true,
            amount_cny: Number((gamepkgInfo as any).amount) / 100,
            giveAmount_cny: Number((gamepkgInfo as any).giveAmount) / 100,
          });
        }
      }
    }
  };

  const confirmEditGame = async () => {
    gampkgForm
      ?.validateFields()
      .then(async (values) => {
        console.log(values);
        let params = {
          ...values,
          status: Boolean(values.status) ? 1 : 2,
          amount: values.amount_cny * 100,
          giveAmount: values.giveAmount_cny * 100,
        };
        if (Object.keys(gamepkgInfo).length) {
          const res: any = await updateGamePkg({
            id: gamepkgInfo.id,
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
          const res: any = await updateGamePkg({
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
      title={Object.keys(gamepkgInfo).length === 0 ? "新增套餐" : "编辑套餐"}
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
                  name="title"
                  label="套餐名称"
                  rules={[{ required: true, message: "请输入套餐名称" }]}
                >
                  <Input placeholder="请输入套餐名称" />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item
                  name="amount_cny"
                  label="套餐金额"
                  rules={[{ required: true, message: "请输入套餐金额" }]}
                >
                  <InputNumber
                    addonBefore="¥"
                    addonAfter="RMB"
                    min={0}
                    max={100000}
                    placeholder="套餐金额"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item
                  name="giveAmount_cny"
                  label="赠送金额"
                  rules={[{ required: true, message: "请输入赠送金额" }]}
                >
                  <InputNumber
                    addonBefore="¥"
                    addonAfter="RMB"
                    min={0}
                    max={100000}
                    placeholder="赠送金额"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item
                  name="status"
                  label="套餐状态"
                  valuePropName="checked"
                >
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
