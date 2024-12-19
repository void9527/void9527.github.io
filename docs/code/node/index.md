---
outline: deep
---

## 视频流播放

- 支持跳点播放。

::: details 代码

```js
import { createServer, request } from "node:http";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
const videoPath = "./video.mp4";
createServer(async (req, res) => {
  if (req.url === "/") {
    res.end(
      `
        <video src="/video.mp4" controls width="500"></video>
      `
    );
  } else if (req.url === "/video.mp4") {
    let range = req.headers["range"];
    if (!range) {
      createReadStream(videoPath).pipe(res);
    } else {
      let stats = await stat(videoPath);
      let r = range.match(/=(\d+)-(\d+)?/);
      let start = parseInt(r[1], 10);
      let end = r[2] ? parseInt(r[2], 10) : start + 1024 * 1024;
      if (end > stats.size - 1) {
        end = stats.size - 1;
      }
      let head = {
        "Content-Range": `bytes ${start}-${end}/${stats.size}`,
        "Accept-Ranges": "bytes",
        "Content-Length": end - start + 1,
        "Content-Type": "video/mp4",
      };
      res.writeHead(206, head);
      createReadStream(videoPath, { start, end }).pipe(res);
    }
  }
}).listen(3000);
```

:::

## 大文件上传

- 块大小：定义块的大小，通常为1MB。
- 前端实现
  - 记录上传进度：在本地存储中记录已上传的块。
  - 检查已上传块：在上传前检查哪些块已经上传，避免重复上传。
- 后端实现
  - 保存块到服务器：将上传的块保存到服务器上的指定位置。
  - 合并块：当所有块上传完毕后，将它们合并成一个完整的文件。

:::details 支持断点续传

::: code-group

```js [server.js]
const express = require('express');
const fs = require('fs');
const app = express();

app.post('/upload', (req, res) => {
    const { chunk, index, totalChunks } = req.body;
    const filePath = `./uploads/chunk_${index}`;

    // 检查块是否已存在
    if (fs.existsSync(filePath)) {
        return res.sendStatus(200);
    }

    // 保存块到服务器
    fs.writeFileSync(filePath, chunk);

    // 检查是否所有块都上传完毕
    if (index + 1 === totalChunks) {
        mergeChunks(totalChunks);
    }

    res.sendStatus(200);
});

function mergeChunks(totalChunks) {
    const writeStream = fs.createWriteStream('./uploads/complete_file');
    
    for (let i = 0; i < totalChunks; i++) {
        const chunkPath = `./uploads/chunk_${i}`;
        const data = fs.readFileSync(chunkPath);
        writeStream.write(data);
        fs.unlinkSync(chunkPath); // 删除块文件
    }

    writeStream.end();
}

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
```

```js [client.js]
function uploadFile(file) {
    const chunkSize = 1024 * 1024; // 1MB
    const totalChunks = Math.ceil(file.size / chunkSize);
    const uploadedChunks = JSON.parse(localStorage.getItem('uploadedChunks') || '{}');

    for (let i = 0; i < totalChunks; i++) {
        if (!uploadedChunks[i]) { // 仅上传未上传的块
            const start = i * chunkSize;
            const end = Math.min(file.size, start + chunkSize);
            const chunk = file.slice(start, end);

            uploadChunk(chunk, i, totalChunks, uploadedChunks);
        }
    }
}

function uploadChunk(chunk, index, totalChunks, uploadedChunks) {
    const formData = new FormData();
    formData.append('chunk', chunk);
    formData.append('index', index);
    formData.append('totalChunks', totalChunks);

    fetch('/upload', {
        method: 'POST',
        body: formData,
    }).then(response => {
        if (response.ok) {
            uploadedChunks[index] = true;
            localStorage.setItem('uploadedChunks', JSON.stringify(uploadedChunks));
            console.log(`Chunk ${index + 1}/${totalChunks} uploaded.`);
        }
    });
}
```

:::

## ssh 上传文件

:::details 压缩并上传到远程服务器

```js
const path = require('path');
const archiver =require('archiver');
const fs = require('fs');
const node_ssh = require('node-ssh');
const ssh = new node_ssh();
const configs = {
  host:'xxx.xxx.xxx.xxx',
  username:'xxxx',
  password:'xxxxxxxxx',
  serverPath:'/xxx/xxxx/xxxx',
  localPath:path.resolve(__dirname,'./dist')
};
console.log('开始压缩dist目录...');
startZip();
//压缩dist目录为public.zip
function startZip() {
    var archive = archiver('zip', {
        zlib: { level: 5 } //递归扫描最多5层
    }).on('error', function(err) {
        throw err;//压缩过程中如果有错误则抛出
    });
    var output = fs.createWriteStream(__dirname + '/dist.zip')
     .on('close', function(err) {
         /*压缩结束时会触发close事件，然后才能开始上传，
           否则会上传一个内容不全且无法使用的zip包*/
         if (err) {
            console.log('关闭archiver异常:',err);
            return;
         }
         console.log('已生成zip包');
         console.log('开始上传dist.zip至远程机器...');
         uploadFile();
     });
    archive.pipe(output);//典型的node流用法
    archive.directory(configs.localPath,'/dist');//将srcPach路径对应的内容添加到zip包中/public路径
    archive.finalize();
}
//将dist目录上传至正式环境
function uploadFile() {
    ssh.connect({ //configs存放的是连接远程机器的信息
        host: configs.host,
        username: configs.username,
        password: configs.password,
        port:22 //SSH连接默认在22端口
    }).then(function () {
        //上传网站的发布包至configs中配置的远程服务器的指定地址
        ssh.putFile(__dirname + '/dist.zip', configs.serverPath+'/dist.zip').then(function(status) {
                console.log('上传文件成功');
                console.log('开始执行远端脚本');
                startRemoteShell();//上传成功后触发远端脚本
          }).catch(err=>{
             console.log('文件传输异常:',err);
             process.exit(0);
          });
    }).catch(err=>{
        console.log('ssh连接失败:',err);
        process.exit(0);
    });
}
//执行远端部署脚本
function startRemoteShell() {
    //在服务器上cwd配置的路径下执行sh deploy.sh脚本来实现发布
    ssh.execCommand('sh xxx.sh', { cwd: configs.serverPath }).then(function(result) {
        console.log('远程STDOUT输出: ' + result.stdout)
        console.log('远程STDERR输出: ' + result.stderr)
        if (!result.stderr){
            console.log('发布成功!');
            process.exit(0);
        }
    });
}

```

:::
