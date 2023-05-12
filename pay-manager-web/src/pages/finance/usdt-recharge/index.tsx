import { TablePage, WithLink } from '@/components';
import { Columns, RowActionType } from '@/types';
import services from '@/services';
import { useModel, useSearchParams, useLocation } from 'umi';
import { message, Modal, Popconfirm, Statistic, Tag } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import {
  APP,
  APP_IS_PAYMENT,
  BaseModalConfig,
  USDTOrderStatusOptions,
} from '@/constants';
import ManualRecharge from '@/pages/finance/usdt-recharge/manual-recharge';
import common from '@/utils/common';

export default () => {
  const tableRef = useRef<any>();
  const searchFormRef = useRef<any>();

  const { getCurrencyOptionItems } = useModel('global');
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const [statisticData, setStatisticData] = useState({
    rechargeNum: '',
    rechargeSucAmount: '',
    rechargeSucNum: '',
  });

  const listRequest = async (params: any) => {
    const { records, total, data }: any =
      await services.finance.usdtRecharge.list(params);
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
      title: '订单号',
      dataIndex: 'orderNumber',
      width: 200,
      copyable: true,
      initialValue: searchParams.get('orderNumber'),
    },
    {
      title: '收款ID',
      dataIndex: 'payeeId',
      hideInTable: true,
    },
    {
      title: '操作前余额',
      dataIndex: 'beforeMoney',
      hideInSearch: true,
    },
    {
      title: '操作后余额',
      dataIndex: 'afterMoney',
      hideInSearch: true,
    },
    {
      title: '充值金额',
      dataIndex: 'rechargeAmount',
    },
    {
      title: '换算系数',
      dataIndex: 'exchangeRate',
      hideInSearch: true,
    },
    {
      title: 'USDT金额',
      dataIndex: 'amountUSDT',
    },
    {
      title: '商品名称',
      dataIndex: 'merchantName',
      hideInSearch: true,
    },
    {
      title: '商户ID',
      dataIndex: 'merchantId',
    },
    {
      title: '收款地址',
      dataIndex: 'receiptsAddress',
      hideInSearch: true,
      width: 250,
      ellipsis: true,
      copyable: true,
    },
    {
      title: 'UTR',
      dataIndex: 'txnId',
      width: 140,
      ellipsis: true,
    },
    {
      title: '币种',
      dataIndex: 'currency',
      valueType: 'select',
      request: async () => getCurrencyOptionItems(),
      width: 140,
      fieldProps: {
        allowClear: false,
        defaultValue: '',
      },
    },
    {
      title: '支付状态',
      dataIndex: 'status',
      valueType: 'select',
      request: async () => [
        { label: '全部', value: '' },
        ...USDTOrderStatusOptions,
      ],
      render: (dom, record) => {
        const item = USDTOrderStatusOptions.find(
          (item) => item.value === record.status,
        );
        return <Tag color={item.color}>{dom}</Tag>;
      },
      fieldProps: {
        allowClear: false,
        defaultValue: '',
      },
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
      search: {
        transform: (value) => {
          return {
            beginTime: value[0],
            endTime: value[1],
          };
        },
      },
      render: (dom, record) => record?.createTime,
    },
    {
      title: '完成时间',
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
      search: {
        transform: (value) => {
          return {
            startFinishTime: value[0],
            endFinishTime: value[1],
          };
        },
      },
      render: (dom, record) => record?.finishTime,
    },
    {
      title: '发起人账号',
      dataIndex: 'createBy',
    },
    {
      title: '备注',
      dataIndex: 'remark',
      width: 150,
      hideInSearch: true,
      hideInTable: !APP_IS_PAYMENT,
    },
    {
      title: '操作人',
      dataIndex: 'updateBy',
      hideInSearch: true,
      hideInTable: !APP_IS_PAYMENT,
    },
  ];

  const changeStatus = (record: any, status: number, title: string) => {
    Modal.confirm({
      title,
      content: `确认要${title}吗？`,
      onOk: async () => {
        await services.finance.usdtRecharge.updateStatus({
          id: record.id,
          status,
        });
        tableRef.current.reload();
      },
      ...BaseModalConfig,
    });
  };

  return (
    <TablePage
      tableRef={tableRef}
      searchFormRef={searchFormRef}
      columns={columns}
      listRequest={listRequest}
      scroll={{ x: 2500 }}
      actionsWidth={APP_IS_PAYMENT ? 155 : 160}
      onReset={() => {
        searchFormRef.current?.resetFields();
        setSearchParams({});
      }}
      actions={(record) =>
        APP_IS_PAYMENT
          ? [
              record?.status === 0 && (
                <a
                  key="confirm-pay"
                  onClick={() => changeStatus(record, 1, '确认充值')}
                >
                  确认充值
                </a>
              ),
              record?.status === 0 && (
                <a
                  key="cancel-pay"
                  className="text-red"
                  onClick={() => changeStatus(record, 2, '取消充值')}
                >
                  拒绝取消
                </a>
              ),
            ]
          : []
      }
      footer={() => (
        <div className="footer-statistic">
          <div className="row">
            <Statistic
              title="充值次数"
              value={statisticData?.rechargeNum || 0}
            />
            <Statistic
              title="充值成功次数"
              value={statisticData?.rechargeSucNum || 0}
            />
            <Statistic
              title="充值成功总金额"
              value={statisticData?.rechargeSucAmount || 0}
            />
          </div>
        </div>
      )}
      toolBarActions={() => [
        <ManualRecharge
          key="manualRecharge"
          reload={tableRef.current.reload}
        />,
      ]}
    />
  );
};
