import TablePage from '@/components/TablePage';
import { Columns } from '@/types';
import services from '@/services';
import { LogOperatorTypeOptions } from '@/constants';
import type { Dayjs } from 'dayjs';
import { useState } from 'react';
import common from '@/utils/common';

export default () => {
  const [listDate] = useState<Dayjs[]>(
    common.dateUtils.getDateRange(7) as Dayjs[],
  );

  const columns: Columns[] = [
    {
      title: 'ID',
      dataIndex: 'operId',
      hideInSearch: true,
    },
    {
      title: '操作时间',
      dataIndex: 'operTime',
      valueType: 'dateTimeRange',
      fieldProps: {
        presets: common.dateUtils.rangePresets,
        showTime: {
          defaultValue: common.dateUtils.rangeDefaultTime(),
        },
      },
      initialValue: listDate,
      colSize: 2,
      hideInTable: true,
    },
    {
      title: '操作者',
      dataIndex: 'operName',
    },
    {
      title: '操作类型',
      dataIndex: 'businessType',
      valueType: 'select',
      request: () => Promise.resolve(LogOperatorTypeOptions),
      hideInSearch: true,
    },
    {
      title: '操作类型',
      dataIndex: 'businessType',
      valueType: 'select',
      fieldProps: {
        allowClear: false,
      },
      initialValue: '',
      request: () => Promise.resolve(LogOperatorTypeOptions),
      hideInTable: true,
    },
    {
      title: '操作时间',
      dataIndex: 'operTime',
      hideInSearch: true,
    },
    {
      title: 'IP',
      dataIndex: 'operIp',
    },
    {
      title: '操作内容',
      dataIndex: 'title',
      hideInSearch: true,
    },
    {
      title: '详情',
      dataIndex: 'operParam',
      hideInSearch: true,
      width: 300,
      render: (text: any, record) =>
        common.antdUtils.renderTips(text, record.operUrl),
    },
  ];

  return (
    <>
      <TablePage
        moduleTitle="操作日志"
        columns={columns}
        scroll={{ x: 1000 }}
        listRequest={async (values: any) => {
          const { operTime } = values;
          if (operTime && Array.isArray(operTime)) {
            const [beginTime, endTime] = common.dateUtils.toFormatDateParams(
              operTime,
              { formatTime: true },
            );
            values.beginTime = beginTime;
            values.endTime = endTime;
            delete values.operTime;
          }
          return services.system.operateLog.list(values);
        }}
      />
    </>
  );
};
