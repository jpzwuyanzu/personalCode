import './style.less';
import { APP_NAME } from '@/constants';

export default () => {
  return (
    <div className="home">
      <div className="text">欢迎使用 {APP_NAME}</div>
    </div>
  );
};
