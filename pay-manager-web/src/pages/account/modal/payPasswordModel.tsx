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
      title="修改支付密码"
      formRef={formRef}
      open={visible}
      autoFocusFirstInput
      grid
      modalProps={{
        centered: true,
        destroyOnClose: true,
        onCancel: () => setVisible(false),
      }}
      colProps={{ span: 24 }}
      rowProps={{ gutter: 10 }}
      width={500}
      onFinish={async (values) => {
        values.id = current.merchantId;
        await services.accountInfo.updatePayPassword(values);
        setVisible(false);
        message.success('修改成功');
        return true;
      }}
      initialValues={{ username: current?.userName }}
    >
      {current?.isPayPassword === 1 && (
        <ProFormText.Password
          name="oldPayPassword"
          label="旧密码"
          placeholder="请输入旧密码"
          fieldProps={{
            maxLength: 20,
          }}
          rules={[
            common.ruleUtils.getRule('required', '请输入旧密码'),
            common.ruleUtils.getRule('password'),
          ]}
        />
      )}

      <ProFormText.Password
        name="payPassword"
        label="新密码"
        placeholder="请输入新密码"
        fieldProps={{
          maxLength: 20,
        }}
        rules={[
          common.ruleUtils.getRule('required', '请输入密码'),
          common.ruleUtils.getRule('password'),
          common.ruleUtils.getRule('validator', '', {
            validator: (rule, value, callback) => {
              const oldPwd =
                formRef.current.getFieldFormatValue('oldPayPassword');
              if (oldPwd && oldPwd === value) {
                return callback('新密码与旧密码不可相同');
              }
              return callback();
            },
          }),
        ]}
      />

      <ProFormText.Password
        name="confirmPassword"
        label="确认密码"
        placeholder="请再次输入密码"
        fieldProps={{
          maxLength: 20,
        }}
        rules={[
          common.ruleUtils.getRule('required', '请输入密码'),
          // common.ruleUtils.getRule('password'),
          common.ruleUtils.getRule('validator', '', {
            validator: (rule, value, callback) => {
              const oldPwd = formRef.current.getFieldFormatValue('payPassword');
              if (oldPwd && value && oldPwd !== value) {
                return callback('两次密码不相同，请检查');
              }
              return callback();
            },
          }),
        ]}
      />
    </ModalForm>
  );
};
