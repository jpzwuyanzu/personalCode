<template>
  <a-table :columns="columns" :data-source="data" :scroll="{ x: 1500, y: '85%' }" :pagination="pagination">
    <template #bodyCell="{ column }">
      <template v-if="column.key === 'operation'">
        <a>action</a>
      </template>
    </template>
  </a-table>
</template>
<script lang="ts" setup>
import { reactive, onMounted } from 'vue'
import type { TableColumnsType } from 'ant-design-vue';
import type { IOrderItem, IPagnation } from './../../interface/index'
import { getOrderList } from './../../api/index'
//分页配置项
const pagination: IPagnation = reactive({
  current: 1,
  total: 0,
  pageSize: 10,
  showQuickJumper: true,
  showTotal: (total) => {
    return `共${total}条数据`
  }
})
const columns: TableColumnsType = [
  { title: 'Full Name', width: 100, dataIndex: 'name', key: 'name', fixed: 'left' },
  { title: 'Age', width: 100, dataIndex: 'age', key: 'age', fixed: 'left' },
  { title: 'Column 1', dataIndex: 'address', key: '1', width: 150 },
  { title: 'Column 2', dataIndex: 'address', key: '2', width: 150 },
  { title: 'Column 3', dataIndex: 'address', key: '3', width: 150 },
  { title: 'Column 4', dataIndex: 'address', key: '4', width: 150 },
  { title: 'Column 5', dataIndex: 'address', key: '5', width: 150 },
  { title: 'Column 6', dataIndex: 'address', key: '6', width: 150 },
  { title: 'Column 7', dataIndex: 'address', key: '7', width: 150 },
  { title: 'Column 8', dataIndex: 'address', key: '8' },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
  },
];

const orderData = reactive({ list: [] })
const loadOrderData = async () => {
  let res = await getOrderList({})
  console.log(res)
}

const data: IOrderItem[] = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}

onMounted(() => {
  loadOrderData()
})

</script>

