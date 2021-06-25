<template>
   <a-table :columns="columns" :data-source="data">
    <a slot="xuhao" slot-scope="text,record,index">{{ index + 1 }}</a>
    <div slot="action" slot-scope="text,record,index">
      <a-button type="dashed">
      编辑{{ index }}
    </a-button>
    <a-button type="danger">
      删除{{ index }}
    </a-button>
    </div>
  </a-table>
</template>
<script>
const columns = [
  {
    title: '序号',
    scopedSlots: { customRender: 'xuhao' },
  },
  {
    title: '产品名称',
    dataIndex: 'proname',
    key: 'proname',
  },
  {
    title: '产品价格',
    dataIndex: 'originprice',
    key: 'originprice',
  },
  {
    title: '操作',
    scopedSlots: { customRender: 'action' },
  },
];
export default {
  data() {
    return {
      data: [],
      columns,
    };
  },
  mounted () {
    console.log(this)
    this.$axios.get('https://gp.adouzaizai.top/api/pro/list')
      .then(res => {
        console.log(res.data.data)
        this.data = res.data.data
      })
  }
};
</script>