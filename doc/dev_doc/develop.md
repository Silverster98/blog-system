# 开发笔记
## 1.文件上传功能实现
### 1.上传网页
上传网页是一个很简单的html静态页面，核心功能代码如下：
```
<!DOCTYPE html>
<html>
<head>
  <title>upload files</title>
  <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
</head>
<body>
    <form id="upload" enctype="multipart/form-data" method="post">
        <input type="file" name="userfile" id="userfile"/>
        <input type="button" value="提交" onclick="uploadFile()"/> 
   </form>
</body>
<script>
function uploadFile () {
    var form = document.getElementById('upload')
    var formData = new FormData(form)
    console.log(formData)
    axios.post('http://localhost:3000/upload/uploadfile', formData).then((response) => {
        console.log(response.data)
    }).catch((error) => {
        console.log(error)
    })
}
</script>
</html>
```

主要通过一个表单来实现，表单选择文件，js 代码通过 axios 的 post 方法上传至服务器。

表单非常简单，就是一个 input 标签，然后 type 设置为 file, 在添加一个 button 点击上传。这样浏览器会自动进行文件选择，十分简单。button 绑定到文件上传函数。注意表单设置：**enctype="multipart/form-data"**

文件上传函数中使用 axios 辅助文件上传功能实现（axios是基于promise用于浏览器和node.js的http客户端）。直接调用post方法，将表单数据传输至服务器。

### 2.server 端文件上传设置
server 端主要使用 [multer](https://www.npmjs.com/package/multer) 这个中间件,这个中间件处理 multipart/form-data，并且是主要用于文件上传中。

核心代码如下
```
const multer = require('multer')
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		const path = 'upload/' + new Date().getFullYear() + (new Date().getMonth()+1) + new Date().getDate()
		fs.exists(path, (exists) => {
			if (!exists) fs.mkdirSync(path)
			cb(null, path)
		})
	},
	filename: function (req, file, cb) {
		const filenameArr = file.originalname.split('.')
    	cb(null, Date.now() + '.' + filenameArr[filenameArr.length-1]);
	}
})
const upload = multer({ storage: storage }) // for parsing multipart/form-data
```

具体代码解释参考 multer 的文档即可。

然后给出上传的 url 接口
```
app.post('/upload/uploadfile', upload.single('userfile'), (req, res, next) => {
	res.json({
		status: 'ok'
	})
})
```

### 3.进一步开发
当前仅仅是上传文件，并没有限制，即任何人都可以上传，但是实际情况仅仅是某个用户才能上传文件，因此后续在开发完用户系统后可以将这个功能加上去。
