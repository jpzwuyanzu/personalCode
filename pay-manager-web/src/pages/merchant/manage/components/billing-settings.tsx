import {useEffect, useState, useMemo} from "react";
import {Radio, Card, Row, Col, Tabs, Select, InputNumber} from 'antd';
import _ from "lodash";
import {MerchantSettleCycleOptions} from '@/constants';


type Props = {
  value?: CurrencyItem[];
  onChange?: (values: any[]) => void;
};

export type CurrencyItem = {
  currency: string;
  rechargeFeeRate: number;
  exchangeFeeRate: number;
  exchangeSingleFee: number;
  rechargeBillingCycle: number; // 0 | 1 | 2 | 3 | 7 | 30
  rechargeBillingType: number; // 1 | 2
};

type Key =
    'rechargeFeeRate' |
    'exchangeFeeRate' |
    'exchangeSingleFee' |
    'rechargeBillingCycle' |
    'rechargeBillingType';

type Option = {
  label: string;
  value: number;
};

export const billingSettingsItem: CurrencyItem = {
  "currency": "",
  "rechargeFeeRate": 0,
  "exchangeFeeRate": 0,
  "exchangeSingleFee": 0,
  "rechargeBillingCycle": 0,
  "rechargeBillingType": 1
};

const rechargeBillingTypeOptions: Option[] = [
  {label: '自动结算', value: 1},
  {label: '手动结算', value: 2},
];


export default (props: Props) => {
  const {value, onChange,} = props;
  const [currencyList, setCurrencyList] = useState<CurrencyItem[]>([]);
  const [activeKey, setActiveKey] = useState<string>('');


  useEffect(() => {
    setCurrencyList(_.cloneDeep(value || []))
    if (!activeKey) {
      setActiveKey(value?.[0]?.currency || '')
    }
  }, [value]);

  const itemChildren = (item: CurrencyItem) => {
    const {
      rechargeFeeRate = 0,
      exchangeFeeRate = 0,
      exchangeSingleFee = 0,
      rechargeBillingCycle = 0,
      rechargeBillingType = 1,
    } = item;
    return (
      <Card>
        <Row align="middle">
          <Col style={{width: 120}}>代收费率（%）:</Col>
          <Col>
            <InputNumber
              value={rechargeFeeRate}
              onChange={(val) => {
                inputOnChange(val || 0, 'rechargeFeeRate');
              }}
              style={{width: 180}}
            />
          </Col>
        </Row>
        <Row align="middle" style={{marginTop: 15}}>
          <Col style={{width: 120}}>代付费率（%）:</Col>
          <Col>
            <InputNumber
              value={exchangeFeeRate}
              onChange={(val) => {
                inputOnChange(val || 0, 'exchangeFeeRate');
              }}
              style={{width: 180}}
            />
          </Col>
        </Row>
        <Row align="middle" style={{marginTop: 15}}>
          <Col style={{width: 120}}>代付单笔手续费:</Col>
          <Col>
            <InputNumber
              value={exchangeSingleFee}
              onChange={(val) => {
                inputOnChange(val || 0, 'exchangeSingleFee');
              }}
              style={{width: 180}}
            />
          </Col>
        </Row>
        <Row align="middle" style={{marginTop: 15}}>
          <Col style={{width: 120}}>代收结算周期:</Col>
          <Col>
            <Select
              value={rechargeBillingCycle + ''}
              options={MerchantSettleCycleOptions}
              onSelect={(val) => {
                console.log(val, activeKey);
                inputOnChange(Number(val), 'rechargeBillingCycle');
              }}
              style={{width: 180}}
            />
          </Col>
        </Row>
        <Row align="middle" style={{marginTop: 15}}>
          <Col style={{width: 120}}>代收结算方式:</Col>
          <Col>
            <Radio.Group
              value={rechargeBillingType}
              options={rechargeBillingTypeOptions}
              onChange={(e) => {
                inputOnChange(e.target.value, 'rechargeBillingType');
              }}
            />
          </Col>
        </Row>
      </Card>
    )
  };

  const inputOnChange = (value: number, key: Key) => {
    console.log(value, key, activeKey);
    const result = _.cloneDeep(currencyList);
    _.forEach(result, (item) => {
      if (item.currency === activeKey) {
        item[key] = value;
      }
    });
    onChange?.(result);
  };

  const items = useMemo(() => {
    return (currencyList || []).map(item => ({
      key: item.currency,
      label: item.currency,
      children: itemChildren(item)
    }));
  }, [currencyList, activeKey]);

  return (
    <div>
      <Tabs
        activeKey={activeKey}
        items={items}
        type="card"
        onChange={(key) => {
          setActiveKey(key)
        }}
      />
    </div>
  )
}
