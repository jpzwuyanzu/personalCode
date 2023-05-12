import { CreateCard, WithButton } from '@/components';
import { Modal, Spin, Typography } from 'antd';
import { useState, useRef } from 'react';
import { Access, useAccess } from '@umijs/max';
import services from '@/services';
import { ProDescriptions } from '@ant-design/pro-components';
import UsdtModel from './modal/usdtModel';
import PayPasswordModel from './modal/payPasswordModel';
import ValidPasswordModel from './modal/validPasswordModel';
import './styles.less';
import common from '@/utils/common';
import ChannelModel from '@/pages/account/modal/channelModel';
import { useModel } from 'umi';
import { useAsyncEffect } from 'ahooks';
import BalanceModel from '@/pages/account/modal/balanceModel';
import CallbackModel from '@/pages/account/modal/callbackModel';
import PermissionUtils from '@/utils/class/PermissionUtils';
import { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import KeyModel from '@/pages/account/modal/keyModel';

export default () => {
  const { isAdmin, merchantInfo, getMerchantInfo, isFirstPayPassword } =
    useModel('merchant');
  const actionRef = useRef<any>();
  const [loading, setLoading] = useState(false);

  const [USDTVisible, setUSDTVisible] = useState(false);
  const [payPwdVisible, setPayPwdVisible] = useState(false);
  const [payValidVisible, setPayValidVisible] = useState(false);
  const [channelVisible, setChannelVisible] = useState(false);
  const [balanceVisible, setBalanceVisible] = useState(false);
  const [keyVisible, setKeyVisible] = useState(false);
  const [callbackVisible, setCallbackVisible] = useState(false);
  const [callback, setCallback] = useState(() => () => {});
  const access = useAccess();
  console.log(access, 'access ------');

  const requestAccountInfo = async () => {
    setLoading(true);
    const merchantInfo = await getMerchantInfo();
    setLoading(false);
    return {
      success: true,
      data: merchantInfo,
    };
  };

  useAsyncEffect(async () => {
    await requestAccountInfo();
  }, []);

  const placeholder = '-';

  const validPassCall = (callback: () => void) => {
    if (isFirstPayPassword) {
      callback();
    } else {
      setCallback(() => {
        return callback;
      });
      setPayValidVisible(true);
    }
  };

  const columns: ProDescriptionsItemProps[] = [
    {
      title: '登录账号',
      dataIndex: 'userName',
      key: 'userName',
      valueType: 'text',
      copyable: true,
    },
    {
      title: '商户名称',
      dataIndex: 'merchantName',
      key: 'merchantName',
    },
    {
      title: '商户号',
      dataIndex: 'merchantId',
      key: 'merchantId',
    },
    {
      title: '提现USDT地址',
      dataIndex: 'usdt',
      key: 'usdt',
      render: () => (
        <div>
          <span>{merchantInfo.usdt ?? placeholder}</span>
          <WithButton
            auth="system-account-info-update"
            type="primary"
            style={{ marginLeft: '20px' }}
            onClick={() => setUSDTVisible(true)}
          >
            更改
          </WithButton>
        </div>
      ),
    },
    {
      title: '可用余额',
      dataIndex: 'balance',
      key: 'balance',
      render: () => (
        <WithButton
          auth="system-account-info-balance"
          type="primary"
          onClick={() => {
            validPassCall(() => {
              setBalanceVisible(true);
            });
          }}
        >
          查看余额
        </WithButton>
      ),
    },
    {
      title: '其他操作',
      dataIndex: 'other',
      key: 'other',
      render: () => (
        <div className="account-actions">
          {common.antdUtils.renderTableAction(
            [
              {
                label: 'API文档下载',
                auth: 'system-account-info-api',
                type: 'primary',
                onClick: () => {
                  location.href = 'https://iggame.work/对接文档.zip';
                },
              },
              {
                label: '修改支付密码',
                auth: 'system-account-info-password',
                type: 'primary',
                onClick: () => setPayPwdVisible(true),
              },
              {
                label: '修改回调地址',
                auth: 'system-account-info-callback',
                type: 'primary',
                onClick: () => {
                  validPassCall(() => {
                    setCallbackVisible(true);
                  });
                },
              },
              {
                label: '查看密钥',
                auth: 'system-account-info-key',
                type: 'primary',
                onClick: () => {
                  validPassCall(async () => {
                    setKeyVisible(true);
                  });
                },
              },
              {
                label: '通道费率',
                auth: 'system-account-info-channel',
                type: 'primary',
                onClick: () => {
                  validPassCall(() => {
                    setChannelVisible(true);
                  });
                },
              },
            ],
            true,
          )}
        </div>
      ),
    },
  ];

  return (
    <CreateCard moduleTitle={['账户信息']}>
      <Spin tip="Loading..." spinning={loading}>
        <div className="account-info">
          <ProDescriptions
            actionRef={actionRef}
            loading={false}
            columns={columns}
            request={requestAccountInfo}
            column={1}
            size={'default'}
            labelStyle={{ width: '120px' }}
          />
        </div>
      </Spin>

      <ValidPasswordModel
        visible={payValidVisible}
        setVisible={setPayValidVisible}
        callback={callback}
      />

      <UsdtModel
        visible={USDTVisible}
        setVisible={setUSDTVisible}
        current={merchantInfo}
        reload={actionRef.current?.reload}
      />

      <PayPasswordModel
        visible={payPwdVisible}
        setVisible={setPayPwdVisible}
        current={merchantInfo}
      />

      <ChannelModel
        visible={channelVisible}
        setVisible={setChannelVisible}
        current={merchantInfo}
      />

      <BalanceModel
        visible={balanceVisible}
        setVisible={setBalanceVisible}
        current={merchantInfo}
      />

      <KeyModel
        visible={keyVisible}
        setVisible={setKeyVisible}
        current={merchantInfo}
      />

      <CallbackModel
        visible={callbackVisible}
        setVisible={setCallbackVisible}
        current={merchantInfo}
      />
    </CreateCard>
  );
};
