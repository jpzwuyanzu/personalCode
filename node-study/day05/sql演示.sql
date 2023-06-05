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











