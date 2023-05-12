import ChannelTable from '@/pages/merchant/manage/channel-config/channel-table';
import { InputNumber, message, Switch, Tag } from 'antd';
import services from '@/services';
import { useEffect, useRef } from 'react';
import { ProColumns } from '@ant-design/pro-components';

type Props = {
  params: any;
  onChangeData: (data: any) => void;
  tableRef?: any;
  isSingleMerchant: boolean;
  isEdit: boolean;
  paymentChangeData: any;
  onRequestData?: (data: any) => void;
};

export default (props: Props) => {
  const tableRef = props.tableRef ?? useRef<any>();
  const { paymentChangeData, onChangeData, isSingleMerchant, isEdit } = props;

  const changeData = (data: any) => {
    tableRef?.current?.changeData(data);
    onChangeData(data);
  };

  let columns: ProColumns[] = [
    {
      title: '通道号',
      dataIndex: 'tunnelId',
      align: 'center',
    },
    {
      title: '通道名称',
      dataIndex: 'tunnelName',
      align: 'center',
    },
    {
      title: '通道币种',
      dataIndex: 'currency',
      align: 'center',
    },
    {
      title: '上游费率（%）',
      dataIndex: 'upRate',
      align: 'center',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.upRate - b.upRate
    },
    {
      title: '上游单笔手续费',
      dataIndex: 'upSingleOrderFee',
      align: 'center',
      sorter: (a, b) => a.upSingleOrderFee - b.upSingleOrderFee
    },
    // {
    //   title: '商户费率（%）',
    //   dataIndex: 'merchantRate',
    //   align: 'center',
    //   render: (text: any, record: any) => {
    //     return !isSingleMerchant || (isSingleMerchant && isEdit) ? (
    //       <InputNumber
    //         min={0}
    //         max={100}
    //         placeholder="设置商户通道费率"
    //         value={
    //           isSingleMerchant
    //             ? text
    //             : paymentChangeData?.[record.tunnelId]?.merchantRate
    //         }
    //         style={{
    //           width: 200,
    //         }}
    //         precision={2}
    //         onChange={(val) => {
    //           changeData({
    //             ...record,
    //             merchantRate: val,
    //           });
    //         }}
    //       />
    //     ) : (
    //       text
    //     );
    //   },
    // },
    // {
    //   title: '商户单笔手续费',
    //   dataIndex: 'merchantSingleOrderFee',
    //   align: 'center',
    //   render: (text: any, record: any) => {
    //     return !isSingleMerchant || (isSingleMerchant && isEdit) ? (
    //       <InputNumber
    //         min={0}
    //         placeholder="设置商户单笔手续费"
    //         value={
    //           isSingleMerchant
    //             ? text
    //             : paymentChangeData?.[record.tunnelId]?.merchantSingleOrderFee
    //         }
    //         style={{
    //           width: 200,
    //         }}
    //         onChange={(val) => {
    //           changeData({
    //             ...record,
    //             merchantSingleOrderFee: val,
    //           });
    //         }}
    //       />
    //     ) : (
    //       text
    //     );
    //   },
    // },
  ];

  if (isSingleMerchant) {
    columns = [
      ...columns,
      {
        title: '状态',
        dataIndex: 'status',
        align: 'center',
        render: (text: any, record: any) => {
          return (
            <Switch
              checked={text === 1}
              disabled={!isEdit}
              onChange={(enable) => {
                changeData({
                  ...record,
                  status: enable ? 1 : 2,
                });
              }}
            />
          );
        },
        sorter: (a, b) => a.status - b.status
      },
    ];
  }

  return (
    <>
      <ChannelTable
        ref={tableRef}
        columns={columns}
        isEdit={isEdit}
        isSingleMerchant={isSingleMerchant}
        tableChangeData={paymentChangeData}
        params={{
          ...props.params,
          type: 2,
        }}
        onRequestData={props?.onRequestData}
      />
    </>
  );
};
