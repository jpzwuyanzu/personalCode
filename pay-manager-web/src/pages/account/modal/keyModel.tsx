import {
  ModalForm,
  ProForm,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { useRef, useState } from 'react';
import services from '@/services';
import common from '@/utils/common';
import { message, Modal } from 'antd';
import { useAsyncEffect } from 'ahooks';

export default (props: any) => {
  const formRef = useRef<any>();
  const { visible, setVisible, current } = props;

  useAsyncEffect(async () => {
    if (visible) {
      const { merchantApiInfoVO, platFormPublicKey = '' }: any =
        await services.accountInfo.getPayApiInfo({
          merchantId: current.merchantId,
        });
      formRef.current.setFieldsValue({
        platFormPublicKey,
        merchantPublicKey: merchantApiInfoVO?.publicKey || '',
      });
    }
  }, [visible]);

  return (
    <ModalForm
      title="查看秘钥"
      open={visible}
      formRef={formRef}
      modalProps={{
        onCancel: () => {
          setVisible(false);
        },
      }}
      width={800}
      onFinish={async (values) => {
        console.log(values);
        await services.accountInfo.updateMerchantSecret({
          merchantId: current.merchantId,
          publicKey: values.merchantPublicKey,
        });
        message.success('修改成功');
        setVisible(false);
      }}
    >
      <ProFormTextArea
        label="平台公钥"
        name="platFormPublicKey"
        readonly
        fieldProps={{ rows: 10 }}
      />
      <ProFormTextArea
        label="商户公钥"
        name="merchantPublicKey"
        rules={[common.ruleUtils.getRule('required', '请输入商户公钥')]}
      />
    </ModalForm>
  );
};
