/**
 * 进入系统模式
 */
export enum EnterModeEnum {
  /**
   * 登录模式
   */
  Login,
  /**
   * 刷新模式
   */
  Refresh
}

/**
 * 服务器返回code
 */
export enum CodeEnum {
  /**
   * 成功
   */
  Success = 200,
  /**
   * 登录过期
   */
  LoginExpired = 401,
  /**
   * 被他人顶号
   */
  AcccountAbnormal = 10012
}

/**
 * 颜色状态枚举
 */
export enum ColorEnum {
  Red = 'red',
  Green = 'green',
  Blue = 'blue',
  Orange = 'orange',
  Geekblue = 'geekblue',
}

/**
 * 通道类型
 */
export enum ChannelTypeEnum {
  /**
   * 代收
   */
  Collect = 1,
  /**
   * 代付
   */
  Payment = 2
}