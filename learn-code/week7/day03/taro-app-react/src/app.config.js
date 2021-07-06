export default {
  pages: [
    'pages/home/home',
    'pages/index/index',
    'pages/kind/kind',
    'pages/user/user',
    'pages/cart/cart'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  "tabBar": {
    "color": "#333",
    "selectedColor": "#f66",
    "backgroundColor": "#efefef",
    "borderStyle": "black",
    "list": [
      {
        "text": "首页",
        "pagePath": "pages/home/home",
        "iconPath": "resources/tabs/home.png",
        "selectedIconPath": "resources/tabs/home-active.png"
      },
      {
        "text": "分类",
        "pagePath": "pages/kind/kind",
        "iconPath": "resources/tabs/kind.png",
        "selectedIconPath": "resources/tabs/kind-active.png"
      },
      {
        "text": "购物车",
        "pagePath": "pages/cart/cart",
        "iconPath": "resources/tabs/cart.png",
        "selectedIconPath": "resources/tabs/cart-active.png"
      },
      {
        "text": "我的",
        "pagePath": "pages/user/user",
        "iconPath": "resources/tabs/user.png",
        "selectedIconPath": "resources/tabs/user-active.png"
      }
    ]
  }
}
