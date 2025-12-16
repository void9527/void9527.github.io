## 已经正式内置的社区包

### 1. test runner (v18.0.0+)

- 替代：Mocha、Jest、AVA 的部分功能
- 来源：Node.js 团队重新设计，但理念来自社区

```javascript
import test from 'node:test';
import assert from 'node:assert';

test('异步测试', async (t) => {
    const result = await someAsyncFunction();
    assert.strictEqual(result, 'expected');
});
```

### 2. watch mode (v18.7.0+)

- 替代：nodemon、node-dev
- 来源：长期社区需求，终于官方实现

```bash
node --watch app.js
node --watch-path=./src app.js  # 监视特定目录
```

### 3. built-in .env 支持 (v20.6.0+)

- 替代：dotenv
- 来源：社区广泛使用 dotenv

```bash
node --env-file=.env app.js
node --env-file=.env.production --env-file=.env app.js
```

### 4. fetch API (v18.0.0+)

- 替代：node-fetch、axios、got
- 来源：undici + Web Fetch API 标准

```javascript
const response = await fetch('https://api.example.com');
const data = await response.json();
```

### 5. Web Streams API (v16.5.0+ 实验，v18.0.0+ 稳定)

- 替代：web-streams-polyfill、各种流处理库
- 来源：WHATWG Streams 标准

```javascript
import {ReadableStream, WritableStream} from 'node:stream/web';

const readable = new ReadableStream({
    start(controller) {
        controller.enqueue('Hello');
        controller.close();
    }
});
```

### 6. node:diagnostics_channel (v15.1.0+)

- 替代：各种诊断和监控库
- 来源：OpenTelemetry 等可观测性工具的启发

```javascript
import diagnostics_channel from 'node:diagnostics_channel';

const channel = diagnostics_channel.channel('my-channel');
channel.subscribe((message) => {
    console.log('收到诊断消息:', message);
});
```

### 7. Permission Model (v20.0.0+ 实验)

- 替代：各种沙箱和权限控制库
- 来源：Deno 的权限模型启发

```bash
node --experimental-permission --allow-fs-read=/home/user app.js
```
