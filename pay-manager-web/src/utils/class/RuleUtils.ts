import { isFunction, omit, isArray } from 'lodash';
import utils from '@/utils';
import type { Rule } from 'rc-field-form/lib/interface';

/**
 * 规则对象
 */
export const rulesMap = {
  /**
   * ---------------------------------------- 特殊处理场景 --------------------------------------------
   */
  // 必填项不能为空
  required: () => ({
    required: true,
    message: '必填项不能为空',
  }),
  // 自定义校验
  validator: (arg: any) => ({ ...arg }),
  /**
   * ---------------------------------------- 正则方法 --------------------------------------------
   */
  usdtAddress: () => ({
    pattern: /^[A-Za-z\d]{20,60}$/,
    message: '请输入正确的地址',
  }),
  userId: () => ({
    pattern: /^[\d]{1,10}$/,
    message: '1-10位数字',
  }),
  username: () => ({
    pattern: /^[a-zA-Z0-9]{3,16}$/,
    message: '3-16位数字、字母的组合',
  }),
  // 账号系统密码
  password: () => ({
    pattern: /^[a-zA-Z0-9\S]{6,16}$/,
    message: '6-16位数字、字母的组合',
  }),
  //请输入正整数
  integer: () => ({
    pattern: /^[0-9]+$/,
    message: '请输入正整数',
  }),
  //请输入6位纯数字
  sixNumber: () => ({
    pattern: /^\d{6}$/,
    message: '请输入6位纯数字',
  }),
  //请输入4位以上纯数字
  fourMoreNumber: () => ({
    pattern: /^\d{4,}$/,
    message: '请输入4位以上纯数字',
  }),
  // 请输入大于0的数字 (含小数)
  decimalExceedZero: () => ({
    pattern: /^(?!0(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d+)?$/,
    message: '请输入大于0的数字',
  }),
  // 手机号验证
  cellphone: () => ({
    pattern: /^[\d]{6,20}$/,
    message: '请输入正确的手机号',
  }),
  // 谷歌验证码
  googleCode: () => ({
    pattern: /^[\d]{6}$/,
    message: '请输入6位数字',
  }),
  //邮箱账号验证
  email: () => ({
    pattern: /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/,
    message: '请输入正确的邮箱格式',
  }),
  //网址校验验证
  websiteDomain: () => ({
    pattern:
      /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-.,@?^=%&:/~+#]*[\w\-@?^=%&/~+#])?/,
    message: '请输入以http或https开头的正确网址',
  }),
  // IP地址验证
  ipAddress: () => ({
    pattern:
      /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,
    message: 'IP格式不正确',
  }),
  // 不能小于0
  notZero: () => ({
    required: true,
    validator: (rule: Rule, value: number, callback: (arg?: any) => void) => {
      if (value <= 0) {
        callback('必须大于0');
      }
      callback();
    },
  }),
  /**
   * ---------------------------------------- 以下为动态参数方法 --------------------------------------------
   */
  // 中英文,支持动态数量 (仅支持中英文,输入范围${cStart}-${cEnd}个字符)
  chineseAndEnglishValidate: ({ cStart = 1, cEnd = 32 }) => ({
    pattern: new RegExp(`^[\\u4E00-\\u9FA5a-z]{${cStart},${cEnd}}$`, 'i'),
    message: `仅支持中英文,输入范围${cStart}-${cEnd}个字符`,
  }),
  // 数字范围组件验证
  digitRange: () => ({
    required: true,
    validator: (rule: Rule, value: number[], callback: (arg?: any) => void) => {
      if (!value[0] || !value[1]) {
        callback('请输入最小值和最大值');
      }
      callback();
    },
  }),
  /**
   * ---------------------------------------- 以下为自定义方法 --------------------------------------------
   */
  // 多个IP地址的校验，支持容错校验
  multipleIpAddress: () => ({
    validator(rule: Rule, value: string, callback: (arg?: any) => void) {
      const ipContentList = utils.getContentOfFields(value);
      const { pattern, message } = rulesMap.ipAddress();

      let validSuccess = true;
      const errorIpList: string[] = [];
      ipContentList.forEach((ip) => {
        if (!pattern.test(ip)) {
          errorIpList.push(ip);
          validSuccess = false;
        }
      });

      if (!validSuccess) {
        callback(`${message}（${errorIpList.join(',')}）`);
      }
      callback();
    },
  }),
};

type NameType = keyof typeof rulesMap;
type OptionsType = Rule & {
  dynamic?: Record<string, number>;
};

class RuleUtils {
  static rulesMap = rulesMap;
  /**
   * 获取校验规则方法
   * @template { keyof RulesMap } T
   * @template {typeof RuleUtils} C
   * @param {T} name 类型名， 与ruleConfig的key值对应
   * @param { undefined | null | string } message 校验失败的错误消息
   * @param {RulesOptions} options 其他配置项，用于拓展
   * @return {RuleItem}
   */
  static getRule(name: NameType, message?: string, options?: OptionsType) {
    const rulesMap = this.rulesMap;
    const transform = this.transform;
    // 判断获取的规则是否存在
    if (Object.keys(rulesMap).includes(name) && isFunction(rulesMap[name])) {
      // dynamic 参数用于动态传值
      const { dynamic = {} } = options ?? {};

      const res = rulesMap[name](dynamic);

      const dist = {
        trigger: ['blur', 'change'],
        ...res,
        ...omit(options, 'dynamic'),
      };

      if (message) {
        dist.message = message;
      }
      // transform null  v => v 都会有影响
      if (transform) {
        dist.transform = transform;
      }
      return dist;
    }
    // 为空 async-validate 不会进行校验
    return {};
  }

  static transform(value: any) {
    if (isArray(value)) {
      Object.assign(this, { type: 'array' });
      return value;
    }
    return value?.toString()?.trim() ?? '';
  }
}

export default RuleUtils;
