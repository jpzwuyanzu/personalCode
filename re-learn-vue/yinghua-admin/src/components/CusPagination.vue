<template>
  <div class="cusPagination_container">
    <a-pagination
      v-model:current="current"
      v-model:pageSize="pageSize"
      :page-size-options="pageSizeOptions"
      show-size-changer
      :total="total"
      :show-total="(total:number) => `共有${total}条`"
      show-quick-jumper
      @showSizeChange="onShowSizeChange"
    />
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
defineProps(['total', 'pageSizeOptions'])
const emits = defineEmits(['loadData'])
const pageSize = ref(20);
const current = ref(1);
const onShowSizeChange = (current: number, pageSize: number) => {
  emits('loadData', { current, pageSize })
};
watch(pageSize, () => {
    emits('loadData', { current, pageSize })
});
watch(current, () => {
    emits('loadData', { current, pageSize })
});
</script>
<style lang="scss">
.cusPagination_container {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
}
</style>
