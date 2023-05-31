## nodejs学习

快速创建package.json 使用npm init -y 命令


切换npm的下包镜像源

1. 查看当前下包镜像源
npm config get registry
2. 将下包的镜像源切换为淘宝镜像源
npm config set registry=https://registry.npm.taobao.org/

官方服务器： https://registry.npmjs.org/

3. 检查镜像是否下载成功
npm config get registry


## i5ting_toc 包的作用

1. 安装i5ting_toc为全局包
npm install -g i5ting_toc
2. 调用i5ting_toc 轻松实现md转html
i5ting_toc -f 要转的md文件路径 -o

## 规范的包结构，必须符合以下三点, 开发自己的NPM包，并上传到npm服务器

1. 包必须包含单独的目录而存在

2. 包的顶级目录下必须要包含package.json这个包管理配置文件

3. package.json中必须要包含name， version， main 这三个属性， 分别代表包的名字，版本号，包的入口
`
{
    "name": "itqf-tools",
    "version": "1.0.0",
    "main": "index.js",
    "description": "提供了格式化时间，HTMLEscape的功能",
    "keywords": ["itqf", "dateFormat", "escape"],
    "license": "ISC"
}
`.json

## 如果要把自己封装包发布到npm服务器，需要在终端登录， 
```
npm login

```

## 发布包到npm服务器

在包的根目录下，执行npm publish 就可以发布到npm上了 （注意包的名称不可以雷同）

## 删除已经发布的包

运行npm unpublish 包名 --force ,即可以从npm删除已经发布的包，只能删除72小时以内发布的包



## express 框架学习

1. 安装express  在项目所处的目录中运行 npm i express@4.17.1 就可以安装express到项目中使用


## 使用nodemon ,修改代码不用频繁启动了,可以监听变化，重启服务

npm i -g nodemon