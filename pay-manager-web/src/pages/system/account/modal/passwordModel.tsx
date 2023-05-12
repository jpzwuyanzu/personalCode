import { ModalForm, ProForm, ProFormText } from '@ant-design/pro-components';
import { useRef } from 'react';
import services from '@/services';
import { BaseModalConfig } from '@/constants'
import common from '@/utils/common';

export default (props: any) => {
  const { visible, setVisible, current } = props;
  const formRef = useRef<any>();

  return (
    <ModalForm
      title="修改密码"
      formRef={formRef}
      open={visible}
      autoFocusFirstInput
      grid
      modalProps={{
        ...BaseModalConfig,
        onCancel: () => setVisible(false),
      }}
      colProps={{ span: 24 }}
      rowProps={{ gutter: 10 }}
      width={500}
      onFinish={async (values) => {
        values.userId = current.userId;
        delete values.confirmPwd;
        await services.system.account.updatePassword(values);
        setVisible(false);
        return true;
      }}
      initialValues={{ username: current?.userName }}
    >
      <ProForm.Group>
        <ProFormText
          name="username"
          label="账户名"
          placeholder="请输入账户名"
          disabled
          rules={[
            common.ruleUtils.getRule('required', '请输入用户名!'),
            common.ruleUtils.getRule('username'),
          ]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText.Password
          name="newPwd"
          label="新密码"
          placeholder="请输入新密码"
          fieldProps={{
            maxLength: 20,
          }}
          rules={[
            common.ruleUtils.getRule('required', '请输入密码！'),
            common.ruleUtils.getRule('password'),
            common.ruleUtils.getRule('validator', '', {
              validator: (rule, value, callback) => {
                const oldPwd = formRef.current.getFieldFormatValue('password');
                if (oldPwd && oldPwd === value) {
                  return callback('新密码与旧密码不可相同');
                }
                return callback();
              },
            }),
          ]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText.Password
          name="confirmPwd"
          label="确认密码"
          placeholder="请再次输入密码"
          fieldProps={{
            maxLength: 20,
          }}
          rules={[
            common.ruleUtils.getRule('required', '请输入密码！'),
            // common.ruleUtils.getRule('password'),
            common.ruleUtils.getRule('validator', '', {
              validator: (rule, value, callback) => {
                const oldPwd = formRef.current.getFieldFormatValue('newPwd');
                if (oldPwd && value && oldPwd !== value) {
                  return callback('两次密码不相同，请检查');
                }
                return callback();
              },
            }),
          ]}
        />
      </ProForm.Group>
    </ModalForm>
  );
};
