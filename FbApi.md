# FB-APi api对接整理

* 注意FB体育只支持欧洲盘赔率下注，投注的时候只能传递欧洲赔率

* 注意：赛事赔率小于0 或者是玩法销售状态为0的时候是锁盘处理--- 只有这两个条件用来判断锁盘状态

## 首页模块和内页模块

### 首页联赛列表接口（滚球，今日，早盘）, 需要传递具体的sportId（足球）以及type（滚球，今日，早盘） 轮询时间5秒
####1. /v1/match/getOnSaleLeagues

### 首页分类型赛事个数 （赛事个数统计）（统计早盘，滚球，今日的个数）--这个接口返回的结果需要通过sportId和分类类型（滚球，今日，早盘）来过滤数据  轮询时间5秒
####2. /v1/match/statistical

### 首页赛事列表接口 （赛事列表）可以批量获取，分页，默认每页50条， 可以根据批量的联赛id获取多个联赛下的赛事信息以及赔率信息， 该接口需要和获取联赛列表接口配合使用，批量获取获取数据，，注意分页  轮询时间5秒
####3. /v1/match/getList

### 根据球队或者赛事名搜索赛事--搜索接口
####4. /v1/match/queryMatchByRecommend

### 获取单个赛事详情及玩法 --根据单场赛事ID获取赛事详情和玩法
####5. /v1/match/getMatchDetail

### 分页获取赛事赛果列表 按运动类型、联赛、时间等分页查询已结束的赛事赛果比分等信息--- 三方建议使用这个接口
####6. /v1/match/matchResultPage

### 查询赛果统计信息
####7. /v1/match/resultStatistics

## 投注页面

### 投注前查询指定玩法赔率--用户选择投注选项后，可定时轮训该接口实时获取指定玩法的最新赔率，建议轮训间隔1-3秒

* 注意：data.bms.omid	integer	失效玩法id，主要用于带线（球头）玩法变线后，替换原来失效的玩法id，用omid查询到对应玩法，然后替换成 mid
* （您好，这个主要是针对带线的几个重要玩法做的特殊处理， 当当前带线玩法关闭后，如果此玩法还有其他线开售，我们就会返回其他线的赔率信息。 例如：大小球 玩法， 客户要投注大小1.5的玩法（玩法id：10001）， 客户端开始请求赔率的时候大小1.5的玩法开售的，客户停留在投注界面，过了会，1.5这个玩法关闭了，但是大小2.5的玩法（玩法id：10003）开着，我们就会返回玩法2.5的信息和赔率。 此时。omid=10001， mid=10003。 客户需要判断，是否存在omid，如果存在，那么说明玩法的盘口线变了，然后对比omid确定是哪个盘口关闭了，从前端投注界面移除omid对应的盘口，添加上mid的盘口，并提醒客户变线了。）
####8. /v1/order/batchBetMatchMarketOfJumpLine

### 单关投注接口，可批量 ---FB体育支持批量投注单关，投注都为异步接单，下单后，订单状态处于未确认状态，需要轮询 /v1/order/getStakeOrderStatus 接口查看订单状态
####9. /v1/order/bet/singlePass

### 串关投注接口 ,FB体育投注都为异步接单，下单后，订单状态处于未确认状态，需要轮询 /v1/order/getStakeOrderStatus 接口查看订单状态
####10. /v1/order/betMultiple

### 批量获取投注订单状态 --- 下单后可通过此接口获取订单状态，可用于下单后提示用户下单是否本接单活拒单， 这个接口在打住投注和串关投注接口有响应的时候根据订单ID去轮询订单状态
####11. /v1/order/getStakeOrderStatus

## 投注记录页面

### 投注记录接口 -- 按类型区分投注列表，未结算、已结算；未结算列表，按投注时间查询和排序；已结算列表，按结算时间查询和排序。最大查询时间为30天内
####12. /v1/order/bet/list

### 投注记录接口，并按币种统计 ---按类型区分投注列表，未结算、已结算；未结算列表，按投注时间查询和排序；已结算列表，按结算时间查询和排序。最大查询时间为30天内
####13. /v1/order/new/bet/list

