import TablePage from '@/components/TablePage';
import { Columns } from '@/types';
import services from '@/services';
import { Button, Modal, Input, Select, Tag } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { ChannelBalanceRecordTypeOptions, System } from '@/constants';
import common from '@/utils/common';
import { useModel } from 'umi';

type Props = {
  type: number;
};

export default (props: Props) => {
  const tableRef = useRef<any>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { getMerchantOptionItems, getCurrencyOptionItems } = useModel('global');
  const listRequest = (params: any, sort: any, filter: any) => {
    params.type = props.type;
    return services.channel.tunnelMoneyRecordList(params);
  };

  useEffect(() => {
    if (isModalOpen) {
      tableRef?.current?.reload();
    }
  }, [isModalOpen]);

  const columns: Columns[] = [
    {
      title: '通道ID',
      dataIndex: 'tunnelId',
      order: 10,
    },
    {
      title: '账变金额',
      dataIndex: 'money',
      hideInSearch: true,
    },
    {
      title: '通道余额',
      dataIndex: 'balance',
      hideInSearch: true,
    },
    {
      title: '类型',
      dataIndex: 'recordType',
      valueType: 'select',
      request: async () => [
        {
          label: '全部',
          value: '',
        },
        ...ChannelBalanceRecordTypeOptions,
      ],
      fieldProps: {
        allowClear: false,
      },
      order: 8,
    },
    {
      title: '币种',
      dataIndex: 'currency',
      valueType: 'select',
      request: () => getCurrencyOptionItems(),
      fieldProps: {
        defaultValue: System.BaseAll,
        allowClear: false,
      },
      order: 7,
    },
    {
      title: '商户ID',
      dataIndex: 'merchantId',
      order: 9,
    },
    {
      title: '备注',
      dataIndex: 'remark',
      hideInSearch: true,
    },
    {
      title: '操作人',
      dataIndex: 'updateBy',
      order: 0,
    },
    {
      title: '时间',
      dataIndex: 'createTime',
      valueType: 'dateTimeRange',
      initialValue: common.dateUtils.getDateRange(7),
      render: (_, record) => record?.createTime,
      fieldProps: {
        placeholder: ['开始时间', '结束时间'],
      },
      order: 1,
      search: {
        transform: (value) => {
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
    },
  ];

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>通道余额记录</Button>
      <Modal
        title="通道余额记录"
        open={isModalOpen}
        footer={null}
        width={1400}
        onCancel={() => {
          setIsModalOpen(false);
        }}
      >
        <div className="modal-table">
          <TablePage
            tableRef={tableRef}
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
