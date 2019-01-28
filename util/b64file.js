const fs = require('fs')

function base64EncodeFile (file) {
    var bitmap = fs.readFileSync(file);
    return new Buffer(bitmap).toString('base64');
}

function base64DecodeFile(base64str, file) {
    var bitmap = new Buffer(base64str, 'base64');
    fs.writeFileSync(file, bitmap);
    // console.log('******** File created from base64 encoded string ********');
}

// const filepath = '../img/testfigure.jpg'

// let b64str = base64EncodeFile(filepath)
// console.log(b64str)

module.exports = {
    base64EncodeFile: base64EncodeFile,
    base64DecodeFile: base64DecodeFile
}