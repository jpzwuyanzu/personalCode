## 安装

```
npm install itqf-tools
```

## 导入

```js
const itqf = require('itqf-tools')
```

## 格式化时间

```js
// 调用 dataFormat 格式化时间
const dt = itqf.dataFormat(new Date())
//转换结果
console.log(dt)
```

## 转译HTML中的特殊字符

```js
// 定义需要转换的HTML字符串
const htmlStr = '<h1 title="name">这里是h1<span>这里是span标签span></h1>';
//调用 htmlEscape 方法进行转换
const str = itqf.htmlEscape(htmlStr)
// 转换结果 &lt;h1 title=&quot;name&quot;&gt;这里是h1&lt;span&gt;这里是span标签&lt;/span&gt;&lt;/h1&gt;
console.log(str)
```

## 还原HTML中的特殊字符

```js
// 定义需要转换的HTML字符串
const htmlStr = '&lt;h1 title=&quot;name&quot;&gt;这里是h1&lt;span&gt;这里是span标签&lt;/span&gt;&lt;/h1&gt;';
//调用 htmlUnEscape 方法进行转换
const str2 = itqf.htmlUnEscape(str)
// 转换结果 <h1 title="name">这里是h1<span>这里是span标签span></h1>
console.log(str2)
```

## 开源协议

ISC