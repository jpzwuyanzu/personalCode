import { useState, useEffect } from "react";
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
import { respMessage } from "@/utils/message";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import CusUpload from "@/components/CusUpload";
import { updateAgentReciveType } from "@/api/index";

interface IProps {
  moduleWidth?: any;
  data?: {
    payCode?: string;
    status?: number;
    id?: number;
  };
  closeDrawer?: () => void;
  open?: boolean;
  paymentTypeInfo?: any;
  fastHeadHost?: any;
}

export default function PaymentTypeModule({
  moduleWidth,
  paymentTypeInfo,
  fastHeadHost,
  open,
  closeDrawer,
}: IProps) {
  console.log(paymentTypeInfo);
  console.log(fastHeadHost)
  const [userForm] = Form.useForm();
  const [payCodeNow, setPayCodeNow] = useState('UNION_PAY');
  const [fastUrl, setFastUrl] = useState<string>("");

  const saveUploadImgUrl = (url: string) => {
    setFastUrl(url);
  };

  const fetchData = async () => {
    if (open) {
      if (userForm) {
        console.log(paymentTypeInfo);
        if (Object.keys(paymentTypeInfo).length) {
          userForm.setFieldsValue({
            payCode: (paymentTypeInfo as any).payCode,
            payName: (paymentTypeInfo as any).payName,
            bankAccount: (paymentTypeInfo as any).bankAccount,
            status: (paymentTypeInfo as any).status,
            bankNo: (paymentTypeInfo as any).bankNo,
            bankName: (paymentTypeInfo as any).bankName,
            payImage: (paymentTypeInfo as any).payImage
              ? fastHeadHost + "" + (paymentTypeInfo as any).payImage
              : "",
              headImage: (paymentTypeInfo as any).payImage
              ? fastHeadHost + "" + (paymentTypeInfo as any).payImage
              : "",
          });
          setPayCodeNow((paymentTypeInfo as any).payCode)
        } else {
          userForm.setFieldsValue({
            payCode: "",
            payName: "",
            status: true,
            bankAccount: "",
            bankNo: "",
            bankName: "",
            headImage: ""
          });
        }
      }
    }
  };

  const confirmEditUser = async () => {
    userForm
      ?.validateFields()
      .then(async (values) => {
        if (Object.keys(paymentTypeInfo).length) {
          const res: any = await updateAgentReciveType({
            payName: values.payName,
            payCode: values.payCode,
            status: Boolean(values.status) ? 1 : 2,
            bankName: values.bankName,
            id: paymentTypeInfo.id,
            bankAccount: values.bankAccount,
            bankNo: values.bankNo,
            payImage: fastUrl ? fastUrl : "",
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
          if (String(values.password) !== String(values.confirmPassword)) {
            userForm.setFieldsValue({ confirmPassword: "" });
            message.open({
              type: "error",
              content: "两次输入的密码不一致!",
            });
          } else {
            const res: any = await updateAgentReciveType({
                payName: values.payName,
                payCode: values.payCode,
                status: Boolean(values.status) ? 1 : 2,
                bankName: values.bankName,
                id: paymentTypeInfo.id,
                bankAccount: values.bankAccount,
                bankNo: values.bankNo,
                payImage: fastUrl ? fastUrl : "",
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
        }
      })
      .catch((errorInfo) => {
        console.log(errorInfo);
      });
  };

  const handlePayCodeChange = (value: any) => {
    setPayCodeNow(value)
  };


  useEffect(() => {
    fetchData();
  }, [open]);

  return (
    <Drawer
      getContainer={false}
      title={Object.keys(paymentTypeInfo).length === 0 ? "新增" : "编辑"}
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
            <Button type="primary" onClick={confirmEditUser}>
              确认
            </Button>
          </Space>
        </div>
      }
    >
      {open ? (
        <Form
          layout="horizontal"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          form={userForm}
          initialValues={{
            status: true,
            payCode: 'UNION_PAY'
          }}
        >
          <Row>
            <Col span={24}>
              <Form.Item
                name="payCode"
                label="收款方式"
                rules={[{ required: true, message: "请选择收款方式" }]}
              >
                <Select
                  style={{ width: "100%" }}
                  placeholder="请选择收款方式"
                  options={[
                    { value: "UNION_PAY", label: "银联" },
                    { value: "WX_PAY", label: "微信" },
                    { value: "ALI_PAY", label: "支付宝" },
                  ]}
                  onChange={handlePayCodeChange}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                name="payName"
                label="收款账户名称"
                rules={[{ required: true, message: "请输入收款账户名称" }]}
              >
                <Input placeholder="请输入收款账户名称" />
              </Form.Item>
            </Col>
          </Row>
          {/* 微信支付宝有二维码，银行卡没有 */}
          {
            (payCodeNow === 'ALI_PAY' || payCodeNow === 'WX_PAY') ? <> <Row>
            <Col span={24}>
              <Form.Item name="payImage" label="收款码">
                <CusUpload
                  saveUploadImgUrl={saveUploadImgUrl}
                  uploadInfo={paymentTypeInfo}
                  fastHeadHost={fastHeadHost}
                  isAdd={Object.keys(paymentTypeInfo).length === 0 ? true : false}
                />
              </Form.Item>
            </Col>
          </Row></> : null
          }
          {
            (payCodeNow === 'ALI_PAY' ||  payCodeNow === 'UNION_PAY') ? <><Row>
            <Col span={24}>
              <Form.Item
                name="bankNo"
                label={ payCodeNow === 'UNION_PAY' ? '银行卡号' : "支付宝账号" }
                rules={[
                  {
                    required: true,
                    message: payCodeNow === 'UNION_PAY' ? '请输入银行卡号' : "请输入支付宝账号",
                  },
                ]}
              >
                <Input placeholder={ payCodeNow === 'UNION_PAY' ? '请输入银行卡号' : "请输入支付宝账号" } />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                name="bankAccount"
                label={ payCodeNow === 'UNION_PAY' ? '银行卡名称' : "支付宝名称" }
                rules={[
                  {
                    required: true,
                    message:  payCodeNow === 'UNION_PAY' ? '' +'请输入银行卡名称' : "请输入支付宝名称",
                  },
                ]}
              >
                <Input placeholder={payCodeNow === 'UNION_PAY' ? '' +'请输入银行卡名称' : "请输入支付宝名称"} />
              </Form.Item>
            </Col>
          </Row></>  : null
          }
          {
            payCodeNow === 'UNION_PAY' ? <><Row>
            <Col span={24}>
              <Form.Item
                name="bankName"
                label="银行名称"
                rules={[
                  {
                    required: true,
                    message: "请输入银行名称",
                  },
                ]}
              >
                <Input placeholder="请输入银行名称" />
              </Form.Item>
            </Col>
          </Row></> : null
          }
          <Row>
            <Col span={24}>
              <Form.Item name="status" label="收款方式状态" valuePropName="checked">
                <Switch
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      ) : null}
    </Drawer>
  );
}
