import {
  ModalForm,
  ProFormText,
  ProFormDependency,
  ProFormDigit,
  ProFormSelect,
} from '@ant-design/pro-components';
import { useRef } from 'react';
import services from '@/services';
import { BaseModalConfig } from '@/constants';
import common from '@/utils/common';
// import { ChannelTypeEnum } from '@/enums';
import { message } from 'antd';
import _ from 'lodash';
// import {useModel} from "@@/exports";

const WithdrawTypeOptions = [
  { label: '银行卡', value: 0 },
  { label: 'UPI', value: 1 },
];

export default (props: any) => {
  const { visible, setVisible, current, refresh } = props;
  const formRef = useRef<any>();
  // const {getCurrencyOptionItems} = useModel('global');
  // console.log(current, 'current ------>');
  const initialValues: any = {
    currency: current.currency,
    // tunnelId: current.tunnelId,
    originBalance: current.balance ?? 0,
  };

  return (
    <ModalForm
      title="发起通道提现"
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
      width={600}
      onFinish={async (values) => {
        const data: any = await services.channel.getTunnelBalance(current.tunnelId);
        // console.log(data);
        if (_.isNumber(data?.balance)) {
          formRef.current.setFieldValue('originBalance', data?.balance);
          if (Number(values.withdrawAmount) > data?.balance) {
            message.error('提现金额超过通道余额！');
            return false;
          }
        }
        const params = {
          ..._.omit(values, 'currency'),
          tunnelId: current.tunnelId,
        };
        await services.channel.withdraw(params);
        message.success('操作成功');
        setVisible(false);
        refresh && refresh();
        return true;
      }}
      initialValues={initialValues}
    >
      <ProFormText name="currency" label="币种" disabled />
      <ProFormText
        name="originBalance"
        label="通道余额"
        placeholder=""
        disabled
      />
      <ProFormDigit
        name="withdrawAmount"
        label="提现金额"
        placeholder={`请输入提现金额，最低${current.min}，最高${current.max}`}
        min={current.min}
        max={current.max}
        fieldProps={{ precision: 2 }}
        rules={[
          common.ruleUtils.getRule('required', '请输入提现金额'),
          // common.ruleUtils.getRule('validator', '', {
          //   validator: (rule, value, callback) => {
          //     if (![null, undefined, ''].includes(value) && +value === 0) {
          //       return callback('请输入不为0的数字');
          //     }
          //     return callback();
          //   },
          // }),
        ]}
      />
      <ProFormSelect
        name="withdrawType"
        label="提现方式"
        initialValue={0}
        options={WithdrawTypeOptions}
        rules={[common.ruleUtils.getRule('required', '请选择提现方式')]}
      />
      <ProFormText
        name="payeeName"
        label="收款人姓名"
        placeholder="请输入收款人姓名"
        rules={[common.ruleUtils.getRule('required', '请输入收款人姓名')]}
      />
      <ProFormText
        name="payeeAccount"
        label="收款人账号"
        placeholder="请输入收款人账号"
        rules={[common.ruleUtils.getRule('required', '请输入收款人账号')]}
      />
      <ProFormDependency name={['withdrawType']}>
        {({ withdrawType }) => {
          return withdrawType === 0 ? (
            <>
              <ProFormText
                name="ifsc"
                label="IFSC"
                placeholder="请输入IFSC"
                rules={[common.ruleUtils.getRule('required', '请输入IFSC')]}
              />
              <ProFormText
                name="phone"
                label="手机号码"
                placeholder="请输入手机号码"
              />
            </>
          ) : null;
        }}
      </ProFormDependency>
    </ModalForm>
  );
};
