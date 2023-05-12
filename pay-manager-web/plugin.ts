import type { IApi } from 'umi';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

export default (api: IApi) => {
  // 添加打包日期，方便快速查看更新
  api.modifyHTML(($: any) => {
    // dayjs 获取当前时间并转为+8时区，然后格式化
    const datetime = dayjs().utcOffset(8).format('YYYY-MM-DD HH:mm:ss');
    $('html').attr('data-version', datetime);
    return $;
  });
};
