import { fileURLToPath, URL } from 'node:url'
import { VitePWA } from 'vite-plugin-pwa'
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import { defineConfig } from 'vite'
import pxtorem from 'postcss-pxtorem'
import autoPreFixer from 'autoprefixer'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  // base: 'm9',
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),
    VitePWA({
      manifest: {
        name: '7.cc',
        short_name: '7.cc',
        description: '7.cc',
        theme_color: '#ffffff',
        icons: [		//添加图标， 注意路径和图像像素正确
          {
            src: 'icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ]
      },
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],		//缓存相关静态资源
        runtimeCaching: [{		//由于要测试第三方API， 这里配置缓存访问第三方API的资源
          handler: 'CacheFirst',
          urlPattern: /^https:\/\/jsonplaceholder/,		//注意，要修改成要测试的API。请使用正则表达式匹配
          method: 'GET',
          options: {
            cacheName: 'test-external-api',		//创建缓存名称
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }]
      },
      devOptions: {
        enabled: true
      }
    })
  ],
  css: {
    postcss: {
      plugins: [
        autoPreFixer(),
        pxtorem({
          rootValue: 37.5, //如果设计稿的尺寸不是 375，而是 750 或其他大小，可以将 rootValue 配置调整:
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
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})