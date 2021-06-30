<template>
  <a-table :columns="columns" :data-source="state.banner" :rowKey="getRowKey">
      <template #index="obj">
      <a>{{ obj.index + 1 }}</a>
    </template>
    <template #bannerimg="{ text }">
     <img :src="text" alt="" style="width: 60px;">
    </template>
    <template #customTitle>
      <span>
        <smile-outlined />
        Name
      </span>
    </template>
    <template #tags="{ text: tags }">
      <span>
        <a-tag
          v-for="tag in tags"
          :key="tag"
          :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
        >
          {{ tag.toUpperCase() }}
        </a-tag>
      </span>
    </template>
    <template #action>
       <a-space>
             <a-button type="primary" ghost>编辑</a-button>
             <a-button type="danger" ghost>删除</a-button>
       </a-space>
    </template>
  </a-table>
</template>
<script lang="ts">
import { SmileOutlined } from '@ant-design/icons-vue'
import { defineComponent, reactive, onMounted, computed } from 'vue'
import { getBannerlist } from './../../api/banner'
const columns1 = [
  {
    title: '序号',
    slots: { customRender: 'index' }
  },
  {
    dataIndex: 'bannerimg',
    key: 'bannerimg',
    title: '图片地址',
    slots: { title: 'customTitle', customRender: 'bannerimg' }
  },
  {
    title: '图片的链接',
    dataIndex: 'link',
    key: 'link'
  },
  {
    title: '图片的说明',
    dataIndex: 'alt',
    key: 'alt'
  },
  {
    title: '操作',
    key: 'action',
    slots: { customRender: 'action' }
  }
]

export default defineComponent({
  setup () {
    const state = reactive({ banner: [] })
    const columns = reactive(columns1)

    // 生命周期的钩子函数
    onMounted(() => {
      getBannerlist().then(res => {
        state.banner = res.data
      })
    })
    // 计算属性
    const counter = computed(() => state.banner.length)

    const getRowKey = (row) => {
      return row.bannerid
    }

    return {
      state,
      columns,
      getRowKey,
      counter
    }
  },
  components: {
    SmileOutlined
  }
})
</script>
