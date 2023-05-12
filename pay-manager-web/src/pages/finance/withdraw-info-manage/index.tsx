import { TablePage } from '@/components';
import { Columns } from '@/types';
import services from '@/services';
import { Button, Form, Input, Statistic, Tag } from 'antd';
import { WithdrawExchangeTypeOptions } from '@/constants';
import MerchantConfiguration from '../components/merchant-configuration';
import CurrencyConfiguration from '../components/currency-configuration';
import CurrencyRateConfiguration from '@/pages/finance/components/currency-rate-configuration';
import { useRef } from 'react';
import AmountConfiguration from '@/pages/finance/withdraw-info-manage/amount-configuration';
import WithdrawConfiguration from '@/pages/finance/withdraw-info-manage/withdraw-configuration';
import { ProFormDigitRange, ProFormRadio } from '@ant-design/pro-components';
import common from '@/utils/common';
import { Rule } from 'rc-field-form/lib/interface';
import { useModel } from '@@/exports';

export default () => {
  const tableRef = useRef<any>();

  const { getCurrencyOptionItems } = useModel('global');

  const listRequest = async (params: any) => {
    const data: any = await services.finance.withdrawInfoManage.list(params);
    data.forEach((item: any) => {
      item.amountRange = [item.minAmountOne, item.maxAmountOne];
    });
    return {
      success: true,
      data,
    };
  };

  const editRequest = async (params: any) => {
    delete params.amountRange;
    return services.finance.withdrawInfoManage.edit(params);
  };

  const addRequest = async (params: any) => {
    delete params.amountRange;
    return services.finance.withdrawInfoManage.add(params);
  };

  // @ts-ignore
  const columns: Columns[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '提现方式',
      dataIndex: 'withdrawType',
      valueType: 'select',
      request: async () => WithdrawExchangeTypeOptions,
      hideInForm: true,
    },
    {
      title: '单日最大提现金额',
      dataIndex: 'maxAmountDay',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '单笔提现最小额度',
      dataIndex: 'minAmountOne',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '单笔提现最大额度',
      dataIndex: 'maxAmountOne',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '当日提现最大U金额',
      dataIndex: 'maxAmountDay',
      valueType: 'digit',
      hideInSearch: true,
      hideInTable: true,
      fieldProps: {
        style: {width: 220}
      },
      formItemProps: {
        rules: [common.ruleUtils.getRule('required')],
      },
    },
    {
      title: '单笔提现金额U范围',
      dataIndex: 'amountRange',
      valueType: 'digitRange',
      fieldProps: {
        placeholder: ['最小金额', '最大金额'],
      },
      formItemProps: {
        rules: [common.ruleUtils.getRule('digitRange')],
      },
      hideInSearch: true,
      hideInTable: true,
      transform: (value: any) => {
        return {
          minAmountOne: value[0],
          maxAmountOne: value[1],
        };
      },
    },
    {
      title: '提现手续费',
      dataIndex: 'handlingFee',
      valueType: 'digit',
      fieldProps: {
        addonAfter: '%',
        style: { width: 160 },
        max: 100,
      },
      formItemProps: {
        rules: [common.ruleUtils.getRule('required', '请输入提现手续费')],
      },
      render: (text, record) => record?.handlingFee + '%',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      request: async () => [
        { label: '开启', value: 1 },
        { label: '关闭', value: 2 },
      ],
      render: (dom, record) => (
        <Tag color={record?.status === 1 ? 'green' : 'red'}>{dom}</Tag>
      ),
      fieldProps: {
        allowClear: true,
        placeholder: '请选择状态',
      },
      formItemProps: {
        rules: [{ required: true, message: '请选择状态' }],
      },
      order: 9,
      hideInForm: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      initialValue: 1,
      renderFormItem: (item, { defaultRender, ...rest }, form) => {
        return (
          <ProFormRadio.Group
            {...rest}
            options={[
              { label: '开启', value: 1 },
              { label: '关闭', value: 2 },
            ]}
          />
        );
      },
      formItemProps: {
        style: { marginBottom: 0 },
        rules: [{ required: true, message: '请选择状态' }],
      },
      hideInTable: true,
      hideInSearch: true,
      order: 9,
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      valueType: 'dateTimeRange',
      fieldProps: {
        placeholder: ['开始时间', '结束时间'],
      },
      render: (text, record) => record?.updateTime,
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '币种',
      dataIndex: 'currency',
      valueType: 'select',
      request: () => getCurrencyOptionItems(null),
      fieldProps: {
        allowClear: true,
      },
      hideInForm: true,
      hideInTable: true,
    },
    {
      title: '商户ID',
      dataIndex: 'merchantId',
      hideInTable: true,
      hideInForm: true,
    },
  ];

  return (
    <TablePage
      moduleName={'USDT提现配置'}
      tableRef={tableRef}
      columns={columns}
      listRequest={listRequest}
      editRequest={editRequest}
      addRequest={addRequest}
      changeStatusMap={{ 1: '开启', 2: '关闭' }}
      formWidth={500}
      actions={(record) => [
        <MerchantConfiguration
          key="merchant-configuration"
          record={record}
          request={services.finance.withdrawInfoManage.updateMerchant}
          reload={tableRef?.current?.reload}
        />,
        <CurrencyConfiguration
          key="currency-configuration"
          record={record}
          request={services.finance.withdrawInfoManage.updateCurrency}
          reload={tableRef?.current?.reload}
        />,
        <CurrencyRateConfiguration
          triggerType="link"
          rateType={2}
          configId={record.id}
          key="currency-factor-configuration"
        />,
      ]}
      toolBarActions={(record) => [
        <AmountConfiguration key="amount-configuration" />,
        <WithdrawConfiguration key="withdraw-configuration" />,
        <CurrencyRateConfiguration
          rateType={2}
          key="currency-factor-configuration"
        />,
      ]}
    />
  );
};
