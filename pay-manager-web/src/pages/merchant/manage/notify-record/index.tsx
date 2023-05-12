import TablePage from '@/components/TablePage';
import { Columns } from '@/types';
import services from '@/services';
import { Button, Modal, Input, Select, Tag } from 'antd';
import { useState } from 'react';
import './index.less';
import common from '@/utils/common';
import { useModel } from '@@/exports';
import { System } from '@/constants';

export default () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    getMerchantOptionItems,
    getCurrencyOptionItems,
    getFirstCurrencyOption,
  } = useModel('global');

  const listRequest = (params: any, sort: any, filter: any) => {
    if (params.createTime) {
      params.beginTime = params.createTime?.[0];
      params.endTime = params.createTime?.[1];
    }
    delete params.createTime;

    if (params.cutoffTime) {
      params.remindBeginTime = params.cutoffTime?.[0];
      params.remindEndTime = params.cutoffTime?.[1];
    }
    delete params.cutoffTime;

    return services.merchant.remind.list(params);
  };

  const columns: Columns[] = [
    {
      title: '消息ID',
      dataIndex: 'id',
      hideInSearch: true,
      hideInForm: true,
      width: 100,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTimeRange',
      fieldProps: {
        placeholder: ['开始时间', '结束时间'],
        presets: common.dateUtils.rangePresets,
        showTime: {
          defaultValue: common.dateUtils.rangeDefaultTime(),
        },
      },
      colSize: 2,
      hideInTable: true,
      hideInForm: true,
    },
    {
      title: '截止时间',
      dataIndex: 'cutoffTime',
      valueType: 'dateTimeRange',
      fieldProps: {
        placeholder: ['开始时间', '结束时间'],
        presets: common.dateUtils.rangePresets,
        showTime: {
          defaultValue: common.dateUtils.rangeDefaultTime(),
        },
      },
      colSize: 2,
      hideInTable: true,
      hideInForm: true,
    },
    {
      title: '商户号',
      dataIndex: 'merchantId',
      valueType: 'select',
      request: () => getMerchantOptionItems(null),
      fieldProps: {
        allowClear: false,
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请选择商户号',
          },
        ],
      },
    },
    {
      title: '提醒内容',
      dataIndex: 'content',
      valueType: 'textarea',
      fieldProps: {
        maxLength: 500,
        showCount: true,
        autoSize: {
          minRows: 5,
        },
      },
      formItemProps: {
        rules: [
          {
            required: true,
          },
        ],
      },
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: {
        1: {
          text: '在线',
        },
        2: {
          text: '下线',
        },
      },
      render: (text, record) => (
        <Tag color={record.status === 1 ? 'green' : 'red'}>{text}</Tag>
      ),
      fieldProps: {
        style: {
          width: 120,
          marginRight: 20,
        },
      },
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '截止时间',
      dataIndex: 'endTime',
      valueType: 'dateTime',
      hideInSearch: true,
    },
  ];

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>提醒列表</Button>
      <Modal
        className="balance-modal"
        title="提醒列表"
        open={isModalOpen}
        footer={null}
        width={1400}
        onCancel={() => {
          setIsModalOpen(false);
        }}
      >
        <div className="modal-table">
          <TablePage
            moduleName="提醒"
            columns={columns}
            cardBordered={{
              search: true,
              table: false,
            }}
            searchConfig={{
              labelWidth: 75,
            }}
            addRequest={services.merchant.remind.add}
            delRequest={services.merchant.remind.del}
            changeStatusRequest={services.merchant.remind.edit}
            listRequest={listRequest}
            changeStatusMap={{ 1: '上线', 2: '下线' }}
          />
        </div>
      </Modal>
    </>
  );
};
