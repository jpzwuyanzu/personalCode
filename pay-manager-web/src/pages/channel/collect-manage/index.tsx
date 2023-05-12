import { useState, useRef } from 'react';
import { useModel } from 'umi';
import { ProColumns } from '@ant-design/pro-components';
import { Input, Select, Modal, message } from 'antd';
import services from '@/services';
import { System, Channel, BaseModalConfig } from '@/constants';
import common from '@/utils/common';
import { TablePage } from '@/components';
import { ChannelTypeEnum } from '@/enums';
import UpdateBalanceModal from './modal/updateBalanceModal';
import TunnelDistributeModal from './modal/tunnelDistributeModal';
import { pick, cloneDeep, merge } from 'lodash';
import BalanceRecordModal from '@/components/BalanceRecordModal';
import { Columns } from '@/types';

export default () => {
  const { currencyList, merchantList } = useModel('global');

  const tablePageRef = useRef<any>();
  const refresh = () => tablePageRef?.current?.reload();

  const defaultKeywordType = 'tunnelId';
  const [keywordType, setKeywordType] = useState(defaultKeywordType);
  const [keyword, setKeyword] = useState<string>('');

  const [current, setCurrent] = useState<any>({});
  const [updateBalanceVisible, setUpdateBalanceVisible] = useState(false);
  const [tunnelDistributeVisible, setTunnelDistributeVisible] = useState(false);

  const handleUpdateStatus = async (record: any, title: string) => {
    const { tunnelId, tunnelName } = record;
    const requestFn =
      +record.status === 2
        ? services.channel.enableTunnelConfig
        : services.channel.disableTunnelConfig;

    Modal.confirm({
      title,
      content: `确认要${title}(${tunnelName})该通道吗？`,
      onOk: async () => {
        await requestFn({ tunnelId, type: 1 });
        refresh();
        message.success(`${title}成功`);
      },
      ...BaseModalConfig,
    });
  };

  const columns: Columns[] = [
    {
      title: '',
      renderFormItem: () => {
        const selectBefore = (
          <Select
            defaultValue={keywordType}
            style={{ width: '120px' }}
            onChange={setKeywordType}
          >
            <Select.Option value="tunnelId">通道ID</Select.Option>
            <Select.Option value="tunnelName">通道名称</Select.Option>
          </Select>
        );
        return (
          <Input
            addonBefore={selectBefore}
            value={keyword}
            allowClear
            placeholder="请输入"
            onChange={(e) => setKeyword(e.target.value)}
          />
        );
      },
      hideInForm: true,
      hideInTable: true,
    },
    {
      title: '币种',
      dataIndex: 'currency',
      valueType: 'select',
      request: System.BaseRequestAsync(currencyList),
      fieldProps: {
        allowClear: false,
      },
      initialValue: System.BaseAll.value,
      hideInForm: true,
      hideInTable: true,
    },
    {
      title: '开通商户',
      dataIndex: 'merchantId',
      valueType: 'select',
      request: System.BaseRequestAsync(merchantList),
      fieldProps: {
        allowClear: false,
      },
      initialValue: System.BaseAll.value,
      hideInForm: true,
      hideInTable: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      fieldProps: {
        allowClear: false,
      },
      initialValue: System.BaseAll.value,
      request: System.BaseRequestAsync(Channel.ChannelStatusList),
      hideInForm: true,
      hideInTable: true,
    },
    {
      title: '通道ID',
      dataIndex: 'tunnelId',
      valueType: 'select',
      request: async () => {
        const { data } = await services.channel.getTunnelIdList({
          type: ChannelTypeEnum.Collect,
        });
        if (Array.isArray(data)) {
          return data.map((id) => ({ label: id, value: id }));
        }
        return [];
      },
      copyable: true,
      hideInSearch: true,
      fieldProps: {
        disabled: false,
      },
      formItemProps: {
        rules: [common.ruleUtils.getRule('required')],
      },
    },
    {
      title: '通道名称',
      dataIndex: 'tunnelName',
      hideInSearch: true,
      formItemProps: {
        rules: [common.ruleUtils.getRule('required')],
      },
    },
    {
      title: '通道余额',
      dataIndex: 'balance',
      hideInForm: true,
      hideInSearch: true,
      // sorter: true,
    },
    {
      title: '今日代收金额',
      dataIndex: 'usedMoney',
      hideInForm: true,
      hideInSearch: true,
      // sorter: true,
    },
    {
      title: '今日上游手续费',
      dataIndex: 'upFee',
      hideInForm: true,
      hideInSearch: true,
      // sorter: true,
    },
    {
      title: '今日商户手续费',
      dataIndex: 'merchantFee',
      hideInForm: true,
      hideInSearch: true,
      // sorter: true,
    },
    {
      title: '单笔最小限额',
      dataIndex: 'min',
      valueType: 'digit',
      fieldProps: {
        precision: 2,
      },
      formItemProps: {
        className: 'my-form-item',
        rules: [common.ruleUtils.getRule('required')],
      },
      hideInSearch: true,
      // sorter: true,
    },
    {
      title: '单笔最大限额',
      dataIndex: 'max',
      valueType: 'digit',
      fieldProps: {
        min: 0,
        max: 10e8,
        precision: 2,
      },
      formItemProps: {
        className: 'my-form-item',
        rules: [common.ruleUtils.getRule('required')],
      },
      hideInSearch: true,
      // sorter: true,
    },
    {
      title: '单日限额',
      dataIndex: 'dailyQuota',
      valueType: 'digit',
      fieldProps: {
        min: 0,
        max: 10e8,
        precision: 2,
      },
      formItemProps: {
        className: 'my-form-item',
        rules: [common.ruleUtils.getRule('required')],
      },
      hideInSearch: true,
      // sorter: true,
    },
    {
      title: '通道币种',
      dataIndex: 'currency',
      valueType: 'select',
      request: System.BaseRequestAsync(
        currencyList.filter((item) => item.value !== System.BaseAll.value),
      ),
      formItemProps: {
        rules: [common.ruleUtils.getRule('required')],
      },
      fieldProps: {
        disabled: true,
      },
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '提交频率',
      dataIndex: 'submitFrequency',
      valueType: 'digit',
      fieldProps: {
        max: 10e8,
        colSpan: 24,
      },
      formItemProps: {
        className: 'my-form-item',
        // rules: [common.ruleUtils.getRule('required')],
      },
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (text, record) =>
        common.antdUtils.renderTag(Channel.ChannelStatusList, +record.status),
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '备注',
      dataIndex: 'remark',
      valueType: 'textarea',
      hideInSearch: true,
      formItemProps: {
        className: 'my-form-item',
      },
      width: 150,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
      hideInForm: true,
      width: 140,
    },
    {
      title: '修改时间',
      dataIndex: 'updateTime',
      valueType: 'dateTime',
      hideInSearch: true,
      hideInForm: true,
      width: 140,
    },
    {
      title: '操作人',
      dataIndex: 'updateBy',
      hideInSearch: true,
      hideInForm: true,
    },
  ];

  return (
    <>
      <TablePage
        moduleTitle="代收通道管理"
        moduleName="代收通道"
        editNameKey="tunnelName"
        columns={columns}
        scroll={{ x: 2000 }}
        addRequest={services.channel.addTunnelConfig}
        editRequest={services.channel.editTunnelConfig}
        listRequest={(params: any) => {
          if (keyword) params[keywordType] = keyword;
          return services.channel.getTunnelConfigList({
            ...params,
            type: ChannelTypeEnum.Collect,
          });
        }}
        onReset={() => {
          setKeyword('');
        }}
        beforeRequestFormat={(param) => {
          // 充值
          param.type = ChannelTypeEnum.Collect;

          return pick(param, [
            'type',
            'tunnelName',
            'tunnelId',
            'min',
            'max',
            'dailyQuota',
            'submitFrequency',
            'remark',
          ]);
        }}
        rowKey="tunnelId"
        actionsWidth={240}
        tableRef={tablePageRef}
        toolBarActions={() => {
          return [
            <BalanceRecordModal key="balance" type={ChannelTypeEnum.Collect} />,
          ];
        }}
        actions={(record) => {
          const isDisabled = +record.status === 2;
          const statusLabel = isDisabled ? '启用' : '禁用';
          return common.antdUtils.renderTableAction([
            {
              label: statusLabel,
              className: isDisabled ? 'text-green' : 'text-red',
              auth: 'true',
              onClick: () => handleUpdateStatus(record, statusLabel),
            },
            {
              label: '修改余额',
              auth: 'true',
              onClick: () => {
                setCurrent(record);
                setUpdateBalanceVisible(true);
              },
            },
            {
              label: '分配',
              auth: 'true',
              onClick: () => {
                setCurrent(record);
                setTunnelDistributeVisible(true);
              },
            },
          ]);
        }}
      />

      <UpdateBalanceModal
        visible={updateBalanceVisible}
        setVisible={setUpdateBalanceVisible}
        current={current}
        refresh={refresh}
      />

      <TunnelDistributeModal
        visible={tunnelDistributeVisible}
        setVisible={setTunnelDistributeVisible}
        current={current}
        refresh={refresh}
      />
    </>
  );
};
