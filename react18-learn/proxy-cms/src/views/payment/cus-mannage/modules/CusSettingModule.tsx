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
  InputNumber,
} from "antd";
import { respMessage } from "@/utils/message";
import { updateQuickFeedBack } from "@/api/index";

interface IProps {
  moduleWidth?: any;
  data?: {
    name?: string;
    status?: number;
    id?: number;
    openStatus?: number;
  };
  closeDrawer?: () => void;
  open?: boolean;
  quickFeedBackInfo?: any;
  fastHeadHost?: any;
}

const { TextArea } = Input;

export default function CusSettingModule({
  moduleWidth,
  quickFeedBackInfo,
  open,
  closeDrawer,
}: IProps) {
  const [userForm] = Form.useForm();

  const fetchData = async () => {
    if (open) {
      if (userForm) {
        if (Object.keys(quickFeedBackInfo).length) {
          userForm.setFieldsValue({
            content: (quickFeedBackInfo as any).content,
            status: 1,
            id: (quickFeedBackInfo as any).id,
            seq: (quickFeedBackInfo as any).seq,
          });
        } else {
          userForm.setFieldsValue({
            content: "",
            status: 1,
            seq: 0,
          });
        }
      }
    }
  };

  const confirmEditUser = async () => {
    userForm
      ?.validateFields()
      .then(async (values) => {
        if (Object.keys(quickFeedBackInfo).length) {
          const res: any = await updateQuickFeedBack({
            content: values.content,
            status: 1,
            id: quickFeedBackInfo.id,
            seq: values.seq,
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
          const res: any = await updateQuickFeedBack({
            content: values.content,
            status: 1,
            seq: values.seq,
            type: 0
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
      getContainer={false}
      title={Object.keys(quickFeedBackInfo).length === 0 ? "新增" : "编辑"}
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
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 17 }}
          form={userForm}
          initialValues={{
            seq: 0,
          }}
        >
          <Row>
            <Col span={24}>
              <Form.Item
                name="content"
                label="回复内容"
                rules={[{ required: true, message: "请输入快捷回复内容" }]}
              >
                <TextArea
                  rows={4}
                  placeholder="请输入快捷回复内容"
                  maxLength={50}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                name="seq"
                label="排序"
                rules={[{ required: true, message: "请输入快捷回复内容" }]}
              >
                <InputNumber min={0} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      ) : null}
    </Drawer>
  );
}
