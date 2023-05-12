import {
  ModalForm,
  ProForm,
  ProFormText,
  ProFormSelect,
  ProFormRadio,
  ProFormDependency,
} from '@ant-design/pro-components';
import { useRef, useState } from 'react';
import services from '@/services';
import { useModel } from 'umi';
import { isEmpty, pick, map } from 'lodash';
import { System, APP_IS_PAYMENT, BaseModalConfig } from '@/constants';
import { WithButton } from '@/components';
import { useClipboard } from 'use-clipboard-copy';
import { useAsyncEffect } from 'ahooks';
import common from '@/utils/common';
import { message, CheckboxOptionType } from 'antd';

export default (props: any) => {
  const { merchantList } = useModel('global');
  const { userInfo } = useModel('user');
  const filterMerchantList = merchantList.filter(
    (item) => item.value !== System.BaseAll.value,
  );
  const { visible, setVisible, current, refresh } = props;

  const defaultGoogleSwitch = current?.googleSwitch || 1;

  const [resetLoading, setResetLoading] = useState(false);
  const [googleKey, setGoogleKey] = useState(current?.googleKey ?? '');

  const formRef = useRef<any>();

  const clipboard = useClipboard({
    onSuccess: () => {
      message.success('复制成功');
    },
  });

  const isAdmin = userInfo?.userName === 'admin';
  const isAdd = isEmpty(current);
  let initialValues: any = {
    googleSwitch: defaultGoogleSwitch,
    status: 0,
    ancestors: [],
  };

  if (!isAdd) {
    const data = pick(current, [
      'userId',
      'userName',
      'nickName',
      'roleId',
      'ancestors',
      'googleSwitch',
      'googleKey',
      'status',
      'ips',
      'merchantId',
    ]);

    initialValues = {
      ...data,
      googleSwitch: +data.googleSwitch,
      status: +data.status,
      ancestors:
        data?.ancestors === ''
          ? []
          : data.ancestors.split(',').map((i: string) => +i),
    };
  }

  useAsyncEffect(async () => {
    if (visible) {
      setGoogleKey(current.googleKey ?? '');
    }
  }, [visible]);

  // 重置googleKey
  const handleResetGoogleKey = async () => {
    let Key = '';
    setResetLoading(true);
    // if (isAdd) {
    //   Key = await services.system.account
    //     .getInitGoogleKey()
    //     .finally(() => setResetLoading(false));
    // } else {
    //   Key = await services.system.account
    //     .getUserGoogleKey({
    //       userId: current.userId,
    //     })
    //     .finally(() => setResetLoading(false));
    // }

    Key = await services.system.account
      .getInitGoogleKey()
      .finally(() => setResetLoading(false));

    setGoogleKey(Key);
    formRef?.current?.setFieldsValue({ googleKey: Key });
  };

  // 复制
  const handleCopy = () => {
    if (googleKey) {
      clipboard.copy(googleKey);
    }
  };

  return (
    <ModalForm
      title={isAdd ? '新增账号' : '编辑账号'}
      formRef={formRef}
      open={visible}
      autoFocusFirstInput
      grid
      // layout={'horizontal'}
      // labelCol={{ span: 3 }}
      modalProps={{
        ...BaseModalConfig,
        onCancel: () => setVisible(false),
      }}
      colProps={{ span: 24 }}
      rowProps={{ gutter: 10 }}
      width={700}
      onFinish={async (values) => {
        if (values.ancestors && Array.isArray(values.ancestors)) {
          values.ancestors = values.ancestors.join(',');
        }

        if (isAdd) {
          delete values.confirmPassword;
          await services.system.account.add(values);
        } else {
          values.userId = current.userId;
          await services.system.account.edit(values);
        }

        message.success('操作成功');
        setVisible(false);
        refresh && refresh();
        return true;
      }}
      initialValues={initialValues}
    >
      <ProFormText
        name="nickName"
        label="姓名"
        placeholder="请输入姓名"
        rules={[common.ruleUtils.getRule('required', '请输入姓名')]}
      />

      <ProFormText
        name="userName"
        label="账号"
        placeholder="请输入账号"
        disabled={!isAdd}
        rules={[
          common.ruleUtils.getRule('required', '请输入账号'),
          common.ruleUtils.getRule('username'),
        ]}
      />

      <ProFormText.Password
        name="password"
        label="登录密码"
        placeholder={isAdd ? '请输入密码' : '不修改请留空'}
        rules={
          isAdd
            ? [
                common.ruleUtils.getRule('required', '请输入密码'),
                common.ruleUtils.getRule('password'),
              ]
            : [common.ruleUtils.getRule('password')]
        }
      />

      <ProFormDependency name={['password']}>
        {({ password }) => {
          if (isAdd || (!isAdd && password)) {
            return (
              <ProFormText.Password
                name="confirmPassword"
                label="确认密码"
                placeholder="请重复输入密码"
                fieldProps={{
                  maxLength: 20,
                }}
                rules={[
                  common.ruleUtils.getRule('required', '请重复输入密码'),
                  common.ruleUtils.getRule('validator', '', {
                    validator: (rule, value, callback) => {
                      const password =
                        formRef.current.getFieldFormatValue('password');
                      if (password && value && password !== value) {
                        return callback('两次密码不相同，请检查');
                      }
                      return callback();
                    },
                  }),
                ]}
              />
            );
          }
        }}
      </ProFormDependency>

      <ProFormRadio.Group
        name="googleSwitch"
        label="谷歌验证码"
        placeholder="请选择"
        options={System.SystemAccountGoogleList as CheckboxOptionType[]}
        rules={[common.ruleUtils.getRule('required', '请设置谷歌验证码')]}
      />

      <ProFormDependency name={['googleSwitch']}>
        {({ googleSwitch }) => {
          if (+googleSwitch === 1) {
            return (
              <ProFormText
                name="googleKey"
                label="验证器秘钥"
                width={450}
                disabled
                placeholder="请点击重置按钮生成密钥"
                addonAfter={
                  <div style={{ width: '180px', textAlign: 'right' }}>
                    <WithButton
                      auth
                      type="primary"
                      onClick={handleResetGoogleKey}
                      loading={resetLoading}
                    >
                      重置
                    </WithButton>
                    <WithButton
                      auth
                      type="primary"
                      style={{ marginLeft: '15px' }}
                      onClick={handleCopy}
                    >
                      复制
                    </WithButton>
                  </div>
                }
                rules={[
                  common.ruleUtils.getRule('required', '请设置谷歌验证码'),
                ]}
              />
            );
          }
        }}
      </ProFormDependency>

      <ProFormRadio.Group
        name="status"
        label="状态"
        options={
          System.SystemAccountStatusList.filter(
            (item) => item.value !== System.BaseAll.value,
          ) as CheckboxOptionType[]
        }
        rules={[common.ruleUtils.getRule('required', '请选择状态')]}
      />

      <ProFormSelect
        name="roleId"
        label="后台角色"
        request={services.system.role.optionList}
        rules={[common.ruleUtils.getRule('required', '请选择后台角色')]}
      />

      {APP_IS_PAYMENT && (
        <ProFormSelect
          name="ancestors"
          label="管理范围"
          mode="multiple"
          options={filterMerchantList}
          placeholder="未选择则为全部"
        />
      )}

      {!APP_IS_PAYMENT && isAdmin && (
        <ProFormSelect
          name="merchantId"
          label="绑定商户"
          options={filterMerchantList}
          allowClear={false}
          disabled={!isAdd}
          rules={[common.ruleUtils.getRule('required', '请选择绑定商户')]}
        />
      )}
    </ModalForm>
  );
};
