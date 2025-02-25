---
outline: deep
---
## assetFileNames、chunkFileNames 和 entryFileNames 
1. assetFileNames
   - 作用：控制静态资源文件（如 CSS、图片、字体等非 JavaScript 文件）的输出名称。
   - 适用场景：当使用 import 或 rollup.emitFile 引入资源时，这些文件会按此规则命名。
   - 默认值：`'assets/[name]-[hash][extname]'`。
   ```javascript
    // rollup.config.js
    export default {
        output: {
          assetFileNames: 'static/[name]-[hash][extname]'
        }
    };
    ```
   - 资源文件会输出为 static/logo-abc123.png。
2. chunkFileNames
   - 作用：控制代码分割后生成的 Chunk 文件（非入口 Chunk）的名称。
   - 适用场景：动态导入（如 import()）或代码分割生成的异步加载模块。
   - 默认值：`'[name]-[hash].js'`（实际文件名包含哈希以确保唯一性）。
   ```javascript
    output: {
      chunkFileNames: 'chunks/[name]-[hash].js'
    }
    ```
   - 动态导入的模块会输出为 `chunks/utils-xyz789.js`
3. entryFileNames
   - 作用：控制入口文件生成的 Bundle 的名称。
   - 适用场景：直接通过 input 配置的入口文件（如多入口打包）。
   - 默认值：`'[name].js'`
   ```javascript
      input: ['main.js', 'admin.js'],
      output: {
        entryFileNames: 'entry-[name].js'
      }
    ```
  - 入口文件会输出为 `entry-main.js` 和 `entry-admin.js`

> 关键区别总结

| 选项	            | 控制对象             | 	典型使用场景                      | 	默认命名规则                        |
|----------------|------------------|------------------------------|--------------------------------|
| assetFileNames | 	静态资源文件（CSS、图片等） | 	资源文件通过 import 或 emitFile 引入 | 	assets/[name]-[hash][extname] |
| chunkFileNames | 	代码分割后的非入口 Chunk | 	动态导入（import()）或代码分割         | 	[name]-[hash].js              |
| entryFileNames | 	入口文件生成的 Bundle  | 	多入口配置（input 数组）             | 	[name].js                     |

>覆盖规则

- 入口 Chunk 优先使用 entryFileNames，而非入口 Chunk（如代码分割的异步模块）使用 chunkFileNames。
- 资源文件始终使用 assetFileNames。

> 示例配置

```javascript
// rollup.config.js
export default {
    input: ['src/main.js', 'src/admin.js'],
    output: {
        dir: 'dist',
        format: 'esm',
        // 入口文件命名规则
        entryFileNames: 'entries/[name]-entry.js',
        // 非入口 Chunk 命名规则
        chunkFileNames: 'chunks/[name]-[hash].js',
        // 资源文件命名规则
        assetFileNames: 'assets/[name]-[hash][extname]'
    }
};
```
- 输出结构可能为：
```text
dist/
├─ entries/main-entry.js       # 入口 Bundle
├─ entries/admin-entry.js      # 入口 Bundle
├─ chunks/utils-abc123.js      # 动态导入的 Chunk
└─ assets/logo-xyz789.png      # 静态资源
```


