# 1， mock介绍  http://mockjs.com/examples.html

## 优点： 

* 前后端分离
* 让前端攻城师独立于后端进行开发。

* 增加单元测试的真实性
* 通过随机数据，模拟各种场景。
	
* 开发无侵入
* 不需要修改既有代码，就可以拦截 Ajax 请求，返回模拟的响应数据。

* 用法简单
* 符合直觉的接口。

* 数据类型丰富
* 支持生成随机的文本、数字、布尔值、日期、邮箱、链接、图片、颜色等。

* 方便扩展
* 支持支持扩展更多数据类型，支持自定义函数和正则。

# 2，安装mock

npm install mockjs

# 3， 数据语法规范

* 数据模板定义规范（Data Template Definition，DTD）
* 数据占位符定义规范（Data Placeholder Definition，DPD）


* 1 ，数据模板中的每个属性由 3 部分构成：属性名、生成规则、属性值：

// 属性名   name
// 生成规则 rule
// 属性值   value
'name|rule': value

* 属性名 和 生成规则 之间用竖线 | 分隔。
* 生成规则 是可选的。
* 生成规则 有 7 种格式：
'name|min-max': value     最少随机在min-max之间
'name|count': value       生成count条数据
'name|min-max.dmin-dmax': value   生成一个浮点数，整数部分大于等于 min、小于等于 max，小数部分保留 dmin 到 dmax 位
'name|min-max.dcount': value 小数点保留dcount位
'name|count.dmin-dmax': value 生成count条，小数点保留位数
'name|count.dcount': value  生成count条，小数点保留dcount位
'name|+step': value   属性值自动加 step，初始值为 value


