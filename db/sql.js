const sql = {
    searchUserPWByName: function (option) {
        const name = option.name || ''
        let s = `select useruid,userpw from user where username = "${name}";`
        
        return s
    },

    searchUserArticleById: function (option) {
        const id = option.id || 0
        let s = `select article.articleuid,article.articletitle,` + 
        `article.articlesubtitle,article.articlepd,article.articlecount,group_concat(tag.tagname)` +
        ` from article,tag,r_article_tag where article.useruid = ${id} and ` +
        `article.articleuid = r_article_tag.articleuid and tag.taguid = r_article_tag.` +
        `taguid group by article.articleuid;`

        return s
    },

    searchUserById: function (option) {
        const id = option.id || 0
        let s = `select useruid,username,useravatar,usermotto,userother from user where user.useruid = ${id};`

        return s
    },

    searchAllArticle: function (option) {
        // const id = option.id || 0
        let s = `select article.articleuid,article.articletitle,article.articlesubtitle,article.articlepd,` +
        `article.articlecount,group_concat(tag.tagname) from article,tag,r_article_tag where ` +
        `article.articleuid = r_article_tag.articleuid and tag.taguid = r_article_tag.taguid ` +
        `group by article.articleuid;`

        return s
    },

    searchArticleById: function (option) {
        const id = option.id || 0
        let s = `select article.articleuid,article.articletitle,article.articlesubtitle,article.articlepd,` +
        `article.articlecount,article.articlecontent,article.articlelike,article.articleunlike,` +
        `user.username from article,user where article.useruid = user.useruid and article.articleuid = ${id};`

        return s
    },

    updateUserById: function (option) {
        const id = option.id || 0
        let s = `update user set `
        for (let i = 0; i< option.item.length; i ++) {
            s += `${option.item[i].name} = '${option.item[i].value}' `
        }
        s += `where useruid = ${id}`
        return s
    },

    updateArticleById: function (option) {
        const id = option.id || 0
        let s = `update article set `
        for (let i = 0; i < option.item.length; i ++) {
            // console.log(option.item[i])
            s += `${option.item[i].name} = '${option.item[i].value}' `
        }
        s += `where articleuid = ${id}`

        return s
    }
}

module.exports = sql