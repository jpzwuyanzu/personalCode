<template>
<a-config-provider :locale="locale">
  <router-view></router-view>
  </a-config-provider>
</template>
<script>
import zhCN from 'ant-design-vue/es/locale/zh_CN'
export default {
  setup (props) {
    return {
      locale: zhCN
    }
  }
}
</script>
