import { useState, useRef } from 'react';
import { useModel } from 'umi';
import { ProColumns } from '@ant-design/pro-components';
import { Input, Select, Modal, message, Space } from 'antd';
import services from '@/services';
import { System, Channel, BaseModalConfig } from '@/constants';
import common from '@/utils/common';
import { TablePage } from '@/components';
import { ChannelTypeEnum } from '@/enums';
import UpdateBalanceModal from './modal/updateBalanceModal';
import TunnelDistributeModal from './modal/tunnelDistributeModal';
import { pick, isNumber } from 'lodash';
import BalanceRecordModal from '@/components/BalanceRecordModal';
import { Columns } from '@/types';
import WithdrawModal from './modal/withdrawModal';
import {ReloadOutlined} from '@ant-design/icons';

export default () => {
  const { currencyList, merchantList } = useModel('global');

  const tablePageRef = useRef<any>();
  const tabRef = useRef<any>();
  const refresh = () => tablePageRef?.current?.reload();

  const defaultKeywordType = 'tunnelId';
  const [keywordType, setKeywordType] = useState(defaultKeywordType);
  const [keyword, setKeyword] = useState<string>('');
  const [loadingMap, setLoadingMap] = useState<Record<string, boolean>>({});

  const [current, setCurrent] = useState<any>({});
  const [updateBalanceVisible, setUpdateBalanceVisible] = useState(false);
  const [tunnelDistributeVisible, setTunnelDistributeVisible] = useState(false);
  const [withdrawVisible, setWithdrawVisible] = useState(false);

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
        await requestFn({ tunnelId, type: 2 });
        refresh();
        message.success(`${title}成功`);
      },
      ...BaseModalConfig,
    });
  };

  const rowRefresh = async (record: any, key: string) => {
    const loadingKey: string = `${key}-${record.tunnelId}`;
    try {
      setLoadingMap(prevState => ({...prevState, [loadingKey]: true}))
      const {balance, tunnelBalance}: any = await services.channel.getTunnelBalance(record.tunnelId);
      tabRef?.current?.updateRow({...record, [key]: key === 'balance'? (balance ?? record.balance) : (tunnelBalance ?? record.tunnelBalance)});
    } finally {
      setLoadingMap(prevState => ({...prevState, [loadingKey]: false}))
    }
  }

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
            value={keyword}
            addonBefore={selectBefore}
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
          type: ChannelTypeEnum.Payment,
        });
        if (Array.isArray(data)) {
          return data.map((id) => ({ label: id, value: id }));
        }
        return [];
      },
      copyable: true,
      hideInSearch: true,
      fieldProps: {
        // isDisabled: (editMode: boolean) => editMode,
        // isHidden: (editMode: boolean) => editMode
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
      width: 180,
      render: (text, record) => {
        return (
          <Space>
            <span>{text}</span>
            <ReloadOutlined spin={loadingMap[`balance-${record.tunnelId}`]} onClick={async () => {
              await rowRefresh(record, 'balance');
            }} />
          </Space>
        )
      },
      sorter: (a: any, b: any) => a.balance - b.balance
    },
    {
      title: '通道余额（上游）',
      dataIndex: 'tunnelBalance',
      hideInForm: true,
      hideInSearch: true,
      width: 180,
      render: (text, record) => {
        return (
          <Space>
            <span>{text}</span>
            <ReloadOutlined spin={loadingMap[`tunnelBalance-${record.tunnelId}`]} onClick={async () => {
              await rowRefresh(record, 'tunnelBalance');
            }} />
          </Space>
        )
      },
      sorter: (a: any, b: any) => a.tunnelBalance - b.tunnelBalance
    },
    {
      title: '今日代付金额',
      dataIndex: 'usedMoney',
      hideInForm: true,
      hideInSearch: true,
      sorter: (a: any, b: any) => a.usedMoney - b.usedMoney
    },
    {
      title: '今日上游手续费',
      dataIndex: 'upFee',
      hideInForm: true,
      hideInSearch: true,
      sorter: (a: any, b: any) => a.upFee - b.upFee
    },
    {
      title: '今日商户手续费',
      dataIndex: 'merchantFee',
      hideInForm: true,
      hideInSearch: true,
      sorter: (a: any, b: any) => a.merchantFee - b.merchantFee
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
      sorter: (a: any, b: any) => a.min - b.min
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
      sorter: (a: any, b: any) => a.max - b.max
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
      sorter: (a: any, b: any) => a.dailyQuota - b.dailyQuota
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
      hideInSearch: true,
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
      width: 160,
    },
    {
      title: '修改时间',
      dataIndex: 'updateTime',
      valueType: 'dateTime',
      hideInSearch: true,
      hideInForm: true,
      width: 160,
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
        ref={tabRef}
        moduleTitle="代付通道管理"
        moduleName="代付通道"
        editNameKey="tunnelName"
        columns={columns}
        actionsWidth={300}
        scroll={{ x: 2600 }}
        addRequest={services.channel.addTunnelConfig}
        editRequest={services.channel.editTunnelConfig}
        listRequest={(params: any) => {
          if (keyword) params[keywordType] = keyword;
          return services.channel.getTunnelConfigList({
            ...params,
            type: ChannelTypeEnum.Payment,
          });
        }}
        onReset={() => {
          setKeyword('');
        }}
        rowKey="tunnelId"
        beforeRequestFormat={(param) => {
          // 充值
          param.type = ChannelTypeEnum.Payment;

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
        tableRef={tablePageRef}
        toolBarActions={() => {
          return [
            <BalanceRecordModal key="balance" type={ChannelTypeEnum.Payment} />,
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
            {
              label: '提现',
              auth: 'true',
              onClick: () => {
                setCurrent(record);
                setWithdrawVisible(true);
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
      <WithdrawModal
        visible={withdrawVisible}
        setVisible={setWithdrawVisible}
        current={current}
        refresh={refresh}
      />
    </>
  );
};
