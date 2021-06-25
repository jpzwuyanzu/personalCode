# vue-cli创建项目 这里创建的是vue2的项目
 ## 安装 npm instal -g @vue/cli     或者使用yarn
 ### 使用vue -V查看是否安装成功

 # 创建项目 vue create 项目名称

 # 选择手动安装 
 > 1, Menually select features
 > 2, babel Router, Vuex, css pre-processors,  Linter/Formatter
 > 3, Sass/Scss(with node -sass)
 > 4, Eslint with error prevention only
 后边就一直默认即可

 配置路由文件的时候，如果是有children 那么子组件的path前面不加斜杠
 同时上级需要对应的component并且上级的component中要加上routerview