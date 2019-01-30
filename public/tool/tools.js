function binToHex (bin, option) {
    return binToDec(bin).toString(16)
}

function hexToBin (hex, option) {
    return hexToDec(hex).toString(2)
}

function binToDec (bin, option) {
    return parseInt(bin, 2)
}

function decToBin (dec, option) {
    return parseInt(dec).toString(2)
}

function decToHex (dec, option) {
    return parseInt(dec).toString(16)
}

function hexToDec (hex, option) {
    return parseInt(hex, 16)
}

// 两次反转，效率较低
function binFormat (binStr, option) {
    let newStr = ''
    binStr = binStr.split('').reverse().join('')
    for (let i = 0; i < binStr.length; i += 4) {
        let tmp = binStr.substring(i, i + 4)
        newStr += tmp + ' '
    }
    // 去除最后一个空格
    newStr = newStr.substring(0, newStr.length - 1) 
    return newStr.split('').reverse().join('')
}

function hexFormat (hexStr, option) {
    let newStr = ''
    for (let i = 0; i < hexStr.length; i++) {
        let tmp = hexStr.substring(i, i + 1)
        newStr += tmp + '    '
    }
    return newStr.substring(0, newStr.length - 4)
}

function binToAll (bin, option) {
    bin = bin.replace(/\s+/g, '')
    if (!(/^[0-1]+$/.test(bin))) {
        return {result : 0, message : '[ERROR] 非二进制字符'}
    }

    let binformat = binFormat(bin)
    let hexformat = hexFormat(binToHex(bin))
    let dec = binToDec(bin)
    const pos = binformat.indexOf(' ')

    for (let i = 1; i < pos; i++) hexformat = (' ' + hexformat)
    
    return {
        result : 1,
        origin : bin,
        Dec : dec,
        Bin : binformat,
        Hex : hexformat
    }
}

function hexToAll (hex, option) {
    hex = hex.replace(/\s+/g, '')
    if (!(/^[0-9abcdef]+$/.test(hex))) {
        return {result : 0, message : '[ERROR] 非十六进制字符'}
    }

    let binformat = binFormat(hexToBin(hex))
    let hexformat = hexFormat(hex)
    let dec = hexToDec(hex)
    const pos = binformat.indexOf(' ')

    for (let i = 1; i < pos; i++) hexformat = (' ' + hexformat)
    
    return {
        result : 1,
        origin : hex,
        Dec : dec,
        Bin : binformat,
        Hex : hexformat
    }
} 

function decToAll (dec, option) {
    if (!(/^[0-9]+$/.test(dec))) {
        return {result : 0, message : '[ERROR] 非十进制字符'}
    }

    let binformat = binFormat(decToBin(dec))
    let hexformat = hexFormat(decToHex(dec))
    const pos = binformat.indexOf(' ')

    for (let i = 1; i < pos; i++) hexformat = (' ' + hexformat)

    return  {
        result : 1,
        origin : dec,
        Dec : dec,
        Bin : binformat,
        Hex : hexformat
    }
}

function printFormat (format) {
    // console.log(format)
    if (format.result === 0) {
        console.log(format.message)
        return
    }
    console.log('[origin] : ' + format.origin)
    console.log('[Dec]    : ' + format.Dec)
    console.log('[Bin]    : ' + format.Bin)
    console.log('[Hex]    : ' + format.Hex)
    console.log('\n')
}