import { ModalForm, ProForm, ProFormText } from '@ant-design/pro-components';
import { Modal } from 'antd';
import { useEffect, useRef, useState } from 'react';
import services from '@/services';
import common from '@/utils/common';
import { useModel } from 'umi';

type Props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  callback: () => void;
};

export default (props: Props) => {
  const { visible, setVisible } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [password, setPassword] = useState('');
  const formRef = useRef<any>();
  const { setIsFirstPayPassword, merchantInfo } = useModel('merchant');

  useEffect(() => {
    formRef?.current?.resetFields();
  }, [visible]);

  const validPassword = async () => {
    try {
      setConfirmLoading(true);
      await services.accountInfo.validPayPassword({
        merchantId: merchantInfo?.merchantId,
        password,
      });
      setIsFirstPayPassword(true);
      setVisible(false);
      props.callback();
    } finally {
      setConfirmLoading(false);
    }
  };

  return (
    <Modal
      title="验证支付密码"
      open={visible}
      width={500}
      onCancel={() => setVisible(false)}
      confirmLoading={confirmLoading}
      onOk={async () => {
        await formRef?.current?.validateFields();
        return validPassword();
      }}
    >
      <ProForm submitter={false} formRef={formRef} autoFocusFirstInput>
        <ProFormText.Password
          name="password"
          placeholder="请输入商户支付密码，进行验证操作"
          fieldProps={{
            maxLength: 20,
            onChange: (e: any) => {
              setPassword(e.target.value);
            },
            autoFocus: true,
          }}
          rules={[common.ruleUtils.getRule('required', '请输入商户支付密码')]}
        />
      </ProForm>
    </Modal>
  );
};
