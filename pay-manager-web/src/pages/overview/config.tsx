export const DefaultSetting1 = {
  xs: 24,
  sm: 24,
  md: 8,
  lg: 8,
  xl: 8,
};

export const DefaultSetting2 = {
  xs: 24,
  sm: 24,
  md: 16,
  lg: 16,
  xl: 16,
};

export const DefaultSetting3 = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 12,
  xl: 12,
};

export type StatisticsListType = {
  label: string;
  dataIndex: string;
  unit: string;
  precision: number;
};

/**
 * 资金
 */
export const FundList: StatisticsListType[] = [
  {
    label: '余额',
    dataIndex: 'balance',
    unit: '',
    precision: 2,
  },
  {
    label: '代收可用余额',
    dataIndex: 'availableBalance',
    unit: '',
    precision: 2,
  },
  {
    label: '代收未结算余额',
    dataIndex: 'unsettledBalance',
    unit: '',
    precision: 2,
  },
  {
    label: '代付余额',
    dataIndex: 'payBalance',
    unit: '',
    precision: 2,
  },
  {
    label: '今日提现',
    dataIndex: 'exchangeAmount',
    unit: '',
    precision: 2,
  },
  {
    label: '今日冻结',
    dataIndex: 'freezeBalance',
    unit: '',
    precision: 2,
  },
];

/**
 * 代收
 */
export const CollectionList: StatisticsListType[] = [
  {
    label: '代收成功金额',
    dataIndex: 'collectionAmount',
    unit: '',
    precision: 2,
  },
  {
    label: '代收成功笔数',
    dataIndex: 'collectionNum',
    unit: '',
    precision: 0,
  },
  {
    label: '成功率',
    dataIndex: 'collectionRate',
    unit: '%',
    precision: 2,
  },
  {
    label: '代收手续费',
    dataIndex: 'collectionFee',
    unit: '',
    precision: 2,
  },
];

/**
 * 代付
 */
export const PayList: StatisticsListType[] = [
  {
    label: '代付成功金额',
    dataIndex: 'paymentAmount',
    unit: '',
    precision: 2,
  },
  {
    label: '代付成功笔数',
    dataIndex: 'paymentNum',
    unit: '',
    precision: 0,
  },
  {
    label: '成功率',
    dataIndex: 'paymentRate',
    unit: '%',
    precision: 2,
  },
  {
    label: '代付手续费',
    dataIndex: 'paymentFee',
    unit: '',
    precision: 2,
  },
];
