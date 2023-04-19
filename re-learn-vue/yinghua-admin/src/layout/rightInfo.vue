<template>
  <div class="rightInfo_container">
    <a-dropdown>
      <div class="ant-dropdown-link" @click.prevent>
        <a-space>
          <span style="font-size: 18px">admin</span>
          <IconEcosystem />
        </a-space>
      </div>
      <template #overlay>
        <a-menu>
          <a-menu-item>
            <a href="javascript:;" @click="loginOut">退出登录</a>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>
<script setup lang="ts">
import { Space } from "ant-design-vue";
import IconEcosystem from "@/components/icons/IconEcosystem.vue";
import { useRouter } from 'vue-router'

const appRouter = useRouter()
//退出登录
const loginOut = () => {
    localStorage.clear();
    appRouter.push('/login')
}
</script>
<style lang="scss">
.rightInfo_container {
  cursor: pointer;
}
.ant-dropdown-link {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>
