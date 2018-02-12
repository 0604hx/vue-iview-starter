/**
 * 对打包后的文件夹进行压缩
 * Created by zengxm on 2017/5/28.
 */
const fs = require('fs')
const archiver = require("archiver")

var config = require('../config')

const outputFile = fs.createWriteStream("./static.zip")

var archive = archiver('zip')

// listen for all archive data to be written
outputFile.on('close', function() {
    console.log(archive.pointer() + ' total bytes');
    console.log('archiver has been finalized and the output file is:'+outputFile.path);
});

// good practice to catch this error explicitly
archive.on('error', function(err) {
    throw err;
});

archive.pipe(outputFile)
archive.directory(config.build.assetsRoot, false)

console.log("开始压缩前端文件："+config.build.assetsRoot)
archive.finalize()