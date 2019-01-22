const path = require('path');
const glob = require('glob');
const fs = require('fs');

let dirSrc = path.resolve(__dirname, '../src/pages');

/*
 * 入口文件
 * */
const htmlArray = [
    {
        entryName: 'index/index',
        entry: path.resolve(dirSrc, 'index/index.js'),
        filename: 'index.html',
        template: path.resolve(dirSrc, 'index.html')
    }
];

let excludeDirs = ['index'];
let firstDirPages = fs.readdirSync(dirSrc).filter(function (dirName) {
    return excludeDirs.indexOf(dirName) === -1 && fs.statSync(dirSrc + '/' + dirName).isDirectory()
})

firstDirPages.forEach(getAllPages);

function getAllPages(dirName) {
    let pagePath = path.resolve(dirSrc, dirName);
    let files = fs.readdirSync(pagePath);
    let fileHtml = '',
        fileJs = '';
    glob.sync(`./src/pages/${dirName}/*.html`).forEach(name => {
        fileHtml = getFileName(name);
    })
    glob.sync(`./src/pages/${dirName}/*.js`).forEach(name => {
        fileJs = getFileName(name);
    })
    htmlArray.push({
        entryName: dirName + '/' + fileHtml,
        entry: path.resolve(dirSrc, dirName, fileJs + '.js'),
        filename: dirName + '/' + fileHtml + '.html',
        template: path.resolve(dirSrc, dirName + '/' + fileHtml + '.html')
    })

    let subDirs = files.filter(function (file) {
        return file !=='img' && fs.statSync(pagePath + '/' + file).isDirectory()
    }).map(function (subName) {
        return dirName + '/' + subName
    })

    if (subDirs.length) {
        subDirs.forEach(getAllPages)
    }
}

function getFileName(str) {
    let arr = str.split('/');
    let name = arr[arr.length - 1].split('.')[0];
    return name;
}

const envList = new Map();
envList.set('development',{
    assetsPublicPath: '/dist/'
}).set('production',{
    // 可配置 CDN
    assetsPublicPath: 'http://127.0.0.1:5500/dist/'
    // assetsPublicPath: '/'
})

const assetsPublicPath = envList.get(process.env.NODE_ENV);

module.exports = {
    entries: htmlArray,
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'assets',
    commonsChunkName: ['vendor'],
    dev: assetsPublicPath,
    test: assetsPublicPath,
    build: assetsPublicPath
  }