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
  InputNumber
} from "antd";
import { respMessage } from '@/utils/message'
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import MD5 from "md5";
import CusUpload from '@/components/CusUpload'
import { createUser, loadRoleList } from "@/api/index";

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
  userInfo?: any;
  fastHeadHost?: any;
}

/**支持的平台列表 支持平台id 1：加藤 2：挖洞  多个平台英文逗号,拼接 manageId*/
const proxyPlatList = [{ label: '加藤平台', value: '1' }, { label: '挖洞平台', value: '2' }]

/**支持的商品类型 1:游戏 2:会员3:金币 多个逗号分隔 payType*/
const proxyMetList = [{ label: '游戏', value: '1' }, { label: '会员', value: '2' },{ label: '金币', value: '3' }]


export default function UserListModule({
  moduleWidth,
  userInfo,
  fastHeadHost,
  open,
  closeDrawer,
}: IProps) {
  const [userForm] = Form.useForm();
  const [roleList, SetRoleList] = useState<any[]>([]);
  const [fastUrl, setFastUrl] = useState<string>('');
  const [choosedRole, setChoosedRole] = useState<any>('');

  const saveUploadImgUrl = (url: string) => {
    setFastUrl(url)
  }

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
          content: respMessage[String(data.code)]
        });
      }
      if (userForm) {
        if (Object.keys(userInfo).length) {
          userForm.setFieldsValue({
            name: (userInfo as any).name,
            username: (userInfo as any).username,
            roleid: (userInfo as any).rolesList,
            status: (userInfo as any).status === 1 ? true : false,
            openStatus: (userInfo as any).openStatus === 1 ? true : false,
            sayStatus:(userInfo as any).sayStatus === 1 ? true : false,
            seq: (userInfo as any).seq,
            fakeOrderCount: (userInfo as any).fakeOrderCount,
            manageId: (userInfo as any).manageId.length ? (userInfo as any).manageId.split(',') : '',
            payType: (userInfo as any).payType.length ? (userInfo as any).payType.split(',') : '',
            headImage: (userInfo as any).headImage ? fastHeadHost+''+(userInfo as any).headImage : ''
          });
          setChoosedRole(userInfo.rolesList)
        } else {
          userForm.setFieldsValue({
            name: "",
            username: "",
            roleid: undefined,
            password: "",
            status: true,
            openStatus: true,
            sayStatus: true,
            seq: 0,
            fakeOrderCount: 0,
            manageId: [],
            payType: [],
            headImage: '',
            confirmPassword: ''
          });
        }
      }
    }
  };

  const confirmEditUser = async () => {
    userForm
      ?.validateFields()
      .then(async (values) => {
        if (Object.keys(userInfo).length) {
          const res: any = await createUser({
            rolesList: values.roleid,
            username: values.username,
            status: Boolean(values.status) ? 1 : 2,
            name: values.name,
            id: userInfo.id,
            openStatus: Boolean(values.openStatus) ? 1 : 2,
            sayStatus: Boolean(values.sayStatus) ? 1 : 2,
            seq: values.seq,
            fakeOrderCount: values.fakeOrderCount,
            manageId: values.manageId ? values.manageId.join(',') : '',
              payType: values.payType ? values.payType.join(',') : '',
            headImage: fastUrl ? fastUrl : (userInfo as any).headImage
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
          if(String(values.password) !== String(values.confirmPassword)) {
            userForm.setFieldsValue({ 'confirmPassword': '' })
            message.open({
              type: "error",
              content: '两次输入的密码不一致!',
            });
          } else {
            const res: any = await createUser({
              rolesList: values.roleid,
              username: values.username,
              status: Boolean(values.status) ? 1 : 2,
              openStatus: Boolean(values.openStatus) ? 1 : 2,
              sayStatus: Boolean(values.sayStatus) ? 1 : 2,
              password: MD5(values.password),
              name: values.name,
              seq: values.seq,
              fakeOrderCount: values.fakeOrderCount,
              manageId: values.manageId ? values.manageId.join(',') : '',
              payType: values.payType ? values.payType.join(',') : '',
              headImage: fastUrl ? fastUrl : ''
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
          
        }
      })
      .catch((errorInfo) => {
        console.log(errorInfo);
      });
  };

  const handleManageIdChange = (value: any) => {
    console.log(value)
  }

  const handlePayTypeChange = (value: any) => {
    console.log(value)
  }

  useEffect(() => {
    fetchData();
  }, [open]);

  return (
    <Drawer
      getContainer={false}
      title={Object.keys(userInfo).length === 0 ? "新增" : "编辑"}
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
            status: true,
            openStatus: true,
            sayStatus: true,
            fakeOrderCount: 0,
            seq: 0
          }}
        >
          <Row>
            <Col span={24}>
            <Form.Item name="headImage" label="用户头像">
            <CusUpload saveUploadImgUrl={saveUploadImgUrl} uploadInfo={userInfo} fastHeadHost={fastHeadHost} isAdd={ Object.keys(userInfo).length === 0 ? true : false }/>
            </Form.Item>
            </Col>
          </Row>
          <Row>
          <Col span={24}>
              <Form.Item
                name="roleid"
                label="代理角色"
                rules={[{ required: true, message: "请输入代理密码" }]}
              >
                <Select
                  style={{ width: "100%" }}
                  onChange={() => {setChoosedRole(userForm.getFieldValue('roleid'))}}
                  placeholder="请选择代理角色"
                  options={[...roleList]}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                name="name"
                label="代理名称"
                rules={[{ required: true, message: "请输入代理名称" }]}
              >
                <Input placeholder="请输入代理名称" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                name="username"
                label="代理账号"
                rules={[
                  {
                    required: true,
                    pattern: /^[a-zA-Z0-9]{5,}$/,
                    message: "账号最少5位,字母和数字",
                  },
                ]}
              >
                <Input placeholder="请输入代理账号" />
              </Form.Item>
            </Col>
          </Row>
          {
            Object.keys(userInfo).length === 0 ? (<><Row>
              <Col span={24}>
                <Form.Item
                  name="password"
                  label="代理密码"
                  rules={[
                    {
                      required: true,
                      pattern: /^[a-zA-Z0-9]{5,}$/,
                      message: "密码最少5位,字母和数字",
                    },
                  ]}
                >
                  <Input.Password placeholder="请输入代理密码" />
                </Form.Item>
              </Col>
            </Row><Row>
                <Col span={24}>
                  <Form.Item
                    name="confirmPassword"
                    label="确认密码"
                    rules={[
                      {
                        required: true,
                        pattern: /^[a-zA-Z0-9]{5,}$/,
                        message: "密码最少5位,字母和数字",
                      },
                    ]}
                  >
                    <Input.Password placeholder="请输入代理密码" />
                  </Form.Item>
                </Col>
              </Row></>) : null
          }
          {
            choosedRole === 3 ?  (<><Row>
              <Col span={24}>
                <Form.Item name="manageId" label="支持平台" rules={[{ required: true, message: "请选择平台" }]}>
                <Select
                  mode="multiple"
                  placeholder="请选择平台"
                  style={{ width: '100%' }}
                  options={[...proxyPlatList]}
                  onChange={handleManageIdChange}
                />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item name="payType" label="支持类型" rules={[{ required: true, message: "请选择类型" }]}>
                <Select
                  mode="multiple"
                  placeholder="请选择类型"
                  style={{ width: '100%' }}
                  options={[...proxyMetList]}
                  onChange={handlePayTypeChange}
                />
                </Form.Item>
              </Col>
            </Row></>) : null
          }
           <Row>
            <Col span={24}>
              <Form.Item name="fakeOrderCount" label="虚拟订单量">
              <InputNumber min={0} />
              </Form.Item>
            </Col>
          </Row>
           <Row>
            <Col span={24}>
              <Form.Item name="seq" label="排序">
              <InputNumber min={0} />
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
          <Row>
            <Col span={24}>
              <Form.Item name="openStatus" label="营业状态" valuePropName="checked">
                <Switch
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item name="sayStatus" label="代理聊天功能" valuePropName="checked">
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
