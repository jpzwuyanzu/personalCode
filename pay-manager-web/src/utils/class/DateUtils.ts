import dayjs, { Dayjs } from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';

dayjs.extend(weekday);
dayjs.extend(localeData);

type TimeFromatConfig = {
  formatDate?: boolean;
  formatTime?: boolean;
  formatTimeStamp?: boolean;
};

class DateUtil {
  // 格式化到天
  static formatDate = 'YYYY-MM-DD';

  // 格式化到秒
  static formatTime = 'YYYY-MM-DD HH:mm:ss';

  /**
   * 预设时间范围
   */
  static rangePresets: {
    label: string;
    value: any[];
  }[] = [
    { label: '今天', value: this.getDateRange(1) },
    { label: '最近3天', value: this.getDateRange(3) },
    { label: '最近7天', value: this.getDateRange(7) },
    { label: '最近30天', value: this.getDateRange(30) },
  ];

  /**
   * 预设开始结束时间
   */
  static rangeDefaultTime = () => {
    return [dayjs('00:00:00', 'HH:mm:ss'), dayjs('23:59:59', 'HH:mm:ss')];
  };

  // 格式成string
  static formatDateString(date: string | Dayjs | number, bool = true) {
    const formatStr = bool ? this.formatTime : this.formatDate;
    return dayjs(date).format(formatStr);
  }

  /**
   * 将返回的字符串转为dayjs格式，不需要做时区处理
   */
  static toDayjsDate(dateStr: number | string = '', format = '') {
    if (!!format) {
      return dayjs(dateStr, format);
    }
    return dayjs(dateStr);
  }

  /**
   * 获取时间戳
   */
  static getTimeStamsp(date: Dayjs | string) {
    return dayjs(date).utcOffset().valueOf();
  }

  /**
   * 通过配置获取日期格式
   * @param prev
   * @param next
   * @param config
   */
  static getFormatByConfig(prev: Dayjs, next: Dayjs, config: TimeFromatConfig) {
    const {
      formatDate = false,
      formatTime = false,
      formatTimeStamp = false,
    } = config;
    // 格式化日期到天
    if (formatDate) {
      return [prev.format(this.formatDate), next.format(this.formatDate)];
    }
    // 格式化日期到秒
    if (formatTime) {
      return [prev.format(this.formatTime), next.format(this.formatTime)];
    }
    // 时间戳
    if (formatTimeStamp) {
      return [prev.valueOf(), next.valueOf()];
    }
    // dayjs日期
    return [prev, next];
  }

  /**
   * 获取默认的日期
   */
  static getInitDate(index = 0) {
    return [
      dayjs()
        .subtract(index - 1, 'days')
        .startOf('day'),
      dayjs().endOf('day'),
    ];
  }
  /**
   * 获取日期范围 从当前时间往上计算
   * @param index
   * @param config
   */
  static getDateRange(index = 0, config?: TimeFromatConfig) {
    const [startDate, endDate] = this.getInitDate(index);
    return this.getFormatByConfig(startDate, endDate, config || {});
  }

  /**
   * 将日期的string数据转换为对应的格式
   */
  static toFormatDateParams(
    date: any[],
    config: TimeFromatConfig = { formatTimeStamp: true },
  ) {
    if (date && Array.isArray(date)) {
      const [start, end] = date;
      return this.getFormatByConfig(
        this.toDayjsDate(start),
        this.toDayjsDate(end),
        config,
      );
    }
    return [];
  }
}

export default DateUtil;
