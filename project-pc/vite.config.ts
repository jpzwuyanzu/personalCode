import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers'
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()]
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/base.scss";`,
      },
    },
  },
  resolve: {
    "alias": {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  }
})
