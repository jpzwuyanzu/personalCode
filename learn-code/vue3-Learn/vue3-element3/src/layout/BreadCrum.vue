<template>
  <div class="breadCrum">
    <el-breadcrumb separator="/">
    
    <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span
          v-if="item.redirect === 'noRedirect' || index == levelList.length - 1"
          class="no-redirect"
          >{{ item.name }}</span>
        <a  v-else  @click.prevent="handleLink(item)">{{ item.name }}</a>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup>
import { reactive, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";


const router = useRouter();
const route = useRoute();
const levelList = ref(null);
const arr = reactive([{name: "系统首页", redirectPath: "/home"},
 {name: "系统管理",  redirectPath: "/sys-mannage/sysInfo"},
 {name: "系统信息", redirectPath: "/sys-mannage/sysInfo"}])

//获取路由match信息，渲染面包屑
const getBreadcrumb =  () => {
  let matched = route.matched.filter(
    (item) => item.meta && item.meta.breadCrum_title
  );

  const first = matched[0];
  // console.log(first)
  if (first && first.path && first.path !== "/" && first.path !== "/home" && first.meta) {
    matched = [
      {
        path: "/home",
        meta: {
          title: "系统首页",
          breadCrum_title: [
            {
              name: "系统首页",
              redirectPath: "/home"
            },
          ],
        },
      },
    ].concat(matched);
  }
  let tempBread = matched.filter(
    (item) => item.meta && item.meta.breadCrum_title && item.meta.breadcrumb !== false
  );
  let tempArr = [];
  tempBread.forEach((item) => {
    // console.log(item);
    tempArr = [...tempArr, ...item.meta.breadCrum_title];
  });
  levelList.value = reactive(tempArr)
};

const handleLink = (item) => {
    const { redirectPath } = item
    router.push(redirectPath)
}

getBreadcrumb();

watch(route, getBreadcrumb)
</script>

<style lang="scss" scoped>
.breadCrum {
  .el-breadcrumb {
    width: 600px;
    height: 60px;
    line-height: 60px;
    padding-left: 60px;
    float: left;
    font-size: 14px;

    .no-redirect {
    color: #97a8be;
    cursor: text;
  }

  }
}
</style>
