import './index.less';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import services from '@/services';
import utils from '@/utils';
import { APP_USER_INFO } from '@/constants/storage';
import { history, useModel } from 'umi';
import common from '@/utils/common';
import { EnterModeEnum } from '@/enums';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { APP_IS_PAYMENT, APP_NAME } from '@/constants';
import logo from '@/assets/logo.png';
import _ from 'lodash';

export default () => {
  const { updateUserInfo, setIsLogin, setEnterMode } = useModel('user');
  return (
    <div className="login-form-page">
      <LoginForm
        logo={logo}
        title={APP_NAME}
        onFinish={async (values) => {
          const { token } = await services.user.login(values);
          if (!!token) {
            const { username } = values;

            const userData = {
              userName: username,
              token,
            };
            // 更新用户信息
            updateUserInfo(userData);
            // 存储到local
            utils.localStorage.set(APP_USER_INFO, userData);

            // 获取路由数据
            const routers = await services.user.getUserRouter();

            // 获取第一个路由
            const firstRoute: any = _.first(routers);
            let jumpPath = _.get(
              firstRoute,
              'children[0].path',
              firstRoute?.path || '/',
            );

            if (jumpPath.indexOf('/') !== 0) {
              jumpPath = '/' + jumpPath;
            }

            console.log(`jumpPath`, jumpPath);

            // 设置为登录模式
            setEnterMode(EnterModeEnum.Login);
            // 修改登录状态
            setIsLogin(true);

            // 路由跳转
            location.href = jumpPath;
          }
          return !!token;
        }}
      >
        <ProFormText
          name="username"
          fieldProps={{
            maxLength: 20,
            size: 'large',
            prefix: <UserOutlined className={'prefixIcon'} />,
          }}
          placeholder="用户名"
          rules={[
            common.ruleUtils.getRule('required', '请输入用户名!'),
            common.ruleUtils.getRule('username'),
          ]}
        />
        <ProFormText.Password
          name="password"
          fieldProps={{
            maxLength: 20,
            size: 'large',
            prefix: <LockOutlined className={'prefixIcon'} />,
          }}
          placeholder="密码"
          rules={[
            common.ruleUtils.getRule('required', '请输入密码！'),
            common.ruleUtils.getRule('password'),
          ]}
        />
        <ProFormText
          name="googleCode"
          fieldProps={{
            maxLength: 6,
            size: 'large',
            prefix: <LockOutlined className={'prefixIcon'} />,
          }}
          placeholder="谷歌验证码"
          rules={[common.ruleUtils.getRule('googleCode')]}
        />
      </LoginForm>
    </div>
  );
};
