<template>
 <div class="bread-crum-container">
      <a-breadcrumb>
           <a-breadcrumb-item>
              <router-link to="/home">系统首页</router-link>
           </a-breadcrumb-item>
            <a-breadcrumb-item v-for="(item, index) in state.breadList" :key="index">
                <router-link :to="{ name: item.comName }">{{ item.name }}</router-link>
            </a-breadcrumb-item>
      </a-breadcrumb>
 </div>
</template>
<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router'
import { reactive, watch } from 'vue'
const route = useRoute()
const state: any = reactive({
    breadList: route.path !== '/home' ? route.meta.breadCrum_title : []
})
watch(route, (newVal, oldVal) => {
    if(newVal.name !== 'home')  {
        state.breadList = newVal.meta.breadCrum_title
    } else {
        state.breadList = []
    }
})

</script>
<style lang="scss" scoped>
.bread-crum-container {
    background: #fff;
    padding: 12px;
    text-align: left;
    padding-left: 20px;
}
</style>