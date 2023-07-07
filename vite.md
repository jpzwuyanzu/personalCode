# vite知识点整理


## vite常用插件

1. 打包之后移除console.log和注释的配置
```ts
build: {
    terserOptions: {
        compress: {
            drop_console: true,
            drop_debugger: true
        }
    }
}
```

2. vite-plugin-style-import 按需加载样式

3. vite-plugin-compression 开启gzip压缩
```ts
import viteCompression from 'vite-plugin-compression';
export default defineConfig({
  plugins: [vue(), viteCompression({
    verbose: true, //是否在控制台输出压缩结果
    disable: false, //是否禁用,相当于开关在这里
    threshold: 10240, //体积大于 threshold 才会被压缩,单位 b，1b=8B, 1B=1024KB  那我们这里相当于 9kb多吧，就会压缩
    algorithm: 'gzip', //压缩算法,可选 [ 'gzip' , 'brotliCompress' ,'deflate' , 'deflateRaw']
    ext: '.gz', //文件后缀
    )}]
)}
```

4. vite-plugin-cdn-import 引入cdn 

5. rollup-plugin-external-globals (另外一种引入cdn的方式)

6. vite-plugin-restart 通过监听文件重启vite服务

最常用就是监听vite.config.js/vite.config.ts
```ts
plugins: [
    ViteRestart({
        restart: [
            'my.config.[jt]s'
        ]
    })
]
```

7. vite-plugin-svg-icons 用于生成svg雪碧图，方便在项目中使用.svg文件

8. vite-plugin-html 一个针对index.html，提供亚索和机遇ejs模版功能的vite插件
通过搭配.env 文件，可以在开发或者构建项目时，对index.html注入动态数据，例如替换网站标题

9. vitejs/plugin-legacy vue3语法向下兼容

10. vite-plugin-vue-setup-extend 优雅的使用组件名称，使用这个插件，可以给setup 添加name属性

11. rollup-plugin-visualizer 构建分析工具，打包之后可以生成分析图

12. 打包优化vite.config.ts
```ts
import viteCompression from 'vite-plugin-compression';
export default defineConfig({
  plugins: [vue(), viteCompression({
    verbose: true,
    disable: false,
    threshold: 10240,
    algorithm: 'gzip',
    ext: '.gz',
  }),
  build: {
    outDir: 'mh', //输出目录名
    minify: "terser", //压缩方式
    terserOptions: { 
      compress: {
        drop_console: true, //剔除console,和debugger
        drop_debugger: true,
      },
    },
    // chunkSizeWarningLimit: 1500,大文件报警阈值设置,不建议使用
    rollupOptions: {
      output: { //静态资源分类打包
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        manualChunks(id) { //静态资源分拆打包
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    }
  }
})
```

13. unplugin-auto-import 支持vue, vue-router, vue-i18n, @vueuse/head, @vueuse/core等自动引入
```ts
import AutoImport from 'unplugin-auto-import/vite'
export default  ({ mode }) => defineConfig({
  plugins: [
    AutoImport({
      imports: ['vue', 'vue-router', 'vuex', '@vueuse/head'],
      // 可以选择auto-import.d.ts生成的位置，使用ts建议设置为'src/auto-import.d.ts'
      dts: 'src/auto-import.d.ts'
    }),
  ]
})

```

14. vite-plugin-imagemin 打包压缩图片

npm i vite-plugin-imagemin -D

```ts
import { defineConfig,loadEnv} from 'vite'
import viteImagemin from 'vite-plugin-imagemin'
export default  ({ mode }) => defineConfig({
  plugins: [
    viteImagemin({
      gifsicle: { // gif图片压缩
        optimizationLevel: 3, // 选择1到3之间的优化级别
        interlaced: false, // 隔行扫描gif进行渐进式渲染
        // colors: 2 // 将每个输出GIF中不同颜色的数量减少到num或更少。数字必须介于2和256之间。
      },
      optipng: { // png
        optimizationLevel: 7, // 选择0到7之间的优化级别
      },
      mozjpeg: {// jpeg
        quality: 20, // 压缩质量，范围从0(最差)到100(最佳)。
      },
      pngquant: {// png
        quality: [0.8, 0.9], // Min和max是介于0(最差)到1(最佳)之间的数字，类似于JPEG。达到或超过最高质量所需的最少量的颜色。如果转换导致质量低于最低质量，图像将不会被保存。
        speed: 4, // 压缩速度，1(强力)到11(最快)
      },
      svgo: { // svg压缩
        plugins: [
          {
            name: 'removeViewBox',
          },
          {
            name: 'removeEmptyAttrs',
            active: false,
          },
        ],
      },
    }),
  ]
})
```