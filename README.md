# blog system

> a blog system powered by node.js

# install
```
git clone git@github.com:Silverster98/blog-system.git
npm install
```

# add db config
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


