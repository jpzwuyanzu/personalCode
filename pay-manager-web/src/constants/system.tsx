import { ColorEnum } from '@/enums';

export interface Items {
  label: string;
  value: string | number | null;
  color?: ColorEnum;
  [propName: string]: any;
}

export const BaseAll: Items = {
  label: '全部',
  value: '',
};

export const Not: Items = {
  label: '无',
  value: null,
};

/**
 * 账号状态
 */
export const SystemAccountStatusList: Items[] = [
  BaseAll,
  {
    label: '启用',
    value: 0,
    color: ColorEnum.Green,
  },
  {
    label: '停用',
    value: 1,
    color: ColorEnum.Red,
  },
];

/**
 * google验证是否开启
 */
export const SystemAccountGoogleList: Items[] = [
  {
    label: '设置',
    value: 1,
  },
  {
    label: '不设置',
    value: 0,
  },
];

/**
 * 支付类型
 */
export const SystemPaymentType: Items[] = [
  {
    label: '代收',
    value: 1,
  },
  {
    label: '代付',
    value: 2,
  },
];

export const BaseRequestAsync = (data: any[]) => () => Promise.resolve(data);
