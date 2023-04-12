<template>
  <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
    <div class="logo" />
    <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
      <a-sub-menu>
        <template #title>
          <span>
            <user-outlined />
            sub nav1
          </span>
        </template>
        <a-menu-item key="1">
          <span>nav 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <span>nav 1</span>
        </a-menu-item>
        <a-menu-item key="3">
          <span>nav 1</span>
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </a-layout-sider>
</template>
<script setup lang="ts">
import {UserOutlined} from "@ant-design/icons-vue";
import { ref } from "vue";

const selectedKeys = ref<string[]>(["1"]);
const collapsed = ref<boolean>(false);
</script>
