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

[GitHub Pages Action](https://github.com/actions)

| 仓库 | 描述 |
| ---- | ---- |
| [actions/deploy-pages](https://github.com/actions/deploy-pages) | 用于将构建的静态网站部署到 GitHub Pages |
| [actions/upload-pages-artifact](https://github.com/actions/upload-pages-artifact) | 上传 GitHub Pages 制品 |
| [actions/checkout](https://github.com/actions/checkout) | 检出代码 |
| [actions/setup-node](https://github.com/actions/setup-node) | 设置 Node |
| [actions/setup-pages](https://github.com/actions/setup-pages) | 设置页面 |
| [actions/configure-pages](https://github.com/actions/configure-pages) | 配置页面 |
| [actions/setup-python](https://github.com/actions/setup-python) | 用于设置 Python 环境，支持指定 Python 版本 |

::: details setup-pages 和 configure-pages 的区别

> setup-pages 和 configure-pages 是 GitHub Actions 中用于处理 GitHub Pages 的两个不同的 Action，它们在功能和用途上有一些区别：

- actions/setup-pages
  - 功能: actions/setup-pages 主要用于准备 GitHub Pages 的部署环境。它设置必要的环境变量和目录结构，以便后续步骤可以将构建的静态文件部署到 GitHub Pages。
  - 用途: 通常在工作流中用于初始化和准备 GitHub Pages 的部署环境。
  - 使用场景: 在构建和部署静态网站的工作流中，作为准备步骤使用。

- actions/configure-pages
  - 功能: actions/configure-pages 用于配置 GitHub Pages 的设置，比如发布源、分支和目录等。它可以帮助自动化配置 GitHub Pages 的发布选项。
  - 用途: 主要用于设置和更新 GitHub Pages 的配置。
  - 使用场景: 在需要自动化配置 GitHub Pages 发布设置的工作流中使用。

总结

- setup-pages: 侧重于环境准备，确保部署过程顺利进行。
- configure-pages: 侧重于配置管理，自动化设置 GitHub Pages 的发布选项。

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
