import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), viteMockServe({ supportTs: false })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "comps": path.resolve(__dirname, "src/components"),
      "views": path.resolve(__dirname, "src/views"),
      "styles": path.resolve(__dirname, "src/styles"),
      "layout": path.resolve(__dirname, "src/layout")
    }
  },
  //强制构建插件包
  optimizeDeps: {
    include: ['axios']
  },
  //打包配置
  build: {
    target: 'modules',
    outDir: 'dist', //指定输出路径
    assetsDir: 'assets', //指定生成的静态文件存放路径
    minify: 'terser' //混淆器， terser构建后文件体积更小
  },
  //本地运行，以及反向代理
  server: {
    cors: true, //默认启用并允许任河源
    open: true, //服务器启动时自动打开应用程序
    // 配置反向代理
    proxy: {
      // '/api': {
      //   target: 'htpp://xxx.x.x',
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/api/, '')
      // }
    }
  }
})
