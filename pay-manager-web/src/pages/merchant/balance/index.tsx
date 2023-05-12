import { Line } from '@antv/g2plot';
import { useRef, useState } from 'react';
import { useAsyncEffect } from 'ahooks';
import services from '@/services';
import './index.less';
import { Card } from 'antd';
import { BetaSchemaForm, ProFormInstance } from '@ant-design/pro-components';
import dayjs from 'dayjs';
import common from '@/utils/common';
import { useModel } from '@@/exports';
import _ from 'lodash';
import {
  APP_IS_PAYMENT,
  MerchantAccountChangeTypeOptions,
  MerchantAccountTypeOptions,
} from '@/constants';

export default () => {
  const { getMerchantOptionItems, getCurrencyOptionItems } = useModel('global');
  const { merchantInfo } = useModel('merchant');
  const formRef = useRef<ProFormInstance>();

  const [chart, setChart] = useState<any>(null);
  const [initialValues, setInitialValues] = useState<any>({
    merchantId: '',
    currency: '',
  });

  const accountTypeOptions = MerchantAccountTypeOptions.filter(
    (item) => item.value !== 4,
  );

  useAsyncEffect(async () => {
    await formRef?.current?.validateFields();
    formRef.current?.submit();
  }, [initialValues]);

  const createItemDom = (item: any) => {
    const itemDom = document.createElement('div');
    const notFirstOrLast = !item.isFirst && !item.isLast;

    // 账变类型
    if (item.data.changeTypeName) {
      const accountTypeDom = document.createElement('div');
      accountTypeDom.innerHTML = `账变类型: ${item.data.changeTypeName}`;
      itemDom.appendChild(accountTypeDom);
    }

    // 账变金额
    if (item.data.amount) {
      const amountDom = document.createElement('div');
      amountDom.innerHTML = `账变金额: ${_.ceil(item.data.amount, 2)}`;
      itemDom.appendChild(amountDom);
    }

    // 账户余额
    const balanceDom = document.createElement('div');
    balanceDom.innerHTML = `账户余额: ${_.ceil(item.data.balance, 2)}`;
    itemDom.appendChild(balanceDom);

    return itemDom;
  };

  useAsyncEffect(async () => {
    const lineChart = new Line('chart', {
      customInfo: undefined,
      data: [],
      padding: 'auto',
      xField: 'createTime',
      yField: 'balance',
      seriesField: 'accountTypeName',
      height: 800,
      xAxis: {
        type: 'time',
      },
      point: {
        size: 3,
        shape: 'circle',
        style: {
          fill: 'white',
          stroke: '#5B8FF9',
          lineWidth: 1,
        },
      },
      smooth: true,
      tooltip: {
        shared: false,
        showTitle: true,
        customContent: (title: string, items: any[]) => {
          const container = document.createElement('div');
          const titleDom = document.createElement('div');
          titleDom.innerHTML = _.first(items)?.data?.createTime;
          container.appendChild(titleDom);
          container.className = 'g2-custom-tooltip';

          items.forEach((item) => {
            const itemDom = createItemDom(item);
            container.appendChild(itemDom);
          });

          return container;
        },
      },
    });

    lineChart.render();
    setChart(lineChart);
  }, []);

  const columns: any[] = [
    {
      title: '日期',
      dataIndex: 'datetime',
      valueType: 'dateTimeRange',
      initialValue: common.dateUtils.getInitDate(1),
      fieldProps: (form: any) => {
        return {
          placeholder: ['开始时间', '结束时间'],
          presets: common.dateUtils.rangePresets,
          showTime: {
            defaultValue: common.dateUtils.rangeDefaultTime(),
          },
        };
      },
      formItemProps: {
        rules: [
          {
            required: true,
          },
        ],
      },
      colSize: 1.5,
    },
    {
      title: '商户',
      dataIndex: 'merchantId',
      valueType: 'select',
      hideInForm: !APP_IS_PAYMENT,
      request: async () => {
        const items = await getMerchantOptionItems(null);
        formRef?.current?.setFieldValue('merchantId', items[0].value);
        setInitialValues({ ...initialValues, merchantId: items[0].value });
        return items;
      },
      fieldProps: {
        placeholder: '请选择商户',
        allowClear: false,
      },
      formItemProps: {
        rules: [
          {
            required: true,
          },
        ],
      },
    },
    {
      title: '币种',
      dataIndex: 'currency',
      valueType: 'select',
      request: async () => {
        const items = await getCurrencyOptionItems(null);
        formRef?.current?.setFieldValue('currency', items[0].value);
        setInitialValues({ ...initialValues, currency: items[0].value });
        return items;
      },
      fieldProps: {
        placeholder: '请选择币种',
        allowClear: false,
        style: {
          width: 140,
        },
      },
      formItemProps: {
        rules: [
          {
            required: true,
          },
        ],
      },
    },
    {
      title: '账户类型',
      dataIndex: 'accountTypeList',
      valueType: 'select',
      fieldProps: {
        placeholder: '请选择账户类型',
        mode: 'multiple',
        style: {
          width: 300,
        },
      },
      initialValue: accountTypeOptions.map((item) => item.value),
      request: async () => accountTypeOptions,
      formItemProps: {
        rules: [
          {
            required: true,
          },
        ],
      },
    },
  ];

  const accountTypeMap: any = {};
  MerchantAccountTypeOptions.forEach((item) => {
    accountTypeMap[item.value] = item.label;
  });

  const accountChangeTypeMap: any = {};
  MerchantAccountChangeTypeOptions.forEach((item) => {
    accountChangeTypeMap[item.value] = item.label;
  });

  const request = async (params: any) => {
    try {
      if (!APP_IS_PAYMENT) {
        params.merchantId = merchantInfo.merchantId;
      }

      const diffHours = dayjs(params.datetime[1]).diff(
        dayjs(params.datetime[0]),
        'hours',
      );

      chart.update({
        meta: {
          createTime: {
            formatter: (val: string) => {
              return dayjs(val).format(
                diffHours > 24 ? 'MM-DD HH:mm' : 'HH:mm',
              );
            },
          },
        },
      });

      params.beginTime = dayjs(params.datetime[0]).format(
        'YYYY-MM-DD HH:mm:ss',
      );
      params.endTime = dayjs(params.datetime[1]).format('YYYY-MM-DD HH:mm:ss');
      delete params.datetime;

      const data: any = await services.merchant.balance.chart(params);

      const dataItemsAccountType = Object.keys(data);
      const dataItems: any = Object.values(data);

      let minTime: any = params.beginTime;
      let maxTime: any = params.endTime;

      // 填充头尾数据
      dataItems.forEach((items: any, index: number) => {
        // 增加账户类型
        items.forEach((item: any) => {
          item.accountType = dataItemsAccountType[index];
        });

        const firstItem: any = _.first(items);
        const lastItem: any = _.last(items);

        if (firstItem?.createTime > minTime) {
          dataItems[index].unshift({
            ...firstItem,
            createTime: minTime,
            balance: firstItem?.balance - firstItem?.amount,
            amount: null,
            isFirst: true,
          });
        }

        if (lastItem?.createTime < maxTime) {
          dataItems[index].push({
            ...lastItem,
            createTime: maxTime,
            balance: lastItem?.balance,
            amount: null,
            isLast: true,
          });
        }
      });

      const chartData = _.flattenDeep(dataItems);

      chartData.forEach((item: any) => {
        item.accountTypeName = accountTypeMap[item.accountType];
        if (!item.isLast && !item.isFirst) {
          item.changeTypeName = accountChangeTypeMap[item.changeType];
        }
      });

      chart.changeData(chartData);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="merchant-balance">
      <Card title="商户余额数据">
        <BetaSchemaForm
          formRef={formRef}
          layout="inline"
          title="商户余额数据"
          onFinish={request}
          columns={columns}
        />
        <div id="chart" />
      </Card>
    </div>
  );
};
