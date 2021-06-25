# 1.准备工作

申请服务器：https://www.aliyun.com/product/ecs?spm=5176.19720258.J_8058803260.30.e9392c4aCt0WCn

下载资源：finalshell   http://www.hostbuf.com/t/988.html

 xShell

# 2.服务器重装系统

登录阿里云后台，找到服务器的实例，点击管理，停止服务器，选择右上角 -》全部操作 - 》云盘与镜像 -》更换操作系统

镜像： centos  8.2 64位

安全设置： 自定义密码



获取到 服务器公网的IP地址： 47.103.82.2（公）



# 3.连接服务器

打开finalshell，点击 添加服务器，选择 ssh 连接

名称： 随意就好

主机： 服务器的公网IP地址

用户名： root

密码： 自定义密码



选择 你添加服务器，双击666即可，接受并且保存密码, 出现光标即为正常连接了服务器



# 4.安装nginx

**什么是**Nginx **？** 

Nginx 是俄罗斯人 Igor Sysoev 编写的轻量级Web服务器，它的发音为 [ˈendʒɪnks] ，它不仅是一个

高性能的 HTTP 和反向代理服务器，同时也是一个 IMAP/POP3/SMTP 代理服务器。

事实上nginx的并发能力确实在同类型的网页服务器中表现较好，中国大陆使用nginx网站用户有：百度、京东、新浪、网易、腾讯、淘宝等。

Nginx 以事件驱动的方式编写，所以有非常好的性能，同时也是一个非常高效的反向代理、负载均衡服

务器。在性能上， Nginx 占用很少的系统资源，能支持更多的并发连接，达到更高的访问效率；在功能

上， Nginx 是优秀的代理服务器和负载均衡服务器；在安装配置上， Nginx 安装简单、配置灵活。

Nginx 支持热部署，启动速度特别快，还可以在不间断服务的情况下对软件版本或配置进行升级，即使

运行数月也无需重新启动。

Nginx 可以作为一个 HTTP 服务器进行网站的发布处理，另外 Nginx 可以作为反向代理进行负载均衡

的实现。

![](img/1.png)

Nginx **能做什么？**

正向代理

反向代理

负载均衡

HTTP服务器（包含动静分离）

## 4.1 安装nginx

```bash
$ yum install -y nginx
```

## 4.2 设置nginx开机启动

```bash
$ systemctl start nginx.service
$ systemctl enable nginx.service
```

浏览器中输入公网ip地址，出现如下界面代表nginx已经安装成功

![](img/2.png)

如果出现如下页面，也不要着急

![](img/3.png)

## 4.3 给服务器的安全组添加需要使用的端口号

<img src="img/4.png" style="zoom:25%;" />

![](img/5.png)

![](img/6.png)

考虑到本地服务器资源为3001（视自己的端口号而定）

![](img/7.png)

## 4.4查看nginx默认的web文件位置

```bash
$ cd /usr/share/nginx/html
```

以后就可以把资源文件上传到此处

test/index.html

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
	</head>
	<body>
		第一个html文件
	</body>
</html>

```

可以拖动 test 文件夹至此目录

![](img/8.png)

# 5.服务器安装node环境

使用nvm安装多版本的node

NVM（Node Version Manager）是Node.js的版本管理软件，使您可以轻松在Node.js各个版本间进行切换。适用于长期做 node 开发的人员或有快速更新node版本、快速切换node版本的场景。

使用git将源码克隆到本地的~/.nvm目录下，并检查最新版本。



## 5.1 安装git

```bash
$ yum install git
$ y
```

## 5.2 安装nvm

```bash
$ git clone https://github.com/cnpm/nvm.git ~/.nvm && cd ~/.nvm && git checkout git describe --abbrev=0 --tags
```

## 5.3 激活NVM

```bash
$ echo ". ~/.nvm/nvm.sh" >> /etc/profile

$ source /etc/profile
```

## 5.4 查看可用的node版本

```base
$ nvm list-remote
```

## 5.5 安装自己需要的版本

```bash
$ nvm install v12.18.3

$ nvm install v15.4.0
```

## 5.6 运行nvm ls查看已安装的Node.js版本

```bash
$ nvm ls

```

## 5.7 切换版本

```bash
$ nvm use 12.18.3
```

# 6.上传自己的node项目

## 6.1 删除本地项目的node_modules文件夹

```bash
$ cd /usr/local/src/

拖动上传的项目

$ cd jdd-admin-api

$ npm i

$ npm start
```

输入 http://47.103.82.2:3001/ 查看效果

![](img/9.png)

此时如果不去操作带有数据库的地址，没有问题，但是如果需要有数据库支持的，就会遇到问题



如果关闭窗口或者停掉服务器时，网址则不可以继续访问

## 6.2服务器长期可用 --- pm2

```bash
$ npm i pm2 -g

$ cd /usr/local/src/jdd-admin-api (如果就在当前目录下可以省略)

$ pm2 start ./bin/www --name=sz-gp-4


```

![](img/10.png)

**注意：如果以后再次进入该目录，使用pm2时 如果报 未找到命令，执行 `nvm use 12.18.3`,再继续操作**

关闭当前服务器下所有的 自定义服务器

```bash
$ pm2 stop all
```

![](img/11.png)

# 7.服务器安装 数据库 mongodb

## 7.1 安装并且处理

```bash
$ cd /usr/local
$ wget http://fastdl.mongodb.org/linux/mongodb-linux-x86_64-4.0.9.tgz
$ ls
$ tar zxvf mongodb-linux-x86_64-4.0.9.tgz  解压压缩包
$ rm -rf mongodb-linux-x86_64-4.0.9.tgz   删除压缩包
$ mv mongodb-linux-x86_64-4.0.9 mongodb   重命名
```

![](img/12.png)

## 7.2 配置mongodb的目录

在var文件夹里建立mongodb文件夹，并分别建立文件夹data用于存放数据，logs用于存放日志

```bash
$ cd /var
$ mkdir mongodb
$ ls
$ cd mongodb
$ mkdir data logs

```

![](img/13.png)

## 7.3 设置mongodb开机启动

```bash
$ cd /etc/rc.d
```

双击 rc.local文件（下载），

末尾添加如下代码：

```bash
$ /usr/local/mongodb/bin/mongod --dbpath=/var/mongodb/data --logpath /var/mongodb/logs/log.log -fork

```

保存 再次双击打开，如果以上代码存在 说明ok

![](img/14.png)

## 7.4 启动mongodb

```bash
$ cd /usr/local/mongodb/bin

$ ./mongod --dbpath=/var/mongodb/data --logpath /var/mongodb/logs/log.log -fork

```

![](img/15.png)

## 7.5 测试数据库相关指令

```bash
$ cd /usr/local/mongodb/bin

$ ./mongo


$ show dbs

```

## 7.6 重新打开node项目

```bash
$ cd /usr/local/src/jdd-admin-api

$ npm run start   (项目中查看数据库是否连接)
```

![](img/16.png)

## 7.7 将超级管理员的账户直接插入数据库

Utils/test.js

```js
const bcrypt = require('bcrypt')
const Admin = require('./../sql/models/Admin')
const sql = require('./../sql')
const utils = require('./index')
const saltRounds = 10

bcrypt.hash('haigou123321', saltRounds, (err, data) => {
  console.log(data)
  sql.insert(Admin, {
    adminid: 'admin_' + utils.getUuid(),
    adminname: 'admin',
    password: data,
    role: 2,
    checkedKeys: []
  }).then(() => {
    console.log('插入超级管理员成功')
  })
})
```

将本地的文件上传至服务器下

```bash
$ pm2 start ./bin/www --name=sz-gp-04
```

![](img/17.png)

# 8.react项目上线

## 8.1 打包react项目 https://www.html.cn/create-react-app/docs/deployment/

修改本地的代码 src/App.js

```js
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
```

修改 package.json文件，将打包引入的路径改成 相对路径（默认是绝对路径）

```json
"homepage": "."
```

修改本地的代码 src/utils/request.js

```js
const request = axios.create({
  baseURL: isDev ? '' : 'http://47.103.82.2:3001/api'
})
```

```bash
$ yarn build
```

## 8.2 上传项目

将打包出来的build的文件夹(可以修改名称为haigou)的内容上传到node项目中的public目录内部

http://47.103.82.2:3001/haigou

登录

http://47.103.82.2:3001/api/pro/uploadProduct   上传了商品数据



## 8.3 将以下数据插入到数据库中

```bash
$ cd /usr/local/mongodb/bin

$ ./mongodb

$ use sz-gp-4

$ db.navlists.insert(下面的数据)
```

```js
[
  {
    "categoryid": 42,
    "categoryname": "热门推荐M",
    "titleImg": "https://m.360buyimg.com/mobilecms/jfs/t19375/228/2147833578/3539/56b9e876/5ae95f90N06fb6b8e.png",
    "navid": 579,
    "name": "拼购",
    "icon": "https://m.360buyimg.com/mobilecms/s80x80_jfs/t1/110682/29/897/4880/5e7344b3E8fb10394/9c44e06113d83d21.png",
    "jump": "https://wq.jd.com/webportal/event/27317"
  },
  {
    "categoryid": 42,
    "categoryname": "热门推荐M",
    "titleImg": "https://m.360buyimg.com/mobilecms/jfs/t19375/228/2147833578/3539/56b9e876/5ae95f90N06fb6b8e.png",
    "navid": 572,
    "name": "闪购",
    "icon": "https://m.360buyimg.com/mobilecms/s80x80_jfs/t18802/237/1502687907/7460/2f227c66/5acc51efN1dae98b2.png",
    "jump": "https://wqs.jd.com/portal/wx/seckill_m/brand.shtml"
  },
  {
    "categoryid": 42,
    "categoryname": "热门推荐M",
    "titleImg": "https://m.360buyimg.com/mobilecms/jfs/t19375/228/2147833578/3539/56b9e876/5ae95f90N06fb6b8e.png",
    "navid": 570,
    "name": "5G时代",
    "icon": "https://m.360buyimg.com/mobilecms/s80x80_jfs/t1/72208/35/9347/2600/5d70c50eE77b85cdb/7b6a9fec1067db06.png",
    "jump": "https://prodev.m.jd.com/wq/active/3V2EuUWyrHbEegRC8WqousEuUHrj/index.html"
  },
  {
    "categoryid": 42,
    "categoryname": "热门推荐M",
    "titleImg": "https://m.360buyimg.com/mobilecms/jfs/t19375/228/2147833578/3539/56b9e876/5ae95f90N06fb6b8e.png",
    "navid": 810,
    "name": "唯品会",
    "icon": "https://m.360buyimg.com/mobilecms/s80x80_jfs/t1/106342/37/16553/4901/5e7cc859E4a33be03/f52cec80c8dc344d.png",
    "jump": "https://pro.m.jd.com/mall/active/2aiozXgZK1PUVZA37WNq62KLtjcC/index.html"
  },
  {
    "categoryid": 42,
    "categoryname": "热门推荐M",
    "titleImg": "https://m.360buyimg.com/mobilecms/jfs/t19375/228/2147833578/3539/56b9e876/5ae95f90N06fb6b8e.png",
    "navid": 759,
    "name": "9块9",
    "icon": "https://m.360buyimg.com/mobilecms/s80x80_jfs/t17422/194/2017793180/12782/83f66fd3/5ae13830N1e98ef9c.png",
    "jump": "https://pro.m.jd.com/mall/active/2iUGdzW1FjRDy6zdQoZ55jiyPt1V/index.html?from=jdhy"
  },
  {
    "categoryid": 38,
    "categoryname": "3C专区",
    "titleImg": "https://m.360buyimg.com/mobilecms/jfs/t18223/34/1754855975/5488/9ffacd82/5ad8000aNdfd98f23.png",
    "navid": 588,
    "name": "手机馆",
    "icon": "https://m.360buyimg.com/mobilecms/s80x80_jfs/t18859/148/1985801887/5540/79c57f95/5ae0605bN31eb138b.png",
    "jump": "https://pro.m.jd.com/mall/active/Y9FVe619hMoajzqpxky1CQQJAkk/index.html"
  },
  {
    "categoryid": 38,
    "categoryname": "3C专区",
    "titleImg": "https://m.360buyimg.com/mobilecms/jfs/t18223/34/1754855975/5488/9ffacd82/5ad8000aNdfd98f23.png",
    "navid": 587,
    "name": "玩3C",
    "icon": "https://m.360buyimg.com/mobilecms/s80x80_jfs/t18376/164/1541644268/6421/ead422d3/5acdae58N63f7e1dd.jpg",
    "jump": "https://pro.m.jd.com/mall/active/3JAoyewPmdVBMeRWTBiHDdGH5M36/index.html"
  },
  {
    "categoryid": 38,
    "categoryname": "3C专区",
    "titleImg": "https://m.360buyimg.com/mobilecms/jfs/t18223/34/1754855975/5488/9ffacd82/5ad8000aNdfd98f23.png",
    "navid": 589,
    "name": "京东家电",
    "icon": "https://m.360buyimg.com/mobilecms/s80x80_jfs/t19129/11/1997624184/4584/f1b38046/5ae06098N0fd3a5ac.png",
    "jump": "https://pro.m.jd.com/mall/active/48v7Xzb3FfKt6mKgMaS9EoHrvieE/index.html"
  },
  {
    "categoryid": 38,
    "categoryname": "3C专区",
    "titleImg": "https://m.360buyimg.com/mobilecms/jfs/t18223/34/1754855975/5488/9ffacd82/5ad8000aNdfd98f23.png",
    "navid": 636,
    "name": "电脑办公",
    "icon": "https://m.360buyimg.com/mobilecms/s80x80_jfs/t18301/164/2005078858/4649/c7d7540e/5ae062baN937b5e1d.png",
    "jump": "https://pro.m.jd.com/mall/active/31XPWPTonxJ9e5YoQ85HS7z8XNYQ/index.html"
  },
  {
    "categoryid": 38,
    "categoryname": "3C专区",
    "titleImg": "https://m.360buyimg.com/mobilecms/jfs/t18223/34/1754855975/5488/9ffacd82/5ad8000aNdfd98f23.png",
    "navid": 1019,
    "name": "拍拍验机",
    "icon": "https://m.360buyimg.com/mobilecms/s80x80_jfs/t1/78894/12/9054/6394/5d6e250aE019a121d/d746e2ad3f4d07cc.png",
    "jump": "https://paipai.m.jd.com/direct/?entryid=p005ppyj0jdapp5"
  },
  {
    "categoryid": 38,
    "categoryname": "3C专区",
    "titleImg": "https://m.360buyimg.com/mobilecms/jfs/t18223/34/1754855975/5488/9ffacd82/5ad8000aNdfd98f23.png",
    "navid": 1020,
    "name": "拍拍回收",
    "icon": "https://m.360buyimg.com/mobilecms/s80x80_jfs/t23398/266/591438711/7785/2e4fc95e/5b38409fN0192ac56.png",
    "jump": "https://huishou.m.jd.com/index"
  },
  {
    "categoryid": 39,
    "categoryname": "超市生活",
    "titleImg": "https://m.360buyimg.com/mobilecms/jfs/t18631/61/1776041327/5928/de57170f/5ad80054Ndbc865ec.png",
    "navid": 594,
    "name": "京东超市",
    "icon": "https://m.360buyimg.com/mobilecms/s80x80_jfs/t17749/340/1545725508/7727/738cd479/5acdb885N66a4aec2.png",
    "jump": "https://pro.m.jd.com/mall/active/WDFXanZGBTUPMcNicUEZ8q8nhRF/index.html"
  },
  {
    "categoryid": 39,
    "categoryname": "超市生活",
    "titleImg": "https://m.360buyimg.com/mobilecms/jfs/t18631/61/1776041327/5928/de57170f/5ad80054Ndbc865ec.png",
    "navid": 599,
    "name": "沃尔玛",
    "icon": "https://m.360buyimg.com/mobilecms/s80x80_jfs/t1/87664/20/16561/5314/5e7cc946E7e532dff/678c6520e0d3059b.png",
    "jump": "https://pro.m.jd.com/mall/active/3d34Pm49obpjLEdhhagSZuM5QrwC/index.html"
  },
  {
    "categoryid": 39,
    "categoryname": "超市生活",
    "titleImg": "https://m.360buyimg.com/mobilecms/jfs/t18631/61/1776041327/5928/de57170f/5ad80054Ndbc865ec.png",
    "navid": 600,
    "name": "山姆店",
    "icon": "https://m.360buyimg.com/mobilecms/s80x80_jfs/t18703/92/1540811278/7831/b08d3a2f/5acdb954Na451ebe3.png",
    "jump": "https://shop.m.jd.com/?shopId=598847"
  },
  {
    "categoryid": 39,
    "categoryname": "超市生活",
    "titleImg": "https://m.360buyimg.com/mobilecms/jfs/t18631/61/1776041327/5928/de57170f/5ad80054Ndbc865ec.png",
    "navid": 601,
    "name": "图书音像",
    "icon": "https://m.360buyimg.com/mobilecms/s80x80_jfs/t19120/326/2015194654/5703/bb2c7da9/5ae060d7N7a921d20.png",
    "jump": "https://pro.m.jd.com/mall/active/3u1Q7ZjCfQKrRb52c623WNf3Cjz5/index.html"
  },
  {
    "categoryid": 39,
    "categoryname": "超市生活",
    "titleImg": "https://m.360buyimg.com/mobilecms/jfs/t18631/61/1776041327/5928/de57170f/5ad80054Ndbc865ec.png",
    "navid": 603,
    "name": "美食城",
    "icon": "https://m.360buyimg.com/mobilecms/s80x80_jfs/t19510/99/1997173036/5986/e640aaee/5ae06136N2f38f602.png",
    "jump": "https://pro.m.jd.com/mall/active/46s9NeY97sZFwvirKh1w69xMJfjs/index.html"
  },
  {
    "categoryid": 39,
    "categoryname": "超市生活",
    "titleImg": "https://m.360buyimg.com/mobilecms/jfs/t18631/61/1776041327/5928/de57170f/5ad80054Ndbc865ec.png",
    "navid": 605,
    "name": "中外名酒",
    "icon": "https://m.360buyimg.com/mobilecms/s80x80_jfs/t19684/90/2029898820/5560/748cfaf1/5ae06148Nfde7d99c.png",
    "jump": "https://pro.m.jd.com/mall/active/zGwAUzL3pVGjptBBGeYfpKjYdtX/index.html"
  },
  {
    "categoryid": 39,
    "categoryname": "超市生活",
    "titleImg": "https://m.360buyimg.com/mobilecms/jfs/t18631/61/1776041327/5928/de57170f/5ad80054Ndbc865ec.png",
    "navid": 606,
    "name": "爱美丽",
    "icon": "https://m.360buyimg.com/mobilecms/s80x80_jfs/t17569/222/1962890348/5757/a9d42ee3/5ae06168N529944f3.png",
    "jump": "https://pro.m.jd.com/mall/active/2kmaPNrGDNYo1LKwYtRoaSmsgbj6/index.html"
  },
  {
    "categoryid": 39,
    "categoryname": "超市生活",
    "titleImg": "https://m.360buyimg.com/mobilecms/jfs/t18631/61/1776041327/5928/de57170f/5ad80054Ndbc865ec.png",
    "navid": 608,
    "name": "个护清洁",
    "icon": "https://m.360buyimg.com/mobilecms/s80x80_jfs/t17443/206/2024826859/5801/907d0843/5ae06199Nd92cdfe3.png",
    "jump": "https://pro.m.jd.com/mall/active/icTjaGCfgvk53N36uZFX7WLBoTK/index.html"
  },
  {
    "categoryid": 39,
    "categoryname": "超市生活",
    "titleImg": "https://m.360buyimg.com/mobilecms/jfs/t18631/61/1776041327/5928/de57170f/5ad80054Ndbc865ec.png",
    "navid": 609,
    "name": "爱家",
    "icon": "https://m.360buyimg.com/mobilecms/s80x80_jfs/t19744/311/2046639069/6087/71926b4c/5ae061b2Nd8c5e06b.png",
    "jump": "https://pro.m.jd.com/mall/active/3ERYagkof4iRKmjzVYcxUE7tM8L8/index.html"
  },
  {
    "categoryid": 39,
    "categoryname": "超市生活",
    "titleImg": "https://m.360buyimg.com/mobilecms/jfs/t18631/61/1776041327/5928/de57170f/5ad80054Ndbc865ec.png",
    "navid": 610,
    "name": "家装城",
    "icon": "https://m.360buyimg.com/mobilecms/s80x80_jfs/t20113/188/1953566/6389/fae1eb1/5ae061a5Nf8b362d4.png",
    "jump": "https://pro.m.jd.com/mall/active/387eAn8NbK2b52rdJyJSGA3xpQdT/index.html"
  },
  {
    "categoryid": 39,
    "categoryname": "超市生活",
    "titleImg": "https://m.360buyimg.com/mobilecms/jfs/t18631/61/1776041327/5928/de57170f/5ad80054Ndbc865ec.png",
    "navid": 614,
    "name": "童装馆",
    "icon": "https://m.360buyimg.com/mobilecms/s80x80_jfs/t18757/157/2047065647/5924/3026c3b/5ae061daNf4cc5db7.png",
    "jump": "https://pro.m.jd.com/mall/active/3Af6mZNcf5m795T8dtDVfDwWVNhJ/index.html"
  },
  {
    "categoryid": 39,
    "categoryname": "超市生活",
    "titleImg": "https://m.360buyimg.com/mobilecms/jfs/t18631/61/1776041327/5928/de57170f/5ad80054Ndbc865ec.png",
    "navid": 615,
    "name": "医药保健",
    "icon": "https://m.360buyimg.com/mobilecms/s80x80_jfs/t17503/161/2020273116/5362/51b17c82/5ae061e7N7d13ae46.png",
    "jump": "https://pro.m.jd.com/mall/active/35wTxmGnuC8nLyUmNWA2sKqdmcfo/index.html"
  },
  {
    "categoryid": 39,
    "categoryname": "超市生活",
    "titleImg": "https://m.360buyimg.com/mobilecms/jfs/t18631/61/1776041327/5928/de57170f/5ad80054Ndbc865ec.png",
    "navid": 617,
    "name": "大药房",
    "icon": "https://m.360buyimg.com/mobilecms/s80x80_jfs/t18721/355/1552352057/6451/aac83cfe/5acdbbe8Ndb0625c4.png",
    "jump": "https://pro.m.jd.com/mall/active/2btYJRGQbBERp23M6aXGwm1tve3X/index.html"
  },
  {
    "categoryid": 39,
    "categoryname": "超市生活",
    "titleImg": "https://m.360buyimg.com/mobilecms/jfs/t18631/61/1776041327/5928/de57170f/5ad80054Ndbc865ec.png",
    "navid": 618,
    "name": "汽车用品",
    "icon": "https://m.360buyimg.com/mobilecms/s80x80_jfs/t19726/325/2005987992/6401/2075e896/5ae06206N8412b247.png",
    "jump": "https://pro.m.jd.com/mall/active/2X7RWsf6YroLanMXGz6Z8p3W9jjV/index.html"
  },
  {
    "categoryid": 39,
    "categoryname": "超市生活",
    "titleImg": "https://m.360buyimg.com/mobilecms/jfs/t18631/61/1776041327/5928/de57170f/5ad80054Ndbc865ec.png",
    "navid": 619,
    "name": "爱车生活",
    "icon": "https://m.360buyimg.com/mobilecms/s80x80_jfs/t16603/270/2022426636/7650/199cf9bd/5ae06211N55458fb6.png",
    "jump": "https://pro.m.jd.com/mall/active/dj6us2JJRLMMBb4iDaSK4wxvBMt/index.html"
  },
  {
    "categoryid": 39,
    "categoryname": "超市生活",
    "titleImg": "https://m.360buyimg.com/mobilecms/jfs/t18631/61/1776041327/5928/de57170f/5ad80054Ndbc865ec.png",
    "navid": 1067,
    "name": "工业品",
    "icon": "https://m.360buyimg.com/mobilecms/s80x80_jfs/t1/11450/28/11433/7104/5c889da6Ebb724d42/0a53d60ab3603557.png",
    "jump": "https://pro.m.jd.com/mall/active/4RYbb8NtVAegmT35SuM2N3KKYLWt/index.html"
  },
  {
    "categoryid": 39,
    "categoryname": "超市生活",
    "titleImg": "https://m.360buyimg.com/mobilecms/jfs/t18631/61/1776041327/5928/de57170f/5ad80054Ndbc865ec.png",
    "navid": 873,
    "name": "京东汽车",
    "icon": "https://m.360buyimg.com/mobilecms/s80x80_jfs/t1/3314/29/6094/7416/5ba20dbeE93e7cc02/10349aa463525de5.png",
    "jump": "https://pro.m.jd.com/mall/active/7buZFEUJouLZZywhvvRWkGNSRMS/index.html"
  },
  {
    "categoryid": 43,
    "categoryname": "时尚穿搭",
    "titleImg": "https://m.360buyimg.com/mobilecms/jfs/t1/42344/26/83/3342/5cc04b47E6adaaf2d/294f1bc4298b752f.jpg",
    "navid": 620,
    "name": "服装馆",
    "icon": "https://m.360buyimg.com/mobilecms/s80x80_jfs/t16741/258/1541877121/7017/6e03894b/5acdc628Nf7d6f780.png",
    "jump": "https://pro.m.jd.com/mall/active/3GTca2WsjgRdohGtJCUnWB3bDs8o/index.html"
  },
  {
    "categoryid": 43,
    "categoryname": "时尚穿搭",
    "titleImg": "https://m.360buyimg.com/mobilecms/jfs/t1/42344/26/83/3342/5cc04b47E6adaaf2d/294f1bc4298b752f.jpg",
    "navid": 622,
    "name": "女装馆",
    "icon": "https://m.360buyimg.com/mobilecms/s80x80_jfs/t18544/26/1952502036/6690/15b4ae4c/5ae06227N98bd13c4.png",
    "jump": "https://pro.m.jd.com/mall/active/DpSh7ma8JV7QAxSE2gJNro8Q2h9/index.html"
  },
  {
    "categoryid": 43,
    "categoryname": "时尚穿搭",
    "titleImg": "https://m.360buyimg.com/mobilecms/jfs/t1/42344/26/83/3342/5cc04b47E6adaaf2d/294f1bc4298b752f.jpg",
    "navid": 623,
    "name": "鞋靴箱包",
    "icon": "https://m.360buyimg.com/mobilecms/s80x80_jfs/t17989/84/2013323368/7072/e0a973da/5ae06232Nab1597b5.png",
    "jump": "https://pro.m.jd.com/mall/active/B5nbBHuCjfNkWN1nocNkawR2E8N/index.html"
  },
  {
    "categoryid": 43,
    "categoryname": "时尚穿搭",
    "titleImg": "https://m.360buyimg.com/mobilecms/jfs/t1/42344/26/83/3342/5cc04b47E6adaaf2d/294f1bc4298b752f.jpg",
    "navid": 624,
    "name": "内衣馆",
    "icon": "https://m.360buyimg.com/mobilecms/s80x80_jfs/t19102/69/1987169084/6757/e53b7760/5ae06242Nc044c906.png",
    "jump": "https://pro.m.jd.com/mall/active/4PgpL1xqPSW1sVXCJ3xopDbB1f69/index.html"
  },
  {
    "categoryid": 43,
    "categoryname": "时尚穿搭",
    "titleImg": "https://m.360buyimg.com/mobilecms/jfs/t1/42344/26/83/3342/5cc04b47E6adaaf2d/294f1bc4298b752f.jpg",
    "navid": 626,
    "name": "运动户外",
    "icon": "https://m.360buyimg.com/mobilecms/s80x80_jfs/t19957/358/3216993/6100/3abf816a/5ae06259N29275358.png",
    "jump": "https://pro.m.jd.com/mall/active/oKAAQpTfmbKWmL338JdgxNDeWK2/index.html"
  },
  {
    "categoryid": 43,
    "categoryname": "时尚穿搭",
    "titleImg": "https://m.360buyimg.com/mobilecms/jfs/t1/42344/26/83/3342/5cc04b47E6adaaf2d/294f1bc4298b752f.jpg",
    "navid": 628,
    "name": "珠宝首饰",
    "icon": "https://m.360buyimg.com/mobilecms/s80x80_jfs/t19948/66/3191014/6800/7429b1fd/5ae0629dN6ea95c15.png",
    "jump": "https://pro.m.jd.com/mall/active/zHUHpTHNTaztSRfNBFNVZscyFZU/index.html"
  },
  {
    "categoryid": 43,
    "categoryname": "时尚穿搭",
    "titleImg": "https://m.360buyimg.com/mobilecms/jfs/t1/42344/26/83/3342/5cc04b47E6adaaf2d/294f1bc4298b752f.jpg",
    "navid": 621,
    "name": "男装馆",
    "icon": "https://m.360buyimg.com/mobilecms/s80x80_jfs/t17803/169/1530358935/12101/d01c64c8/5acdc644N509e3ae3.png",
    "jump": "https://pro.m.jd.com/mall/active/32EphPL81Mb6FD4qLCTtYmd31YXr/index.html"
  },
  {
    "categoryid": 43,
    "categoryname": "时尚穿搭",
    "titleImg": "https://m.360buyimg.com/mobilecms/jfs/t1/42344/26/83/3342/5cc04b47E6adaaf2d/294f1bc4298b752f.jpg",
    "navid": 629,
    "name": "钟表馆",
    "icon": "https://m.360buyimg.com/mobilecms/s80x80_jfs/t18856/164/2014839175/6910/a31444be/5ae062a8N64914ce2.png",
    "jump": "https://pro.m.jd.com/mall/active/2BcJPCVVzMEtMUynXkPscCSsx68W/index.html"
  },
  {
    "categoryid": 41,
    "categoryname": "特色频道",
    "titleImg": "https://m.360buyimg.com/mobilecms/jfs/t19456/19/1745795307/6112/d391b68d/5ad8002cN28a96e4a.png",
    "navid": 630,
    "name": "京东拍卖",
    "icon": "https://m.360buyimg.com/mobilecms/s80x80_jfs/t18079/183/1510693228/11548/45734eb3/5acdcd69N09472720.png",
    "jump": "https://mauction.jd.com/home.html"
  },
  {
    "categoryid": 41,
    "categoryname": "特色频道",
    "titleImg": "https://m.360buyimg.com/mobilecms/jfs/t19456/19/1745795307/6112/d391b68d/5ad8002cN28a96e4a.png",
    "navid": 631,
    "name": "京东智能",
    "icon": "https://m.360buyimg.com/mobilecms/s80x80_jfs/t17968/290/1529570480/6438/33c45b16/5acdcda6Nc6a0a289.png",
    "jump": "https://pro.m.jd.com/mall/active/KcfFqWvhb5hHtaQkS4SD1UU6RcQ/index.html?utm_source=pdappwakeupup_20170001"
  },
  {
    "categoryid": 41,
    "categoryname": "特色频道",
    "titleImg": "https://m.360buyimg.com/mobilecms/jfs/t19456/19/1745795307/6112/d391b68d/5ad8002cN28a96e4a.png",
    "navid": 1050,
    "name": "彩票",
    "icon": "https://m.360buyimg.com/mobilecms/s80x80_jfs/t16855/264/1777290411/12102/e339fc7/5ad88e8aNda959270.png",
    "jump": "https://caipiao.m.jd.com"
  }
]

```

## 8.4 继续验证项目



# 9.如果想要去除端口号访问呢

通过nginx的代理实现

```bash
$ cd /etc/nginx
```

![](img/18.png)

双击666

![](img/19.png)

修改完配置文件一定要记得重启nginx服务器

```bash
$ /sbin/nginx -s reload
```

去除端口号再运行项目，发现问题，重新打包上传项目

![](img/20.png)

![](img/21.png)

# 10.使用域名代替公网ip地址

<img src="img/22.png" style="zoom:25%;" />

![](img/23.png)

![](img/24.png)

之后就可以使用域名代替公网Ip地址，记得更新数据请求地址并且上传

![](img/25.png)

![](img/26.png)

# 11.使用https服务器

小程序要求必须使用https类型的服务器

https://common-buy.aliyun.com/?spm=5176.100251.0.0.430f4f15jD06Yd&commodityCode=cas_dv_public_cn&request=%7B%22ord_time%22:%221:Year%22,%22order_num%22:1,%22product%22:%22free_product%22,%22certCount%22:%2220%22%7D

![](img/35.png)

下载其他就可以了

修改后端的代码 ./bin/www

可以上传证书文件到 usr/local/src/ssl 下

![](img/29.png)

上传至服务器，重新启动后端的项目，如果有需要的话,nginx配置https的代理

修改代码重新上传

![](img/30.png)

# 12.微信小程序的配置

开发管理。--- 开发设置。---   服务器域名 --- 添加

![](img/31.png)

打开小程序开发者工具

![](img/32.png)

上传微信小程序项目

![](img/33.png)

![](img/34.png)

测试