

import { ColorEnum } from '@/enums';
import { BaseAll , BaseRequestAsync } from './system'
/**
 * 通道状态
 */
export const ChannelStatusList = [
  BaseAll,
  {
    label: '启用',
    value: 1,
    color: ColorEnum.Green,
  },
  {
    label: '停用',
    value: 2,
    color: ColorEnum.Red,
  },
];