import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers'
import path from 'path'
import pxtorem from 'postcss-pxtorem'
import autoPreFixer from 'autoprefixer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()]
    })
  ],
  css: {
    postcss: {
      plugins: [
        autoPreFixer(),
        pxtorem({
          rootValue: 75, //如果设计稿的尺寸不是 375，而是 750 或其他大小，可以将 rootValue 配置调整:
          unitPrecision: 5, // （数字）允许 REM 单位增长到的十进制数字
          propList: ["*"],
          //unitPrecision: 5, // （数字）允许 REM 单位增长到的十进制数字
          //propList: ['*'], // 可以从 px 更改为 rem 的属性 使用通配符*启用所有属性
          //selectorBlackList: [],// （数组）要忽略并保留为 px 的选择器。
          //replace: true, // 替换包含 rems 的规则，而不是添加回退。
          mediaQuery: false,  // 允许在媒体查询中转换 px
          minPixelValue: 0, // 最小的转化单位
          exclude: /node_modules/i // 要忽略并保留为 px 的文件路径
        })
      ]
    },
  },
  resolve: {
    "alias": {
      "@": path.resolve(__dirname, "src"),
      "comps": path.resolve(__dirname, "src/components")
    }
  },
  // // 本地运行配置，及反向代理配置
  server: {
    open: true,//启动项目自动弹出浏览器
    port: 3001,//启动端口
    host: '172.22.2.234',
    proxy: {
      '/qf': {
        target: 'http://172.22.2.249:8083', //实际请求地址
        // target: 'http://34.92.25.18:8083',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
