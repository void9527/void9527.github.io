---
outline: deep
---

# 代码片段

## 标题闪烁

- 浏览器窗体获得焦点停止标题闪烁通知/失去焦点则开启标题闪烁通知
::: details 代码

```js
var titleInit = document.title, isShine = true;
setInterval(function() {
    var title = document.title;
    if (isShine == true) {
        if (/新/.test(title) == false) {
            document.title = '【你有新消息】';
        } else {
            document.title = '【　　　　　】';
        }
    } else {
        document.title = titleInit;
    }
}, 500);

// for Chrome and FireFox
window.onfocus = function() {
    console.log(123);
    isShine = false;
};
window.onblur = function() {
    isShine = true;
};

// for IE
document.onfocusin = function() {
    isShine = false;
};
document.onfocusout = function() {
    isShine = true;
};
```

:::

## 使用 img 实现测试网速

::: details 代码

```js
setInterval("getSpeed()", 1000);
function getSpeed(){
  var startTime = new Date().getTime();
  var img = new Image();
  img.src = "http://www.haosailbio.com/content/images/thumbs/default-image_600.png?timeStamp=" + startTime;
  img.onload = function(){
    // 图片大小
    var size = 600 * 1000;
    var endTime = new Date().getTime();
    var speed = parseInt(size / (endTime - startTime));
    var unit = "KB/S";
    if (speed >= 1024) {
      speed = (speed / 1024).toFixed(2);
      unit = "MB/S";
    }
    document.getElementById("box").innerHTML = "当前带宽："+ speed + unit + "<br/>请求用时：" + (endTime - startTime) / 1000 + "s";
  };
}
```

:::

## 网络直播

::: details 代码

::: code-group

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <video id="video" class="video-bg"></video>
  <canvas id="qrCanvas" class="qr-canvas"></canvas>
  <div id="imageWarp" class="image-warp"></div>
  <button type="button" onclick="window.MyCamera.openMedia()">开启</button>
  <button type="button" onclick="window.MyCamera.closeMedia()">关闭</button>
  <button type="button" onclick="window.MyCamera.drawMediaAndToImg()">拍摄</button>
  <script src="./base.js"></script>
  <script>
    window.onload = function () {
      window.MyCamera = new CameraInit(document.getElementById("video"), document.getElementById("qrCanvas"));
    }
  </script>
</body>
</html>
```

```js
var CameraInit=(function(window,document,undefined){
  function MyCamera(videoDom,canvasDom) {
      this.mediaOpts = {
          audio: true,
          video: { facingMode: { exact: "environment" } }// 或者 "user"
          // video: { width: 1280, height: 720 }
          // video: { facingMode: { exact: "environment" } }// 或者 "user"
      }
      this.video=videoDom;
      this.canvas1=canvasDom;
      this.context1 = this.canvas1.getContext('2d');
      this.mediaStreamTrack = null;
      this.checkEnvironment();
  }
  MyCamera.prototype = {
      checkEnvironment: function() {
          window.URL = (window.URL || window.webkitURL || window.mozURL || window.msURL);
          if (navigator.mediaDevices === undefined) {
              navigator.mediaDevices = {};
          }
          if (navigator.mediaDevices.getUserMedia === undefined) {
              navigator.mediaDevices.getUserMedia = function(constraints) {
                  var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
                  if (!getUserMedia) {
                      return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
                  }
                  return new Promise(function(resolve, reject) {
                      getUserMedia.call(navigator, constraints, resolve, reject);
                  });
              }
          }
      },
      // 回调
      successFunc: function(stream) {
          this.mediaStreamTrack = stream;
          this.video = document.querySelector('video');
          if ("srcObject" in this.video) {
              this.video.srcObject = stream
          } else {
              this.video.src = window.URL && window.URL.createObjectURL(stream) || stream
          }
          this.video.play();
      },
      errorFunc:function(err) {
          alert(err.name);
      },
      // 正式启动摄像头
      openMedia: function(){
          navigator.mediaDevices.getUserMedia(this.mediaOpts).then(this.successFunc.bind(this)).catch(this.errorFunc.bind(this));
      },
      //关闭摄像头
      closeMedia: function(){
          var that=this;
          that.mediaStreamTrack.getVideoTracks().forEach(function (track) {
              track.stop();
              that.context1.clearRect(0, 0,that.context1.width, that.context1.height);//清除画布
          });
      },
      //截取视频并转为图片
      drawMediaAndToImg: function(){
          this.canvas1.setAttribute("width", this.video.videoWidth);
          this.canvas1.setAttribute("height", this.video.videoHeight);
          this.context1.drawImage(this.video, 0, 0, this.video.videoWidth, this.video.videoHeight);//显示在canvas中
          var image = new Image();
          image.src = this.canvas1.toDataURL('image/png')
          var imageWarp = document.getElementById("imageWarp");
          if(imageWarp.hasChildNodes()) {
              document.getElementById("imageWarp").replaceChild(image, imageWarp.firstChild);
          }else{
              document.getElementById("imageWarp").appendChild(image);
          }
      },
  };
  return MyCamera;
})(window,document)
```

:::

## webSocket

::: details 代码

::: code-group

```html [client.html]
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Title</title>
  <script src="http://localhost:8080/socket.io/socket.io.js"></script>
  <script>
    let socket = io.connect('ws://localhost:8080');
    // 发送数据
    socket.emit('message', 12, 5);
    socket.on('message', (res) => {
      console.log(res);
    });
  </script>
</head>
<body>
</body>
</html>
```

```js [server.js]
const http = require('http');
const io = require('scoket.io');
let httpServer = http.createServer((req, res) => {});
httpServer.listen(8080);
let wsServer = io.listen(httpServer);
wsServer.on('connection', (socket) => {
    socket.emit('message', '数据');
    socket.on('message', (a, b) => {
        socket.emit('message', a, b, a + b);
    });
});
```

:::

## 实现下载进度条

:::details
:::code-group

```js [xhr]
export function request(options = {}) {
  // 首先我们在配置里加入一个 onProgress
  // 这个 onProgress 要传递一个函数
  // 没每当服务器完成了一小段数据的加载之后，我们就会调用这个函数
  // 并且返回目前的加载量以及总量
  const { url, method = "GET", onProgress, data = null } = options;
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", () => {
      if (xhr.readyState === xhr.DONE) {
        resolve(xhr.responseText);
      }
    });
    // xhr 给我们提供了一个 progress 事件，这里的 progress 事件只监听响应。
    // 每当服务器传输完一小段数据之后就会触发 progress 事件
    xhr.addEventListener("progress", (e) => {
      // 在事件 e 里包含了总量与加载量，我们打印到控制台
      // e.loaded 当前加载量
      // e.total 总量
        console.log(e.loaded, e.total);
        onProgress && onProgress({
          loaded: e.loaded,
          total: e.total,
        });
    });
    xhr.open(method, url);
    xhr.send(data);
  });
}

```

```js [fetch]
export function request(options = {}) {
  // 在配置里加入一个 onProgress
  const { url, method = "GET", onProgress, data = null } = options;
  return new Promise(async (resolve) => {
    const resp = await fetch(url, {
      method,
      body: data,
    });
    // 通过 content-length 得到总量
    const total = +resp.headers.get("content-length");
    const reader = resp.body.getReader();
    // 声明一个变量用来储存读取的量
    let loaded = 0;
    // promise 最后的完成需要把所有的数据拼接起来返回
    // 所以定一个变量用来储存数据拼接的值
    let body = "";
    // 这个数据可能是二进制，那就要使用 arrayBuffer
    // 也可能是文本，就要使用文本解码器
    // 比如说我们这里是文本，我们先定一个解码器
    const decoder = new TextDecoder();
    while (1) {
      const { value, done } = await reader.read();
      if (done) {
        break;
      }
      // 每一次读取都累加起来
      loaded += value.length;
      // 每一次读取都对数据解码并拼接起来
      body += decoder.decode(value);
      // 当然在每一次读取的时候都要像 xhr 一样，把总量和读取量返回
      onProgress &&
        onProgress({
          loaded,
          total,
        });
    }
    // Promise 完成并返回数据
    resolve(body);
  });
}


```

```js [fetch加强版]
fetch(url)
    .then((response) => {
        if (response.status === 200) {
         // 进度条相关
         // 获取 Response 对象的 body 属性的读取器（reader）。body 属性是一个可读的流（ReadableStream），可以用来读取响应体的数据。
            const reader = response.body.getReader();
            const contentLength = +response.headers.get('Content-Length');
            let receivedLength = 0;
            let chunks = [];
            // 读取一个数据块。这个方法返回一个 Promise，当一个数据块被读取时，这个 Promise 就会解析为一个包含 done 和 value 属性的对象。done 属性表示是否已经读取完所有数据，value 属性是一个 Uint8Array，包含了读取到的数据块。
            return reader.read().then(function processChunk({ done, value }) {
                if (done) {
                    console.log('下载完成');
                    // 将 chunks 数组中的所有数据块复制到一个新的 Uint8Array 中，然后使用这个 Uint8Array 创建一个 Blob 对象
                    let data = new Uint8Array(receivedLength);
                    let position = 0;
                    for(let chunk of chunks) {
                        data.set(chunk, position);
                        position += chunk.length;
                    }
                    return new Blob([data]);
                }
                // 将读取到的数据块添加到 chunks 数组中。
                chunks.push(value);
                // 更新已接收的数据长度。
                receivedLength += value.length;
                console.log(`已下载：${receivedLength}，总大小：${contentLength}`);
                // 递归调用 reader.read()，直到读取完所有数据。
                return reader.read().then(processChunk);
            });
        } else {
           console.log('下载失败')
        }
    })
    .then((blob) => {
        const blobUrl = window.URL.createObjectURL(blob)
        const aEl = document.createElement('a')
        aEl.href = blobUrl
        aEl.download = filename
        aEl.click()
        window.URL.revokeObjectURL(blobUrl)
        console.log("下载成功")
    })
    .finally(() => {
     // xxx
    })

```

:::

## 实现上传进度条

:::details

:::code-group

```js [xhr]
// xhr 中给我们提供了一个事件叫 upload
// upload 里有一个事件叫 progress， upload 里的 progress 事件只监听请求。
// 它的事件 e 里仍然提供了
// e.loaded 和 e.total
// 所以 xhr 中实现上传就比较简单
xhr.upload.addEventListener("progress", (e) => {});

```

```md [fetch]
- 在fetch就很遗憾了，没有办法实现。
- 因为fetch的思路是流，然而流有一个特点就是只能被一个人读区，请求里面的流被浏览器读区了，浏览器读出来发送给了服务端，我们就读不到了（上传服务器和事件里面获取是两次操作），浏览器在读的过程中不会告诉我们读区了多少。
- 目前W3C也在计划一个方案，附带在ServiceWork里面有一个API：BackgroundFetchManager。这个API可以实现请求进度的监听，不过目前还在实验中，正式环境还没有开放。
```

:::

## 上传图片

:::details

```js
// 图片上传
// 接口需要的参数类型是 Content-Type：multipart/form-data
async upload(files: File): Promise<void> {
    const data = new FormData()
    // data.append('参数名','你要传的file文件'); //如果还有其他参数复制就行了
    data.append('参数名', files[0])
    await axios.post('接口地址',data).then((res) => {...})
    
}

// 上传图片
const handleUpload = async(files) => {
    await upload(files).then(() => {
        console.log("上传成功...“)
    })
}

```

:::

## blob 文件下载

::: details

```js
const res = await Axios.post(url, "需要的参数", {
    responseType: 'blob'
})

if (res.status === 200 && res.data) {
    const blobUrl = window.URL.createObjectURL(res.data)
    const filename = '文件名字.文件格式'
    const a = document.createElement('a')
    a.href = blobUrl
    a.download = filename
    a.click()
    window.URL.revokeObjectURL(blobUrl)
}
```

:::
