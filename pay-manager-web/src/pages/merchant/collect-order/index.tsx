import TablePage from '@/components/TablePage';
import { Columns } from '@/types';
import services from '@/services';
import { Spin, Statistic, message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import {
  APP_IS_PAYMENT,
  CallbackStatusOptions,
  IS_TEST,
  PayStatusOptions,
  StatusSelectItems,
} from '@/constants';
import { useRef, useState } from 'react';
import { useModel } from 'umi';
import common from '@/utils/common';
import Status from '@/components/Status';
import ChangeOrderStatus from '@/components/ChangeOrderStatus';
import boolean from 'async-validator/dist-types/validator/boolean';
import utils from '@/utils';

export default () => {
  const tabRef = useRef<any>();
  const tableRef = useRef<any>();

  const { getMerchantOptionItems, getCurrencyOptionItems } = useModel('global');
  const { merchantInfo } = useModel('merchant');

  const [statisticData, setStatisticData] = useState<any>({
    collectionCount: '',
    settlementAmount: '',
    successAmount: '',
    successCount: '',
    successRate: '',
  });

  const [refreshLoadingMap, setRefreshLoadingMap] = useState<any>({});

  const listRequest = async (params: any, sort: any, filter: any) => {
    const { records, data, total }: any =
      await services.merchant.collectOrder.list(utils.filterParams(params));
    setStatisticData(data);

    return {
      success: true,
      data: records,
      total: total,
    };
  };

  const refresh = async (record: any) => {
    try {
      if (refreshLoadingMap?.[record?.id]) return;
      setRefreshLoadingMap({
        ...refreshLoadingMap,
        [record.id]: true,
      });
      const { platformOrderId, merchantId } = record;
      const params = {
        merchantId,
        platformOrderId,
      };
      await services.merchant.collectOrder.refresh(params);
      const rowData = await services.merchant.collectOrder.queryOrder(params);
      tabRef?.current?.updateRow(rowData);
      message.success('刷新成功');
    } finally {
      setRefreshLoadingMap({
        ...refreshLoadingMap,
        [record.id]: false,
      });
    }
  };

  const orderCallback = async (record: any) => {
    const { platformOrderId, merchantId } = record;
    await services.merchant.collectOrder.callback({
      platformOrderId,
      merchantId,
    });
    message.success('回调成功');
    tableRef.current?.reload();
  };

  const columns: Columns[] = [
    {
      title: '通道ID',
      dataIndex: 'tunnelId',
      valueType: 'select',
      request: () => {
        const params: any = { type: 1 };
        if (!APP_IS_PAYMENT) {
          params['merchantId'] = merchantInfo.merchantId;
        }
        return services.channel.getTunnelOptions(params);
      },
      hideInTable: true,
      hideInForm: true,
    },
    {
      title: '商户号',
      dataIndex: 'merchantId',
      hideInSearch: !APP_IS_PAYMENT,
    },
    {
      title: '订单号',
      dataIndex: 'orderId',
      hideInSearch: true,
      width: 260,
      ellipsis: true,
      render: (_, record: any) => (
        <div className="text-left">
          <div>平台：{record?.platformOrderId}</div>
          <div>商户：{record?.merchantOrderId}</div>
          <div>通道：{record?.tunnelOrderId}</div>
          <div>UTR：</div>
        </div>
      ),
    },
    {
      title: '平台订单号',
      dataIndex: 'platformOrderId',
      hideInTable: true,
      fieldProps: (form: any) => {
        return {
          onChange: (e: any) => {
            const value = e.target.value;
            if (value?.length) {
              form?.setFieldValue?.(
                'initiateTime',
                common.dateUtils.getDateRange(30),
              );
            }
          },
        };
      },
    },
    {
      title: '商户订单号',
      dataIndex: 'merchantOrderId',
      hideInTable: true,
      fieldProps: (form: any) => {
        return {
          onChange: (e: any) => {
            const value = e.target.value;
            if (value?.length) {
              form?.setFieldValue?.(
                'initiateTime',
                common.dateUtils.getDateRange(30),
              );
            }
          },
        };
      },
    },
    {
      title: 'UTR',
      dataIndex: 'utr',
      hideInTable: true,
    },
    {
      title: '通道信息',
      dataIndex: 'channel',
      hideInSearch: true,
      width: 180,
      ellipsis: true,
      render: (_, record: any) => (
        <div className="text-left">
          {/*{APP_IS_PAYMENT && <div>名称：{record?.tunnelName}</div>}*/}
          <div>账号ID：{record?.tunnelId}</div>
          {/*<div>备注：{record?.tunnelRemark}</div>*/}
        </div>
      ),
    },
    {
      title: '订单金额',
      dataIndex: 'amount',
      valueType: 'digitRange',
      fieldProps: {
        placeholder: ['最小金额', '最大金额'],
      },
      search: {
        transform: (value) => {
          return {
            startAmount: value?.[0],
            endAmount: value?.[1],
          };
        },
      },
      render: (_, record: any) => record?.amount,
    },
    {
      title: '手续费',
      dataIndex: 'fee',
      hideInSearch: true,
    },
    {
      title: '结算金额',
      dataIndex: 'settlementAmount',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInSearch: true,
      render: (_, record: any) => (
        <>
          <div>
            支付：
            <Status type="pay" val={record?.payStatus} />
          </div>
          <div>
            回调：
            <Status type="callback" val={record?.callbackStatus} />
          </div>
        </>
      ),
    },
    {
      title: '支付状态',
      dataIndex: 'payStatus',
      valueType: 'select',
      request: async () => [{ label: '全部', value: '' }, ...PayStatusOptions],
      hideInTable: true,
    },
    {
      title: '回调状态',
      dataIndex: 'callbackStatus',
      valueType: 'select',
      request: async () => [
        { label: '全部', value: '' },
        ...CallbackStatusOptions,
      ],
      hideInTable: true,
    },
    {
      title: '发起时间',
      dataIndex: 'initiateTime',
      valueType: 'dateTimeRange',
      initialValue: common.dateUtils.getDateRange(1),
      width: 150,
      fieldProps: (form: any) => {
        return {
          placeholder: ['开始时间', '结束时间'],
          allowClear: false,
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
        transform: (value) => {
          return {
            beginTime: value?.[0],
            endTime: value?.[1],
          };
        },
      },
      render: (_, record: any) => record?.createTime,
      colSize: 1.2,
    },
    {
      title: '完成时间',
      dataIndex: 'completeTime',
      valueType: 'dateTimeRange',
      fieldProps: (form: any) => {
        return {
          placeholder: ['开始时间', '结束时间'],
          allowClear: false,
          presets: common.dateUtils.rangePresets,
          showTime: {
            defaultValue: common.dateUtils.rangeDefaultTime(),
          },
        };
      },
      search: {
        transform: (value) => {
          return {
            finishBeginTime: value?.[0],
            finishEndTime: value?.[1],
          };
        },
      },
      colSize: 1.5,
      hideInTable: true,
    },
    {
      title: '回调时间',
      width: 150,
      dataIndex: 'callbackTime',
      hideInSearch: true,
    },
    // {
    //   title: '币种',
    //   dataIndex: 'currency',
    //   valueType: 'select',
    //   request: () => getCurrencyOptionItems(),
    //   fieldProps: {
    //     defaultValue: '',
    //   },
    //   order: 1,
    // },
  ];

  return (
    <>
      <TablePage
        ref={tabRef}
        tableRef={tableRef}
        moduleTitle="代收订单"
        columns={columns}
        listRequest={listRequest}
        exportRequest={services.merchant.collectOrder.export}
        scroll={{ x: 1800 }}
        actionsWidth={200}
        actions={(record: any) => [
          <a
            key="refresh"
            className={refreshLoadingMap?.[record?.id] ? 'loading' : ''}
            onClick={() => refresh(record)}
          >
            {refreshLoadingMap?.[record?.id] ? (
              <Spin indicator={<LoadingOutlined size={12} />} size="small" />
            ) : (
              '刷新'
            )}
          </a>,
          APP_IS_PAYMENT && record?.callbackStatus !== 1 && (
            <a
              key="callback"
              className="text-orange"
              onClick={() => orderCallback(record)}
            >
              回调
            </a>
          ),
          IS_TEST && record?.payStatus === 0 && (
            <ChangeOrderStatus
              key="changeOrderStatus"
              record={record}
              reload={tableRef?.current?.reload}
              request={services.merchant.collectOrder.updatePayStatus}
            />
          ),
        ]}
        // polling={3000}
        footer={() => (
          <div className="footer-statistic">
            <div className="row">
              <Statistic
                title="代收次数"
                value={statisticData?.collectionCount || 0}
              />
              <Statistic
                title="成功次数"
                value={statisticData?.successCount || 0}
              />
              <Statistic
                title="成功总金额"
                value={statisticData?.successAmount || 0}
              />
              <Statistic
                title="成功率"
                value={statisticData?.successRate || 0}
                suffix="%"
              />
              <Statistic
                title="成功总结算金额"
                value={statisticData?.settlementAmount || 0}
              />
            </div>
          </div>
        )}
      />
    </>
  );
};
