### hybrid介绍

#### 1，混合开发 （原生语言+javascript开发模式）

* 1.1 原生语言: 

* * android: kotlin, java 开源 ---安装包后缀名 .apk

* * ios: swift , c++ 以前的ios是闭源，swift是半开半闭  ---安装包后缀 .ipa

* * windows phone: c#

* 1.2 常用的术语

* * hybird 混合开发
* * native 原生开发
* * webapp js开发

* *  apiCloud/uniapp/react-native等技术都属于混合开发

#### 2，android+js开发模式

* 2.1 准备工作: 

* * 下载并安装java jdk， 配置环境变量
* * 下载并安装android studio
* * 安装android 的sdk，配置环境变量
* * 创建android的模拟器，或者是安卓手机

* 2.2 创建项目

* 2.3 package name 

* * 应用的包名称

* * 每个应用都有一个唯一的标识，就是packagename

* * package name 可以作为应用升级的依据 ，如果看似两个不同的项目，如果包名相同，后来的那个会替换掉前面的包

* * package name 推送的依据


* 2.2 通过webView（实际上是一个浏览器）来内嵌H5页面


#### 3,加载网页url


#### 4，原生和H5之间通信

js无法调用系统功能，可以由android定义好，由js调用

js调用安卓的方法 需要android将方法挂在window对象上由前端来调用

andriod调用前端的方法，需要通过js-bridge实现，在前端定义方法







