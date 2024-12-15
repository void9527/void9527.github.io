---
outline: deep
---
# 环境配置

## Docker

::: details

```dockerfile [.Dockerfile]
FROM node:18
```

:::

## Tauri

::: details
::: code-group

```sh [创建项目]
pnpm create tauri-app
```

```yaml [Github Actions]
name: "Deploy Tauri-app"

on:
  push:
    branches: [main]

  workflow_dispatch:

jobs:
  publish-tauri:
    permissions:
      contents: write
    strategy:
      fail-fast: false
      matrix:
        include:
          - platform: "macos-latest" # for Arm based macs (M1 and above).
            args: "--target aarch64-apple-darwin"
          - platform: "macos-latest" # for Intel based macs.
            args: "--target x86_64-apple-darwin"
          - platform: "ubuntu-22.04"
            args: ""
          - platform: "windows-latest"
            args: ""

    runs-on: ${{ matrix.platform }}
    steps:
      - uses: actions/checkout@v4

      - name: install dependencies (ubuntu only)
        if: matrix.platform == 'ubuntu-22.04' # This must match the platform value defined above.
        run: |
          sudo apt-get update
          sudo apt-get install -y libwebkit2gtk-4.1-dev libappindicator3-dev librsvg2-dev patchelf

      - name: Setup pnpm
        uses: pnpm/action-setup@v3
        with:
          version: 9

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: lts/*
          cache: "pnpm" # Set this to npm, yarn or pnpm.

      - name: install Rust stable
        uses: dtolnay/rust-toolchain@stable # Set this to dtolnay/rust-toolchain@nightly
        with:
          # Those targets are only used on macos runners so it's in an `if` to slightly speed up windows and linux builds.
          targets: ${{ matrix.platform == 'macos-latest' && 'aarch64-apple-darwin,x86_64-apple-darwin' || '' }}

      - name: Rust cache
        uses: swatinem/rust-cache@v2
        with:
          workspaces: "./src-tauri -> target"

      - name: install frontend dependencies
        # If you don't have `beforeBuildCommand` configured you may want to build your frontend here too.
        run: pnpm install # change this to npm or pnpm depending on which one you use.

      - uses: tauri-apps/tauri-action@v0
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tagName: app-v__VERSION__ # the action automatically replaces \_\_VERSION\_\_ with the app version.
          releaseName: "App v__VERSION__"
          releaseBody: "See the assets to download this version and install."
          releaseDraft: true
          prerelease: false
          args: ${{ matrix.args }}

```

:::

## Taro

- [Taro](https://taro-docs.jd.com/docs/)
::: details
::: code-group

```sh [安装]
pnpm add -g @tarojs/cli
```

```sh [检测]
taro --version
```

```sh [信息查看]
npm info @tarojs/cli
```

```sh [创建项目]
taro init [project-name]
```

:::

## Rust

- [cargo](https://doc.rust-lang.org/stable/cargo/index.html)
::: details
::: code-group

```sh [安装]
# mac 
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
# windows
winget install --id Rustlang.Rustup
```

```sh [环境变量]
source $HOME/.cargo/env
```

```sh [检测]
rustc --version
cargo --version
```

```sh [升级]
rustup update
```

```sh [创建项目]
cargo new [project-name]
```

:::
