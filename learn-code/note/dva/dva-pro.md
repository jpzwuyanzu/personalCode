# 1.介绍

dva 首先是一个基于 [redux](https://github.com/reduxjs/redux) 和 [redux-saga](https://github.com/redux-saga/redux-saga) 的数据流方案，然后为了简化开发体验，dva 还额外内置了 [react-router](https://github.com/ReactTraining/react-router) 和 [fetch](https://github.com/github/fetch)，所以也可以理解为一个轻量级的应用框架。

## [#](https://dvajs.com/guide/#特性) 特性

- **易学易用**，仅有 6 个 api，对 redux 用户尤其友好，[配合 umi 使用](https://umijs.org/guide/with-dva.html)后更是降低为 0 API
- **elm 概念**，通过 reducers, effects 和 subscriptions 组织 model
- **插件机制**，比如 [dva-loading](https://github.com/dvajs/dva/tree/master/packages/dva-loading) 可以自动处理 loading 状态，不用一遍遍地写 showLoading 和 hideLoading
- **支持 HMR**，基于 [babel-plugin-dva-hmr](https://github.com/dvajs/babel-plugin-dva-hmr) 实现 components、routes 和 models 的 HMR

# 2.安装 dva-cli

通过 npm 安装 dva-cli 并确保版本是 `0.9.1` 或以上。

```bash
$ npm install dva-cli -g
$ dva -v
dva-cli version 0.10.1
```



# 3.创建项目

```bash
$ dva new dva-app
```

# 4.配置UI库

```bash
$ cnpm install antd babel-plugin-import --save
```

编辑 `.webpackrc`，使 `babel-plugin-import` 插件生效。

```diff
{
  "extraBabelPlugins": [
    ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]
  ]
}
```

# 5.项目完成

## 5.1 创建了Product组件

Src/routes/Product.js

```tsx
import React from 'react'
function Product({ prolist }) {
  return <div>
    产品列表
  </div>
}

export default Product
```

Src/router.js注册路由

```js
import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Product from './routes/Product';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/product" exact component={Product} />
        <Route path="/" exact component={IndexPage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;

```



## 5.2 创建ProductList组件

Src/components/ProductList.js

```js
import React from 'react';

import { Table } from 'antd';

const data = [
  {
      "banners":[
          "https://img12.360buyimg.com/n1/s450x450_jfs/t1/59022/28/10293/141808/5d78088fEf6e7862d/68836f52ffaaad96.jpg",
          "https://img12.360buyimg.com/n1/s450x450_jfs/t1/45954/33/10562/97168/5d780893Eaec0fe47/ee567a1dea515d38.jpg",
          "https://img12.360buyimg.com/n1/s450x450_jfs/t1/80220/18/9892/163090/5d78089cEda2f9674/da3b18358e68cfca.jpg",
          "https://img12.360buyimg.com/n1/s450x450_jfs/t1/61588/10/9949/164377/5d7808a1E6c3615dd/7c45f7039b9cbae8.jpg"
      ],
      "proid":"pro_fYQbhxsw1qADQ97XRCoVSd",
      "category":"手机",
      "brand":"Apple",
      "proname":"Apple iPhone 11 (A2223) 128GB 黑色 移动联通电信4G手机 双卡双待",
      "originprice":4999,
      "sales":4070000,
      "stock":50000,
      "desc":"商品名称：AppleiPhone 11商品编号：100008348542商品毛重：440.00g商品产地：中国大陆CPU型号：其他运行内存：其他机身存储：128GB存储卡：不支持存储卡摄像头数量：后置双摄后摄主摄像素：1200万像素前摄主摄像素：1200万像素主屏幕尺寸（英寸）：6.1英寸分辨率：其它分辨率屏幕比例：其它屏幕比例屏幕前摄组合：刘海屏充电器：其他热点：人脸识别特殊功能：语音命令操作系统：iOS(Apple)",
      "issale":0,
      "isrecommend":0,
      "discount":9,
      "isseckill":1,
      "img1":"https://img12.360buyimg.com/n1/s450x450_jfs/t1/59022/28/10293/141808/5d78088fEf6e7862d/68836f52ffaaad96.jpg",
      "img2":"https://img12.360buyimg.com/n1/s450x450_jfs/t1/45954/33/10562/97168/5d780893Eaec0fe47/ee567a1dea515d38.jpg",
      "img3":"https://img12.360buyimg.com/n1/s450x450_jfs/t1/80220/18/9892/163090/5d78089cEda2f9674/da3b18358e68cfca.jpg",
      "img4":"https://img12.360buyimg.com/n1/s450x450_jfs/t1/61588/10/9949/164377/5d7808a1E6c3615dd/7c45f7039b9cbae8.jpg"
  },
  {
      "banners":[
          "https://img.alicdn.com/imgextra/i1/1714128138/O1CN01VUJK3f29zForLahYc_!!0-item_pic.jpg_430x430q90.jpg",
          "https://img.alicdn.com/imgextra/i2/1714128138/O1CN01jr6J1V29zFoV1LbUu_!!0-item_pic.jpg_430x430q90.jpg",
          "https://img.alicdn.com/imgextra/i3/1714128138/O1CN01KaVzhz29zFoBI7cxY_!!1714128138.jpg_430x430q90.jpg",
          "https://img.alicdn.com/imgextra/i1/1714128138/O1CN01WF3zMy29zFoJENfk4_!!1714128138.jpg_430x430q90.jpg"
      ],
      "proid":"pro_bzSGddu2uraZdmSiPmwfmG",
      "category":"家电",
      "brand":" MIJIA/米家",
      "proname":"小米全面屏65英寸E65X 4K超高清 HDR 2GB+8GB 智能网络电视",
      "originprice":3999,
      "sales":15000,
      "stock":695,
      "desc":"品牌名称：Xiaomi/小米 证书编号：2019010808227189证书状态：有效产品名称：小米电视3C规格型号：L65M5-EA： 220V～ 50/60Hz 160W产品名称：Xiaomi/小米 L65M5-EA品牌: Xiaomi/小米型号: L65M5-EA分辨率: 4K电视能效等级: 三级网络连接方式: 全部支持操作系统: MIUI3D类型: 无",
      "issale":1,
      "isrecommend":1,
      "discount":9.5,
      "isseckill":1,
      "img1":"https://img.alicdn.com/imgextra/i1/1714128138/O1CN01VUJK3f29zForLahYc_!!0-item_pic.jpg_430x430q90.jpg",
      "img2":"https://img.alicdn.com/imgextra/i2/1714128138/O1CN01jr6J1V29zFoV1LbUu_!!0-item_pic.jpg_430x430q90.jpg",
      "img3":"https://img.alicdn.com/imgextra/i3/1714128138/O1CN01KaVzhz29zFoBI7cxY_!!1714128138.jpg_430x430q90.jpg",
      "img4":"https://img.alicdn.com/imgextra/i1/1714128138/O1CN01WF3zMy29zFoJENfk4_!!1714128138.jpg_430x430q90.jpg"
  },
  {
      "banners":[
          "http://img12.360buyimg.com/n1/jfs/t1/125178/7/16502/43895/5f9a653cEb261b37f/feebe84826ae1cfc.jpg",
          "http://img12.360buyimg.com/n1/jfs/t1/119900/20/16987/49836/5f9a6577E0315dadd/223f9ca768affac0.jpg",
          "http://img12.360buyimg.com/n1/jfs/t1/129195/37/16580/75239/5f9a6586E19e16fa9/073fc5c7f4fa99f9.jpg",
          "http://img12.360buyimg.com/n1/jfs/t1/147767/7/12409/94128/5f9a6586E7f3574f5/e6ec54a69777977c.jpg"
      ],
      "proid":"pro_bcPUikojjpoWDWp1Rcdj76",
      "category":"家电",
      "brand":" MIJIA/米家",
      "proname":"米家直驱洗烘一体机",
      "originprice":2999,
      "sales":699,
      "stock":996,
      "desc":"米家10kg直驱洗衣机 全自动家用洗烘干一体 XHQG100MJ201 小米出品",
      "issale":1,
      "isrecommend":1,
      "discount":9,
      "isseckill":1,
      "img1":"http://img12.360buyimg.com/n1/jfs/t1/125178/7/16502/43895/5f9a653cEb261b37f/feebe84826ae1cfc.jpg",
      "img2":"http://img12.360buyimg.com/n1/jfs/t1/119900/20/16987/49836/5f9a6577E0315dadd/223f9ca768affac0.jpg",
      "img3":"http://img12.360buyimg.com/n1/jfs/t1/129195/37/16580/75239/5f9a6586E19e16fa9/073fc5c7f4fa99f9.jpg",
      "img4":"http://img12.360buyimg.com/n1/jfs/t1/147767/7/12409/94128/5f9a6586E7f3574f5/e6ec54a69777977c.jpg"
  },
  {
      "banners":[
          "https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i4/1714128138/O1CN014gUF0929zFosv89eg_!!1714128138.jpg_430x430q90.jpg",
          "https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i4/1714128138/O1CN01nTvAOq29zFmszHmvq_!!1714128138.jpg_430x430q90.jpg",
          "https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i3/1714128138/O1CN01w30eeF29zFmtOnY0Q_!!1714128138.jpg_430x430q90.jpg",
          "https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i2/1714128138/O1CN01G7ARQ129zFmSKuPdI_!!1714128138.jpg_430x430q90.jpg"
      ],
      "proid":"pro_eJXVMTXW1xLPsM6wAEuA2z",
      "category":"家电",
      "brand":" MIJIA/米家",
      "proname":"【小米智能生活】米家扫地机器人家用全自动扫拖一体机拖地吸尘器",
      "originprice":1999,
      "sales":40000,
      "stock":697,
      "desc":"品牌名称：MIJIA/米家产品名称：MIJIA/米家 米家扫拖机器...品牌: MIJIA/米家型号: 米家扫拖机器人功能: 拖扫吸式电池类型: 锂电池颜色分类: 黑色 白色充电模式: 自动回充是否带遥控器: 无生产企业: 小米清扫路线: 规划式液晶显示: 无水箱类型: 电控水箱附加功能: APP控制 区域清扫 地毯识别 定时预约 定点清扫 延边清扫 手机遥控 断电续扫 自动清扫导航类型: 激光导航外观造型: 扫地机器人是否有定时预约功能: 有有无虚拟墙: 有碰撞保护: 机械+电子双层保护是否自动充电: 是电池容量: 3200mAh尘盒容量: 0.55L噪音: 65-77dB最高高度: 9.5cm保修期: 12个月续航时间: 2小时清扫模式: 吸口+滚刷式虚拟墙类型: 掌上虚拟墙",
      "issale":0,
      "isrecommend":0,
      "discount":10,
      "isseckill":0,
      "img1":"https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i4/1714128138/O1CN014gUF0929zFosv89eg_!!1714128138.jpg_430x430q90.jpg",
      "img2":"https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i4/1714128138/O1CN01nTvAOq29zFmszHmvq_!!1714128138.jpg_430x430q90.jpg",
      "img3":"https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i3/1714128138/O1CN01w30eeF29zFmtOnY0Q_!!1714128138.jpg_430x430q90.jpg",
      "img4":"https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i2/1714128138/O1CN01G7ARQ129zFmSKuPdI_!!1714128138.jpg_430x430q90.jpg"
  },
  {
      "banners":[
          "https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i4/2207959261164/O1CN017HZL7g1KT9ePJtXHi_!!2207959261164.jpg_430x430q90.jpg",
          "https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i2/2207959261164/O1CN01EqmV401KT9ertC9HL_!!2207959261164.jpg_430x430q90.jpg",
          "https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i3/2207959261164/O1CN01pgHTpX1KT9ePJuoIA_!!2207959261164.jpg_430x430q90.jpg",
          "https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i3/2207959261164/O1CN01pgHTpX1KT9ePJuoIA_!!2207959261164.jpg_430x430q90.jpg"
      ],
      "proid":"pro_57Pxo3iohKYwFKMmrXbz45",
      "category":"口红",
      "brand":"Dior迪奥",
      "proname":"【官方正品】全新Dior迪奥烈艳蓝金唇膏传奇新色丝绒999 720",
      "originprice":356,
      "sales":44460,
      "stock":50000,
      "desc":"品牌名称：Dior/迪奥产品参数：产品名称：Dior/迪奥 魅惑釉唇膏品牌: Dior/迪奥Dior/迪奥单品: 魅惑釉唇膏产地: 法国颜色分类: 740 CLUB 可乐部 漆光枫叶脏橘 847 WESTWOOD 漆光砖红 857 HOLLYWOOD RED 好莱坞大咖 漆光红酒色 744 PARTY RED 花蝴蝶 漆光波普橘红524 COOLISTA 漆光肉桂奶茶 320 NUDE WAVE 漆光裸粉 457 PALM BEACH 鸡尾酒 漆光西柚 550 TEASE 小心计 漆光樱花色 747 DIOR SUNSET 漆光枫叶橘 764 DIOR RODEO 漆光桃粉 867 SULFUROUS 红酒 漆光梅子 554 WEST COAST 日光浴 漆光橙子汽水 877 TURN ME DIOR 给我迪奥 漆光玫红批准文号: 国妆备进字J20182166功效: 提升气色 不易脱色规格类型: 正常规格是否为特殊用途化妆品: 否产品类别: 普通类限期使用日期范围: 2022-12-01至2022",
      "issale":1,
      "isrecommend":0,
      "discount":8,
      "isseckill":0,
      "img1":"https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i4/2207959261164/O1CN017HZL7g1KT9ePJtXHi_!!2207959261164.jpg_430x430q90.jpg",
      "img2":"https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i2/2207959261164/O1CN01EqmV401KT9ertC9HL_!!2207959261164.jpg_430x430q90.jpg",
      "img3":"https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i3/2207959261164/O1CN01pgHTpX1KT9ePJuoIA_!!2207959261164.jpg_430x430q90.jpg",
      "img4":"https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i3/2207959261164/O1CN01pgHTpX1KT9ePJuoIA_!!2207959261164.jpg_430x430q90.jpg"
  },
  {
      "banners":[
          "https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i1/755579902/O1CN01OtNTQk2N1ATlHy6xO_!!755579902.jpg_430x430q90.jpg",
          "https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i3/755579902/O1CN01iB8xbv2N1ATpBCpaR_!!755579902.jpg_430x430q90.jpg",
          "https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i2/755579902/O1CN01fNjRkc2N1AThNd0FJ_!!755579902.jpg_430x430q90.jpg",
          "https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i3/755579902/O1CN01RXuYit2N1ASK66hwJ_!!755579902.jpg_430x430q90.jpg"
      ],
      "proid":"pro_new6NqVr6VpxttBdU8CmSY",
      "category":"口红",
      "brand":"卡姿兰",
      "proname":"卡姿兰口红雾吻水吻唇膏哑光大牌秋冬奶茶色女小众学生款官方旗舰",
      "originprice":119,
      "sales":162170,
      "stock":50000,
      "desc":"品牌名称：CARSLAN/卡姿兰产品参数：产品名称：CARSLAN/卡姿兰 雾吻唇膏品牌: CARSLAN/卡姿兰卡姿兰单品: 雾吻唇膏产地: 中国颜色分类: M05奶油萝卜 M02糖渍山楂 M13莓莓浆果M07焦糖拿铁 M23血橙萝卜 M04枫叶慕斯 M21奶橘布丁M22脏脏萝卜 M18冰橙美式 M19红莓软糖 M20血梨朗姆M06蜜桃乌龙 M12黑糖可可 M14多肉粉荔 M08红豆冰沙M11樱粉豆沙 M10暖橘赤茶 M01樱桃果酱 M16甜柚冰茶M17栗子甜酒 M15伯爵奶冻 M03铁锈辣椒 11小辣椒 06甜西柚 27星河入梦 15烂番茄 26桃桃苏打 28精酿樱果 29冷萃玫瑰30清调红茶 31午夜星辰 04草莓酱 22小龙虾 10辣条红 14小苹果 08奶油橘 07阳光橙 01蜜桃粉 09小南瓜批准文号: 粤G妆网备字2019281749保质期: 36个月适合肤质: 任何肤质功效: 易上色规格类型: 正常规格是否为特殊用途化妆品: 否限期使用日期范围: 2022-07-01至2023-02",
      "issale":1,
      "isrecommend":0,
      "discount":9,
      "isseckill":0,
      "img1":"https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i1/755579902/O1CN01OtNTQk2N1ATlHy6xO_!!755579902.jpg_430x430q90.jpg",
      "img2":"https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i3/755579902/O1CN01iB8xbv2N1ATpBCpaR_!!755579902.jpg_430x430q90.jpg",
      "img3":"https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i2/755579902/O1CN01fNjRkc2N1AThNd0FJ_!!755579902.jpg_430x430q90.jpg",
      "img4":"https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i3/755579902/O1CN01RXuYit2N1ASK66hwJ_!!755579902.jpg_430x430q90.jpg"
  },
  {
      "banners":[
          "https://img.alicdn.com/imgextra/i4/3170729146/O1CN016g20382HQv3RkB4Ph_!!0-item_pic.jpg_430x430q90.jpg",
          "https://img.alicdn.com/imgextra/i4/3170729146/O1CN01sm8htn2HQv3JBuVur_!!0-item_pic.jpg_430x430q90.jpg",
          "https://img.alicdn.com/imgextra/i1/3170729146/O1CN01GruPkM2HQv3LA3kZo_!!3170729146.jpg_430x430q90.jpg",
          "https://img.alicdn.com/imgextra/i2/3170729146/O1CN0172NDzG2HQv2tAafAI_!!3170729146.jpg_430x430q90.jpg"
      ],
      "proid":"pro_taHEN5C1mJcNYY5zfdY8Y8",
      "category":"口红",
      "brand":"MAC",
      "proname":"【官方正品】MAC/魅可尤雾弹唇膏口红大牌正品316/923奶茶色",
      "originprice":180,
      "sales":522107,
      "stock":50000,
      "desc":"品牌名称：MAC/魅可产品参数：产品名称：MAC/魅可 丝缎柔雾唇膏品牌: MAC/魅可MAC/魅可单品: 丝缎柔雾唇膏产地: 意大利颜色分类: LISA同款尤雾弹限定版 DEVOTED TO CHILI 尤雾弹限定版 STAY CURIOUS 316 DEVOTED TO CHILI 柔雾小辣椒 923 STAY CURIOUS 糖渍樱花 314 MULL IT OVER 白桃奶茶 308 MANDARIN O 初恋西柚 315 LASTING PASSION 糖霜草莓 921 SULTRY MOVE 棕糖蜜桃 303 STYLE SHOCKED! 胡萝卜汁 922 WERK, WERK, WERK 初恋苹果红 305 BURNING LOVE 梅子浆果 307 FALL IN LOVE 樱花甜酒 313 SCATTERED PETALS 玫瑰奶糖 304 SULTRINESS 肉桂蜜茶 919 P FOR POTENT 917 SEXY, BUT SWEET 918 RIPENED 302 SWEET, NO SUGAR 蜂蜜杏子 311 MY TWEEDY 黄桃冰沙 920 VELVET PUNCH 306 SHOCKING REVELATION 复古红莓 312 IMPULSIVE 奶盖乌龙 309 BEST OF ME 奶油布丁 924 REVERENCE 310 INFLUENTIALLY IT 芝芝蜜桃 301 A LITTLE TAMED 烟粉豆沙批准文号: 国妆备进字J20153851功效: 不易脱色 持久 提升气色 易上色规格类型: 正常规格是否为特殊用途化妆品: 否产品类别: 普通类限期使用日期范围: 2022-05-01至2022",
      "issale":0,
      "isrecommend":0,
      "discount":9,
      "isseckill":0,
      "img1":"https://img.alicdn.com/imgextra/i4/3170729146/O1CN016g20382HQv3RkB4Ph_!!0-item_pic.jpg_430x430q90.jpg",
      "img2":"https://img.alicdn.com/imgextra/i4/3170729146/O1CN01sm8htn2HQv3JBuVur_!!0-item_pic.jpg_430x430q90.jpg",
      "img3":"https://img.alicdn.com/imgextra/i1/3170729146/O1CN01GruPkM2HQv3LA3kZo_!!3170729146.jpg_430x430q90.jpg",
      "img4":"https://img.alicdn.com/imgextra/i2/3170729146/O1CN0172NDzG2HQv2tAafAI_!!3170729146.jpg_430x430q90.jpg"
  },
  {
      "banners":[
          "http://img14.360buyimg.com/n1/jfs/t1/118275/26/7833/349609/5ec76105Ebf19e49f/29edc4ad5ffd4b32.jpg",
          "http://img14.360buyimg.com/n1/jfs/t1/118275/26/7833/349609/5ec76105Ebf19e49f/29edc4ad5ffd4b32.jpg",
          "http://img14.360buyimg.com/n1/jfs/t1/113625/9/7924/367773/5ec76105E6569ae90/eb65484c642bc8ce.jpg",
          "http://img14.360buyimg.com/n1/jfs/t1/115349/21/7838/399397/5ec76105Ec544fd63/3fc8e65d6d3b11a0.jpg"
      ],
      "proid":"pro_dVeGsk7wTzoQNdAWkwFLxn",
      "category":"宠物活体",
      "brand":"帅帅名宠",
      "proname":"美国短毛猫活体 虎斑猫宠物活体美短幼猫猫咪活体美短标斑美短加白起司美短猫活体美短虎斑猫 特价款直接拍",
      "originprice":1499,
      "sales":9999,
      "stock":100,
      "desc":"商品名称：【30天质保】美国短毛猫活体 虎斑猫宠物活体美短幼猫猫咪活体美短标斑美短加白起司美短猫活体美短虎斑猫 特价款直接拍商品编号：65312233989店铺： 帅帅名宠官方旗舰店商品毛重：1.0kg品种：美国短毛猫毛长：短毛宠物级别：宠物级免疫驱虫：已做完血统证书：无血统证书宠物性别：公宠物年龄：离乳期(30-45日龄)",
      "issale":1,
      "isrecommend":0,
      "discount":10,
      "isseckill":0,
      "img1":"http://img14.360buyimg.com/n1/jfs/t1/118275/26/7833/349609/5ec76105Ebf19e49f/29edc4ad5ffd4b32.jpg",
      "img2":"http://img14.360buyimg.com/n1/jfs/t1/118275/26/7833/349609/5ec76105Ebf19e49f/29edc4ad5ffd4b32.jpg",
      "img3":"http://img14.360buyimg.com/n1/jfs/t1/113625/9/7924/367773/5ec76105E6569ae90/eb65484c642bc8ce.jpg",
      "img4":"http://img14.360buyimg.com/n1/jfs/t1/115349/21/7838/399397/5ec76105Ec544fd63/3fc8e65d6d3b11a0.jpg"
  },
  {
      "banners":[
          "http://img13.360buyimg.com/n1/jfs/t1/123067/34/5607/454729/5ef30d6fEc2f22298/ff340e7acbf87759.jpg",
          "http://img13.360buyimg.com/n1/jfs/t1/134124/3/2940/529453/5ef30d6fE47e5e322/3aa961b03019164f.jpg",
          "http://img13.360buyimg.com/n1/jfs/t1/118195/16/10817/537724/5ef30d71Edb295d52/9de0e2504bbc1e96.jpg",
          "http://img13.360buyimg.com/n1/jfs/t1/127619/29/5560/470087/5ef30d6eE2a009fbf/246da868da7ac0be.jpg"
      ],
      "proid":"pro_psVdKxwKYqN9uPFQm79h3x",
      "category":"宠物活体",
      "brand":"鲁菏星皓官方旗舰店",
      "proname":"孟加拉猫幼猫豹纹猫宠物猫纯种血蟒纹短毛猫活体空心大玫瑰花纹 心爱颜值款",
      "originprice":6600,
      "sales":5,
      "stock":3,
      "desc":"商品名称：孟加拉猫幼猫豹纹猫宠物猫纯种血蟒纹短毛猫活体空心大玫瑰花纹 心爱颜值款商品编号：70948441388店铺： 鲁菏星皓官方旗舰店商品毛重：500.00g品种：豹猫毛长：短毛免疫驱虫：已做完宠物级别：血统级血统证书：有血统证书是否有视频：有视频宠物性别：公",
      "issale":1,
      "isrecommend":0,
      "discount":9,
      "isseckill":0,
      "img1":"http://img13.360buyimg.com/n1/jfs/t1/123067/34/5607/454729/5ef30d6fEc2f22298/ff340e7acbf87759.jpg",
      "img2":"http://img13.360buyimg.com/n1/jfs/t1/134124/3/2940/529453/5ef30d6fE47e5e322/3aa961b03019164f.jpg",
      "img3":"http://img13.360buyimg.com/n1/jfs/t1/118195/16/10817/537724/5ef30d71Edb295d52/9de0e2504bbc1e96.jpg",
      "img4":"http://img13.360buyimg.com/n1/jfs/t1/127619/29/5560/470087/5ef30d6eE2a009fbf/246da868da7ac0be.jpg"
  },
  {
      "banners":[
          "http://img12.360buyimg.com//n0/jfs/t1/130251/28/12098/150030/5f815b5eE7d9a2257/6624979ec3ae62e8.jpg",
          "http://img12.360buyimg.com/n1/jfs/t1/115903/24/7741/117926/5ec47806Ea5b740a0/cc8a3dc89ac4eec4.jpg",
          "http://img12.360buyimg.com/n1/jfs/t1/125010/4/2292/120381/5ec47807E21f22ed0/5033535ed1f02875.jpg",
          "http://img12.360buyimg.com/n1/jfs/t1/127055/12/2332/121618/5ec47807E0484957c/4dc5a78fff678992.jpg"
      ],
      "proid":"pro_j9VfCnfLU2BaFxD9tEmmsD",
      "category":"宠物活体",
      "brand":"福贝宠物生活专营店",
      "proname":"纯种宠物折耳猫幼猫活体折耳猫活体幼猫苏格兰折耳猫活体英短毛折耳猫美短折耳猫活体幼崽 血统级折耳猫 公",
      "originprice":3999,
      "sales":9,
      "stock":1,
      "desc":"商品名称：【30天质保】纯种宠物折耳猫幼猫活体折耳猫活体幼猫苏格兰折耳猫活体英短毛折耳猫美短折耳猫活体幼崽 血统级折耳猫 公商品编号：65646566077店铺： 福贝宠物生活专营店商品毛重：1.0kg品种：苏格兰折耳猫毛长：短毛宠物级别：宠物级免疫驱虫：已做完血统证书：无血统证书宠物性别：公宠物年龄：幼年猫(45日龄-12月龄)",
      "issale":1,
      "isrecommend":0,
      "discount":9,
      "isseckill":0,
      "img1":"http://img12.360buyimg.com//n0/jfs/t1/130251/28/12098/150030/5f815b5eE7d9a2257/6624979ec3ae62e8.jpg",
      "img2":"http://img12.360buyimg.com/n1/jfs/t1/115903/24/7741/117926/5ec47806Ea5b740a0/cc8a3dc89ac4eec4.jpg",
      "img3":"http://img12.360buyimg.com/n1/jfs/t1/125010/4/2292/120381/5ec47807E21f22ed0/5033535ed1f02875.jpg",
      "img4":"http://img12.360buyimg.com/n1/jfs/t1/127055/12/2332/121618/5ec47807E0484957c/4dc5a78fff678992.jpg"
  }
]
function ProductList () {
  const columns = [
  { title: '序号', render: (text, record, index) => <span>{ index + 1 }</span>},
  { title: '产品名称', key: 'proname', dataIndex: 'proname'}
  ]

  return <Table dataSource = {data} columns = { columns } rowKey = { item => item.proid }/>
}

export default ProductList
```

## 5.3 封装数据请求

Src/services/example.js

```js
import request from '../utils/request';

export function query() {
  return request('/api/users');
}

export function getProlist() {
  return request('http://localhost:3001/api/pro/list?limitNum=20')
}
```

## 5.4 创建状态管理

Src/models/products.js

```js
import { getProlist } from './../services/example'
export default {
  namespace: 'products',
  state: {
    prolist: []
  },
  reducers: {
    changeProlist (state, action) {
      return { ...state, prolist: action.payload}
    }
  },
  effects: {
    * getProlistFn (params, {call, put}) {
      const res = yield call(getProlist)
      console.log(res.data.data)
      yield put({
        type: 'changeProlist',
        payload: res.data.data
      })
    }
  },
  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname}) => {
        if (pathname === '/product') {
          dispatch({
            type: 'getProlistFn'
          })
        }
      })
    }
  }
}
```

## 5.5 开启数据流

Src/index.js

```js
import dva from 'dva';
import './index.css';

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example').default);
app.model(require('./models/products').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');

```

## 5.6 渲染数据

Src/routes/Product.js

```js
import React from 'react'
import { connect } from 'dva'
import ProductList from './../components/ProductList'
function Product({ prolist }) {
  return <div>
    <ProductList prolist = {prolist}/>
  </div>
}

export default connect(
  ({ products: { prolist }}) => {
    // console.log(obj)
    return {
      prolist
    }
  }
)(Product)
```

Src/components/ProductList.js

```js
import React from 'react';

import { Table } from 'antd';

function ProductList ({prolist}) {
  const columns = [
  { title: '序号', render: (text, record, index) => <span>{ index + 1 }</span>},
  { title: '产品名称', key: 'proname', dataIndex: 'proname'}
  ]

  return <Table dataSource = {prolist} columns = { columns } rowKey = { item => item.proid }/>
}

export default ProductList
```



# 6.熟悉dva的相关概念

