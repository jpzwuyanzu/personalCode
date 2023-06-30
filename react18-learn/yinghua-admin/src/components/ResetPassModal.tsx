import { useNavigate } from 'react-router-dom'
import { Form, Input, Modal, message } from "antd";
import MD5 from "md5";
import { resetUser, loginOut} from "@/api/index";

interface IProps {
  open?: boolean;
  userInfo?: any;
  closeModal?: () => void;
  isTop?: boolean
}

const UserListModal: any = ({ open, userInfo, isTop, closeModal }: IProps) => {

  const [passForm] = Form.useForm();
  const navigate = useNavigate()
  
  const handleOk = async () => {
    const values = await passForm.validateFields();
    if (values) {
      const resp: any = await resetUser({
        id: userInfo.id,
        password: MD5(values.password),
        oldpassword: MD5(values.oldpassword),
      });
      handleCancel();
      if (resp.code === 200) {
        message.open({
          type: "success",
          content: "修改成功",
        });
        //如果是顶部自己修改自己的密码，成功之后需要执行一次退出登录
        if(isTop) {
          loginOutNow()
        }
      } else {
        message.open({
          type: "error",
          content: resp.msg,
        });
      }
    } else {
      console.log(values);
    }
  };

  const handleCancel = () => {
    if (passForm) {
      passForm?.setFieldsValue({ oldpassword: "", password: "" });
    }
    (closeModal as any)();
  };

  const loginOutNow = async () => {
    const resp: any = await loginOut();
    if (resp.code && resp.code === 200) {
      localStorage.clear();
      sessionStorage.clear()
      navigate("/login");
      message.open({
        type: "success",
        content: "退出登录",
      });
    } else {
      message.open({
        type: "error",
        content: resp.payload.msg,
      });
    }
  };

  return (
    <>
      <Modal
        title="重置密码"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={passForm}
          name="passForm"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600, paddingTop: 20 }}
          autoComplete="off"
        >
          <Form.Item
            label="旧密码"
            name="oldpassword"
            rules={[
              {
                required: true,
                pattern: /^[a-zA-Z0-9]{5,}$/,
                message: "至少5位，字母和数字",
              },
            ]}
          >
            <Input.Password placeholder="请输入旧密码" />
          </Form.Item>

          <Form.Item
            label="新密码"
            name="password"
            rules={[
              {
                required: true,
                pattern: /^[a-zA-Z0-9]{5,}$/,
                message: "至少5位，字母和数字",
              },
            ]}
          >
            <Input.Password placeholder="请输入新密码" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UserListModal;
