import { useEffect } from 'react'
import { Form, Input, Modal, message, InputNumber } from "antd";
import { updateAgentAmount} from "@/api/index";

interface IProps {
  open?: boolean;
  proxyInfo?: any;
  closeModal?: () => void;
  isTop?: boolean
}

const UserRechargeModule: any = ({ open, proxyInfo, closeModal }: IProps) => {

  const [rechargeForm] = Form.useForm();


  const fetchData = async () => {
    if (open) {
      if (rechargeForm) {
        if (Object.keys(proxyInfo).length) {
            rechargeForm.setFieldsValue({
            name: (proxyInfo as any).name,
            username: (proxyInfo as any).username,
            nowAmount: (Number((proxyInfo as any).amount)/100).toFixed(2),
            amount: 0
          });
        }
      }
    }
  };
  
  const handleOk = async () => {
    const values = await rechargeForm.validateFields();
    if (values) {
      const resp: any = await updateAgentAmount({
        id: proxyInfo.id,
        amount: Number(values.amount)*100,
      });
      handleCancel();
      if (resp.code === 200) {
        message.open({
          type: "success",
          content: "修改成功",
        });
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
    (closeModal as any)();
  };


  useEffect(() => {
    fetchData();
  }, [open]);

  return (
    <>
      <Modal
        title="充值"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={rechargeForm}
          name="rechargeForm"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600, paddingTop: 20 }}
          autoComplete="off"
        >
          <Form.Item
            label="代理昵称"
            name="name"
          >
            <Input placeholder="" disabled />
          </Form.Item>

          <Form.Item
            label="代理账号"
            name="username"
          >
            <Input placeholder="" disabled />
          </Form.Item>
          <Form.Item
            label="当前余额"
            name="nowAmount"
          >
            <Input placeholder="" disabled />
          </Form.Item>
          <Form.Item
            label="充值金额"
            name="amount"
          >
            <InputNumber prefix="￥" placeholder="" style={{ width: '200px' }} />
          </Form.Item>
          <p style={{ paddingLeft: '99px', color: 'red' }}>正数为充值，负数为追分</p>
          <p style={{ paddingLeft: '99px', color: 'red', marginBottom: '20px', marginTop: '10px' }}>追分：是指给代理充值额外的金额后，平台追回金额的操作</p>
        </Form>
      </Modal>
    </>
  );
};

export default UserRechargeModule;
