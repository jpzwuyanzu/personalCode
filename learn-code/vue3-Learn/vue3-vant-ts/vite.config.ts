import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: './', //打包路径
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src') //设置别名
    }
  },
  server: {
    // port: 4000, //启动端口
    // open: true,
    proxy: {
      // '/api': {
      //   target: 'htpp://xxx.x.x',
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/api/, '')
      // }
    }
  }
})
