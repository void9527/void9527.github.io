---
outline: deep
---

## 安装 Docker

```bash
brew install docker
```

## 启动 Docker

```bash
brew services start docker
```

## 停止 Docker

```bash
brew services stop docker
```

## 查看 Docker 状态

```bash
brew services list
```

## 查看 Docker 版本

```bash
docker --version
```

## 镜像操作

### 搜索镜像

```bash
docker search <image_name>
```

### 拉取镜像

```bash
docker pull <image_name>
```

### 查看镜像

```bash
docker images
```

### 删除镜像

```bash
docker rmi <image_id>
```

### 删除所有镜像

```bash
docker rmi $(docker images -q)
```

### 提交镜像

```bash
docker commit -m "my_message" -a "my_author" my_container my_image
```

### 打包镜像

```bash
docker save -o my_image.tar my_image
```

### 加载镜像

```bash
docker load -i my_image.tar
```

### 本地登录

```bash
docker login
```

### 本地登出

```bash
docker logout
```

### 命名镜像

```bash
docker tag my_image my_new_image:latest
```

### 推送镜像

```bash
docker push my_image:latest
```

## 容器操作

### 启动容器

```bash
docker run -d --name my_container -p 8080:80 my_image
```

### 查看当前活跃的容器

- -a 查看所有容器
- -l 查看最新创建的容器（默认）
- -n 查看最近创建的 n 个容器

```bash
docker ps
```

### 停止容器

```bash
docker stop my_container
```

### 重启容器

```bash
docker restart my_container
```

### 删除容器

```bash
docker rm my_container
```

### 查看容器日志

```bash
docker logs my_container
```

### 进入容器

```bash
docker exec -it my_container /bin/bash
```

### 复制文件到容器

```bash
docker cp my_file my_container:/app
```

### 查看容器状态

```bash
docker stats my_container
```

### 查看容器信息

```bash
docker inspect my_container
```

### 查看容器端口映射

```bash
docker port my_container
```

## 目录挂载

- -v 挂载到容器
- -v /app:/app 挂载到主机
- -v /app:/app:ro 挂载到主机，并设置为只读
- -v /app:/app:rw 挂载到主机，并设置为可读写
- -v /app:/app:z 挂载到主机，并设置为私有
- -v /app:/app:Z 挂载到主机，并设置为私有

```bash
docker run -d --name my_container -v /app:/app my_image
```

## 容器卷

### 创建卷

```bash
docker volume create my_volume
```
