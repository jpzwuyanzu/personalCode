import services from '@/services';
import { Button, message, Modal, Spin, Tabs } from 'antd';
import TablePage from '@/components/TablePage';
import { Columns } from '@/types';
import { useModel } from '@@/exports';
import { useState } from 'react';
import { useAsyncEffect } from 'ahooks';
import { ProForm, ProFormGroup, ProFormText } from '@ant-design/pro-components';
import '../styles.less';
import _ from 'lodash';
import ManualRecharge from '@/pages/finance/usdt-recharge/manual-recharge';
import ManualWithdraw from '@/pages/finance/withdraw-approval/manual-withdraw';
import TransferModel from '@/pages/account/modal/transferModel';

export default (props: any) => {
  const { merchantInfo } = useModel('merchant');
  const { getCurrencyOptionItems } = useModel('global');
  const { visible, setVisible } = props;
  const [tabItems, setTabItems] = useState<any[]>([]);
  const [currency, setCurrency] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currencyMap, setCurrencyMap] = useState<any>({});

  const [transferVisible, setTransferVisible] = useState<boolean>(false);

  const getData = async () => {
    try {
      setLoading(true);
      const items: any = await services.accountInfo.getMerchantInfo({
        id: merchantInfo.merchantId,
      });

      const currencyItems = await getCurrencyOptionItems(null);
      console.log(currencyItems);

      // const currency = _.get(items, '[0].currency', '');
      const currency = _.get(currencyItems, '[0].currency', '');
      setCurrency(currency);

      const tabItems = currencyItems.map((item: any) => {
        return {
          label: item.currency,
          key: item.currency,
        };
      });
      setTabItems(tabItems);

      const currencyMap: any = {};
      currencyItems.forEach((currencyItem: any) => {
        currencyMap[currencyItem.currency] = items.find(
          (item: any) => item.currency === currencyItem.currency,
        );
      });
      console.log(currencyMap);
      setCurrencyMap(currencyMap);
    } finally {
      setLoading(false);
    }
  };

  useAsyncEffect(async () => {
    if (visible) {
      await getData();
    }
  }, [visible]);

  return (
    <Modal
      title="余额信息"
      open={visible}
      width={800}
      footer={null}
      onCancel={() => {
        setVisible(false);
      }}
    >
      <div className="tabs-wrap">
        <Tabs
          type="card"
          defaultActiveKey={currency}
          items={tabItems}
          onChange={setCurrency}
        />
        <div className="tabs-content">
          <Spin spinning={loading}>
            <div className="balance-modal-form">
              <div className="title">代收余额</div>
              <div className="item">
                <div className="key">可用余额</div>
                <div className="val">
                  {(currencyMap[currency]?.availableBalance || 0).toFixed(2)}
                </div>
              </div>
              <div className="item">
                <div className="key">未结算余额</div>
                <div className="val">
                  {(currencyMap[currency]?.unsettledBalance || 0).toFixed(2)}
                </div>
              </div>
              <div className="item">
                <div className="key">冻结余额</div>
                <div className="val red">
                  {(currencyMap[currency]?.freezeBalance || 0).toFixed(2)}
                </div>
              </div>
              <div className="tips">
                * 代收结算周期：T+{currencyMap[currency]?.billingCycle || '0'}
              </div>
              <div className="title">代付余额</div>
              <div className="item">
                <div className="key">代付余额</div>
                <div className="val">
                  {currencyMap[currency]?.payBalance.toFixed(2)}
                </div>
              </div>
              <div className="tips">* 代收可用余额和代付余额可用互相划拨。</div>
              <div className="tips">* 注意代付余额不足则无法使用代付功能。</div>

              <div className="actions">
                <Button type="primary" onClick={() => setTransferVisible(true)}>
                  划拨
                </Button>
                <ManualRecharge reload={getData}>
                  <Button className="btn-green">充值</Button>
                </ManualRecharge>
                <ManualWithdraw reload={getData}>
                  <Button className="btn-green">提现</Button>
                </ManualWithdraw>
              </div>
            </div>
          </Spin>
        </div>

        <TransferModel
          visible={transferVisible}
          setVisible={setTransferVisible}
          currencyItems={tabItems}
          currencyMap={currencyMap}
          currency={currency}
        />
      </div>
    </Modal>
  );
};
