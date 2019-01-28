# blog system

> a blog system powered by node.js

## install
```
git clone git@github.com:Silverster98/blog-system.git
npm install
```

## add db config
在 ./db 目录下添加一个 config.js 文件，作为连接 mysql 数据库的配置文件。

config.js 内容如下：
```
module.exports = {
    host     : 'ip', // mysql 服务器 ip
    user     : 'user', // 用户名
    password : '******', // 密码
    database : 'blogsystem' // 数据库名
}
```

我个人在 docker 中运行的时候，不知道为什么这个配置文件没起作用，干脆直接把 config 写在 helper.js 里

## 文档目录索引
- 1.[概述](./doc/summary.md)
- 2.数据库
    + 2.1[数据库说明](./doc/db_doc/db.md)
- 3.部署
    + 3.1[部署说明](./doc/deploy_doc/deploy.md)
    


