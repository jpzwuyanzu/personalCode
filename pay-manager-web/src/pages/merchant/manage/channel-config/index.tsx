import { Button, message, Modal, Tabs, Row, Col } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useModel } from '@@/exports';
import { useAsyncEffect } from 'ahooks';
import { ProForm, ProFormItem } from '@ant-design/pro-components';
import ChannelCollectTable from '@/pages/merchant/manage/channel-config/channel-collect-table';
import ChannelPayTable from '@/pages/merchant/manage/channel-config/channel-pay-table';
import common from '@/utils/common';
import services from '@/services';
import CheckboxGroup from '@/components/CheckboxGroup';
import { ChannelTypeEnum } from '@/enums';

type Props = {
  tag?: 'button' | 'a';
  record?: any;
  buttonLabel?: string;
  reload: () => void;
};

export default (props: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const collectTableRef = useRef<any>();
  const payTableRef = useRef<any>();

  const {
    getMerchantOptionItems,
    getCurrencyOptionItems,
    getFirstCurrencyOption,
  } = useModel('global');

  const isSingleMerchant = props?.record?.id !== undefined;

  const [currencyOptionItems, setCurrencyOptionItems] = useState<any>([]);
  const [merchantOptionItems, setMerchantOptionItems] = useState<any>([]);

  const [currency, setCurrency] = useState<any>('');
  const [merchantIds, setMerchantIds] = useState<any>([]);

  const [channelType, setChannelType] = useState<ChannelTypeEnum>(
    ChannelTypeEnum.Collect,
  );

  const [collectChangeData, setCollectChangeData]: any = useState<any>({}); // 用于保存代收修改的数据
  const [paymentChangeData, setPaymentChangeData]: any = useState<any>({}); // 用于保存代付修改的数据

  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [channelData, setChannelData] = useState<any>({});

  const formRef = useRef<any>();

  useEffect(() => {
    setCollectChangeData({});
    setPaymentChangeData({});
    setIsEdit(false);
  }, [currency]);

  useAsyncEffect(async () => {
    if (isModalOpen) {
      if (isSingleMerchant) {
        setMerchantIds([props.record?.id]);
      }

      const currencyOptionItems = await getCurrencyOptionItems(null);
      const currencyItems = currencyOptionItems.map((item: any) => {
        return {
          label: item.label,
          key: item.value,
        };
      });
      setCurrencyOptionItems(currencyItems);
      setCurrency(currencyItems[0].key);

      const merchantOptionItems = await getMerchantOptionItems(null);
      setMerchantOptionItems(merchantOptionItems);

      collectTableRef.current?.reload();
      payTableRef.current?.reload();
    } else {
      setCollectChangeData({});
      setPaymentChangeData({});
      setIsEdit(false);
    }
  }, [isModalOpen]);

  const tunnelConfig = async (type: ChannelTypeEnum) => {
    const changeData =
      type === ChannelTypeEnum.Collect ? collectChangeData : paymentChangeData;
    const changeDataLength = Object.values(changeData).length;
    if (changeDataLength) {
      const params: any = {
        type,
        merchantIds,
      };
      if (Object.values(changeData).length) {
        params.merchantTunnelDataDTOList = Object.keys(changeData).map(
          (tunnelId: any) => {
            const tunnelChangeData = changeData[tunnelId];
            return {
              tunnelId,
              upRate: tunnelChangeData.upRate,
              upSingleOrderFee: tunnelChangeData.upSingleOrderFee,
              merchantRate: tunnelChangeData.merchantRate,
              merchantSingleOrderFee: tunnelChangeData.merchantSingleOrderFee,
              status: tunnelChangeData.status,
            };
          },
        );
      }
      await services.merchant.manage.tunnelDistributeList(params);
    }
  };

  const formSubmit = async () => {
    try {
      await formRef.current?.validateFields();

      const changeDataLength =
        Object.values(collectChangeData).length +
        Object.values(paymentChangeData).length;

      if (changeDataLength === 0) {
        message.error('请先修改数据再提交');
        return;
      }

      setLoading(true);
      // 通道分配
      await tunnelConfig(ChannelTypeEnum.Collect);
      await tunnelConfig(ChannelTypeEnum.Payment);

      message.success('操作成功');
      setCollectChangeData({});
      setPaymentChangeData({});
      setIsModalOpen(false);
      setChannelType(ChannelTypeEnum.Collect);
      props?.reload();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const onChangeData = (data: any) => {
    console.log(data);
    const tunnelId = data?.tunnelId;
    const changeData =
      channelType === 1 ? collectChangeData : paymentChangeData;
    const setChangeData =
      channelType === 1 ? setCollectChangeData : setPaymentChangeData;
    const tunnelChangeData = { ...(changeData[tunnelId] || {}), ...data };
    const _changeData = {
      ...changeData,
      [tunnelId]: tunnelChangeData,
    };
    setChangeData(_changeData);
  };

  const onRequestData = (data: any) => {
    // console.log(data, 'onRequestData');
    setChannelData(data);
  };

  const buttonLabel = props?.buttonLabel || '商户通道批量配置';

  return (
    <>
      {props?.tag === 'a' ? (
        <a onClick={() => setIsModalOpen(true)}>{buttonLabel}</a>
      ) : (
        <Button onClick={() => setIsModalOpen(true)}>{buttonLabel}</Button>
      )}
      <Modal
        title={buttonLabel}
        open={isModalOpen}
        footer={null}
        width={1400}
        destroyOnClose
        onCancel={() => {
          setIsModalOpen(false);
          setMerchantIds([]);
          setIsEdit(false);
        }}
      >
        <ProForm submitter={false} formRef={formRef}>
          <div className="tabs-wrap">
            <Tabs
              defaultValue={currency}
              items={currencyOptionItems}
              type="card"
              onChange={setCurrency}
            />
            <div className="tabs-content">
              {!isSingleMerchant ? (
                <ProFormItem
                  label="操作商户"
                  name="merchantIds"
                  style={{ marginBottom: 10 }}
                  rules={[
                    common.ruleUtils.getRule('required', '请选择操作商户'),
                  ]}
                >
                  <CheckboxGroup
                    options={merchantOptionItems}
                    onChange={setMerchantIds}
                    value={merchantIds}
                  />
                </ProFormItem>
              ) : (
                <Row style={{ marginBottom: 10 }}>
                  <Col>操作商户：{props?.record?.name || '-'}</Col>
                  <Col offset={1}>
                    商户代收费率：
                    {channelData?.merchantManageVO?.rechargeFeeRate || 0}%
                  </Col>
                  <Col offset={1}>
                    商户代付费率：
                    {channelData?.merchantManageVO?.exchangeFeeRate || 0}%+
                    {channelData?.merchantManageVO?.exchangeSingleFee || 0}
                    （单笔）
                  </Col>
                </Row>
              )}

              <div style={{ marginBottom: 10 }}>通道配置：</div>
              <div className="tabs-wrap">
                <Tabs
                  defaultValue={channelType}
                  type="card"
                  onChange={(val) => setChannelType(+val)}
                  items={[
                    {
                      label: '代收',
                      key: '1',
                    },
                    {
                      label: '代付',
                      key: '2',
                    },
                  ]}
                />
                <div className="tabs-content">
                  <div
                    style={{ display: channelType === 1 ? 'block' : 'none' }}
                  >
                    <ChannelCollectTable
                      params={{ currency, merchantId: props?.record?.id }}
                      collectChangeData={collectChangeData}
                      onChangeData={onChangeData}
                      tableRef={collectTableRef}
                      isSingleMerchant={isSingleMerchant}
                      isEdit={isEdit}
                      onRequestData={onRequestData}
                    />
                    <div style={{ marginTop: 10, color: 'red' }}>
                      商户费率留空，则走通道默认费率
                    </div>
                  </div>

                  <div
                    style={{ display: channelType === 2 ? 'block' : 'none' }}
                  >
                    <ChannelPayTable
                      params={{ currency, merchantId: props?.record?.id }}
                      paymentChangeData={paymentChangeData}
                      onChangeData={onChangeData}
                      tableRef={payTableRef}
                      isSingleMerchant={isSingleMerchant}
                      isEdit={isEdit}
                      onRequestData={onRequestData}
                    />
                    <div style={{ marginTop: 10, color: 'red' }}>
                      商户费率&用户单笔手续费留空，则走通道默认费率
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-actions">
                <Button onClick={() => setIsModalOpen(false)}>取消</Button>
                {isSingleMerchant && (
                  <Button onClick={() => setIsEdit(!isEdit)}>
                    {!isEdit ? '通道配置' : '取消通道配置'}
                  </Button>
                )}
                {(!isSingleMerchant || (isSingleMerchant && isEdit)) && (
                  <Button
                    loading={loading}
                    type="primary"
                    onClick={() => formSubmit()}
                  >
                    确认
                  </Button>
                )}
              </div>
            </div>
          </div>
        </ProForm>
      </Modal>
    </>
  );
};
