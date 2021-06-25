# mock.js 

## 1、mock的介绍

***    生成随机数据，拦截 Ajax 请求。**

通过随机数据，模拟各种场景；不需要修改既有代码，就可以拦截 Ajax 请求，返回模拟的响应数据；支持生成随机的文本、数字、布尔值、日期、邮箱、链接、图片、颜色等；支持支持扩展更多数据类型，支持自定义函数和正则。

优点是非常简单方便, 无侵入性, 基本覆盖常用的接口数据类型.

##  2、mock安装

```node
cnpm install mockjs
```



## 3、mock的语法规范

Mock.js 的语法规范包括两部分：

1. 数据模板定义规范（Data Template Definition，DTD）
2. 数据占位符定义规范（Data Placeholder Definition，DPD)

### 3.1 数据模板定义规范 DTD

**数据模板中的每个属性由 3 部分构成：属性名、生成规则、属性值：**

```json
'name|rule'：value
```

**注意：**

- *属性名* 和 *生成规则* 之间用竖线 `|` 分隔。

- *生成规则* 是可选的。

- 生成规则

   

  有 7 种格式：

  1. `'name|min-max': value` 随机数量在 min 和max 之间
  2. `'name|count': value` 生成count条数据
  3. `'name|min-max.dmin-dmax': value` 在** 之间，并且小数点保留 *** 之间位数
  4. `'name|min-max.dcount': value` 在** 之间，并且小数点保留 dcount位
  5. `'name|count.dmin-dmax': value` 生成count条数据，并且小数点保留 *** 之间位数
  6. `'name|count.dcount': value `生成count条数据，并且小数点保留 dcount位
  7. `'name|+step': value` 属性值自动加 step，初始值为 value。

- ***生成规则\* 的 含义 需要依赖 \*属性值的类型\* 才能确定。**

- *属性值* 中可以含有 `@占位符`。

- *属性值* 还指定了最终值的初始值和类型。

**生成规则和示例：**

#### 1. 属性值是字符串 **String**

1. `'name|min-max': string`

   通过重复 `string` 生成一个字符串，重复次数大于等于 `min`，小于等于 `max`。

2. `'name|count': string`

   通过重复 `string` 生成一个字符串，重复次数等于 `count`。

#### 2. 属性值是数字 **Number**

1. `'name|+1': number`

   属性值自动加 1，初始值为 `number`。

2. `'name|min-max': number`

   生成一个大于等于 `min`、小于等于 `max` 的整数，属性值 `number` 只是用来确定类型。

3. `'name|min-max.dmin-dmax': number`

   生成一个浮点数，整数部分大于等于 `min`、小于等于 `max`，小数部分保留 `dmin` 到 `dmax` 位。

```
Mock.mock({
    'number1|1-100.1-10': 1,
    'number2|123.1-10': 1,
    'number3|123.3': 1,
    'number4|123.10': 1.123
})
// =>
{
    "number1": 12.92,
    "number2": 123.51,
    "number3": 123.777,
    "number4": 123.1231091814
}
```

#### 3. 属性值是布尔型 **Boolean**

1. `'name|1': boolean`

   随机生成一个布尔值，值为 true 的概率是 1/2，值为 false 的概率同样是 1/2。

2. `'name|min-max': value`

   随机生成一个布尔值，值为 `value` 的概率是 `min / (min + max)`，值为 `!value` 的概率是 `max / (min + max)`。

#### 4. 属性值是对象 **Object**

1. `'name|count': object`

   从属性值 `object` 中随机选取 `count` 个属性。

2. `'name|min-max': object`

   从属性值 `object` 中随机选取 `min` 到 `max` 个属性。

#### 5. 属性值是数组 **Array**

1. `'name|1': array`

   从属性值 `array` 中随机选取 1 个元素，作为最终值。

2. `'name|+1': array`

   从属性值 `array` 中顺序选取 1 个元素，作为最终值。

3. `'name|min-max': array`

   通过重复属性值 `array` 生成一个新数组，重复次数大于等于 `min`，小于等于 `max`。

4. `'name|count': array`

   通过重复属性值 `array` 生成一个新数组，重复次数为 `count`。

#### 6. 属性值是函数 **Function**

1. `'name': function`

   执行函数 `function`，取其返回值作为最终的属性值，函数的上下文为属性 `'name'` 所在的对象。

#### 7. 属性值是正则表达式 **RegExp**

1. `'name': regexp`

   根据正则表达式 `regexp` 反向生成可以匹配它的字符串。用于生成自定义格式的字符串。

   ```
   Mock.mock({
       'regexp1': /[a-z][A-Z][0-9]/,
       'regexp2': /\w\W\s\S\d\D/,
       'regexp3': /\d{5,10}/
   })
   // =>
   {
       "regexp1": "pJ7",
       "regexp2": "F)\fp1G",
       "regexp3": "561659409"
   }
   ```

### 3.2 数据占位符定义规范 DPD

***占位符* 只是在属性值字符串中占个位置，并不出现在最终的属性值中。**

*占位符* 的格式为：

``` json
@占位符
@占位符(参数 [, 参数])
```

**注意：**

1. 用 `@` 来标识其后的字符串是 *占位符*。
2. *占位符* 引用的是 `Mock.Random` 中的方法。
3. 通过 `Mock.Random.extend()` 来扩展自定义占位符。
4. *占位符* 也可以引用 *数据模板* 中的属性。
5. *占位符* 会优先引用 *数据模板* 中的属性。
6. *占位符* 支持 *相对路径* 和 *绝对路径*。

```json
Mock.mock({
    name: {
        first: '@FIRST',
        middle: '@FIRST',
        last: '@LAST',
        full: '@first @middle @last'
    }
})
// =>
{
    "name": {
        "first": "Charles",
        "middle": "Brenda",
        "last": "Lopez",
        "full": "Charles Brenda Lopez"
    }
}
```

## 4、Mock.mock()

根据数据模板生成模拟数据。

## 5、Mock.setup()

- Mock.setup( settings )

配置拦截 Ajax 请求时的行为。支持的配置项有：`timeout`。

## 6、 Mock.Random()

Mock.Random 是一个工具类，用于生成各种随机数据。

**Mock.Random 的方法在数据模板中称为『占位符』，书写格式为 `@占位符(参数 [, 参数])` 。**

### 6.1 方法

Mock.Random 提供的完整方法（占位符）如下：

| Type          | Method                                                       |
| ------------- | ------------------------------------------------------------ |
| Basic         | boolean, natural, integer, float, character, string, range, date, time, datetime, now |
| Image         | image, dataImage                                             |
| Color         | color                                                        |
| Text          | paragraph, sentence, word, title, cparagraph, csentence, cword, ctitle |
| Name          | first, last, name, cfirst, clast, cname                      |
| Web           | url, domain, email, ip, tld                                  |
| Address       | area, region                                                 |
| Helper        | capitalize, upper, lower, pick, shuffle                      |
| Miscellaneous | guid, id                                                     |

### 6.2 扩展

Mock.Random 中的方法与数据模板的 `@占位符` 一一对应，在需要时还可以为 Mock.Random 扩展方法，然后在数据模板中通过 `@扩展方法` 引用。例如：

```
Random.extend({
    constellation: function(date) {
        var constellations = ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座']
        return this.pick(constellations)
    }
})
Random.constellation()
// => "水瓶座"
Mock.mock('@CONSTELLATION')
// => "天蝎座"
Mock.mock({
    constellation: '@CONSTELLATION'
})
// => 
```

## 7、Mock.valid()

- Mock.valid( template, data )

校验真实数据 `data` 是否与数据模板 `template` 匹配。

## 8、Mock.toJSONShema()

- Mock.toJSONSchema( template )

把 Mock.js 风格的数据模板 `template` 转换成 [JSON Schema](http://json-schema.org/)。

```js
const Mock = require('mockjs')

const data = Mock.mock({
  "list|10": [{
    "id|+1": 100,
    "age|18-30": 10,
    "sex|1": ['男', '女'],
    "name": '@cname()' + '_' + '@string("upper", 5)' + '_' + '@integer(0, 100)',
    // "avatar": Mock.Random.image('200x100', Mock.mock('@color()').slice(1) , '#FFF', 'png', 'Mock.js')
    "avatar": "@img('200x200', '@color', '#fff', '@cname')",
    "birthday": "@date()",
    "tel": /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/,
    "address": "@county(true)",
    "password": /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/
    // "address": "@province()" + ' ' + "@city()" + ' ' + "@county()"
  }]
})

console.log(data)

```

```js
{
  list: [
    {
      id: 100,
      age: 23,
      sex: '男',
      name: '丁艳_UYUKU_58',
      avatar: 'http://dummyimage.com/200x200/79f2f1/fff&text=罗强',
      birthday: '1996-07-06',
      tel: '13749534813',
      address: '江西省 新余市 其它区',
      password: '4zmixqSXpkhU8Sb2A3U1VXTIBfr6G$Tv1L'
    },
    {
      id: 101,
      age: 24,
      sex: '女',
      name: '范强_AAJEE_83',
      avatar: 'http://dummyimage.com/200x200/f2ce79/fff&text=袁涛',
      birthday: '2003-02-10',
      tel: '+8613196192459',
      address: '山西省 长治市 襄垣县',
      password: 'Ivkz2V0UGfrf3I6YSmUA0UkR$T'
    },
    {
      id: 102,
      age: 22,
      sex: '女',
      name: '林敏_EDXHJ_0',
      avatar: 'http://dummyimage.com/200x200/aa79f2/fff&text=李敏',
      birthday: '1973-09-01',
      tel: '14979469682',
      address: '山西省 晋中市 祁县',
      password: 'csEDmPy8LjmRQl5WkSJb@hH3J'
    },
    {
      id: 103,
      age: 21,
      sex: '女',
      name: '蔡伟_XHNSH_61',
      avatar: 'http://dummyimage.com/200x200/79f287/fff&text=郝秀英',
      birthday: '2018-04-28',
      tel: '+8614705743384',
      address: '河南省 三门峡市 陕县',
      password: 'i03EZ81hgdWXSpu601fXopqneE&S'
    },
    {
      id: 104,
      age: 26,
      sex: '男',
      name: '赵刚_HYYGI_48',
      avatar: 'http://dummyimage.com/200x200/f2798e/fff&text=范明',
      birthday: '2014-01-12',
      tel: '15604455916',
      address: '河南省 周口市 太康县',
      password: 'ajTviNNSByC5fOBdcz@umD30'
    },
    {
      id: 105,
      age: 21,
      sex: '女',
      name: '邵杰_BYXHY_89',
      avatar: 'http://dummyimage.com/200x200/79b1f2/fff&text=曹杰',
      birthday: '1974-01-29',
      tel: '13585737481',
      address: '新疆维吾尔自治区 哈密地区 伊吾县',
      password: '5MqlAPRTbfN495HMxyn5Pn$KIo'
    },
    {
      id: 106,
      age: 22,
      sex: '女',
      name: '叶磊_FOHRW_4',
      avatar: 'http://dummyimage.com/200x200/d4f279/fff&text=顾敏',
      birthday: '1989-02-17',
      tel: '19845677674',
      address: '台湾 新北市 金山区',
      password: 'tnjew7HhJyf42ooCBiEO$fP'
    },
    {
      id: 107,
      age: 29,
      sex: '男',
      name: '潘磊_QLITG_84',
      avatar: 'http://dummyimage.com/200x200/ec79f2/fff&text=江静',
      birthday: '2009-01-28',
      tel: '13212852918',
      address: '吉林省 通化市 集安市',
      password: 'H4RQkmT6R00N6ZaZtL5kfsULxNUvYRH@VkDc2'
    },
    {
      id: 108,
      age: 22,
      sex: '男',
      name: '梁勇_WETCJ_29',
      avatar: 'http://dummyimage.com/200x200/79f2c9/fff&text=方强',
      birthday: '1976-04-08',
      tel: '008613397210548',
      address: '香港特别行政区 香港岛 中西区',
      password: 'UlUnP2lEYaucLZw8EeOS0L6tXz?dPv'
    },
    {
      id: 109,
      age: 24,
      sex: '男',
      name: '罗霞_JERDL_64',
      avatar: 'http://dummyimage.com/200x200/f2a579/fff&text=马勇',
      birthday: '1989-11-06',
      tel: '+8614|24584454',
      address: '吉林省 通化市 东昌区',
      password: 'di2QhGDstUvm9SZCmH5WrmWbMG5Trdw*wgVO'
    }
  ]
}
```

# 9.vue或者react项目中如何使用mock

```
cnpm i axios mockjs -S
```



Src/pro.js

```js
import Mock from 'mockjs'

const data = Mock.mock({
  "data|10": [{
    "proid|+1": 100,
    "proname": '@cname()' + '_' + '@string("upper", 5)' + '_' + '@integer(0, 100)',
    "proimg": "@img('200x200', '@color', '#fff', '@cname')",
    "price|1-1000.2": 0
  }]
})
// console.log(data)

export default data
```

Src/index.js

```js
import Mock from 'mockjs'
import prolist from './pro'
Mock.mock('http://www.wudaxun.top/api/pro/list', prolist)
```

项目入口文件处引入mock

```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './mock/index' // *******************
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

```

# 10.使用 json-server模拟数据

rn项目 cookbook-detail.json

```js
{
	"ret": true,
	"data": {
		"name": "\u5bab\u4fdd\u9e21\u4e01",
		"img": "http:\/\/s3.cdn.xiangha.com\/videoImg\/201510\/1310\/561c71166b43e.jpg\/NjQwX2FiYWNhaXB1MTcxMF9jXzEtM18w",
		"code": "78599088",
		"remark": "",
		"all_click": "1442.2\u4e07",
		"favorites": "13.0\u4e07",
		"info": "\u5bab\u4fdd\u9e21\u4e01\u7684\u7279\u8272\u662f\u8fa3\u4e2d\u6709\u751c\u3001\u751c\u4e2d\u6709\u8fa3\uff1b\u9e21\u8089\u7684\u9c9c\u5ae9\u914d\u5408\u82b1\u751f\u7684\u9999\u8106\uff0c\u5165\u53e3\u9165\u9999\u3001\u7ea2\u800c\u4e0d\u8fa3\u3001\u8fa3\u800c\u4e0d\u731b\u3001\u8089\u8d28\u5ae9\u6ed1\u3002",
		"health_str": "\u9e21\u86cb\uff1a\u6da6\u71e5\u3001\u589e\u5f3a\u514d\u75ab\u529b\u3001\u62a4\u773c\u660e\u76ee\n\u59dc\uff1a\u964d\u9006\u6b62\u5455\u3001\u5316\u75f0\u6b62\u54b3\u3001\u6563\u5bd2\u89e3\u8868\n\u6599\u9152\uff1a\u6d3b\u8840\u5316\u7600",
		"tagIds": "405,406,409,412,413,436,104,356,357,358,364,370,374,384,164,22,31,172,29,140,335,171,324,354,391,355,323,105,1,24,14,327",
		"makes": [{
			"num": "1",
			"info": "\u5c06\u8471\uff0c\u59dc\uff0c\u849c\u5207\u7247\u3002",
			"img": "http:\/\/s1.cdn.jiaonizuocai.com\/caipu\/201510\/2016\/201649122926.jpg\/NjQwX2FiYWNhaXB1MTcxMF9jXzEtM18w",
			"video": []
		}, {
			"num": "2",
			"info": "\u9009\u65b0\u9c9c\u7684\u9e21\u812f\u8089\u5207\u62101cm\u89c1\u65b9\u7684\u5c0f\u5757\uff0c\u52a0\u5165\u80e1\u6912\u7c895\u514b\uff0c\u4e00\u4e2a\u9e21\u86cb\uff0c\u6599\u915210\u514b\uff0c\u6dc0\u7c8920\u514b\uff0c\u6293\u5300\u814c\u523615\u5206\u949f\u5de6\u53f3\u3002",
			"img": "http:\/\/s3.cdn.xiangha.com\/caipu\/201510\/2016\/201649129886.jpg\/NjQwX2FiYWNhaXB1MTcxMF9jXzEtM18w",
			"video": []
		}, {
			"num": "3",
			"info": "\u9505\u5185\u4e0b20\u514b\u8272\u62c9\u6cb9\uff0c\u5927\u706b\u5c06\u6cb9\u70e7\u81f37\u6210\u70ed\uff08\u5373\u6cb9\u9762\u6709\u9752\u70df\u5927\u91cf\u4e0a\u5347\u65f6\u4e3a7\u6210\u70ed\uff09\u653e\u5165\u9e21\u812f\u8089\u4e01\uff0c\u5927\u706b\u7ffb\u7092\uff0c\u5f85\u8089\u8272\u53d1\u767d\uff0c\u8089\u719f\u540e\uff0c\u76db\u51fa\u5907\u7528\u3002",
			"img": "http:\/\/s1.cdn.jiaonizuocai.com\/caipu\/201510\/2016\/201649136562.jpg\/NjQwX2FiYWNhaXB1MTcxMF9jXzEtM18w",
			"video": []
		}, {
			"num": "4",
			"info": "\u9505\u5185\u4e0b15\u514b\u8272\u62c9\u6cb9\uff0c\u5927\u706b\u5c06\u6cb9\u70e7\u81f37\u6210\u70ed\uff08\u5373\u6cb9\u9762\u6709\u9752\u70df\u5927\u91cf\u4e0a\u5347\u65f6\u4e3a7\u6210\u70ed\uff09\u653e\u5165\u5e72\u8fa3\u69128\u514b\uff0c\u8c46\u74e3\u917130\u514b\uff0c\u653e\u5165\u8471\u59dc\u849c\u7247\uff0c\u7206\u51fa\u9999\u5473\uff0c\u7ee7\u7eed\u7ffb\u70922\u5206\u949f\u3002",
			"img": "http:\/\/s1.cdn.jiaonizuocai.com\/caipu\/201510\/2016\/201649143885.jpg\/NjQwX2FiYWNhaXB1MTcxMF9jXzEtM18w",
			"video": []
		}, {
			"num": "5",
			"info": "\u653e\u5165\u6599\u915210\u514b\uff0c\u76d01\u514b\uff0c\u918b5\u514b\uff0c\u767d\u7cd610\u514b\uff0c\u9e21\u7c893\u514b\uff0c\u8001\u62bd10\u514b\uff0c\u751f\u62bd10\u514b\uff0c\u5927\u706b\u7ffb\u7092\u3002\u6b64\u65f6\u653e\u5165\u7092\u597d\u7684\u9e21\u8089\u812f\u4e01\uff0c\u8f6c\u5927\u706b\u7ffb\u7092\u3002",
			"img": "http:\/\/s3.cdn.xiangha.com\/caipu\/201510\/2016\/20164915452.jpg\/NjQwX2FiYWNhaXB1MTcxMF9jXzEtM18w",
			"video": []
		}, {
			"num": "6",
			"info": "\u6700\u540e\u653e\u5165\u6cb9\u70b8\u82b1\u751f\u7c7350\u514b\uff0c\u7ffb\u7092\u5747\u5300\u3002",
			"img": "http:\/\/s1.cdn.jiaonizuocai.com\/caipu\/201510\/2016\/201649157477.jpg\/NjQwX2FiYWNhaXB1MTcxMF9jXzEtM18w",
			"video": []
		}],
		"burden": [{
			"appurl": "",
			"name": "\u9e21\u812f\u8089",
			"content": "250\u514b",
			"type": "1"
		}, {
			"appurl": "\u82b1\u751f",
			"name": "\u82b1\u751f\u7c73",
			"content": "50\u514b",
			"type": "1"
		}, {
			"appurl": "\u9e21\u86cb",
			"name": "\u9e21\u86cb",
			"content": "1\u4e2a",
			"type": "1"
		}, {
			"appurl": "\u5c0f\u8471",
			"name": "\u8471",
			"content": "10\u514b",
			"type": "2"
		}, {
			"appurl": "\u59dc",
			"name": "\u59dc",
			"content": "10\u514b",
			"type": "2"
		}, {
			"appurl": "\u5927\u849c",
			"name": "\u849c",
			"content": "10\u514b",
			"type": "2"
		}, {
			"appurl": "\u5e72\u8fa3\u6912",
			"name": "\u5e72\u8fa3\u6912",
			"content": "8\u514b",
			"type": "2"
		}, {
			"appurl": "\u82b1\u6912",
			"name": "\u82b1\u6912",
			"content": "5\u7c92",
			"type": "2"
		}, {
			"appurl": "\u8c46\u74e3\u9171",
			"name": "\u8c46\u74e3\u9171",
			"content": "30\u514b",
			"type": "2"
		}, {
			"appurl": "",
			"name": "\u76d0",
			"content": "2\u514b",
			"type": "2"
		}, {
			"appurl": "",
			"name": "\u751f\u62bd",
			"content": "10\u514b",
			"type": "2"
		}, {
			"appurl": "",
			"name": "\u8001\u62bd",
			"content": "10\u514b",
			"type": "2"
		}, {
			"appurl": "\u6599\u9152",
			"name": "\u6599\u9152",
			"content": "20\u514b",
			"type": "2"
		}, {
			"appurl": "\u6dc0\u7c89",
			"name": "\u6dc0\u7c89",
			"content": "20\u514b",
			"type": "2"
		}, {
			"appurl": "",
			"name": "\u9e21\u7c89",
			"content": "3\u514b",
			"type": "2"
		}, {
			"appurl": "\u80e1\u6912\u7c89",
			"name": "\u80e1\u6912\u7c89",
			"content": "5\u514b",
			"type": "2"
		}, {
			"appurl": "\u767d\u7cd6",
			"name": "\u767d\u7cd6",
			"content": "10\u514b",
			"type": "2"
		}, {
			"appurl": "\u918b",
			"name": "\u918b",
			"content": "5\u514b",
			"type": "2"
		}],
		"rec": [],
		"is_collection": 1,
		"share_img": "http:\/\/s3.cdn.xiangha.com\/videoImg\/201510\/1310\/561c71166b43e.jpg\/MjUwX2FiYWNhaXB1MTcxMF9jXzEtM18w"
	},
	"append": [],
	"res": "2"
}
```

mock.js

```
module.exports = function() {
  return {
    detail: require('./cookbook-detail.json')
  }
}
```

```
json-server mock.js

```

# 11.使用在线模拟数据的工具

http://rap2.taobao.org/



![](img/1.png)



