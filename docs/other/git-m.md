---
outline: deep
---
## 抛弃历史记录创建新分支

:::details

> 拉取一个新的仓库 `--depth 1`

```bash
git clone --depth 1 <仓库URL>
```

> 在现有仓库中抛弃历史提交

```bash
# 切换到你要保留的分支（例如 main）：
git checkout main
# 创建一个新的孤立分支（例如 new-branch）：
git checkout --orphan new-branch
# 添加所有文件到新分支：
git add -A
# 提交更改：
git commit -m "Initial commit (抛弃历史)"
# 删除原来的分支（例如 main）：
git branch -D main
# 将新分支重命名为原来的分支名（例如 main）：
git branch -m main
# 强制推送到远程仓库（如果需要）：
git push -f origin main
```

:::
