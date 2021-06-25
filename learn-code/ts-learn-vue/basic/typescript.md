# typescript 学习笔记

## yarn global add typescript 安装

## tsc ./*ts --outDir ./dist --watch 编译并实时监听
## tsc helloword.ts --outFile dist 直接编译

## tsc --init 添加配置文件 tsconfig.json
### 修改
   + "outDir": "./dist",   输出目录                           
   + "rootDir": "./src",    监听哪一个目录的ts文件
### 执行tsc --watch 即可实时监听


## 五分钟简介
### 在ts中函数的参数，变量， 和函数 等需要进行类型标注

## interface 接口   用来定义类型标注

## class  类 在构造函数constructor的参数上使用public等同于创建了同名的成员变量

## 抽象类 abstract

## 泛型

## 装饰器语法 执行顺序是 1，属性装饰器>  2，函数参数装饰器 >  3，类的函数装饰器  > 4，类的装饰器

