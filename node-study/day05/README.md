## 学习mysql数据库的使用

1. 能够知道如何配置MySQL数据库环境

2. 能够认识并使用常见的SQL语句操作数据库

3. 能够在express中操作MySQL数据库

4. 能够了解Session的实现原理

5. 能够了解JWT的实现原理

### 1. 安装配置mysql 

1. 需要安装MySQL Server 和MySQL workbench 这两个软件就可以满足开发需求

MySQL Server： 是用来提供数据的存储和服务的软件

MySQL workbench： 是一个可视化MySQL 的管理工具， 通过它可以方便的操作存储在MySQL Server中的数据

2.  在Mac下安装mysql 

2-1 先运行 mysql-8.0.19-macos10.15-x86_64.dmg 这个安装包， 将MySQL Server 安装到MAC电脑

2-2 安装mysql-workbench-community-8.0.10-macos-x86_64.dmg 这个安装包， 将可视化工具Workbench安装到mac电脑上

下面这种是通过命令行的方式来链接mysql

打开文件：open ~/.bash_profile
加入语句：PATH=$PATH:/usr/local/mysql/bin
使配置的语句生效：source ~/.bash_profile
如果配置成功，那么输入命令：mysql -u root -p 输入密码后成功登录

3. 数据类型
 
 使用workbench 创建表的时候，区分每个字段类型

 定义字段的类型：

 int: 整数类型
 varchar(len): 字符串类型， len代表最大长度
 tinyint(1): 布尔值

 定义数据库字段的特殊标识：

 3-1. PK (Private Key ) 主键 , 唯一标识
 3-2. NN (Not Null) 值不允许为空
 3-3. UQ (Unique) 值是唯一的，不允许重复
 3-4. AI (Auto Increment) 值自动增长


4. SQL： 是结构化查询语言，专门用来访问和处理数据库的变成语言，能够让我们以编程的形式，操作数据库里边的数据

 4-1. SQL是一门数据库编程语言
 4-2. 使用SQL写出的代码叫sql 语句
 4-3. SQl语言只能在关系型数据库中使用，例如mysql， oracle， sql server, 非关系型数据库mongodb不支持sql语言

5. SQL的作用
 
 5-1. 从数据库中查询数据
 5-2. 向数据库中插入新的数据
 5-3. 更新数据库中的数据
 5-4. 从数据库中删除数据
 5-5. 创建新的数据库
 5-6. 可以在数据库中创建新的表
 5-7. 可以在数据库中创建存储过程，视图
 5-8. 等等

6. SQl学习目标
 
 6-1. 查询 select， 插入 insert， 更新 update， 删除 delete

 6-2. 额外掌握4种SQL语法， where 条件， and和or运算符 order by 排序 count(*) 函数


7. SQL语句的学习 

7-1. select 语句, sql语句的关键字对于大小写不敏感, 返回的是结果集

-- 从FROM指定的表中，查询所有数据， * 表示所有的列
select * FROM 表名称

-- 从FROM指定的表中，查询出指定的列名称(字段)的数据
select 列名称 FROM 表名称

7-2. SQL里边的INSERT INTO语句，用于向数据表中插入新的数据行，语法格式如下

--语法解读： 向指定的表中，插入如下的几列数据，列的值通过values --指定
-- 注意： 列和值要意义对应， 多个列和多个值之间，使用英文的都好分隔

INSERT INTO table_name (列1,列2,列3,...) values(值1,值2,值3,...)

7-3. SQL中的UPDATE语句， 用于修改表中的数据

-- 语法解读： 
3-1. 用UPDATE指定要更新哪个表中的数据
3-2. 用SET指定列对应的新值
3-3. 用where 指定更新的条件

UPDATE 表名称 SET 列名称 = 新值 WHERE 列名称 = 某一个值

3-4. 如果要一次更新多个字段 SET后边的键值对可以用逗号分隔

UPDATE 表名称 SET 列名称 = 新值, 列名称 = 新值 WHERE 列名称 = 某一个值

7-4. SQL中的delete语句， 用于删除表中的行

4-1. 语法解读
4-2. -- 从指定的表中，根据WHERE条件，删除对应的行

DELETE FROM 表名称 WHERE 列名称 = 值

7-5. SQL中的WHERE 子句

where 子句用于限定选择的标准，在select ， update， delete语句中，都可以使用where子句来限定选择的标准

```
select 列名称 FROM 表名称 WHERE 列名称 运算符 值

UPDATE 表名称 SET 列名称 = 新值 WHERE 列名称 运算符 值

DELETE FROM 表名称 WHERE 列名称 运算符 值

```

where 子句的运算符：
= : 等于
<> : 不等于 这个在某些sql版本中也可以使用 != 都表示不等于
> : 大于
< : 小于
>= : 大于等于
<= : 小于等于
BETWEEN: 在某个范围内
LIKE: 搜索某种模式

7-6. SQL中的AND 和 OR运算符

and 和 or 在where子语句中把两个或多个条件结合起来：

and 表示必须同时满足多个条件

or 表示只要满足任意一个条件即可


7-7. SQL 里边的order by 子句，用于根据指定的列对结果集进行排序

默认情况下，order by 语句时按照升序对记录进行排序

如果希望使用降序对记录进行排序，可以使用 desc 关键字


7-8. SQL中通过order by 子句进行多重排序

-- 对users表中的数据先按照status 进行降序排序， 再按照username 字母进行升序排序
select * from my_db_01.users order by status desc, username asc;

7-9. SQL中的count(*) 函数

语法： count(*) 函数用于返回查询结果的总数据条数

-- 使用count(*) 来统计users表中， 状态status为0的用户总数量
select count(*) from my_db_01.users  where status = 0;

可以使用 as 关键字给查询出来的列设置一个别名

-- 使用as关键字给列起别名

select count(*) as total from my_db_01.users  where status = 0;
select username as un, password as up from my_db_01.users;


下边是sql的基础学习：

```sql
-- 查询数据
-- 通过* 把users中所有数据查询回来
--  SELECT * FROM my_db_01.users;
-- 从user中把username 和password查询回来
-- SELECT username, password from my_db_01.users;

-- 插入数据
-- 向users表中，插入新数据，username的值为tony stark， password的值为789123
-- insert into my_db_01.users (username,password) values('tony stark', '789123');
-- SELECT * FROM my_db_01.users;

-- 更新数据
-- 将id为6的用户密码更新为123456
-- update my_db_01.users set password = '123456' where id = 6;
-- SELECT * FROM my_db_01.users;

-- 将id为4的密码更新为123456 状态status更新为1, 同时更新多个属性，set后边的属性用英文的逗号分隔
-- update my_db_01.users set password = '123456', status = 1 where id = 4;
-- SELECT * FROM my_db_01.users;

-- 删除数据
-- 删除user表中id为6的用户
-- delete from my_db_01.users where id = 4;
-- select * from my_db_01.users;

-- 演示where子句的使用
-- select * from my_db_01.users where status = 1;
-- select * from my_db_01.users where id > 6;
-- select * from my_db_01.users where username <> 'admin';
-- select * from my_db_01.users where username != 'admin';

-- 使用and来显示所有状态为0 id 小于7的用户, 必须同时满足多个条件
-- select * from my_db_01.users where status = 0 and id < 7;

-- 使用or运算符显示status为1， 或者是用户名为tony stark 的用户
-- select * from my_db_01.users where status  = 1 or username = 'tony stark';

-- 对users表中的数据，按照status 字段进行升序排序， asc关键字页代表升序排序，由于不加asc默认值就是升序，所以效果是一样的
-- select * from my_db_01.users order by status;

-- order by 如果使用desc关键字代表降序排序, 按照id将结果集进行降序排序
-- select * from my_db_01.users order by id desc; 

-- 对users表中的数据先按照status 进行降序排序， 再按照username 字母进行升序排序
-- select * from my_db_01.users order by status desc, username asc;

-- 使用count(*) 来统计users表中， 状态status为0的用户总数量
-- select count(*) from my_db_01.users  where status = 0;
-- 使用as关键字给列起别名 
select count(*) as total from my_db_01.users  where status = 0;
select username as un, password as up from my_db_01.users;
```


### 2. 在项目中操作mysql的步骤

1. 安装一个操作mysql数据库的三方模块(mysql)
 npm i mysql 

2. 通过mysql模块连接到mysql数据库


3. 通过mysql模块执行sql语句

