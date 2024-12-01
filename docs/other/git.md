---
outline: deep
---

## 暂存

```bash
git add .
```

## 拉取

```bash
git pull origin main
```

## 提交

```bash
git commit -m "commit message"
```

## 推送

```bash
git push origin main
```

## 分支状态

### 查看当前分支

```bash
git branch
```

### 查看当前分支状态

```bash
git status
```

### 查看提交记录

```bash
git log
```

### 查看当前分支提交记录-简短

```bash
git log --oneline
```

## 本地分支操作

### 创建分支

```bash
git branch <branch-name>
```

### 切换分支

```bash
git checkout <branch-name>
```

### 合并分支

```bash
git merge <branch-name>
```

### 删除分支

```bash
git branch -d <branch-name>
```

## 远程分支操作

### 创建远程分支

```bash
git push origin <branch-name>
```

### 删除远程分支

```bash
git push origin --delete <branch-name>
```

### 创建远程分支并推送

```bash
git push origin <branch-name>
```

### 创建远程分支并推送并删除本地分支

```bash
git push origin <branch-name> --delete
```

## 创建.gitignore 文件

```bash
touch .gitignore
```

## 存储 stash

### 存储

```bash
git stash
```

### 查看存储

```bash
git stash list
```

### 应用最后一个存储

```bash
git stash apply
```

### 应用指定存储

```bash
git stash apply stash@{1}
```

### 删除指定存储

```bash
git stash drop stash@{1}
```

### 删除所有存储

```bash
git stash clear
```

### 显示做了哪些改动

```bash
git stash show
```

### 显示做了哪些改动-简短

```bash
git stash show -p
```

## 标签 Tag

### 查看标签

```bash
git tag
```

### 创建标签

```bash
git tag <tag-name>
```

### 删除标签

```bash
git tag -d <tag-name>
```

### 推送标签

```bash
git push origin <tag-name>
```

### 删除远程标签

```bash
git push origin --delete <tag-name>
```

## remote 操作

### 查看 remote 分支

```bash
git remote -v
```

### 添加 remote

```bash
git remote add <remote-name> <remote-url>
```

### 删除 remote

```bash
git remote remove <remote-name>
```
