import { ModalForm, ProForm, ProFormText } from '@ant-design/pro-components';
import { useRef } from 'react';
import services from '@/services';
import common from '@/utils/common';
import { message } from 'antd';

export default (props: any) => {
  const { visible, setVisible, current } = props;
  const formRef = useRef<any>();

  return (
    <ModalForm
      title="修改提现USDT地址"
      formRef={formRef}
      open={visible}
      autoFocusFirstInput
      grid
      modalProps={{
        onCancel: () => {
          formRef.current?.resetFields();
          setVisible(false);
        },
      }}
      colProps={{ span: 24 }}
      rowProps={{ gutter: 10 }}
      width={500}
      onFinish={async (values) => {
        values.id = current.merchantId;
        await services.accountInfo.updateUsdtAddress(values);
        setVisible(false);
        message.success('修改成功');
        props?.reload();
        return true;
      }}
    >
      <ProFormText
        label="账户当前提现USDT地址"
        readonly
        fieldProps={{
          value: current?.usdt || '未设置',
        }}
      />
      <ProFormText
        name="usdt"
        label="新的提现USDT地址"
        placeholder="请输入新的提现USDT地址"
        rules={[
          common.ruleUtils.getRule('required', '请输入新的提现USDT地址'),
          common.ruleUtils.getRule('usdtAddress'),
        ]}
      />
      {current?.isPayPassword === 1 && (
        <ProFormText.Password
          name="payPassword"
          label="支付密码"
          placeholder="请输入支付密码"
          rules={[common.ruleUtils.getRule('required', '请输入支付密码')]}
        />
      )}
    </ModalForm>
  );
};
