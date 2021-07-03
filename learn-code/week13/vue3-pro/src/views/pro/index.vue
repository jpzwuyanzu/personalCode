<template>
    <a-table :columns="columns"
    :data-source="prolist"
    :rowKey="getRowKey"
    :scroll="{ x: 1800, y: 700 }"
    :pagination="{
       defaultPageSize: 8,
       hideOnSinglePage: true,
       pageSizeOptions: ['8', '10', '15'],
       showQuickJumper: true,
       showSizeChanger: true,
       total: len,
       showTotal: (total, range) => `总共 ${total} 条`
    }"
    >
      <template #index="obj">
      <a>{{ obj.index + 1 }}</a>
    </template>
    <template #img="{ text }">
     <img :src="text" alt="" style="width: 60px;">
    </template>
    <template #action>
       <a-space>
             <a-button type="primary" ghost>编辑</a-button>
             <a-button type="danger" ghost>删除</a-button>
       </a-space>
    </template>
  </a-table>
</template>
<script>
import { computed, onMounted, reactive } from 'vue'
import { useStore } from 'vuex'
const columns1 = [
  {
    title: '序号',
    slots: { customRender: 'index' },
    fixed: 'left',
    width: 100,
    align: 'center'
  },
  {
    dataIndex: 'img',
    key: 'img',
    title: '图片地址',
    slots: { title: 'customTitle', customRender: 'img' },
    fixed: 'left',
    align: 'center'
  },
  {
    title: '商品名称',
    dataIndex: 'proname',
    key: 'proname',
    align: 'center'
  },
  {
    title: '商品描述',
    dataIndex: 'descri',
    key: 'descri',
    width: 400,
    align: 'center'
  },
  {
    title: '活动期限',
    dataIndex: 'activityDays',
    key: 'activityDays',
    align: 'center'
  },
  {
    title: '原价格',
    dataIndex: 'originPrice',
    key: 'originPrice',
    align: 'center'
  },
  {
    title: '折扣价格',
    dataIndex: 'newPrice',
    key: 'newPrice',
    align: 'center'
  },
  {
    title: '是否打折',
    dataIndex: 'isSale',
    key: 'isSale',
    align: 'center'
  },
  {
    title: '是否秒杀',
    dataIndex: 'isKill',
    key: 'isKill',
    align: 'center'
  },
  {
    title: '是否推荐',
    dataIndex: 'isRecommond',
    key: 'isRecommond',
    align: 'center'
  },
  {
    title: '操作',
    key: 'action',
    slots: { customRender: 'action' },
    fixed: 'right',
    width: 200,
    align: 'center'
  }
]
export default {
  setup (props) {
    const columns = reactive(columns1)
    const store = useStore()
    const getRowKey = (row) => {
      return row.id
    }
    onMounted(() => {
      store.dispatch('pro/getProlistData')
    })

    return {
      prolist: computed(() => store.state.pro.prolist),
      len: computed(() => store.state.pro.prolist.length),
      columns,
      getRowKey
    }
  }
}
</script>
