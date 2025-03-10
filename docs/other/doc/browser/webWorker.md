---
outline: deep
---

## WebWorker

:::details 注意事项

- 一般工作用的不多
- 一般做cpu密集型的计算
- 不能操作 DOM
  - Worker 线程所在的全局对象，与主线程不一样，无法读取主线程所在网页的 DOM 对象，也无法使用`document`、`window`、`parent`这些对象。但是，`Worker` 线程可以`navigator`对象和`location`对象。
- 同源限制
- 通信联系
  - Worker 线程和主线程不在同一个上下文环境，它们不能直接通信，必须通过消息完成。
- 脚本限制
  - Worker 线程不能执行`alert()`方法和`confirm()`方法，但可以使用 `XMLHttpRequest` 对象发出 AJAX 请求。
- 文件限制
  - Worker 线程无法读取本地文件，即不能打开本机的文件系统（file://），它所加载的脚本，必须来自网络。
  
:::

## API限制

:::details
> Web Worker 是一个独立于主线程的运行环境，它的设计目的是为了执行一些耗时的任务而不阻塞主线程。由于 Web Worker 没有访问 DOM 的能力，因此许多与DOM 相关的 API 在 Worker 中不可用。以下是 Web Worker 中不能使用的主线程 API 和功能：

1. DOM 相关 API
   - window `对象：Worker` 中没有 `window` 对象，因为它是浏览器的主全局对象，与 DOM 和 UI 相关。
   - document 对象：Worker 无法直接访问 DOM，因此 `document` 及其相关方法（如 document.getElementById、document.querySelector 等）不可用。
   - UI 更新：Worker 无法直接操作 DOM 元素或更新页面内容。

2. UI 相关 API
   - `alert()`、`confirm()`、`prompt()`：这些浏览器弹窗方法与用户交互相关，只能在主线程中使用。
   - `console.log` 的局限性：虽然 console.log 在 Worker 中可用，但输出的内容只能在浏览器的 Worker 控制台中查看，而不是主线程的控制台。

3. 主线程的全局对象和方法
   - `localStorage` 和 `sessionStorage`：这些存储 API 是同步的，且与主线程绑定，因此 Worker 中无法直接使用。可以使用 `IndexedDB` 或 `postMessage` 与主线程通信来间接访问。
   - `XMLHttpRequest`：虽然 `XMLHttpRequest` 在 Worker 中可用，但更推荐使用 `fetch API`。
   - `WebSocket`：Worker 中可以使用 WebSocket，但需要手动管理连接和消息传递。

4. 渲染相关 API
   - Canvas 操作：Worker 无法直接操作 `<canvas>` 元素。可以通过 `OffscreenCanvas`（部分浏览器支持）将 `Canvas` 的控制权转移到 Worker 中。
   - `WebGL`：Worker 中无法直接使用 WebGL，但可以通过 `OffscreenCanvas` 实现。

5. 浏览器特定功能
   - 地理位置 API（`navigator.geolocation`）：Worker 中无法直接使用，需要通过主线程获取位置信息后传递到 Worker。
   - 媒体相关 API（如 `navigator.mediaDevices`）：Worker 中无法直接访问摄像头、麦克风等设备。
   - 剪贴板 API（`navigator.clipboard`）：Worker 中无法直接操作剪贴板。
   - 剪贴板 API（`navigator.clipboard`）：Worker 中无法直接操作剪贴板。
6. 同步 API
   - 同步的 XMLHttpRequest：Worker 中只能使用异步的 XMLHttpRequest，同步版本不可用。
   - 同步的 FileReaderSync：Worker 中可以使用 FileReaderSync，但主线程中不可用。

7. 其他限制
   - importScripts 的限制：Worker 中可以使用 `importScripts` 加载外部脚本，但加载的脚本必须是同源的，且会阻塞 Worker 线程。
   - 无法创建新的 Worker：Worker 中无法再创建嵌套的 Worker（即 new Worker() 不可用）。
  
**Worker 中可用的 API**

- 虽然 Worker 中有很多限制，但它仍然支持许多重要的 API，例如：
  - setTimeout 和 setInterval：用于定时任务。
  - fetch：用于网络请求。
  - IndexedDB：用于存储大量结构化数据。
  - WebSocket：用于实时通信。
  - FileReader：用于读取文件内容。
  - Atomics 和 SharedArrayBuffer：用于多线程之间的共享内存操作（需要谨慎使用）。

:::

## Web Worker中定时器的限制与性能分析

:::details
> 将 JavaScript 中的倒计时和定时器放入 Web Worker 并通过 postMessage 进行通信，虽然可以避免阻塞主线程，但也存在一些限制、性能缺陷和潜在隐患：

1. 通信开销
   - 频繁通信的性能损耗：postMessage 涉及主线程与 Worker 之间的数据序列化和反序列化，频繁通信会增加性能开销，尤其在数据量较大时。
   - 延迟问题：消息传递存在延迟，可能导致倒计时或定时器的执行不够精确。
2. 定时器精度
   - Worker 中的定时器精度受限：Web Worker 中的 setTimeout 和 setInterval 精度不如主线程，尤其在浏览器处于后台或设备资源紧张时，可能导致定时器不准确。
3. 资源消耗
   - 额外的内存和 CPU 开销：每个 Worker 都会占用独立的内存和 CPU 资源，过多的 Worker 会增加整体资源消耗。
   - Worker 生命周期管理：需要手动管理 Worker 的创建和销毁，否则可能导致内存泄漏。
4. 兼容性和调试
   - 兼容性问题：虽然现代浏览器普遍支持 Web Worker，但在某些旧版浏览器或特殊环境中可能不支持。
   - 调试困难：Worker 中的代码调试比主线程复杂，错误排查和日志记录不够直观。
5. 潜在隐患
   - 消息丢失或乱序：在高负载或网络不稳定的情况下，消息可能丢失或乱序，影响倒计时或定时器的准确性。
   - 竞态条件：如果多个 Worker 或主线程同时操作共享数据，可能引发竞态条件，需额外处理同步问题。
6. 适用场景
   - 适合的场景：需要长时间运行或高频率触发的任务，且不涉及 DOM 操作。
   - 不适合的场景：需要高精度定时或频繁更新 UI 的任务。

:::

## 主线程定时器精度问题

:::details
> 在浏览器中，主线程的定时器精度通常比 Worker 中的定时器精度更高。以下是具体原因和对比：

1. 主线程定时器的精度
   - 更高的优先级：主线程是浏览器渲染和用户交互的核心，定时器（如 setTimeout 和 setInterval）在主线程中通常会被优先调度。
   - 更小的延迟：主线程的定时器能够更快响应，尤其是在页面处于前台（active）状态时。
   - 受浏览器优化影响：现代浏览器会对主线程的定时器进行优化，例如将多个短间隔的定时器合并，以减少性能开销。

2. Worker 中的定时器精度
   - 较低的优先级：Worker 是后台线程，其定时器的调度优先级通常低于主线程。
   - 更高的延迟：Worker 中的定时器可能受到浏览器后台调度策略的影响，尤其是在页面处于后台（inactive）状态时，延迟会更明显。
   - 受设备性能影响：在低性能设备或高负载情况下，Worker 中的定时器延迟可能会进一步增加。

3. 影响定时器精度的因素
   - 页面状态：
     - 如果页面处于前台（用户正在交互），主线程和 Worker 的定时器精度都会较高。
     - 如果页面处于后台（例如最小化或切换到其他标签），浏览器可能会降低定时器的精度，尤其是 Worker 中的定时器。
   - 浏览器优化：
     - 现代浏览器（如 Chrome、Firefox）会对后台页面的定时器进行节流（throttling），以减少资源消耗。Worker 中的定时器更容易受到这种节流的影响。
   - 设备性能：
     - 在低性能设备上，Worker 中的定时器延迟可能会更明显。

4. 实际测试结果
   - 根据实际测试，主线程的定时器通常能够更接近预期的触发时间（例如 setTimeout(fn, 10) 可能在 10-12ms 后触发）。
   - Worker 中的定时器可能会有更大的偏差（例如 setTimeout(fn, 10) 可能在 15-20ms 后触发）。
5. 适用场景
   - 主线程定时器：
     - 适合需要高精度定时器的场景，例如动画、游戏或实时 UI 更新。
     - 缺点是可能阻塞主线程，导致页面卡顿。
   - Worker 定时器：
     - 适合不需要高精度但需要长时间运行的任务，例如后台数据处理、轮询等。
     - 优点是不会阻塞主线程，但精度较低。

:::

## 使用案例

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

## Worker 内使用其他的`普通js` 文件

:::details
> `importScripts` 方法确实不支持 ES 模块（ESM）。它只能加载传统的 JavaScript 文件，这些文件使用 var、function 等语法定义全局变量和函数。对于 ES 模块，你需要使用其他方式来加载模块。
:::code-group

```html [index.html]
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<input type="button" id="btn" value="sendMessage" />
<script>
    const worker = new Worker('/worker.js')
    const btn = document.getElementById("btn")
    btn.addEventListener('click', () => {
        worker.onmessage = function (e) {
            console.log(`worker.js${e}`);
        }
        worker.postMessage({ a: 1 })
    })

</script>
</body>

</html>
```

```js [worker.js]
importScripts("/other.js");

this.onmessage = function (e) {
  log(e);
};

```

```js [other.js]
function log(e) {
  console.log(e);
}

```

:::

## Worker加载`esModule`文件

:::details

1. 使用动态引入

   ```js [worker.js]
   let func = null;
   import("/other.js").then((res) => {
   func = res;
   });
   this.onmessage = function (e) {
   func.log(e);
   };

   ```

2. 使用 `<script type="module">` 标签（仅限主线程）
   - 如果你需要在主线程中加载 ES 模块并传递给 Worker，可以先在主线程中加载模块，然后将必要的数据或方法通过 postMessage 发送给 Worker。

   ```html [index.html]
   <script type="module">
      import { someFunction } from './module.js';

      const worker = new Worker('worker.js');
      worker.postMessage({ someFunction });
   </script>
   ```

   ```js [worker.js]
   onmessage = function(e) {
      const { someFunction } = e.data;
      // 使用传递过来的函数
      someFunction();
   };
   ```

3. 将 ES 模块转换为传统脚本

   ```js
   // webpack
   npx webpack --entry ./src/module.js --output ./dist/bundle.js
   // rollup
   npx rollup main.js --file bundle.js --format iife
   npx rollup main.js --file bundle.js --format cjs
   ```

:::
