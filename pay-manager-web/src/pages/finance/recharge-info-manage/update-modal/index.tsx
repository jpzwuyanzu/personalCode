import services from '@/services';
import {
  Button,
  Modal,
  Input,
  Select,
  Tag,
  message,
  Checkbox,
  Form,
} from 'antd';
import { useEffect, useRef, useState } from 'react';
import common from '@/utils/common';
import {
  ProForm,
  ProFormCheckbox,
  ProFormDigit,
  ProFormDigitRange,
  ProFormList,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormDependency,
} from '@ant-design/pro-components';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';

type Props = {
  record?: any;
  type: 'edit' | 'add';
  reload: () => void;
};

export default (props: Props) => {
  const formRef = useRef<any>();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { record, type } = props;

  const label = type === 'edit' ? '编辑USDT充值配置' : '添加USDT充值配置';
  const msg = type === 'edit' ? '编辑成功' : '添加成功';

  useEffect(() => {
    if (isModalOpen && type === 'edit' && record) {
      const formData = { ...record };
      formData.content = JSON.parse(formData.content || '[]');
      formRef.current.setFieldsValue({
        ...formData,
        recharge: [formData.minRecharge, formData.maxRecharge],
      });
    }
  }, [isModalOpen]);

  const submit = async (formData: any) => {
    try {
      setLoading(true);
      formData.content = JSON.stringify(formData.content);
      if (type === 'edit') {
        formData.id = record?.id;
      }
      await services.finance.rechargeInfoManage[type](formData);
      message.success(msg);
      setIsModalOpen(false);
      props?.reload();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {type === 'edit' ? (
        <a onClick={() => setIsModalOpen(true)}>编辑</a>
      ) : (
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalOpen(true)}
        >
          添加
        </Button>
      )}
      <Modal
        title={label}
        open={isModalOpen}
        width={800}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        onOk={() => {
          formRef.current.submit();
        }}
        confirmLoading={loading}
      >
        <ProForm submitter={false} formRef={formRef} onFinish={submit}>
          <ProFormRadio.Group
            options={[
              { label: 'USDT信息', value: 1 },
              // { label: '链接', value: 2, disabled: true },
            ]}
            label="跳转方式"
            name="jumpType"
            rules={[common.ruleUtils.getRule('required')]}
            initialValue={1}
          />

          <ProFormDigitRange
            placeholder={['最低额度', '最高额度']}
            fieldProps={{ min: 0 }}
            label="充值U额度"
            name="recharge"
            transform={(value) => {
              return {
                minRecharge: value[0],
                maxRecharge: value[1],
              };
            }}
            rules={[common.ruleUtils.getRule('digitRange')]}
          />

          <ProFormText
            label="温馨提示"
            name="kindTips"
            placeholder="请输入温馨提示"
          />

          <ProFormText
            label="教程链接"
            name="tutorialUrl"
            placeholder="请输入教程链接"
          />

          <ProFormDependency name={['jumpType']}>
            {({ jumpType }) => {
              if (+jumpType === 2) {
                return (
                  <ProFormText
                    label="跳转链接"
                    name="jumpUrl"
                    placeholder="请输入跳转链接"
                    rules={[
                      common.ruleUtils.getRule('required', '请输入跳转链接'),
                    ]}
                  />
                );
              }
              return (
                <ProFormList
                  name="content"
                  label="USDT信息"
                  creatorButtonProps={{ creatorButtonText: '新增USDT配置' }}
                  rules={[
                    common.ruleUtils.getRule('required', 'USDT配置不能为空'),
                  ]}
                >
                  <div className="fields-item">
                    <ProFormText
                      name="address"
                      placeholder="收款USDT地址"
                      rules={[
                        common.ruleUtils.getRule(
                          'required',
                          '请输入收款USDT地址',
                        ),
                      ]}
                    />

                    <ProFormDigit
                      name="exchangeNum"
                      placeholder="每日限额提醒金额"
                      rules={[
                        common.ruleUtils.getRule(
                          'required',
                          '请输入每日限额提醒金额',
                        ),
                      ]}
                    />

                    <ProFormDigit
                      name="showRate"
                      placeholder="请输入展示概率"
                      rules={[
                        common.ruleUtils.getRule('required', '请输入展示概率'),
                        {
                          validator: (_, value, callback) => {
                            const formData = formRef?.current?.getFieldsValue();
                            const showRateSum = formData?.content.reduce(
                              (prev = 0, cur: any) => prev + cur?.showRate,
                              0,
                            );
                            if (showRateSum > 100) {
                              callback('合计展示概率不能超过100%');
                            }
                            callback();
                          },
                        },
                      ]}
                      fieldProps={{
                        addonAfter: '%',
                      }}
                      min={0}
                      max={100}
                    />
                  </div>
                </ProFormList>
              );
            }}
          </ProFormDependency>
        </ProForm>
      </Modal>
    </>
  );
};
