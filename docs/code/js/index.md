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
