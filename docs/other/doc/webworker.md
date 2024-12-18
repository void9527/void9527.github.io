---
outline: deep
---

## WebWorker

:::details 注意事项

- 一般工作用的不多
- 一般做cpu密集型的计算
- 不能操作 DOM
  - Worker 线程所在的全局对象，与主线程不一样，无法读取主线程所在网页的 DOM 对象，也无法使用document、window、parent这些对象。但是，Worker 线程可以navigator对象和location对象。
- 同源限制
- 通信联系
  - Worker 线程和主线程不在同一个上下文环境，它们不能直接通信，必须通过消息完成。
- 脚本限制
  - Worker 线程不能执行alert()方法和confirm()方法，但可以使用 XMLHttpRequest 对象发出 AJAX 请求。
- 文件限制
  - Worker 线程无法读取本地文件，即不能打开本机的文件系统（file://），它所加载的脚本，必须来自网络。
:::

## 案例

:::details
:::code-group

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<input type="text" value="" id="text1">
<input type="text" value="" id="text2">
<input type="button" id="btn">
<script>
  window.onload = function () {
    let text1 = document.getElementById( 'text1' );
    let text2 = document.getElementById( 'text2' );
    let btn = document.getElementById( 'btn' );
    let workers = new Worker( 'worker.js' );
    btn.onclick = function () {
      let n1 = parseInt( text1.value );
      let n2 = parseInt( text2.value );
      // 1、创建 worker 对象
      // 2、发送数据
      workers.postMessage( { n1, n2 } );
      // 5、接收处理结果
      workers.onmessage = function ( ev ) {
        console.log( ev.data );
        // 6、关闭线程
        workers.terminate();
      };
    };
  };
</script>
</body>
</html>

```

```js [worker.js]
  // 3、接收数据
this.onmessage = function ( ev ) {
  let { n1, n2 } = ev.data;
  // 4、发送处理结果
  this.postMessage( n1 + n2 );
};
```

:::
