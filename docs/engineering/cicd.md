---
outline: deep
---

# 持续集成和持续部署

## git Action

::: details deploy.yml

```yaml
name: 任务名称

on:
  push:
    branches: [main] # 指定分支
  workflow_dispatch: # 手动触发

permissions:
  contents: read # 读取内容 
  pages: write # 写入页面
  id-token: write # 写入 ID 令牌

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  # 构建工作
  build:
    runs-on: ubuntu-latest # 运行环境   
    steps:
      - name: Checkout # 检出
        uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - uses: pnpm/action-setup@v3
        with:
          version: 9
      - name: Setup Node # 设置 Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm
      - name: Setup Pages # 设置页面
        uses: actions/configure-pages@v4
      - name: Install dependencies # 安装依赖
        run: pnpm install
      - name: Build with VitePress # 构建
        run: pnpm run docs:build
      - name: Upload artifact # 上传制品
        uses: actions/upload-pages-artifact@v3
        with:
          path: docs/.vitepress/dist

  # 部署工作
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    name: Deploy
    steps:
      - name: Deploy to GitHub Pages # 部署到 GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4

```

:::

## gitlab Action

::: details .gitlab-ci.yml

```yaml
image: node:20
pages:
  cache:
    paths:
      - node_modules/
  script:
    - npm install
    - npm run docs:build
  artifacts:
    paths:
      - public
  only:
    - main
```

:::

## Firebase

::: details firebase.json + .firebaserc

::: code-group

```json [firebase.json]
{
  "hosting": {
    "public": "docs/.vitepress/dist",
    "ignore": []
  }
}
```

``` [.firebaserc]
{
  "projects": {
    "default": "<YOUR_FIREBASE_ID>"
  }
}
```

:::

- 构建 `docs:build`
- 部署 `firebase deploy`
