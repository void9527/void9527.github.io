---
outline: deep
---
## 查看包

### 查看已安装的包列表

```bash
brew list
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
