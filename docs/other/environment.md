---
outline: deep
---
# 环境配置

## Tauri

::: details
::: code-group

```sh [创建项目]
pnpm create tauri-app
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
