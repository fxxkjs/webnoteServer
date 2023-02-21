##数据库命令

####1.1启动数据库服务端

```mysql
#mac系统
    sudo /usr/local/mysql/support-files/mysql.server start

#redhat/CentOS
    /usr/local/mysql/bin/mysql -u root -p
```

####1.2连接数据库客户端
```mysql
# 类unix操作系统下
    mysql -uroot -p

#防止无条件更新和删除数据(本次安全模式登录)
    mysql -U -uroot -p
```
>-u 指定用户名
>-p 接下来使用密码
>-P 指定服务器端端口
>-h 指定服务端的ip

####1.3修改数据库管理员密码
```mysql
/usr/bin/mysqladmin -u root password '新密码'
```


##库的操作



#### 创建/查看/删除数据库
```mysql
#创建数据库
    create database `数据库名称`;

#创建数据库并指定编码和校对集
    create database `数据库名称` character set utf8mb4 collate utf8mb4_general_ci;
#x修改已存在的数据库编码
    alter database 数据库名 charset=`新的编码`

# 查看数据库系统中一共有多少个数据库
    show databases;
# 切换／选择数据库
    use 数据库名

#删除一个数据库
    drop database 要删除的数据库名称;
```

##表结构操作

####3.1 创建表

```mysql
# 显示表
    show tables;

# 创建表

(基本结构)
create table 表名(

	字段名1 字段类型(长度) 字段约束,
	字段名2 字段类型(长度) 字段约束,
	字段名3 字段类型(长度) 字段约束,
	……
    primary key ('主键字段名')
) 指定存储引擎 指定编码

例:

CREATE TABLE `x5` (
  `id` smallint(5) DEFAULT NULL,
  `name` varchar(4) DEFAULT NULL,
  `sex` tinyint(1) DEFAULT NULL,
  `mobile` char(11) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `add_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8
```

####3.2 修改表

```mysql
# 添加单列(字段)
    alter table 数据表名 add 列名以及类型、约束等信息;
# 添加多列(字段)
    alter table 数据表名 add （列名1以及类型、约束等信息,列名2以及类型、约束等信息）;

#修改列,列名必须是已经存在的
    alter table 数据表名 modify 列名以及类型、约束等信息
# 旧列名必须存在，新列名可以和旧列名一样，但不能和其它列名相同
    alter table 数据表名 change 旧列名称 新列名以及类型、约束等信息

#修改数据表的编码
    alter table 数据表名 charset=新的编码

#删除列
    alter table 数据表名称 drop 列名
```

####3.3查看表/删除表

```mysql

#查看表数据
    select * from 表名;

#查看建表语句
    show create table 数据表名;

#删除表
    drop table 表名;
```


##表内数据操作

```mysql
# 插入数据
    insert into 表名 (字段名1,字段名2,……) values (字段1的值,字段2的值,……),(字段1的值,字段2的值,……)，(字段1的值,字段2的值,……);
#一个表插入另一个表,可以是同一个表
    insert into user (name,sex,age,mobile,address,native,card_id,number,room,xxx) select name,sex,age,mobile,address,native,card_id,number,room,xxx from student;
```
##附录:字段类型 与 字段约束

| 字段类型   | 意义         | 表示范围                                                         |
|------------|--------------|------------------------------------------------------------------|
| tinyint    | 微小整型     | -128-127 ; 0-255                                                 |
| smallint   | 小整型       | -32768-32767 ; 0-65535                                           |
| mediumint  | 中等整型     | -8388608-8388607 ；0-16777215                                    |
| int        | 整型         | -2147493648-2147493647；0-4294967295                             |
| bigint     | 大整型       | -9223372036854775808-9223372036854775807；0-18446744073709551615 |
| float      | 单精度浮点型 |                                                                  |
| double     | 双精度浮点型 |                                                                  |
| char       | 字符型       |                                                                  |
| varchar    | 字符型       |                                                                  |
| text       | 文本型       | 支持65535个字符。要求长度+2字节的存储                            |
| mediumtext | 中等文本型   | 支持16777215个字符。需要长度+3字节的存储                         |
| longtext   | 长文本型     | 支持4294967295个字符。需要长度+4字节的存储                       |
| datetime   | 日期类型     |                                                                  |
| timestamp  | 时间戳日期   |                                                                  |



| 字段约束       | 含义                 | 备注                                         |
|----------------|----------------------|----------------------------------------------|
| not null       | 限制字段值不能为null |                                              |
| default        | 设置默认值           |                                              |
| primary key    | 设置主键             | 也可以在最后使用 `key(字段名)`的形式设置主键 |
| auto_increment | 设置自动增长         | 只能设置主键字段，且类型为整数型             |
| unsigned       | 设置字段为无符号类型 |                                              |
| comment        | 注释、说明、备注     |                                              |
