# 数据库设计
使用 mysql 数据库

目前来说就先设计三个表，一个存储用户，一个存储文章，一个存文章的标签。文章和用户多对一关联。文章和标签多对多关联。

### 1.用户表字段：
- useruid: 一个自增字段，唯一标识用户
- username：用户名
- userpw: 密码
- useremail: 注册邮箱
- userrd: 注册日期
- usersex: 性别
- useravatar: 头像（存 base64 编码限制大小）
- usermotto: 座右铭
- userother: 备用存储，可以存一个json字串

### 2.文章表字段：
- articleuid: 自增字段，唯一标识一篇博客
- useruid: 外键，链接到用户表，多文章对一个用户
- articletitle: 文章标题
- articlesubtitle: 副标题
- articlecontent: 文章内容
- articlepd: 发表日期
- articleispublish: 是否发表(不发布默认私有)
- articlecount: 浏览次数
- articlelike: 喜欢
- articleunlike: 不喜欢
- articleother: 备用存储

### 3.标签表字段：
- taguid: 自增字段，唯一标识一个 tag
- tagname: tag 的名字

### 4.article 和 tag 关系表（多对多需要中间表）
- ruid: 自增字段，唯一标识一个关系
- articleuid: 对应文章表 articleuid 字段
- taguid: 对应标签表 taguid 字段

### 5.docker mysql 容器使用

##### 1.创建mysql容器
```
docker run --name blogsystemSql -v /home/blogsystem/mysql:/home/mysql -e MYSQL_ROOT_PASSWORD=123456 -d docker.io/mysql:latest
```
密码自行修改（替换123456）,容器端口和主机端口也可以使用 -p 自行映射，我这里没有映射，使用 docker ps 可以查看到映射到的主机端口。

##### 2.进入容器
```
docker exec -it blogsystemSql /bin/bash
```
##### 3.进入mysql
```
mysql -uroot -p
```
##### 4.导入 .sql 文件

之前创建容器时，文件夹映射了一个，在主机 /home/blogsystem/mysql 目录下放置 BlogSystem.sql文件，然后会在容器 /home/mysql中映射

在mysql中，输入如下命令,即可创建一个BlogSystem 数据库:
```
create database blogsystem charset utf8;
use blogsystem;
source /home/mysql/BlogSystem.sql;
```

之后可以 show tables; 查看创建的表。

退出mysql,退出容器;

##### 5.主机中检验 mysql 是否可用
在/home/blogsystem/mysql 下新建 test 文件夹 创建node 工程，新建index.js并写入如下代码：
```
const mysql = require('mysql')

const config = {
    host     : '172.17.0.2', // mysql 容器ip
    user     : 'silvester',  // 新建非 root 用户
    password : '******',
    database : 'blogsystem'
}

const pool = mysql.createPool(config)

const sqlStatement1 = `insert into user(username,userpw,useremail,userrd,usersex)` + 
    ` values('张三','123456','123456@qq.com','2019-01-27 14:00:00','m');`

const sqlStatement2 = `select * from user;`

pool.query(sqlStatement1, (err, res) => {
    if (err) console.log(err.message)
    else {
        console.log(res)
        pool.query(sqlStatement2, (err, res) => {
            if (err) console.log(err.message)
            else {
                console.log(res)
            }
            pool.end((err) => {})
        })
    }
})
```

##### 问题：
- 由于是在宿主机中连接容器，所以连接时 host 字段不再是 localhost，而应改为容器IP，由于容器和宿主机已经其他容器在同一个局域网下，因此可以直接使用IP访问。
- 之前，一直是用的 root 用户，但是一直连接不上，所以干脆新建一个用户，用这个用户来登录，同时从安全角度来说，不使用root用户也是比较好的。如下：
```
create user 'silvester'@'%' identified by '******';
grant all on *.* to 'silvester'@'%'

****** 是密码
%      是任意ip
第二句是对用户授权，all是所有权限， *.*是对所有数据库.数据表
```

- ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client 错误解决（改加密方式为普通模式）
```
alter user 'silvester'@'%' identified by '******' password expire never;
alter user 'silvester'@'%' identified with mysql_native_password by '******';
flush privileges;
```

以上操作我之后，连接mysql即可使用silvester用户。
