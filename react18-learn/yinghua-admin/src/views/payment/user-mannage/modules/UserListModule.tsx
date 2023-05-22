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
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import MD5 from "md5";
import { createUser, loadRoleList } from "@/api/index";

interface IProps {
  moduleWidth?: any;
  data?: {
    name?: string;
    status?: number;
    id?: number;
  };
  closeDrawer?: () => void;
  open?: boolean;
  userInfo?: any;
}
export default function UserListModule({
  moduleWidth,
  userInfo,
  open,
  closeDrawer,
}: IProps) {
  const [form] = Form.useForm();
  const [roleList, SetRoleList] = useState<any[]>([]);

  const fetchData = async () => {
    if (open) {
      const data: any = await loadRoleList({});
      if (data && data.code && data.code === 200) {
        let filterRoleList: any[] = [];
        if (data.page.list && data.page.list.length) {
          data.page.list.forEach((itm: any) => {
            filterRoleList.push({ value: itm.id, label: itm.name });
          });
        }
        SetRoleList(filterRoleList);
      } else {
        message.open({
          type: "error",
          content: data.msg,
        });
      }
      if (form) {
        if (Object.keys(userInfo).length) {
          form.setFieldsValue({
            name: (userInfo as any).name,
            username: (userInfo as any).username,
            roleid: (userInfo as any).rolesList,
            password: (userInfo as any).password,
            status: (userInfo as any).status,
          });
        } else {
          form.setFieldsValue({
            name: "",
            username: "",
            roleid: "",
            password: "",
            status: true,
          });
        }
      }
    }
  };

  const confirmEditUser = async () => {
    form
      ?.validateFields()
      .then(async (values) => {
        if (Object.keys(userInfo).length) {
          const res: any = await createUser({
            rolesList: values.roleid,
            username: values.username,
            status: Boolean(values.status) ? 1 : 2,
            password: MD5(values.password),
            name: values.name,
            id: userInfo.id,
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
              content: res.msg,
            });
          }
        } else {
          const res: any = await createUser({
            rolesList: values.roleid,
            username: values.username,
            status: Boolean(values.status) ? 1 : 2,
            password: MD5(values.password),
            name: values.name,
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
              content: res.msg,
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
      title={Object.keys(userInfo).length === 0 ? "新增用户" : "编辑用户"}
      size={moduleWidth}
      placement="right"
      onClose={closeDrawer}
      open={open}
      footer={
        <div
          style={{
            textAlign: "right",
            paddingBottom: "20px",
            paddingTop: "20px",
            paddingRight: "20px",
          }}
        >
          <Space>
            <Button type="primary" danger>
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
          form={form}
          initialValues={{
            status: true,
          }}
        >
          <Row>
            <Col span={24}>
              <Form.Item
                name="roleid"
                label="用户角色"
                rules={[{ required: true, message: "请输入用户密码" }]}
              >
                <Select
                  style={{ width: "100%" }}
                  onChange={() => {}}
                  placeholder="请选择用户角色"
                  options={[...roleList]}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                name="name"
                label="用户名称"
                rules={[{ required: true, message: "请输入用户名称" }]}
              >
                <Input placeholder="请输入用户名称" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                name="username"
                label="用户账号"
                rules={[
                  {
                    required: true,
                    pattern: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{5,}$/,
                    message: "账号最少5位,字母和数字",
                  },
                ]}
              >
                <Input placeholder="请输入用户账号" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                name="password"
                label="用户密码"
                rules={[
                  {
                    required: true,
                    pattern: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{5,}$/,
                    message: "密码最少5位,字母和数字",
                  },
                ]}
              >
                <Input.Password placeholder="请输入用户密码" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item name="status" label="用户状态" valuePropName="checked">
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
