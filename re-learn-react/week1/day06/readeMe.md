
# 高阶组件使用装饰器，需要在CRA中配置装饰器模式的支持

## 使用creat-app-rewired 这个包对cra中的项目配置轻微调整

### 操作步骤：
 
 1， yarn add customize-cra react-app-rewired  @babel/plugin-proposal-decorators

 2， 更新package.json文件中的三条指令

 ```json
    "scripts": {
        "start": "react-app-rewired start", //更新
        "build": "react-app-rewired build", //更新
        "test": "react-app-rewired test", //更新
        "eject": "react-scripts eject" //不变
    },
 ```

3, 在项目根目录下创建 config-overrides.js

 ```js
 const {override, addDecoratorsLegacy} = require("customize-cra")
 module.exports = override(
     addDecoratorsLegacy(), //配置装饰器模式
 )
 ```
4, 启动项目即可在需要使用的地方使用装饰器


