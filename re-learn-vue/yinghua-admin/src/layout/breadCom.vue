<template>
    <a-breadcrumb>
        <a-breadcrumb-item>
            <RouterLink to="/home">Dashoard</RouterLink>
        </a-breadcrumb-item>
        <a-breadcrumb-item v-for="(item, index) in breadList">
            <RouterLink :to="{ name: item.comName }">{{ item.title }}</RouterLink>
        </a-breadcrumb-item>
    </a-breadcrumb>
  </template>
<script setup lang="ts">
import { reactive, computed } from 'vue';
import { useRoute } from 'vue-router'
import type { IBreadCom } from '@/types/interface'
const appRoute = useRoute();
//获取当前路由对应的面包屑属性
const breadList:[IBreadCom]|any = computed(() => {
    if(appRoute.path !== '/home' && appRoute.meta.breadCrum) {
        return appRoute.meta.breadList
    } else {
        return []
    }
})
</script>