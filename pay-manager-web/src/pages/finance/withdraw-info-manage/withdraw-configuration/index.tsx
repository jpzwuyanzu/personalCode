import services from '@/services';
import { Button, Modal, Input, Select, Tag, message, Checkbox } from 'antd';
import { useRef, useState } from 'react';
import common from '@/utils/common';
import { useModel } from '@@/exports';
import {
  ModalForm,
  ProDescriptions,
  ProForm,
  ProFormCheckbox,
  ProFormDigit,
  ProFormField,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { useAsyncEffect } from 'ahooks';

export default () => {
  const formRef = useRef<any>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [config, setConfig] = useState<any>({
    accountBindCount: 2,
    dayWithdrawCount: 10,
    orderNoFinishCount: 1,
  });

  useAsyncEffect(async () => {
    const result: any = await services.finance.withdrawInfoManage.getStrategy();
    setConfig(result);
  }, []);

  return (
    <ModalForm
      formRef={formRef}
      title={'提现机制设置'}
      open={isModalOpen}
      width={600}
      trigger={
        <Button onClick={() => setIsModalOpen(true)}>提现机制设置</Button>
      }
      onFinish={async (formData) => {
        await services.finance.withdrawInfoManage.saveStrategy(formData);
        message.success('配置成功');
        setIsModalOpen(false);
      }}
      modalProps={{
        onCancel: () => setIsModalOpen(false),
      }}
      initialValues={config}
    >
      <ProFormDigit
        label="同出款账号可以绑定ID数"
        name="accountBindCount"
        rules={[common.ruleUtils.getRule('required')]}
      />

      <ProFormDigit
        label="每日提现总次数"
        name="dayWithdrawCount"
        rules={[common.ruleUtils.getRule('required')]}
      />

      <ProFormDigit
        label="同时允许未完成订单笔数"
        name="orderNoFinishCount"
        rules={[common.ruleUtils.getRule('required')]}
      />
    </ModalForm>
  );
};
