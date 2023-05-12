import services from '@/services';
import { Button, InputNumber, message, Modal, Spin, Tabs } from 'antd';
import { useModel } from '@@/exports';
import { useState } from 'react';
import { useAsyncEffect } from 'ahooks';
import { ProForm, ProFormGroup, ProFormText } from '@ant-design/pro-components';
import '../styles.less';
import _ from 'lodash';

type Props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  currencyItems: any[];
  currencyMap: any;
  currency: string;
};

enum Type {
  collection = '1',
  pay = '2',
}

export default (props: Props) => {
  const { merchantInfo } = useModel('merchant');
  const { visible, setVisible, currencyItems, currencyMap } = props;
  const [currency, setCurrency] = useState<any>(props.currency);
  const [loading, setLoading] = useState<boolean>(false);

  const [type, setType] = useState<Type>(Type.pay);
  const [amount, setAmount] = useState<number>(0);

  useAsyncEffect(async () => {
    if (visible) {
      setCurrency(currencyItems[0].key);
    }
  }, [visible]);

  const submit = async () => {
    try {
      if (+amount <= 0) {
        message.error('划拨金额必须大于0');
        return;
      }
      setLoading(true);
      const params = {
        merchantId: merchantInfo.merchantId,
        currency,
        type: +type,
        amount,
      };
      await services.accountInfo.transferAmount(params);
      message.success('划拨成功');
      setVisible(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="划拨余额"
      open={visible}
      width={800}
      footer={null}
      onCancel={() => {
        setVisible(false);
        setAmount(0);
      }}
    >
      <div className="tabs-wrap">
        <Tabs
          type="card"
          defaultActiveKey={type}
          items={[
            {
              label: '划拨至代付',
              key: Type.pay,
            },
            {
              label: '划拨至可用余额',
              key: Type.collection,
            },
          ]}
          onChange={(v) => setType(v as Type)}
        />
        <div className="tabs-content">
          <Tabs
            type="card"
            defaultActiveKey={currency}
            items={currencyItems}
            onChange={setCurrency}
          />

          <div className="tabs-content">
            <Spin spinning={loading}>
              <div className="balance-modal-form">
                <div className="title">
                  {type === Type.collection ? '代收余额' : '代付余额'}
                </div>

                <div className="item">
                  <div className="key">
                    {type === Type.collection ? '可用余额' : '代付余额'}
                  </div>
                  <div className="val">
                    {type === Type.collection
                      ? currencyMap[currency]?.availableBalance.toFixed(2)
                      : currencyMap[currency]?.payBalance.toFixed(2)}
                  </div>
                </div>

                <div className="title">
                  {type === Type.collection ? '代付余额' : '代收余额'}
                </div>

                <div className="item">
                  <div className="key">
                    {type === Type.collection ? '代付余额' : '可用余额'}
                  </div>
                  <div className="val">
                    {type === Type.collection
                      ? currencyMap[currency]?.payBalance.toFixed(2)
                      : currencyMap[currency]?.availableBalance.toFixed(2)}
                  </div>
                </div>

                <div className="title">划拨金额</div>

                <div className="transfer-input">
                  <InputNumber
                    width="100%"
                    min={1}
                    placeholder="请输入划拨金额"
                    onChange={(value) => {
                      setAmount(value ? Number(value) : 0);
                    }}
                  />
                </div>

                <div className="tips">
                  * 代收可用余额和代付余额可用互相划拨。
                </div>
                <div className="tips">
                  * 注意代付余额不足则无法使用代付功能。
                </div>

                <div className="actions">
                  <Button>取消</Button>
                  <Button type="primary" loading={loading} onClick={submit}>
                    确定
                  </Button>
                </div>
              </div>
            </Spin>
          </div>
        </div>
      </div>
    </Modal>
  );
};
