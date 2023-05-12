import TablePage from '@/components/TablePage';
import { Columns, FormType } from '@/types';
import services from '@/services';
import { Input, Select, Tag } from 'antd';
import {
  MerchantSettleCycleOptions,
  StatusSelectItems,
  System,
} from '@/constants';
import { useRef, useState } from 'react';
import BalanceRecord from './balance-record';
import NotifyRecord from '@/pages/merchant/manage/notify-record';
import ChannelConfig from '@/pages/merchant/manage/channel-config';
import { useModel } from 'umi';
import _ from 'lodash';
import ChangeBalance from '@/pages/merchant/manage/change-balance';
import { useAsyncEffect } from 'ahooks';
import { ProFormInstance } from '@ant-design/pro-components';
import BillingSettings, {
  billingSettingsItem,
  CurrencyItem,
} from '@/pages/merchant/manage/components/billing-settings';

export default () => {
  const tableRef = useRef<any>();
  const defaultKeywordType = 'id';
  const [keywordType, setKeywordType] = useState<any>(defaultKeywordType);
  const [keyword, setKeyword] = useState('');
  const searchFormRef: any = useState<ProFormInstance>();

  const {
    getMerchantOptionItems,
    getCurrencyOptionItems,
    getFirstCurrencyOption,
  } = useModel('global');
  const [currency, setCurrency] = useState<any>('');

  useAsyncEffect(async () => {
    const firstCurrency = await getFirstCurrencyOption();
    searchFormRef?.current?.setFieldValue('currency', firstCurrency);
    setCurrency(firstCurrency);
  }, []);

  const listRequest = async (params: any, sort: any, filter: any) => {
    if (!params.currency) {
      params.currency = await getFirstCurrencyOption();
    }
    if (params.rechargeBillingCycle) {
      params.rechargeBillingCycle = Number(params.rechargeBillingCycle)
    }
    setCurrency(params.currency);
    if (keyword) {
      params[keywordType] = keyword;
    }
    return services.merchant.manage.list(params);
  };

  const detailRequest = async (record: any) => {
    const detail = _.cloneDeep(record);
    detail.currency = detail.currency.split(',');
    return detail;
  };

  const onFormValuesChange = (values: any, formRef: any) => {
    const { currency } = values || {};
    console.log(_.cloneDeep(values), 'currency');
    if (currency) {
      const currencyList: CurrencyItem[] =
        formRef.current?.getFieldValue('currencyList');
      // console.log(formRef.current?.getFieldValue('currencyList'));
      const items = currency.map((val: string): CurrencyItem => {
        const item = _.find(currencyList, (item) => item.currency === val);
        return {
          ...(item || billingSettingsItem),
          currency: val,
        };
      });
      formRef.current?.setFieldValue('currencyList', items);
      console.log(formRef);
    }
  };

  const columns: any[] = [
    {
      title: '上级商户号',
      dataIndex: 'parentId',
      valueType: 'select',
      request: () => getMerchantOptionItems(System.Not),
      fieldProps: {
        defaultValue: null,
      },
      hideInTable: true,
      hideInSearch: true,
    },
    {
      title: '商户号',
      dataIndex: 'id',
      fieldProps: {
        disabled: true,
        placeholder: '自动生成',
      },
      hideInSearch: true,
    },
    {
      title: '币种',
      dataIndex: 'currency',
      valueType: 'select',
      request: () => getCurrencyOptionItems(null),
      fieldProps: {
        allowClear: false,
      },
      hideInForm: true,
      hideInTable: true,
    },
    {
      title: '',
      renderFormItem: () => {
        return (
          <Input.Group compact style={{ marginLeft: 5 }}>
            <Select
              defaultValue={defaultKeywordType}
              style={{ width: '100px' }}
              onChange={setKeywordType}
            >
              <Select.Option value="id">商户ID</Select.Option>
              <Select.Option value="name">商户名称</Select.Option>
            </Select>
            <Input
              style={{ width: 'calc(100% - 110px)' }}
              value={keyword}
              placeholder={
                keywordType === 'id' ? '请输入商户ID' : '请输入商户名称'
              }
              onChange={(e) => {
                const keyword = e.target.value;
                setKeyword(keyword);
              }}
            />
          </Input.Group>
        );
      },
      hideInForm: true,
      hideInTable: true,
    },
    {
      title: '商户名称',
      dataIndex: 'name',
      hideInSearch: true,
      formItemProps: {
        rules: [
          {
            required: true,
          },
        ],
      },
    },
    {
      title: '备注',
      dataIndex: 'remark',
      hideInTable: true,
      hideInSearch: true,
    },
    {
      title: '提现USDT地址',
      dataIndex: 'usdt',
      hideInTable: true,
      hideInSearch: true,
    },
    {
      title: '开通货币',
      dataIndex: 'currency',
      valueType: 'select',
      request: () => getCurrencyOptionItems(null),
      fieldProps: {
        allowClear: false,
        mode: 'multiple',
        getPopupContainer: (triggerNode: any) => triggerNode,
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请选择开通货币',
          },
        ],
      },
      hideInTable: true,
      hideInSearch: true,
    },
    {
      valueType: 'dependency',
      name: ['currency'],
      hideInTable: true,
      hideInSearch: true,
      columns: ({ currency }: any) => {
        if (currency && currency.length > 0) {
          return [
            {
              title: '结算设置',
              dataIndex: 'currencyList',
              valueType: 'billingSettings',
              renderFormItem: (text: any, props: any) => (
                <BillingSettings {...props} />
              ),
            },
          ];
        }
        return [];
      },
    },
    // {
    //   title: '代收结算周期',
    //   dataIndex: 'billingCycle',
    //   valueType: 'select',
    //   request: async () => MerchantSettleCycleOptions,
    //   fieldProps: {
    //     defaultValue: MerchantSettleCycleOptions[0],
    //   },
    //   hideInTable: true,
    //   hideInForm: true,
    //   hideInSearch: true,
    // },
    {
      title: '当月手续费',
      dataIndex: 'fee',
      hideInSearch: true,
      hideInForm: true,
      sorter: (a: any, b: any) => a.fee - b.fee
    },
    {
      title: '可用余额',
      dataIndex: 'availableBalance',
      hideInSearch: true,
      hideInForm: true,
      sorter: (a: any, b: any) => a.availableBalance - b.availableBalance
    },
    {
      title: '未结算余额',
      dataIndex: 'unsettledBalance',
      hideInSearch: true,
      hideInForm: true,
      sorter: (a: any, b: any) => a.unsettledBalance - b.unsettledBalance
    },
    {
      title: '冻结余额',
      dataIndex: 'freezeBalance',
      hideInSearch: true,
      hideInForm: true,
      sorter: (a: any, b: any) => a.freezeBalance - b.freezeBalance
    },
    {
      title: '代付余额',
      dataIndex: 'payBalance',
      hideInSearch: true,
      hideInForm: true,
      sorter: (a: any, b: any) => a.payBalance - b.payBalance
    },
    {
      title: '当前余额',
      dataIndex: 'balance',
      hideInSearch: true,
      hideInForm: true,
      sorter: (a: any, b: any) => a.balance - b.balance
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      request: StatusSelectItems,
      render: (text: any, record: any) => (
        <Tag color={record.status === 1 ? 'green' : 'red'}>{text}</Tag>
      ),
      fieldProps: {
        defaultValue: '',
        allowClear: false,
      },
      hideInForm: true,
    },
    {
      title: '结算周期',
      dataIndex: 'rechargeBillingCycle',
      valueType: 'select',
      fieldProps: {
        options: MerchantSettleCycleOptions,
        placeholder: '请选择结算周期',
      },
      hideInForm: true,
      hideInTable: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '商户账号最后登录时间',
      dataIndex: 'lastLoginTime',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '修改时间',
      dataIndex: 'updateTime',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '操作人',
      dataIndex: 'updateBy',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '谷歌验证码',
      dataIndex: 'googleCode',
      hideInTable: true,
      hideInSearch: true,
    },
    {
      title: '支付密码',
      dataIndex: 'payPassword',
      hideInTable: true,
      hideInSearch: true,
    },
  ];

  return (
    <>
      <TablePage
        tableRef={tableRef}
        searchFormRef={searchFormRef}
        moduleName="商户"
        moduleTitle="商户管理"
        columns={columns}
        onFormValuesChange={onFormValuesChange}
        addRequest={services.merchant.manage.add}
        listRequest={listRequest}
        detailRequest={detailRequest}
        editRequest={services.merchant.manage.edit}
        changeStatusRequest={services.merchant.manage.changeStatus}
        beforeRequestFormat={(params) => {
          if (params.currency) {
            params.currency = params.currency.join(',');
          }
          return params;
        }}
        scroll={{ x: 2000 }}
        actionsWidth={260}
        onReset={() => {
          setKeyword('');
        }}
        actions={(record) => [
          <ChangeBalance
            key="changeBalance"
            record={record}
            currency={currency}
            reload={tableRef?.current?.reload}
          />,
          <ChannelConfig
            key="channelConfig"
            record={record}
            tag="a"
            buttonLabel="通道配置"
            reload={tableRef?.current?.reload}
          />,
        ]}
        toolBarActions={(action) => [
          <BalanceRecord key="changeBalanceRecord" />,
          <NotifyRecord key="merchantNotify" />,
          // <ChannelConfig
          //   key="channelConfig"
          //   reload={tableRef?.current?.reload}
          // />,
        ]}
      />
    </>
  );
};
