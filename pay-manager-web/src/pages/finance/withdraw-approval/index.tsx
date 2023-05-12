import { TablePage } from '@/components';
import { Columns } from '@/types';
import services from '@/services';
import { useModel } from '@@/exports';
import { Statistic, Tag } from 'antd';
import { useEffect, useRef, useState } from 'react';
import {
  APP_IS_PAYMENT,
  WithdrawAuditStatusOptions,
  WithdrawExchangeTypeOptions,
} from '@/constants';
import ViewDetail from '@/pages/finance/withdraw-approval/view-detail';
import ChangeStatus from '@/pages/finance/withdraw-approval/change-status';
import ManualWithdraw from '@/pages/finance/withdraw-approval/manual-withdraw';
import { useSearchParams, useLocation } from 'umi';
import common from '@/utils/common';
import dayjs from 'dayjs';

export default () => {
  const tableRef = useRef<any>();
  const searchFormRef = useRef<any>();

  const { getCurrencyOptionItems } = useModel('global');
  const [searchParams, setSearchParams] = useSearchParams();

  const [statisticData, setStatisticData] = useState({
    handlingFee: '',
    payedAmount: '',
    payedNum: '',
    payingAmount: '',
    payingNum: '',
    pendingAmount: '',
    pendingNum: '',
    realAmount: '',
    refundAmount: '',
    refundNum: '',
  });

  const listRequest = async (params: any) => {
    const { records, total, data }: any =
      await services.finance.withdrawApproval.list(params);
    setStatisticData(data);

    return {
      success: true,
      data: records,
      total,
    };
  };

  useEffect(() => {
    searchFormRef.current?.setFieldsValue({
      orderNumber: searchParams.get('orderNumber'),
    });
    searchFormRef.current?.submit();
  }, [location.search]);

  const columns: Columns[] = [
    {
      title: '提现订单号',
      dataIndex: 'orderNumber',
      width: 200,
      copyable: true,
      initialValue: searchParams.get('orderNumber'),
    },
    {
      title: '商户ID',
      dataIndex: 'merchantId',
      hideInSearch: !APP_IS_PAYMENT,
    },
    {
      title: '商户名称',
      dataIndex: 'merchantName',
      hideInSearch: true,
    },
    {
      title: '提现金额',
      dataIndex: 'amount',
      hideInSearch: true,
    },
    {
      title: '订单金额',
      dataIndex: 'orderAmount',
      valueType: 'digitRange',
      hideInTable: true,
      hideInSearch: !APP_IS_PAYMENT,
      search: {
        transform: (value: any) => {
          return {
            amountMin: value?.[0],
            amountMax: value?.[1],
          };
        },
      },
    },
    {
      title: APP_IS_PAYMENT ? '需打款金额' : '实际获得提现金额',
      dataIndex: 'realAmount',
      hideInSearch: true,
      width: 130,
      render: (_, record: any) => (
        <span className={record?.auditStatus === 0 ? 'text-red' : ''}>
          {record?.realAmount}
        </span>
      ),
    },
    {
      title: '换算系数',
      dataIndex: 'exchangeRate',
      hideInSearch: true,
    },
    {
      title: '手续费',
      dataIndex: 'handlingFee',
      hideInSearch: true,
    },
    {
      title: '发起时间',
      dataIndex: 'createTime',
      valueType: 'dateTimeRange',
      fieldProps: {
        placeholder: ['开始时间', '结束时间'],
        presets: common.dateUtils.rangePresets,
        showTime: {
          defaultValue: common.dateUtils.rangeDefaultTime(),
        },
      },
      width: 160,
      colSize: 1.5,
      render: (_, record: any) => record?.createTime,
      search: {
        transform: (value: any) => {
          return {
            beginTime: value?.[0],
            endTime: value?.[1],
          };
        },
      },
    },
    {
      title: '更新时间',
      dataIndex: 'finishTime',
      valueType: 'dateTimeRange',
      fieldProps: {
        placeholder: ['开始时间', '结束时间'],
        presets: common.dateUtils.rangePresets,
        showTime: {
          defaultValue: common.dateUtils.rangeDefaultTime(),
        },
      },
      width: 160,
      colSize: 1.5,
      render: (_, record: any) => record?.finishTime,
      search: {
        transform: (value: any) => {
          return {
            finishBeginTime: value?.[0],
            finishEndTime: value?.[1],
          };
        },
      },
    },
    {
      title: '提现类型',
      dataIndex: 'exchangeType',
      valueType: 'select',
      request: async () => [
        {
          label: '全部',
          value: '',
        },
        ...WithdrawExchangeTypeOptions,
      ],
      fieldProps: {
        defaultValue: '',
        allowClear: false,
      },
    },
    {
      title: '需打款货币金额',
      dataIndex: 'amountUSDT',
      hideInSearch: true,
      width: 160,
    },
    {
      title: '币种',
      dataIndex: 'currency',
      valueType: 'select',
      width: 140,
      request: async () => getCurrencyOptionItems(),
      fieldProps: {
        defaultValue: '',
        allowClear: false,
      },
    },
    {
      title: '审核状态',
      dataIndex: 'auditStatus',
      valueType: 'select',
      request: async () => [
        {
          label: '全部',
          value: '',
        },
        ...WithdrawAuditStatusOptions,
      ],
      fieldProps: {
        defaultValue: '',
        allowClear: false,
      },
      render: (text, record) => {
        const findItem = WithdrawAuditStatusOptions.find(
          (item) => item.value === record?.auditStatus,
        );
        return <Tag color={findItem?.color}>{text}</Tag>;
      },
    },
    {
      title: '发起人账号',
      dataIndex: 'createBy',
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: '提现IP',
      dataIndex: 'exchangeIp',
      hideInSearch: true,
      hideInTable: !APP_IS_PAYMENT,
    },
    {
      title: '备注',
      dataIndex: 'remark',
      width: 140,
      hideInSearch: true,
    },
    {
      title: '操作人',
      dataIndex: 'updateBy',
      hideInTable: !APP_IS_PAYMENT,
    },
  ];

  return (
    <TablePage
      tableRef={tableRef}
      searchFormRef={searchFormRef}
      columns={columns}
      scroll={{ x: 2100 }}
      actionsWidth={145}
      listRequest={listRequest}
      onReset={() => {
        searchFormRef.current?.resetFields();
        setSearchParams({});
      }}
      actions={(record) =>
        APP_IS_PAYMENT
          ? [
              <ViewDetail
                key="view"
                record={record}
                reload={tableRef?.current?.reload}
              />,
              record?.auditStatus !== 2 && record?.auditStatus !== 4 && (
                <ChangeStatus
                  key="change-status"
                  record={record}
                  reload={tableRef?.current?.reload}
                />
              ),
            ]
          : []
      }
      toolBarActions={() => [
        !APP_IS_PAYMENT && (
          <ManualWithdraw
            key="manual-withdraw"
            reload={tableRef?.current?.reload}
          />
        ),
      ]}
      footer={() => (
        <div className="footer-statistic">
          <div className="row">
            <span className="row-title">提现次数：</span>
            <Statistic title="待打款" value={statisticData?.pendingNum || 0} />
            <Statistic title="已打款" value={statisticData?.payedNum || 0} />
            <Statistic title="打款中" value={statisticData?.payingNum || 0} />
            <Statistic title="已退款" value={statisticData?.refundNum || 0} />
          </div>
          <div className="row">
            <span className="row-title">提现金额：</span>
            <Statistic
              title="待打款"
              value={statisticData?.pendingAmount || 0}
            />
            <Statistic title="已打款" value={statisticData?.payedAmount || 0} />
            <Statistic
              title="实际打款"
              value={statisticData?.realAmount || 0}
            />
            <Statistic title="手续费" value={statisticData?.handlingFee || 0} />
            <Statistic
              title="打款中"
              value={statisticData?.payingAmount || 0}
            />
            <Statistic
              title="已退款"
              value={statisticData?.refundAmount || 0}
            />
          </div>
        </div>
      )}
    />
  );
};
