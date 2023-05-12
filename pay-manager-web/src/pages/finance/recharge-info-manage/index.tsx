import { TablePage } from '@/components';
import { Columns } from '@/types';
import services from '@/services';
import { useModel } from '@@/exports';
import { Button, Form, Input, Statistic, Tag } from 'antd';
import { ProFormText, ProFormFieldSet } from '@ant-design/pro-form';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { WithdrawExchangeTypeOptions } from '@/constants';
import CurrencyConfiguration from '../components/currency-configuration';
import MerchantConfiguration from '../components//merchant-configuration';
import common from '@/utils/common';
import UpdateModal from '@/pages/finance/recharge-info-manage/update-modal';
import { useRef } from 'react';
import CurrencyRateConfiguration from '@/pages/finance/components/currency-rate-configuration';

export default () => {
  const tableRef = useRef<any>();

  const {
    getMerchantOptionItems,
    getFirstMerchantOption,
    getCurrencyOptionItems,
    getFirstCurrencyOption,
  } = useModel('global');

  const columns: Columns[] = [
    {
      title: '商城页签',
      dataIndex: 'id',
      valueType: 'select',
      request: async () => WithdrawExchangeTypeOptions,
      hideInSearch: true,
      hideInForm: true,
      render: (text, record) => 'USDT',
    },
    {
      title: '币种',
      dataIndex: 'currency',
      valueType: 'select',
      request: async () => getCurrencyOptionItems(),
      fieldProps: {
        allowClear: false,
        defaultValue: '',
      },
      hideInForm: true,
      hideInTable: true,
    },
    {
      title: '跳转方式',
      dataIndex: 'jumpType',
      valueType: 'radio',
      request: async () => [
        { label: 'USDT信息', value: 1 },
        { label: '链接', value: 2 },
      ],
      initialValue: 1,
      hideInSearch: true,
      order: 5,
    },
    {
      title: '温馨提示',
      dataIndex: 'kindTips',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '教程链接',
      dataIndex: 'tutorialUrl',
      hideInSearch: true,
    },
    {
      title: 'USDT信息/跳转链接',
      dataIndex: 'content',
      hideInSearch: true,
      render: (text, record) => {
        const items = JSON.parse(record?.content || '[]');
        return record?.jumpType === 1
          ? items.map((item: any, index: number) => (
              <div key={index}>
                <span>{item?.address}：</span>
                <span>{item?.showRate}%</span>
              </div>
            ))
          : record?.jumpUrl;
      },
      formItemProps: {
        rules: [common.ruleUtils.getRule('required')],
      },
    },
    {
      title: '今日收款金额',
      dataIndex: 'todayAmount',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '充值U数量',
      dataIndex: 'minRecharge',
      hideInSearch: true,
      hideInForm: true,
      render: (text, record) => {
        return `${record?.minRecharge} - ${record?.maxRecharge}`;
      },
    },
    {
      title: '充值U额度',
      dataIndex: 'recharge',
      valueType: 'digitRange',
      formItemProps: {
        rules: [common.ruleUtils.getRule('required')],
      },
      hideInSearch: true,
      hideInTable: true,
      order: 2,
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      request: async () => [
        { label: '全部', value: '' },
        { label: '开启', value: 1 },
        { label: '关闭', value: 2 },
      ],
      render: (text, record) => {
        return <Tag color={record?.status === 1 ? 'green' : 'red'}>{text}</Tag>;
      },
      fieldProps: {
        allowClear: false,
        defaultValue: '',
      },
      hideInForm: true,
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
  ];

  return (
    <TablePage
      tableRef={tableRef}
      columns={columns}
      listRequest={services.finance.rechargeInfoManage.list}
      // addRequest={services.finance.rechargeInfoManage.add}
      changeStatusRequest={services.finance.rechargeInfoManage.changeStatus}
      changeStatusMap={{ 1: '开启', 2: '关闭' }}
      actions={(record) => [
        <UpdateModal
          key="edit"
          type="edit"
          record={record}
          reload={tableRef?.current?.reload}
        />,
        <MerchantConfiguration
          key="merchant-configuration"
          record={record}
          request={services.finance.rechargeInfoManage.updateMerchant}
          reload={tableRef?.current?.reload}
        />,
        <CurrencyConfiguration
          key="currency-configuration"
          record={record}
          request={services.finance.rechargeInfoManage.updateCurrency}
          reload={tableRef?.current?.reload}
        />,
      ]}
      toolBarActions={(record) => [
        <CurrencyRateConfiguration
          rateType={1}
          key="currency-factor-configuration"
        />,
        <UpdateModal key="add" type="add" reload={tableRef?.current?.reload} />,
      ]}
    />
  );
};
