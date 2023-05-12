# antd-moment-webpack-plugin

A webpack plugin to replace [Day.js](https://day.js.org/) to [Moment.js](http://momentjs.com/) automatically.


## Installation
```bash
npm install --save-dev @ant-design/moment-webpack-plugin
```

## Usage
```js
// webpack-config.js
import AntdMomentWebpackPlugin from '@ant-design/moment-webpack-plugin';

module.exports = {
  // ...
  plugins: [new AntdMomentWebpackPlugin()],
};
```
