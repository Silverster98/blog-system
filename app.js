const express = require('express')
const app = express()
const b64 = require('./util/b64file')
const dbhelper = require('./db/helper')
const marked = require('marked')

app.set('view engine', 'pug')

app.use('/img', express.static('img'))
app.use('/css', express.static('./public/css'))

/********************* main page *********************/
app.use('/', express.static('./public/main'))

/********************* login page *********************/
// app.use('/login', express.static('./public/login'))

// app.post('/login/user', (req, res) => {
// 	res.json({
// 		answer: 'ok',
// 		url: '/user/someone',
// 		token: 'this is a token'
// 	})
// })

// app.get('/user/someone', (req, res) => {
// 	res.send('<p>someone\'s main page</p>')
// })


/********************* article list page *********************/
app.get('/articles', (req, res) => {
	const filepath = './img/testfigure.jpg'
	const b64str = b64.base64EncodeFile(filepath)
	dbhelper.getArticleSummaryList().then((article) => {
		res.render('articles', {
			username: 'Silvester',
			motto: '菜鸡一个',
			avatar: "data:image/jpeg;base64," + b64str,
			article: article
		})
	}).catch((error) => {
		res.json({
			error: error.message
		})
	})
})

app.get('/userpage/user/:id', (req, res, next) => {
	const id = req.params.id
	dbhelper.getUserASLByUserId(id).then((result) => {
		if (result.result === 0) next()
		else {
			const user = result.user
			const articles = result.articles
			res.render('articles', {
				username: user.name,
				motto: user.motto,
				avatar: user.avatar,
				article: articles
			})
		}
	}).catch((error) => {
		res.json({
			error: error.message
		})
	})
})

/********************* article page *********************/
app.get('/article/article_id/:id', (req, res, next) => {
	const articleID = req.params.id
	dbhelper.getArticleById(articleID).then((result) => {
		// console.log(article)
		if (result.result === 0) next()
		else {
			const article = result.article
			article.content = marked(article.content)

			const option = {
				id: articleID,
				item: [
					{name: 'articlecount', value: article.count + 1}
				]
			}
			// console.log(article.count)
			dbhelper.updateArticleById(option).then((result) => {}).catch((err) => {})

			res.render('article', article)
			// res.json(result.article)
		}
	}).catch((error) => {
		res.json({
			error: error.message
		})
	})
})


/********************* 404 page *********************/
app.use((req, res, next) => {
	res.status(404).render('404', {url: req.originalUrl})
})

app.listen(3000, () => {
	console.log('listen port 3000...')
})