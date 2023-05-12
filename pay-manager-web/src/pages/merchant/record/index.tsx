import TablePage from '@/components/TablePage';
import { Columns } from '@/types';
import services from '@/services';
import { Button, Table } from 'antd';
import {
  APP_IS_PAYMENT,
  MerchantAccountChangeTypeOptions,
  MerchantAccountTypeOptions,
  StatusSelectItems,
  System,
} from '@/constants';
import { useRef, useState } from 'react';
import common from '@/utils/common';
import _ from 'lodash';
import { useModel } from '@@/exports';

export default () => {
  const { getMerchantOptionItems, getCurrencyOptionItems } = useModel('global');

  const [statisticData, setStatisticData] = useState<any>({ amount: '' });

  const listRequest = async (params: any, sort: any, filter: any) => {
    const { data, total, records }: any = await services.merchant.record.list(
      params,
    );
    setStatisticData(data);
    return {
      success: true,
      data: records,
      total,
    };
  };

  const columns: Columns[] = [
    {
      title: '流水号',
      dataIndex: 'orderId',
      order: 5,
    },
    {
      title: '商户号',
      dataIndex: 'merchantId',
      hideInSearch: !APP_IS_PAYMENT,
    },
    {
      title: '账变前余额',
      dataIndex: 'beforeAmount',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '余额',
      dataIndex: 'balance',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '账变金额',
      dataIndex: 'amount',
      hideInSearch: true,
      hideInForm: true,
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
    // {
    //   title: '账变类型',
    //   dataIndex: 'changeTypeList',
    //   valueType: 'select',
    //   fieldProps: {
    //     mode: 'multiple',
    //     allowClear: false,
    //   },
    //   request: async () => [...MerchantAccountChangeTypeOptions],
    //   hideInTable: true,
    // },
    {
      title: '账变类型',
      dataIndex: 'changeType',
      valueType: 'select',
      request: async () => MerchantAccountChangeTypeOptions,
      fieldProps: {
        mode: 'multiple',
        allowClear: false,
      },
      search: {
        transform: (value: any) => {
          return {
            changeTypeList: value,
          };
        },
      },
      order: 8,
    },
    {
      title: '账户类型',
      dataIndex: 'accountType',
      valueType: 'select',
      fieldProps: {
        defaultValue: '',
      },
      request: async () => [
        {
          label: '全部',
          value: '',
        },
        ...MerchantAccountTypeOptions,
      ],
    },
    {
      title: '时间',
      dataIndex: 'datetime',
      valueType: 'dateTimeRange',
      hideInForm: true,
      initialValue: common.dateUtils.getDateRange(7),
      fieldProps: () => {
        return {
          placeholder: ['开始时间', '结束时间'],
          presets: common.dateUtils.rangePresets,
          showTime: {
            defaultValue: common.dateUtils.rangeDefaultTime(),
          },
        };
      },
      formItemProps: {
        rules: [
          {
            required: true,
          },
        ],
      },
      search: {
        transform: (value: any) => {
          return {
            beginTime: value?.[0],
            endTime: value?.[1],
          };
        },
      },
      render: (text: any, record: any) => record?.updateTime,
      colSize: 1.5,
      order: 9,
    },
  ];

  return (
    <>
      <TablePage
        moduleTitle="商户账变记录"
        columns={columns}
        listRequest={listRequest}
        exportRequest={services.merchant.record.export}
        polling={3000}
        summary={(pageData) => {
          return (
            <>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0} align="center">
                  总计
                </Table.Summary.Cell>
                <Table.Summary.Cell index={1}></Table.Summary.Cell>
                <Table.Summary.Cell index={2}></Table.Summary.Cell>
                <Table.Summary.Cell index={3}></Table.Summary.Cell>
                <Table.Summary.Cell index={4} align="center">
                  {statisticData?.amount}
                </Table.Summary.Cell>
                <Table.Summary.Cell index={4}></Table.Summary.Cell>
                <Table.Summary.Cell index={5}></Table.Summary.Cell>
                <Table.Summary.Cell index={6}></Table.Summary.Cell>
                <Table.Summary.Cell index={7}></Table.Summary.Cell>
              </Table.Summary.Row>
            </>
          );
        }}
      />
    </>
  );
};
