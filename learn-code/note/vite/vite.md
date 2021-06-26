# 1.介绍

下一代前端工具

[Vite](https://vitejs.dev/)（法语单词“ fast”，最佳为`/vit/`）是一种新型的前端整合工具，可显着改善前端开发体验。它包含两个主要部分：

- 一个通过[本地ES模块](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)为您的源文件提供服务的开发服务器，它具有[丰富的内置功能](https://vitejs.dev/guide/features.html)和惊人的快速[热模块替换（HMR）](https://vitejs.dev/guide/features.html#hot-module-replacement)。
- 甲[构建命令](https://vitejs.dev/guide/build.html)捆绑与您的代码[汇总](https://rollupjs.org/)，预配置为输出高度优化的静态资产进行生产。

另外，Vite通过其[插件API](https://vitejs.dev/guide/api-plugin.html)和[JavaScript API](https://vitejs.dev/guide/api-javascript.html)具有完全键入支持，因此具有高度可扩展性。

* 即时服务器启动

*  闪电般的HMR

*  Rich️丰富的功能

*  优化的构建

*  通用插件

*  全类型API

在浏览器对ES模块提供本机支持之前，我们必须依靠捆绑程序（Browserify，WebPack，Parcel或Rollup）将所有模块源代码组合到一个文件中，浏览器甚至在开发过程中都可以使用它。

在开发过程中捆绑有两个缺点：

- **服务器启动缓慢：**启动开发服务器时，即使存在代码拆分点，捆绑程序也总是热切地爬网整个应用程序。例如，在具有十二个路由的应用程序中，每个路由都是延迟加载的，您仍然必须等待捆绑程序处理应用程序中的每个文件，然后才能开始在单个路由页面上工作。

![](img/1.png)

**Vite如何解决该问题：**服务器启动时无需做任何准备工作-Vite可以根据浏览器的请求按需编译并按需提供文件。在代码拆分应用程序中，仅需要服务当前路由页面使用的模块。

![](img/2.png)

- **更新缓慢：**编辑文件时，除了重新构建文件本身之外，捆绑程序还需要使模块图的一部分无效并重新构建整个捆绑包。这意味着，随着应用程序大小的增长，保存文件与查看浏览器中反映的更改之间的反馈速度会线性下降。在大型应用中，即使启用了“热模块更换”，此捆绑包重建步骤也可能变得非常昂贵。

  **Vite的解决方案：**每个服务的文件都通过HTTP标头（在可能的情况下，“ 304未修改”）进行缓存，如果禁用了浏览器缓存，则是Vite的内存中缓存。在文件编辑中，我们只是使该文件的缓存无效。此外，通过本机ESM进行[热模块替换](https://vitejs.dev/guide/features.html#hot-module-replacement)仅需要精确地重新获取已失效的模块，无论您的应用程序大小如何，都可以始终如一地快速获取。

尽管现在已经广泛支持本机ESM，但是由于嵌套导入导致的额外网络往返，在生产中运输未捆绑的ESM仍然效率低下（即使使用HTTP / 2）。为了在生产中获得最佳的加载性能，最好将代码与树状摇动，延迟加载和通用块拆分捆绑在一起（以获得更好的缓存）。

确保开发服务器与生产构建之间的最佳输出和行为一致性并不容易。这就是为什么Vite附带了一个预配置的[build命令](https://vitejs.dev/guide/build.html)，该[命令](https://vitejs.dev/guide/build.html)可以立即执行此操作。

# 2.搭建第一个Vite项目

使用NPM：

```
$ npm init @vitejs/app
```

使用yarn：

```
$ yarn create @vitejs/app
```

然后按照提示进行操作！

## 2.1 目录结构

您可能已经注意到的一件事是，在Vite项目中，`index.html`它处于中心位置而不是隐藏在内部`public`。这是故意的：在开发过程中，Vite是服务器，并且`index.html`是应用程序的入口点

Vite视为`index.html`源代码和模块图的一部分。它解决`<script type="module" src="...">`了引用您的JavaScript源代码的问题。即使`<script type="module">`通过引用的内联和CSS`<link href>`也享受Vite特定的功能。此外，内部`index.html`的URL会自动重新设置基础，因此不需要特殊的`%PUBLIC_URL%`占位符。

与静态http服务器类似，Vite具有“根目录”的概念，从中可以从中提供文件。您会`<root>`在其他文档中看到它的引用。源代码中的绝对URL将使用项目根目录作为基础来解析，因此您可以像使用普通的静态文件服务器一样（除非功能更强大！）来编写代码。Vite还能够处理解析为根目录以外的文件系统位置的依赖项，即使在基于Monorepo的设置中也可以使用。



运行`vite`时以当前工作目录为根目录启动开发服务器。您可以使用指定备用根`vite serve some/sub/dir`。