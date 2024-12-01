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
