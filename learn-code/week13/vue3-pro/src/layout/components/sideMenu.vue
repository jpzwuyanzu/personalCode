<template>
    <a-menu theme="dark" mode="inline" @click="changeRoute" v-model="selectedKeys">
        <template v-for="route of routes"  >
            <a-sub-menu :key="route.path" v-if="route.children && route.children.length > 1">
                <template #title>
                <span>
                    <span>{{ route.title }}</span>
                </span>
                </template>
                <sider-menu :routes="route.children" />
            </a-sub-menu>
            <a-menu-item v-else :key="route.path">
                <span>{{ route.title }}</span>
            </a-menu-item>
        </template>
    </a-menu>
</template>
<script>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
export default {
  name: 'sider-menu',
  props: {
    routes: Array
  },
  setup (props, context) { // props代表的属性，context代表上下文
    // 拿到路由对象
    const router = useRouter()
    // 初始化数据
    const count = ref(0) // 定义简单的基本数据类型
    const selectedKeys = reactive([]) // 可以用来定义对象和数组
    const changeRoute = ({ item, key, keypath }) => {
      console.log(key)
      router.push(key)
    }

    return {
      count,
      selectedKeys,
      changeRoute
    }
  }
}
</script>
