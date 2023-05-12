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
  const [minAmount, setMinAmount] = useState(0);

  useAsyncEffect(async () => {
    const result: any = await services.finance.withdrawInfoManage.getStrategy();
    setMinAmount(result?.reserveAmount);
  }, []);

  return (
    <ModalForm
      layout="horizontal"
      formRef={formRef}
      title={'保留金额设置'}
      open={isModalOpen}
      width={600}
      trigger={
        <Button onClick={() => setIsModalOpen(true)}>保留金额设置</Button>
      }
      onFinish={async (formData) => {
        await services.finance.withdrawInfoManage.saveMinAmount(formData);
        message.success('配置成功');
        setIsModalOpen(false);
      }}
      modalProps={{
        onCancel: () => setIsModalOpen(false),
      }}
    >
      <ProFormDigit
        label="保留金额"
        name="reserveAmount"
        initialValue={minAmount}
        rules={[common.ruleUtils.getRule('required', '请输入保留金额')]}
      />
    </ModalForm>
  );
};
