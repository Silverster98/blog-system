const config = require('./config')
const mysql = require('mysql')
const sql = require('./sql')

const pool = mysql.createPool(config)

function User (id, name, avatar, motto, other) {
    return {
        id: id,
        name: name,
        avatar: avatar,
        motto: motto,
        other: other
    }
}

function ArticleSummary (id, title, subtitle, pd, count, tags) {
    return {
        id: id,
        title: title,
        subtitle: subtitle,
        pd: pd,
        count: count,
        tags: tags
    }
}

function Article (id, title, subtitle, pd, count, content, like, unlike, author) {
    return {
        id: id,
        title: title,
        subtitle: subtitle,
        pd: pd,
        count: count,
        content: content,
        like: like,
        unlike: unlike,
        author: author
    }
}

/**
 * ASL is Article Summary List
 * @param {*} id 
 */
async function getUserASLByUserId (id) {
    return new Promise((resolve, reject) => {
        const sqlStatement = sql.searchUserById({id: id})
        pool.query(sqlStatement, (error, result) => {
            if (error) reject(error)
            else 
                if (result.length === 0) resolve({result: 0})
                else {
                    const user = User(result[0]['useruid'], result[0]['username'], result[0]['useravatar'], result[0]['usermotto'], result[0]['userother'])
                    resolve({result: 1, user: user})
                }
        })
    }).then((res) => {
        // console.log(res)
        return new Promise((resolve, reject) => {
            if (res.result === 0) resolve({result: 0})
            else {
                const useruid = res.user.id
                const sqlStatement = sql.searchUserArticleById({id: useruid})
                pool.query(sqlStatement, (error, result) => {
                    if (error) reject(error)
                    else {
                        let articleSummary = [];
                        for (let i = 0; i < result.length; i ++) {
                            const article = ArticleSummary(result[i]['articleuid'], result[i]['articletitle'], result[i]['articlesubtitle'], result[i]['articlepd'], result[i]['articlecount'], result[i]['group_concat(tag.tagname)'])
                            article.tags = article.tags.split(',')
                            articleSummary.push(article)
                        }
                        resolve({result: 1, user: res.user, articles: articleSummary})
                    }
                })
            }
        })
    })
}

async function getArticleSummaryList () {
    return new Promise((resolve, reject) => {
        const sqlStatement = sql.searchAllArticle()
        pool.query(sqlStatement, (error, result) => {
            if (error) {
                // console.log(error)
                reject(error)
            }
            else {
                let articleSummary = [];
                for (let i = 0; i < result.length; i ++) {
                    const article = ArticleSummary(result[i]['articleuid'], result[i]['articletitle'], result[i]['articlesubtitle'], result[i]['articlepd'], result[i]['articlecount'], result[i]['group_concat(tag.tagname)'])
                    article.tags = article.tags.split(',')
                    articleSummary.push(article)
                }
                resolve(articleSummary)
                // resolve(result)
            }
        })
    })
}

async function getArticleById (id) {
    return new Promise((resolve, reject) => {
        const option = {id: id}
        const sqlStatement = sql.searchArticleById(option)
        pool.query(sqlStatement, (error, result) => {
            // console.log(result)
            if (error) reject(error)
            else 
                if (result.length === 0) resolve({result: 0})
                else {
                    const article = Article(result[0]['articleuid'], result[0]['articletitle'], result[0]['articlesubtitle'], result[0]['articlepd'], result[0]['articlecount'], result[0]['articlecontent'], result[0]['articlelike'], result[0]['articleunlike'], result[0]['username'])
                    resolve({result: 1, article: article})
                }
        })
    })
}

async function updateArticleById (option) {
    return new Promise((resolve, reject) => {
        const sqlStatement = sql.updateArticleById(option)
        pool.query(sqlStatement, (error, result) => {
            if (error) reject(error)
            else {
                resolve(result)
            }
        })
    })
}

async function updateUserById (option) {
    return new Promise((resolve, reject) => {
        const sqlStatement = sql.updateUserById(option)
        pool.query(sqlStatement, (error, result) => {
            if (error) reject(error)
            else resolve(result)
        })
    })
}

async function getUserPWByName (name) {
    return new Promise((resolve, reject) => {
        const sqlStatement = sql.searchUserPWByName({name: name})
        pool.query(sqlStatement, (error, result) => {
            if (error) reject(error)
            else 
                if (result.length === 0) resolve({result: 0})
                else {
                    const id = result[0]['useruid']
                    const pw = result[0]['userpw']
                    resolve({result: 1, id: id, pw: pw})
                }
        })
    })
}

// getArticleById({id: 1}).then((res) => {
//     console.log(res)
//     pool.end()
//     console.log('done------')
// })

// async function print () {
//     const res = await getArticleSummaryList()
//     // console.log(res.length)
//     console.log(res)
//     pool.end((err) => {console.log(err)})
// }

// print()

module.exports = {
    getArticleSummaryList: getArticleSummaryList,
    getArticleById: getArticleById,
    getUserASLByUserId: getUserASLByUserId,
    getUserPWByName: getUserPWByName,
    updateArticleById: updateArticleById,
    updateUserById: updateUserById
}