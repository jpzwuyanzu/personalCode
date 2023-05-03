
### 创建vue3+typescript项目

npm create vite

移动端响应式项目解决方案33

#### 1， 使用postCssToRem


yarn add postcss-pxtorem@5 lib-flexible@0.3 autoprefixer

修改vite.config.ts
```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
const pxtorem = require('postcss-pxtorem')
import autoPreFixer from 'autoprefixer'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
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
  // server: {
  //   open: true,//启动项目自动弹出浏览器
  //   port: 3001,//启动端口
  //   host: '172.22.2.234',
  //   proxy: {
  //     '/qf': {
  //       target: 'http://172.22.2.249:8083', //实际请求地址
  //       // target: 'http://34.92.25.18:8083',
  //       changeOrigin: true,
  //       // rewrite: (path) => path.replace(/^\/api/, '')
  //     }
  //   }
  // }
})
```
在main.ts中导入lib-flexible
```ts
import { createApp } from 'vue'
import 'lib-flexible'
import './style.css'
import App from './App.vue'

createApp(App).mount('#app')

```
#### 2,使用vw 和vh方案

参考地址：https://www.jianshu.com/p/4d86701caa0e

npm install postcss-px-to-viewport --save

创建sass函数,设计稿宽度为750*1250，根据实际设计稿尺寸设置

calcSize.scss

```scss
@function vw($px) {
  @return ($px / 750) * 100vw;
}
//有特殊要求也可以高度自适应，一般宽度自适应就可以了
@function vh($px) {
  @return ($px / 1250) * 100vh;
}
```

```scss
@import "@/styles/calcSize";
div {
    height:vh(250);
    width:vw(350);
}
```

配置vite.config.ts

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers'
import path from 'path'
import pxtorem from 'postcss-pxtorem'
import autoPreFixer from 'autoprefixer'
import postcssPXToViewPart from 'postcss-px-to-viewport'

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
        postcssPXToViewPart({
          viewportWidth: 750,   // 视窗的宽度，对应的是我们设计稿的宽度，Iphone6的一般是375 （xx/375*100vw）
          viewportHeight: 1200, // 视窗的高度，Iphone6的一般是667
          unitPrecision: 3,     // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
          viewportUnit: "vw",   // 指定需要转换成的视窗单位，建议使用vw
          selectorBlackList: ['.ignore', '.hairlines'],// 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
          minPixelValue: 1,     // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
          mediaQuery: false     // 允许在媒体查询中转换`px`
        })
        // pxtorem({
        //   rootValue: 75, //如果设计稿的尺寸不是 375，而是 750 或其他大小，可以将 rootValue 配置调整:
        //   unitPrecision: 5, // （数字）允许 REM 单位增长到的十进制数字
        //   propList: ["*"],
        //   //unitPrecision: 5, // （数字）允许 REM 单位增长到的十进制数字
        //   //propList: ['*'], // 可以从 px 更改为 rem 的属性 使用通配符*启用所有属性
        //   //selectorBlackList: [],// （数组）要忽略并保留为 px 的选择器。
        //   //replace: true, // 替换包含 rems 的规则，而不是添加回退。
        //   mediaQuery: false,  // 允许在媒体查询中转换 px
        //   minPixelValue: 0, // 最小的转化单位
        //   exclude: /node_modules/i // 要忽略并保留为 px 的文件路径
        // })
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
  // server: {
  //   open: true,//启动项目自动弹出浏览器
  //   port: 3001,//启动端口
  //   host: '172.22.2.234',
  //   proxy: {
  //     '/qf': {
  //       target: 'http://172.22.2.249:8083', //实际请求地址
  //       // target: 'http://34.92.25.18:8083',
  //       changeOrigin: true,
  //       // rewrite: (path) => path.replace(/^\/api/, '')
  //     }
  //   }
  // }
})

```


### 安装第三方库的时候，在Ts项目中如果安装第三方包，缺少申明文件

有两种处理方式
1，第一种直接安装@types/包名

2，第二种如果没有对应的@types，自己定义申明文件
2.1 在项目根目录下创建types文件夹
2.2 在tsconfig.json里的include添加上types
2.3 在types文件夹中新建申明文件，格式为XXX.d.ts 
2.4 申明模块类型
```ts
declare module 'xgplaer' {
    const content: any
    // 这里可以根据自己的需要，添加需要的类型，可以让ts有更好的提示
    export = content
}
```