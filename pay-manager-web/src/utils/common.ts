import RuleUtils from './class/RuleUtils'; // 验证规则类
import TimerUtils from './class/TimerUtils'; // 定时器管理类
import DateUtils from './class/DateUtils'; // 日期管理类
import PermissionUtils  from './class/PermissionUtils'; // 权限管理类
import AntdUtils from './class/AntdUtils'; // antd组件UI类

const common = {
  ruleUtils: RuleUtils,
  timerUtils: TimerUtils,
  dateUtils: DateUtils,
  permissionUtils: PermissionUtils,
  antdUtils: AntdUtils
};
export default common;
