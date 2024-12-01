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
