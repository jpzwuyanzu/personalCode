<template>
  <a-table
    :columns="columns"
    :data-source="orderData.list"
    :scroll="{ x: 1600, y: '90%' }"
    :pagination="pagination"
  >
    <template #bodyCell="{ column }">
      <template v-if="column.key === 'operation'">
        <a>action</a>
      </template>
    </template>
  </a-table>
</template>
<script lang="ts" setup>
import { reactive, onMounted } from "vue";
import type { TableColumnsType } from "ant-design-vue";
import type { IOrderItem, IPagnation, IResult } from "./../../interface/index";
import { getOrderList } from "./../../api/index";
//分页配置项
const pagination: IPagnation = reactive({
  current: 1,
  total: 0,
  pageSize: 10,
  showQuickJumper: true,
  showTotal: (total) => {
    return `共${total}条数据`;
  },
});
const columns: TableColumnsType = [
  {
    title: "应用ID",
    width: 100,
    dataIndex: "app_id",
    key: "app_id",
    align: "center",
    fixed: "left"
  },
  { title: "应用名称", width: 100, dataIndex: "app_name", key: "app_name", fixed: "left",align: "center" },
  { title: "订单号", dataIndex: "order_num", key: "order_num",align: "center", width: 200 },
  { title: "渠道ID", dataIndex: "pay_channel", key: "pay_channel",align: "center", width: 150 },
  { title: "应用订单号", dataIndex: "pay_order_num", key: "pay_order_num",align: "center", width: 200 },
  { title: "支付平台ID", dataIndex: "pay_platform", key: "pay_platform",align: "center", width: 150 },
  { title: "支付平台名称", dataIndex: "pay_platform_name", key: "pay_platform_name",align: "center", width: 150 },
  { title: "支付类型", dataIndex: "pay_type", key: "pay_type",align: "center", width: 150 },
  { title: "订单金额", dataIndex: "price", key: "price",align: "center", width: 150 },
  { title: "订单状态", dataIndex: "status_name",align: "center", key: "status_name" },
  {
    title: "Action",
    key: "operation",
    align: "center",
    fixed: "right",
    width: 100,
  },
];
const orderData: IResult = reactive({ list: [] });
const loadOrderData = async () => {
  let res: any = await getOrderList({});
  console.log(res);
  orderData.list = res.result.list
};
//钩子函数
onMounted(() => {
  loadOrderData();
});
</script>

