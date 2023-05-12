import TablePage from '@/components/TablePage';
import { Columns } from '@/types';
import services from '@/services';
import { Button, Input, message, Select, Spin, Statistic, Tag } from 'antd';
import {
  APP_IS_PAYMENT,
  CallbackStatusOptions,
  IS_TEST,
  PayStatusOptions,
  StatusSelectItems,
} from '@/constants';
import { useRef, useState } from 'react';
import common from '@/utils/common';
import { useModel } from '@@/exports';
import dayjs from 'dayjs';
import Status from '@/components/Status';
import PayFail from '@/pages/merchant/pay-order/pay-fail';
import ChangeOrderStatus from '@/components/ChangeOrderStatus';
import { LoadingOutlined } from '@ant-design/icons';
import utils from '@/utils';

export default () => {
  const tableRef = useRef<any>();
  const tabRef = useRef<any>();

  const { getMerchantOptionItems, getCurrencyOptionItems } = useModel('global');
  const { merchantInfo } = useModel('merchant');

  const [statisticData, setStatisticData] = useState<any>({
    payAmount: '',
    payCount: '',
    successAmount: '',
    successCount: '',
    successFee: '',
    successRate: '',
    waitCallbackAmount: '',
    waitCallbackCount: '',
    waitPayAmount: '',
    waitPayCount: '',
  });

  const [refreshLoadingMap, setRefreshLoadingMap] = useState<any>({});

  const listRequest = async (params: any, sort: any, filter: any) => {
    const { records, data, total }: any = await services.merchant.payOrder.list(
      utils.filterParams(params),
    );
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
      const rowData = await services.merchant.payOrder.queryOrder(params);
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
    await services.merchant.payOrder.callback({
      platformOrderId,
      merchantId,
    });
    message.success('回调成功');
    tableRef.current?.reload();
  };

  const makeOrder = async (record: any) => {
    const { platformOrderId, merchantId } = record;
    await services.merchant.payOrder.makeOrder({
      platformOrderId,
      merchantId,
    });
    message.success('补单成功');
    tableRef.current?.reload();
  };

  const rejectOrder = async (record: any) => {
    const { platformOrderId, merchantId } = record;
    await services.merchant.payOrder.rejectOrder({
      platformOrderId,
      merchantId,
    });
    message.success('驳回成功');
    tableRef.current?.reload();
  };

  const columns: Columns[] = [
    // {
    //   title: '通道类型',
    //   dataIndex: 'tunnelId',
    //   valueType: 'select',
    //   request: async () => services.channel.getTunnelOptions(2),
    //   hideInTable: true,
    // },
    {
      title: '通道ID',
      dataIndex: 'tunnelId',
      valueType: 'select',
      request: () => {
        const params: any = { type: 2 };
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
      width: 280,
      ellipsis: true,
      render: (_, record: any) => (
        <div className="text-left">
          <div>平台：{record?.platformOrderId || '-'}</div>
          <div>商户：{record?.merchantOrderId || '-'}</div>
          <div>通道：{record?.tunnelOrderId || '-'}</div>
          <div>UTR：{record?.utr || '-'}</div>
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
                'datetime',
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
                'datetime',
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
      width: 150,
      render: (_, record: any) => (
        <div className="text-left">
          {/*{APP_IS_PAYMENT && <div>名称：{record?.tunnelName}</div>}*/}
          <div>账号ID：{record?.tunnelId || '-'}</div>
          {/*<div>备注：{record?.tunnelRemark || '-'}</div>*/}
        </div>
      ),
    },
    {
      title: '转账信息',
      dataIndex: 'transfer',
      hideInSearch: true,
      width: 250,
      render: (_, record: any) => (
        <div className="text-left">
          <div>银行编号：{record?.bankCode || '-'}</div>
          <div>银行名称：{record?.bankName || '-'}</div>
          <div>银行账号：{record?.account || '-'}</div>
          <div>IFSC：{record?.subBranch || '-'}</div>
          <div>收款人：{record?.name || '-'}</div>
          <div>手机号：{record?.phone || '-'}</div>
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
        transform: (value: any) => {
          return {
            startAmount: value[0],
            endAmount: value[1],
          };
        },
      },
      render: (_, record: any) => record?.amount,
    },
    {
      title: '收款账号',
      dataIndex: 'payeeAccount',
      hideInTable: true,
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
      width: 140,
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
      dataIndex: 'datetime',
      valueType: 'dateTimeRange',
      initialValue: common.dateUtils.getDateRange(1),
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
      width: 150,
      colSize: 1.5,
      render: (_, record: any) => record?.createTime,
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
      dataIndex: 'callbackTime',
      width: 150,
      hideInSearch: true,
    },
    {
      title: '操作备注',
      dataIndex: 'remark',
      hideInSearch: true,
      width: 150,
      ellipsis: true,
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
    //   width: 140,
    // },
    {
      title: '操作人',
      dataIndex: 'updateBy',
      hideInSearch: true,
    },
  ];

  return (
    <>
      <TablePage
        ref={tabRef}
        tableRef={tableRef}
        moduleTitle="代付订单"
        columns={columns}
        listRequest={listRequest}
        exportRequest={services.merchant.payOrder.export}
        rowKey="platformOrderId"
        scroll={{ x: 2100 }}
        actionsWidth={APP_IS_PAYMENT ? 280 : 140}
        actions={(record) => {
          const isPayment = APP_IS_PAYMENT;
          const created = record?.payStatus === 0;
          const paid = record?.payStatus === 1;
          const noPaid = record?.payStatus === 2;
          const call = record?.callbackStatus === 1;
          //
          return [
            (!paid || !call) && (
              <a
                key="refresh"
                className={refreshLoadingMap?.[record?.id] ? 'loading' : ''}
                onClick={() => refresh(record)}
              >
                {refreshLoadingMap?.[record?.id] ? (
                  <Spin
                    indicator={<LoadingOutlined size={12} />}
                    size="small"
                  />
                ) : (
                  '刷新'
                )}
              </a>
            ),
            isPayment && !call && (paid || noPaid) && (
              <a
                key="callback"
                className="text-orange"
                onClick={() => orderCallback(record)}
              >
                回调
              </a>
            ),
            isPayment && created && (
              <a
                key="makeOrder"
                className="text-green"
                onClick={() => makeOrder(record)}
              >
                补单
              </a>
            ),
            isPayment && created && (
              <a
                key="return"
                className="text-red"
                onClick={() => rejectOrder(record)}
              >
                驳回
              </a>
            ),
            noPaid && <PayFail key="payFail" record={record} />,
            IS_TEST && record?.payStatus === 0 && (
              <ChangeOrderStatus
                key="changeOrderStatus"
                record={record}
                reload={tableRef?.current?.reload}
                request={services.merchant.payOrder.updatePayStatus}
              />
            ),
          ];
        }}
        // polling={3000}
        footer={() => (
          <div className="footer-statistic">
            <div className="row">
              <Statistic
                title="代付笔数"
                value={statisticData?.payCount || 0}
              />
              <Statistic
                title="代付总金额"
                value={statisticData?.payAmount || 0}
              />
              <Statistic
                title="成功手续费"
                value={statisticData?.successFee || 0}
              />
              <Statistic
                title="待转账笔数"
                value={statisticData?.waitPayCount || 0}
              />
              <Statistic
                title="待回调笔数"
                value={statisticData?.waitCallbackCount || 0}
              />
            </div>
            <div className="row">
              <Statistic
                title="成功笔数"
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
                title="待转账金额"
                value={statisticData?.waitPayAmount || 0}
              />
              <Statistic
                title="待回调金额"
                value={statisticData?.waitCallbackAmount || 0}
              />
            </div>
          </div>
        )}
      />
    </>
  );
};
