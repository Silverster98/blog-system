const fs = require('fs')
const helper = require('./helper')
const sql = require('./sql')
const b64 = require('../util/b64file')

// helper.getUserASLByUserId(0).then((res) => {
//     console.log(res)
// }).catch((err) => {
//     console.log(err)
// })

const filepath = '../img/testfigure.jpg'
const b64str = b64.base64EncodeFile(filepath)
const avatarStr = "data:image/jpeg;base64," + b64str
const option = {
    id: 1,
    item: [
        {name: 'useravatar', value: avatarStr}
    ]
}
helper.updateUserById(option).then((res) => {
    console.log(res)
}).catch((err) => {
    console.log(err)
})

// const data = fs.readFileSync('D:/web/web note/note1.md')
// // console.log(data.toString())

// const option = {
//     id: 1,
//     item: [
//         {name: 'articlecontent', value: data.toString()}
//     ]
// }

// helper.updateArticleById(option).then((res) => {
//     console.log(res.affectedRows)
// }).catch((err) => {
//     console.log(err)
// })




