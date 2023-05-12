import { Items } from '@/constants/system';

export const MODE = process.env.MODE || 'test';
export const APP = process.env.APP || 'payment';
export const APP_NAME = process.env.APP_NAME || '支付管理平台';

// 是否为支付后台(即管理后台)
export const APP_IS_PAYMENT = APP === 'payment';

// 测试环境
export const IS_TEST = MODE === 'test';

export const SUCCESS_CODE = 200;

export const GLOBAL_LANGUAGE_MAP = {
  EN: 'en-US',
  ZH: 'zh-CN',
};

export * as System from './system';
export * as Channel from './channel';

export const StatusEnum: any = {
  1: {
    text: '启用',
    status: 1,
  },
  2: {
    text: '禁用',
    status: 2,
  },
};

export const StatusSelectItems = () => {
  const items = [
    {
      label: '全部',
      value: '',
    },
  ];

  Object.keys(StatusEnum).forEach((key) => {
    items.push({
      label: StatusEnum[key].text,
      value: key,
    });
  });

  return Promise.resolve(items);
};

// 操作日志 - 操作类型
export const LogOperatorTypeOptions = [
  { label: '全部', value: '' },
  { label: '新增', value: 1 },
  { label: '修改', value: 2 },
  { label: '删除', value: 3 },
  { label: '授权', value: 4 },
  { label: '导出', value: 5 },
  { label: '导入', value: 6 },
  { label: '清空数据', value: 9 },
  { label: '查询', value: 10 },
  { label: '其它', value: 0 },
];

export const BaseModalConfig = {
  centered: true,
  destroyOnClose: true,
  maskClosable: true,
  keyboard: true,
};

/**
 * 账户类型
 */
export const MerchantAccountTypeOptions: any[] = [
  {
    label: '代收-可用',
    value: 1,
  },
  {
    label: '代收-未结算',
    value: 2,
  },
  {
    label: '代付',
    value: 3,
  },
  {
    label: '代收-冻结',
    value: 4,
  },
];

/**
 * 账变类型
 * (1代收,2代收手续费,3代付,4代付手续费,5USDT充值,6USDT提现,7提现返还,8代付失败退回,9代付失败手续费退回,10添加余额,11扣除余额,12冻结余额,13解冻余额,14划拨至代付,15划拨至代收,16复核,17冻结,99其他)
 */
export const MerchantAccountChangeTypeOptions: any[] = [
  {
    label: '代收',
    value: 1,
  },
  {
    label: '代收手续费',
    value: 2,
  },
  {
    label: '代付',
    value: 3,
  },
  {
    label: '代付手续费',
    value: 4,
  },
  {
    label: 'USDT充值',
    value: 5,
  },
  {
    label: 'USDT提现',
    value: 6,
  },
  {
    label: '提现返还',
    value: 7,
  },
  {
    label: '代付失败退回',
    value: 8,
  },
  {
    label: '代付失败手续费退回',
    value: 9,
  },
  {
    label: '添加余额',
    value: 10,
  },
  {
    label: '扣除余额',
    value: 11,
  },
  {
    label: '冻结余额',
    value: 12,
  },
  {
    label: '解冻余额',
    value: 13,
  },
  {
    label: '划拨至代付',
    value: 14,
  },
  {
    label: '划拨至代收',
    value: 15,
  },
  {
    label: '复核',
    value: 16,
  },
  {
    label: '结算',
    value: 17,
  },
  {
    label: '其他',
    value: 99,
  },
];

/**
 * 结算周期
 */
export const MerchantSettleCycleOptions: any[] = [
  {
    label: 'T+0',
    value: '0',
  },
  {
    label: 'T+1',
    value: '1',
  },
  {
    label: 'T+2',
    value: '2',
  },
  {
    label: 'T+3',
    value: '3',
  },
  {
    label: 'T+7',
    value: '7',
  },
  {
    label: 'T+30',
    value: '30',
  },
];

/**
 * 支付状态
 */

export const PayStatusOptions: any[] = [
  {
    label: '待转账',
    value: 0,
    color: 'red',
  },
  {
    label: '已转账',
    value: 1,
    color: 'deepskyblue',
  },
  {
    label: '转账失败',
    value: 2,
    color: 'red',
  },
];

/**
 * 回调状态
 */
export const CallbackStatusOptions: any[] = [
  {
    label: '待回调',
    value: 0,
    color: 'grey',
  },
  {
    label: '已回调',
    value: 1,
    color: 'orange',
  },
  {
    label: '回调失败',
    value: 2,
    color: 'red',
  },
];

/**
 * 提现审核状态
 */

export const WithdrawAuditStatusOptions: any[] = [
  {
    label: '待打款',
    value: 0,
    color: 'green',
  },
  {
    label: '打款中',
    value: 1,
    color: 'orange',
  },
  {
    label: '已打款',
    value: 2,
    color: 'grey',
  },
  {
    label: '打款失败',
    value: 3,
    color: 'red',
  },
  {
    label: '退回',
    value: 4,
    color: 'red',
  },
];

/**
 * 提现打款方式
 */
export const WithdrawExchangeTypeOptions: any[] = [
  {
    label: 'USDT',
    value: 1,
  },
];

/**
 * USDT订单状态 0等待支付,1支付成功,2取消支付
 */
export const USDTOrderStatusOptions: any[] = [
  {
    label: '等待支付',
    value: 0,
    color: 'grey',
  },
  {
    label: '支付成功',
    value: 1,
    color: 'green',
  },
  {
    label: '取消支付',
    value: 2,
    color: 'red',
  },
];

/**
 * 通道余额记录类型 1=人工增加2=人工扣减3=代收金额4=代收手续费5=代付金额6=代付手续费7=代付金额退回8=代付手续费退回
 */
export const ChannelBalanceRecordTypeOptions: any[] = [
  {
    label: '人工增加',
    value: 1,
  },
  {
    label: '人工扣减',
    value: 2,
  },
  {
    label: '代收金额',
    value: 3,
  },
  {
    label: '代收手续费',
    value: 4,
  },
  {
    label: '代付金额',
    value: 5,
  },
  {
    label: '代付手续费',
    value: 6,
  },
  {
    label: '代付金额退回',
    value: 7,
  },
  {
    label: '代付手续费退回',
    value: 8,
  },
];
