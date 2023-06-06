import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import electron from 'vite-plugin-electron'
import electronRender from 'vite-plugin-electron-renderer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    electron({
      // 入口文件
      entry: [
        // 主进程
        'electron/index.ts',
        // 预加载
        'electron/preload.ts'
      ]
    }),
    electronRender()
  ],
})
