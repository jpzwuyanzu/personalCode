import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
} from 'axios';
import { message, Modal } from 'antd';
import utils from '@/utils';
import { APP_USER_INFO } from '@/constants/storage';
import { CodeEnum } from '@/enums';
import _ from 'lodash';
import { history } from 'umi';

interface CustomConfig {
  filter?: boolean; // 过滤查询条件中的空字符串等
}

declare module 'axios' {
  export interface AxiosRequestConfig {
    /**
     * 增加自定义配置
     */
    customConfig?: CustomConfig;
  }
}

// 过滤查询条件中的空参数
const filterQueryEmptyParams = (params: any) => {
  const emptyList = [null, undefined, ''];
  Object.keys(params).forEach((key) => {
    if (
      emptyList.includes(params[key]) ||
      (utils.types(params[key]) === 'string' &&
        String(params[key]).trim() === '')
    ) {
      delete params[key];
    }
  });
};

let isAccountExpired = false;
let isAccountAbnormal = false;

/**
 * Content-Type 类型
 */
export enum ContentTypeEnum {
  Json = 'application/json',
  Form = 'application/x-www-form-urlencoded',
  FormData = 'multipart/form-data',
}

type RequestInstance = AxiosInstance & {
  table: (
    url: string,
    params: any,
    config?: AxiosRequestConfig,
  ) => Promise<any>;
  download: (
    url: string,
    params: any,
    config?: AxiosRequestConfig,
  ) => Promise<any>;
};

// @ts-ignore
const request: RequestInstance = axios.create({
  baseURL: '/api',
  timeout: 30000,
});

request.table = async (
  url: string,
  params: any = {},
  config?: AxiosRequestConfig,
) => {
  // 请求参数转换
  params.size = params.pageSize;
  delete params.pageSize;

  const { customConfig, method = 'post' } = config ?? {};
  const isFilter = customConfig?.filter ?? true;

  if (isFilter) {
    filterQueryEmptyParams(params);
  }

  const Key = method === 'get' ? 'params' : 'data';
  const data = await request({
    url,
    method,
    [Key]: params,
  });

  const getData = () => {
    const list = _.get(data, 'records', []);
    list.forEach((item: any, idx: number) => {
      item.key = item.id ?? idx;
    });
    return list;
  };

  // 响应数据结构转换
  return {
    success: CodeEnum.Success,
    data: getData(),
    total: _.get(data, 'total', 0),
    originData: data,
  };
};

request.download = async (
  url: string,
  params: any = {},
  config?: AxiosRequestConfig,
) => {
  // 导出 Excel 文件
  return request.post(url, params, {
    ...config,
    responseType: 'blob',
  });
};

request.interceptors.request.use((config: AxiosRequestConfig) => {
  const { method, customConfig } = config;
  const isFilter = customConfig?.filter ?? false;

  if (isFilter && _.isObject(config.data)) {
    filterQueryEmptyParams(config.data);
  }

  const headers: any = {
    ...config.headers,
    language: 'CN',
    tid: 300,
    timestamp: Date.now(),
  };

  // 用户信息
  const userinfo = utils.localStorage.get(APP_USER_INFO);
  const token = _.get(userinfo, 'token', '');
  if (!config.url?.endsWith('/login') && token) {
    headers.Authorization = `Authorization ${token}`;
  }

  if (method === 'put' && !headers['Content-Type']) {
    headers['Content-Type'] = ContentTypeEnum.Json;
  }

  config.headers = headers;
  return config;
});

/**
 * 账号过期
 */
function accountExpired() {
  Modal.warning({
    title: '重新登录',
    content: '登录信息已过期，请重新登录!',
    centered: true, // 居中显示
    maskClosable: false, // 点击modal关闭
    keyboard: false, // esc关闭
    okText: '确定',
    cancelText: '',
    onOk: () => {
      return new Promise((resolve) => {
        utils.localStorage.remove(APP_USER_INFO);
        history.push('/login');

        setTimeout(() => {
          isAccountExpired = false;
        }, 300);
        resolve('suc');
      });
    },
  });
}

/**
 * 账号顶号
 */
function accountAbnormal() {
  Modal.warning({
    title: '您的帐号已在其他地方登录',
    content: '请重新登录!',
    centered: true, // 居中显示
    maskClosable: false, // 点击modal关闭
    keyboard: false, // esc关闭
    okText: '确定',
    cancelText: '',
    onOk: () => {
      return new Promise((resolve) => {
        utils.localStorage.remove(APP_USER_INFO);
        history.push('/login');

        setTimeout(() => {
          isAccountAbnormal = false;
        }, 300);
        resolve('suc');
      });
    },
  });
}

const downloadFile = (response: AxiosResponse): any => {
  const { data, headers, config } = response;
  const type = headers['content-type'];
  const blob = new Blob([data], { type });
  let filename = headers['content-disposition'].replace(
    /\w+;filename=(utf-8'')?(.*)/,
    '$2',
  );
  filename = decodeURIComponent(filename);
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  if (typeof link.download === 'undefined') {
    link.setAttribute('target', '_blank');
  } else {
    link.setAttribute('download', decodeURI(filename));
  }
  link.click();
  window.URL.revokeObjectURL(link.href);
  return Promise.resolve(true);
};

request.interceptors.response.use((response: AxiosResponse) => {
  const responseData = response.data;

  const { config } = response;

  if (config.responseType === 'blob') {
    return downloadFile(response);
  }

  if (responseData.code === CodeEnum.Success) {
    // 成功仅返回数据
    return responseData.data;

    /**
     * 账号过期
     */
  } else if (responseData.code === CodeEnum.LoginExpired) {
    // 仅触发一次弹出层
    if (!isAccountExpired) {
      isAccountExpired = true;
      accountExpired();
    }
    return false;

    /**
     * 被顶号
     */
  } else if (responseData.code === CodeEnum.AcccountAbnormal) {
    // 仅触发一次弹出层
    if (!isAccountAbnormal) {
      isAccountAbnormal = true;
      accountAbnormal();
    }
    return false;
  } else {
    message.error(responseData.msg || '请求失败');
    return Promise.reject(responseData);
  }
});

export default request;
