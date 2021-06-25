<template>
  <div>
    <!-- <span>账户：{{ store.state.userName }}</span> -->
    <span style="font-size: 15px">
      <el-badge :value="1" class="item">
        <i class="el-icon-message-solid" size="small"></i>
      </el-badge>
    </span>
    <el-dropdown>
      <span class="el-dropdown-link">
        <i class="el-icon-user-solid"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click="() => router.push('/setting')">
          <i class="el-icon-setting"> 个人设置</i>
        </el-dropdown-item>
        <el-dropdown-item @click="loginOut">
          <i class="el-icon-right"> 退出登录</i>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { removeItem, setItem } from "./../utils/common";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();
const loginOut = () => {
  removeItem("token");
  setItem("loginState", false);
  store.dispatch("loginOutStateAction", {});
  router.push({ name: "login" });
};
</script>
<style lang="scss" scoped>
.el-dropdown {
  margin-left: 20px;
}
.el-dropdown-link {
  cursor: pointer;
  font-size: 20px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
