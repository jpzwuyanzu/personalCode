import TablePage from '@/components/TablePage';
import { Columns, RangeValue } from '@/types';
import services from '@/services';
import common from '@/utils/common';
import { Tooltip, DatePicker } from 'antd';
import { LogOperatorTypeOptions } from '@/constants';
import type { Dayjs } from 'dayjs';
import { useState } from 'react';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

export default () => {
  const [listDate] = useState<Dayjs[]>(
    common.dateUtils.getDateRange(7) as Dayjs[],
  );

  const columns: Columns[] = [
    {
      title: 'ID',
      dataIndex: 'infoId',
      hideInSearch: true,
    },
    {
      title: '操作者',
      dataIndex: 'userName',
    },
    {
      title: '登录时间',
      dataIndex: 'loginTime',
      valueType: 'dateTimeRange',
      fieldProps: {
        presets: common.dateUtils.rangePresets,
        showTime: {
          defaultValue: common.dateUtils.rangeDefaultTime(),
        },
      },
      initialValue: listDate,
      render: (_, record) => record.loginTime,
      colSize: 2,
      order: 1,
    },
    {
      title: 'IP',
      dataIndex: 'ipaddr',
    },
    {
      title: '登录设备',
      dataIndex: 'browser',
    },
  ];

  return (
    <>
      <TablePage
        moduleTitle="登录日志"
        columns={columns}
        scroll={{ x: 1000 }}
        listRequest={async (values: any) => {
          const { loginTime } = values;
          if (loginTime && Array.isArray(loginTime)) {
            const [beginTime, endTime] = common.dateUtils.toFormatDateParams(
              loginTime,
              { formatTime: true },
            );
            values.beginTime = beginTime;
            values.endTime = endTime;
            delete values.loginTime;
          }
          return services.system.loginLog.list(values);
        }}
      />
    </>
  );
};
