import TablePage from '@/components/TablePage';
import { Columns } from '@/types';
import services from '@/services';
import { Button, Modal, Input, Select, Tag } from 'antd';
import { useState } from 'react';
import {
  MerchantAccountChangeTypeOptions,
  MerchantAccountTypeOptions,
  System,
} from '@/constants';
import common from '@/utils/common';
import { useModel } from 'umi';

export default () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    getMerchantOptionItems,
    getCurrencyOptionItems,
    getFirstCurrencyOption,
  } = useModel('global');
  const listRequest = (params: any, sort: any, filter: any) => {
    return services.merchant.manage.changeBalanceList(params);
  };

  const columns: Columns[] = [
    {
      title: '商户ID',
      dataIndex: 'id',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '账变金额',
      dataIndex: 'amount',
      hideInSearch: true,
    },
    {
      title: '余额',
      dataIndex: 'balance',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '商户号',
      dataIndex: 'merchantId',
      valueType: 'select',
      request: () => getMerchantOptionItems(),
      fieldProps: {
        defaultValue: '',
        allowClear: false,
      },
    },
    {
      title: '类型',
      dataIndex: 'changeType',
      valueType: 'select',
      request: async () => [
        System.BaseAll,
        ...MerchantAccountChangeTypeOptions,
      ],
      fieldProps: {
        defaultValue: '',
        allowClear: false,
      },
    },
    {
      title: '账户类型',
      dataIndex: 'accountType',
      valueType: 'select',
      request: async () => [System.BaseAll, ...MerchantAccountTypeOptions],
      fieldProps: {
        defaultValue: '',
        allowClear: false,
      },
      order: 1,
    },
    {
      title: '币种',
      dataIndex: 'currency',
      valueType: 'select',
      request: () => getCurrencyOptionItems(),
      fieldProps: {
        defaultValue: '',
        allowClear: false,
      },
      hideInForm: true,
    },
    {
      title: '备注',
      dataIndex: 'remark',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '操作人',
      dataIndex: 'updateBy',
      hideInForm: true,
    },
    {
      title: '时间',
      dataIndex: 'datetime',
      valueType: 'dateTimeRange',
      hideInForm: true,
      initialValue: common.dateUtils.getDateRange(1),
      fieldProps: {
        placeholder: ['开始时间', '结束时间'],
        presets: common.dateUtils.rangePresets,
        showTime: {
          defaultValue: common.dateUtils.rangeDefaultTime(),
        },
      },
      search: {
        transform: (value: any) => {
          return {
            beginTime: value[0],
            endTime: value[1],
          };
        },
      },
      formItemProps: {
        rules: [
          {
            required: true,
          },
        ],
      },
      colSize: 1.5,
      hideInTable: true,
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      hideInSearch: true,
    },
  ];

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>修改余额记录</Button>
      <Modal
        title="修改余额记录"
        open={isModalOpen}
        footer={null}
        width={1400}
        onOk={() => {
          setIsModalOpen(false);
        }}
        onCancel={() => {
          setIsModalOpen(false);
        }}
      >
        <div className="modal-table">
          <TablePage
            hiddenToolBar
            columns={columns}
            cardBordered={{
              search: true,
              table: false,
            }}
            searchConfig={{
              span: 6,
              labelWidth: 75,
            }}
            pageSize={10}
            listRequest={listRequest}
          />
        </div>
      </Modal>
    </>
  );
};
