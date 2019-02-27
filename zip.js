/**
 * 对打包后的文件夹进行压缩
 * Created by zengxm on 2017/5/28.
 */
const fs = require('fs')
const archiver = require("archiver")

var dist = './dist'
var zipFile = "./static.zip"

const outputFile = fs.createWriteStream(zipFile)

var archive = archiver('zip')

// listen for all archive data to be written
outputFile.on('close', function() {
    console.log(archive.pointer() + ' total bytes');
    console.log('archiver has been finalized and the output file is:'+outputFile.path);
    outputFile.end()

    //拷贝文件到 ../target 下
    // let copyTo = "../target/static.zip"
    // fs.copyFile(zipFile, copyTo, err=>{
    //     if(!!err)
    //         console.error("拷贝文件出错：", err)
    //     else
    //         console.log("拷贝压缩后的前端文件到 "+copyTo)
    // })
});

// good practice to catch this error explicitly
archive.on('error', function(err) {
    throw err;
});

archive.pipe(outputFile)
archive.directory(dist, false)

console.log("开始压缩前端文件："+dist)
archive.finalize()