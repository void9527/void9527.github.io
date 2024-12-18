---
outline: deep
---

# Vue3

## 常用库

:::details

| 工具 | 描述 |
| --- | --- |
|[vxe-table](https://vxeui.com/#/table/api)|超级表格|

:::

## 代码

### 本地免秘钥启动https

:::details vite.config.js

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import basicSSL from "@vitejs/plugin-basic-ssl";
export default defineConfig({
  plugins: [vue(),  basicSSL()],
  server:{
    host:"0.0.0.0"
  }
})

```

:::
