---
outline: deep
---
# [官网](https://brew.sh/zh-cn/)

## 安装与配置

::: details
::: code-group

```bash [安装]
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

```bash [更新]
brew update
```

:::

## M1 环境

| 文件地址 | 描述 |
|----|----|
|/opt/homebrew|安装位置|
|/opt/homebrew/Cellar|软件安装位置|

## 安装包

### 安装脚本

```bash
brew install [name]
```

### 安装mac软件包

```bash
brew install --cask [name]
```

## 删除包

```bash
brew uninstall [name]
```

## 查看包

### 查看已安装的包列表

```bash
brew list
```

### 查看已经过时的包

```bash
brew outdated
```

### 查看已安装的包版本信息

```bash
brew info <package>
```

### 查看已安装的包依赖列表

```bash
brew deps <package>
```

### 查看已安装的包依赖树

```bash
brew deps --installed --tree <package>
```

## 升级包

```bash
brew upgrade <package>
```

### 升级所有包

```bash
brew upgrade
```

## 切换源地址

```bash
cd "$(brew --repo)";
git remote -v;
git remote set-url origin https://git.coding.net/homebrew/homebrew.git
```

## 清理包

### 清理所有包

```bash
brew cleanup
```

### 查看可清理的旧版本包

```bash
brew cleanup -n
```
