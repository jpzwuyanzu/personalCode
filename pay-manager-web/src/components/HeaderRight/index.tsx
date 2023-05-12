import { useModel } from '@@/exports';
import { Button, Dropdown, MenuProps, Modal, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { ModalForm, ProForm, ProFormText } from '@ant-design/pro-components';
import services from '@/services';
import common from '@/utils/common';
import { useRef, useState } from 'react';
import Notify from '@/components/HeaderRight/notify';
import { APP_IS_PAYMENT } from '@/constants';

export default () => {
  const { enterMode, isLogin, userInfo, _getUserInfo, _logout } =
    useModel('user');

  const formRef = useRef<any>();
  const [isOpenPwd, setIsOpenPwd] = useState(false);

  const items: MenuProps['items'] = [
    {
      key: 'change-password',
      label: '修改密码',
      style: { lineHeight: 2 },
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: '退出登录',
      style: { lineHeight: 2 },
    },
  ];

  const PasswordModal = isLogin ? (
    <ModalForm
      title="修改密码"
      formRef={formRef}
      open={isOpenPwd}
      autoFocusFirstInput
      modalProps={{
        centered: true,
        destroyOnClose: true,
        onCancel: () => setIsOpenPwd(false),
      }}
      grid
      colProps={{ span: 24 }}
      rowProps={{ gutter: 10 }}
      width={500}
      onFinish={async (values) => {
        console.log(values);
        await services.user.resetUserPwd(values);

        Modal.confirm({
          centered: true,
          keyboard: false,
          maskClosable: false,
          closable: false,
          okText: false,
          title: '退出登录',
          content: '密码修改成功后需要重新登录',
          footer: (
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                key="submit"
                type="primary"
                onClick={async () => {
                  await _logout();
                  setIsOpenPwd(false);
                  Modal.destroyAll();
                }}
              >
                确定
              </Button>
            </div>
          ),
        });
        setIsOpenPwd(false);
        return true;
      }}
      initialValues={{ username: userInfo.userName }}
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
          name="oldPassword"
          label="旧密码"
          placeholder="请输入旧密码"
          fieldProps={{
            maxLength: 20,
          }}
          rules={[
            common.ruleUtils.getRule('required', '请输入密码！'),
            common.ruleUtils.getRule('password'),
          ]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText.Password
          name="newPassword"
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
                const oldPwd =
                  formRef.current.getFieldFormatValue('oldPassword');
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
        <div style={{ color: '#f29e42' }}>密码修改成功后需要重新登录</div>
      </ProForm.Group>
    </ModalForm>
  ) : null;

  const onClick: MenuProps['onClick'] = ({ key }) => {
    switch (key) {
      case 'change-password': {
        setIsOpenPwd(true);
        break;
      }
      case 'logout': {
        _logout();
        break;
      }
      default:
        break;
    }
  };

  return (
    <>
      {APP_IS_PAYMENT && <Notify />}
      <Dropdown menu={{ items, onClick, style: { textAlign: 'center' } }}>
        <Space>
          {userInfo.userName && <span>欢迎：{userInfo.userName}</span>}
          {userInfo.roleName && (
            <span style={{ padding: '0 6px' }}>岗位：{userInfo.roleName}</span>
          )}
          <DownOutlined />
        </Space>
      </Dropdown>
      {PasswordModal}
    </>
  );
};
