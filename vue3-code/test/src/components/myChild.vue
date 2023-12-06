<template>
    <div class="child_container" @click="btnFn">
        测试子组件
    </div>
</template>
<script lang="ts" setup>
defineProps({
    pageNum: {
        type: Number,
        default: 0
    }
})
const emit = defineEmits(['changePageNum']);
const btnFn = () => {
    emit('changePageNum', 4)
}

</script>
<style lang="scss" scoped>
.child_container {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 100;
    color: #fff;
    font-size: 40px;
}
</style>
