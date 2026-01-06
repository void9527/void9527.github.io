---
outline: deep
---
# mysql

## 安装

:::details
:::code-group

```bash
brew install mysql
```
:::

## 连接

:::details
:::code-group

```bash [brew]

```
:::
## 重置Root密码

:::details

### 1. 停止MySQL
```bash 
sudo systemctl stop mysqld
```
### 2. 安全模式启动
```bash 
sudo mysqld --skip-grant-tables --skip-networking &
```

### 3. 等待几秒让MySQL启动
```bash 
sleep 5
```

### 4. 连接到MySQL
```bash 
mysql -u root
```

### 5. 在MySQL命令行中执行（重要顺序！）
```bash 
USE mysql;

-- 对于MySQL 8.0，先清空root密码
UPDATE user SET authentication_string='' WHERE user='root';
FLUSH PRIVILEGES;
EXIT;
```

### 6. 停止mysqld进程
```bash 
sudo pkill mysqld
sleep 2
```

### 7. 正常启动MySQL
```bash 
sudo systemctl start mysqld
``` 

### 8. 用空密码登录
```bash 
mysql -u root
```

### 9. 设置新密码
```bash 
ALTER USER 'root'@'localhost' IDENTIFIED BY 'NewPassword123!';
FLUSH PRIVILEGES;
```

### 10. 用新密码登录
```bash 
mysql -u root -p
```
:::