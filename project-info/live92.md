live +92project

================================================================================》〉》〉》〉》〉》〉》〉》〉》〉》〉》〉》〉》〉

Live项目信息：

http://47.128.251.48/  代码托管服务器

git 地址： git@47.128.251.48:fonts/live_player_ww.git

Git 用户名： simon
密码： 邮箱密码


企业GPT 
http://18.141.224.132:3000/
访问密码：WwGptpassWd


原型图查看地址：http://13.213.36.147:8061/PlayToy/PlayToy/?id=2ti7ji&p=启动页&g=1
用户名：wanwu
密码：wwlive


api文档也加了密码了
http://13.213.36.147:8060/
wanwu
wwlive


trello文档：
https://trello.com/c/Ft2RxgSv

账号密码是邮箱

进度评估表： https://docs.google.com/spreadsheets/d/1fUHewODm-QGd20j7Uq8bsWthmYmCe8JwTKzKOrAOJkk/edit?pli=1&gid=1608688742#gid=1608688742

================================================================================》〉》〉》〉》〉》〉》〉》〉》〉》〉》〉》〉》〉



================================================================================》〉》〉》〉》〉》〉》〉》〉》〉》〉》〉》〉》〉

### 各部分说明

1. type: 表示提交的类型，常见的类型包括：
   - feat: 新功能
   - fix: 修复 bug
   - docs: 文档变更
   - style: 代码格式（不影响功能的变更）
   - refactor: 代码重构（既不修复 bug 也不添加功能）
   - perf: 性能优化
   - test: 添加测试
   - chore: 其他维护性变更（例如构建过程或辅助工具的变更）


92项目信息


A5 验证
第一个毛绒玩具： 卡皮巴拉

邮箱1：
tony.li.jp@a5labs.co
7JGSQQnXT4gL8qA=

邮箱2:
tony@bellotalabs.com
密码是私人邮箱密码


jira单子地址：

 https://clubwpt.atlassian.net/browse/GOLD-3431

https://clubwpt.atlassian.net/issues/GOLD-3255
账号密码是邮箱2信息


Atlassian: https://services-cloud.atlassian.net/jira/projects?page=2&sortKey=name&sortOrder=ASC
tonyLi
密码是邮箱



bitbuket： https://bitbucket.org/a5-labs/data-infra-iac/src/main/

https://login.okta.com/

https://a5labs.openvpn.com/devices

git 仓库地址：
http://92gitlab.gbm2.com:10116/users/sign_in
账号：Tony
密码是邮箱



测试环境地址：https://frontend.clubwpt.liuxinyi1.cn/clubwpt-client/

生产环境地址：https://clubwptgold.com/maintenance/?device=desktop

本地调试的时候开启谷歌登录： http://localhost:3000/login?debug=true


confluence 文档地址：
https://clubwpt.atlassian.net/wiki/spaces/CG/pages/72187907/WC+vs.+Project+Gold

https://clubwpt.atlassian.net/wiki/spaces/Engineering/pages/95256579/ClubWPT+Web

WC 设计稿地址：
https://www.figma.com/design/YEpl3CvOQMM7wfFnqLYeyB/Website%3A-MVP?m=dev


https://www.figma.com/design/908nsomZl9ECkW6mPHpofj/Game-Lobby?node-id=3261-294436&m=dev

KYC设计稿：
https://www.figma.com/design/hph44JkZh4xjx60GBmkBTC/Know-Your-Customer-(KYC)?t=wn5hcBg9ZytBDu1z-0

PG设计稿：
https://www.figma.com/design/Q4G4J53QR6PODPulDuq8ce/Coin-Exchange%3A-Purchases-%26-Redemptions?m=dev

postal设计稿子：
https://www.figma.com/design/z78sW3fkw0uZHm0wwLL26W/%E2%9B%94%EF%B8%8F-%5BArchived%5D-AMOE-Postal-Request-%E2%9B%94%EF%B8%8F?node-id=1-396&p=f&m=dev

登录设计稿：
https://www.figma.com/design/Vx02Q6ZXaJEm77VMwa6leo/Profile-%26-Settings?node-id=2502-106477&p=f&m=dev

https://www.figma.com/design/908nsomZl9ECkW6mPHpofj/Game-Lobby?node-id=3261-294436&m=dev

总设计稿PC端： https://www.figma.com/design/YEpl3CvOQMM7wfFnqLYeyB/Website%3A-MVP?node-id=2128-175501&m=dev
总设计稿M端：https://www.figma.com/design/YEpl3CvOQMM7wfFnqLYeyB/Website%3A-MVP?node-id=2693-44595&m=dev


线上测试接收短信验证码地址以及手机号码：

地址：https://receive-smss.com/ 
手机号： 7132919826



coinDamin 后台管理地址和账号：
https://coin-admin.clubwpt.liuxinyi1.cn/admin.html#/admin/invite/index.html?spm=m-32-43-44

tony / 123456

strapi 测试环境地址以及账号：
https://landing-web.clubwpt.liuxinyi1.cn/admin
admin@bellotalabs.com
QAZwsxedc123
 564356

项目本地启动的时候，如果想要使用谷歌登录，必须是3000端口
http://localhost:3000/login?debug=true

github账号：TonyLi5899 
密码为邮箱密码


维护页面控制以及地区拦截相关处理：

staging测试环境维护页面： https://web.clubwpt.liuxinyi1.cn/maintenance/

staging测试环境地区拦截页面：https://web.clubwpt.liuxinyi1.cn/geoblock/

cloudflare 处理是否返回维护页面：functional-web/public/maintenance/index.html
另外一个维护页面：functional-web/src/maintenance-module/components/pages/indexPage.vue

用户地区拦截处理，有两种情况处理：
1.cloudflare  直接拦截 functional-web/public/geoblock/index.html
2.Api接口拦截 functional-web/src/geo-block-module

staging登录流程：
  1. https://web.clubwpt.liuxinyi1.cn/ 登入後會轉倒到 https://frontend.clubwpt.liuxinyi1.cn/clubwpt-client/
 1. https://frontend.clubwpt.liuxinyi1.cn/clubwpt-client/ 進去後，他們會 iframe 我們的 https://web.clubwpt.liuxinyi1.cn/login 再進行登入


Api文档地址：https://paymentserver.clubwpt.liuxinyi1.cn/docs#tag/%E5%95%86%E5%93%81%E5%88%97%E8%A1%A8/paths/~1$apiBackendServer$~1payment~1api~1goodsupdate/post

新需求设置地址：https://www.figma.com/design/YEpl3CvOQMM7wfFnqLYeyB/Website%3A-MVP?node-id=2941-28435&m=dev

主要兩塊，桌機與手機各至有自己的版本
 2. mobile, desktop 的 information & help
 2. mobile, desktop 的 agreement

桌機版的 Player Support 不該打開新分頁，要跟 figma 一樣


GitHub 恢复账号的key：

deb31-fdbf4 
dda6b-d38fe 
c0550-d87c0 
d0503-15ed0 
56f6a-fc669 
6f76e-42dbc 
09621-05e0f 
660db-46b21 
dc8bc-41484 
50afb-21108 
e1967-fa98d 
ec833-4508e 
caecc-cd020 
45939-0d39e 
901df-bbd3e 
07d98-cf860

API：https://paymentserver.clubwpt.liuxinyi1.cn/docs#tag/%E5%95%86%E5%93%81%E5%88%97%E8%A1%A8/paths/~1$apiBackendServer$~1payment~1api~1goodscreate/post

promotion：
https://www.figma.com/design/YEpl3CvOQMM7wfFnqLYeyB/Website%3A-MVP?node-id=3765-45549&m=dev

https://docs.google.com/spreadsheets/d/1TxsEoEhmc9CY9cHZGcz08N7vqHkjcIP7TDfqM8Div9M/edit?pli=1&gid=991362370#gid=991362370


================================================================================》〉》〉》〉》〉》〉》〉》〉》〉》〉》〉》〉》〉  流程过了一遍， 1.kyc验证 2.add payment method 3.提交提现订单  设计稿上主要是对于payment method和创建提现订单那块有改版，包括金币的现金价值展示，提现账户这块有调整