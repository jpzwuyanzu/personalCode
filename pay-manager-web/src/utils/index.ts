import { uniq } from 'lodash';
import { v4 as uuidV4 } from 'uuid';

export default {
  localStorage: {
    get(key: string) {
      let val: any = localStorage.getItem(key);
      try {
        if (val) {
          val = JSON.parse(val);
        }
      } catch (e) {
        console.error(e);
      }
      return val || undefined;
    },
    set(key: string, val: any) {
      const _val = typeof val === 'object' ? JSON.stringify(val) : val;
      localStorage.setItem(key, _val);
    },
    remove(key: string) {
      localStorage.removeItem(key);
    },
  },

  /**
   * 过滤字符串空格
   */
  trims: (str: string, isGlobal = '') => {
    let result;
    result = str.replace(/(^\s+)|(\s+$)/g, '');
    if (isGlobal.toLowerCase() === 'g') {
      result = result.replace(/\s/g, '');
    }
    return result;
  },

  /**
   * 多个逗号，多个空格去重后校验
   * 用于数据容错处理
   * @param content 内容
   * @param removeRepeat 是否去掉重复值
   * @returns
   */
  getContentOfFields(content: string, removeRepeat = false) {
    const formatContent = this.trims(content)
      .replace(/\s+/g, ',')
      .replace(/，/g, ',');

    const result = formatContent
      .split(',')
      .filter((i) => i !== '')
      .map((i) => this.trims(i));
    return removeRepeat ? uniq(result) : result;
  },

  /**
   * 检验类型
   * @param data
   * @returns
   */
  types(data: unknown): string {
    return Object.prototype.toString
      .call(data)
      .split('[object')[1]
      .replace(/\s|\]/g, '')
      .toLowerCase();
  },

  /**
   * 生成uuid
   */
  uuid: () => uuidV4().replace(/-/g, ''),

  /**
   * 去掉 params 所有值为空字符串的属性
   */
  filterParams(params: Record<string, any>) {
    const result: any = {};
    Object.keys(params).forEach((key) => {
      if (params[key] !== undefined && params[key] !== '') {
        result[key] = params[key];
      }
    });
    return result;
  },
};
