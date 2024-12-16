---
outline: deep
---

# [官网](https://www.electronjs.org/zh/docs/latest/tutorial/quick-start)

## 环境

```bash
node -v
pnpm -v
```

## 创建项目

```bash
mkdir my-electron-app && cd my-electron-app
npm init
npm install electron --save-dev
```

## 打包

```bash
npm install --save-dev @electron-forge/cli
npx electron-forge import
npm run make
```
