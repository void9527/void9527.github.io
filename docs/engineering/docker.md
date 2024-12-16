---
outline: deep
---
# 概要

:::details 概念

1. 容器（Container）
   - 定义：容器是镜像的一个实例，是运行中的应用程序。每个容器都是一个独立的环境，包含了应用程序及其所有依赖。
   - 作用：容器提供了一个隔离的环境，使得应用程序可以在不同的系统上以相同的方式运行。容器可以启动、停止、删除和重启。
2. 镜像（Image）
   - 定义：镜像是一个只读的模板，用于创建容器。镜像包含了应用程序及其运行所需的所有文件、库和环境设置。
   - 作用：镜像是容器的基础，提供了应用程序的运行环境。可以通过 Docker Hub 或其他镜像仓库下载和共享镜像。
3. 卷（Volume）
   - 定义：卷是 Docker 提供的一种持久化数据存储机制，可以在容器之间共享数据。
   - 作用：卷用于保存容器生成的数据，确保数据在容器重启或删除后仍然存在。使用卷可以避免数据丢失，并且可以在多个容器之间共享数据。
4. Dockerfile
   - 定义：Dockerfile 是一个文本文件，包含了一系列指令，用于自动化创建 Docker 镜像的过程。
   - 作用：通过 Dockerfile，开发者可以定义如何构建镜像，包括基础镜像、安装依赖、复制文件和设置环境变量等。使用 docker build 命令可以根据 Dockerfile 创建镜像。
5. 网络（Network）
   - 定义：Docker 网络是容器之间和容器与外部世界之间的通信方式。
   - 作用：Docker 提供了多种网络模式（如 bridge、host、overlay 等），使得容器可以相互通信或与外部服务交互。网络配置可以帮助管理容器的访问权限和流量。

6. 服务（Service）
   - 定义：在 Docker Swarm 模式下，服务是一个定义了如何运行容器的抽象。
   - 作用：服务允许用户在集群中管理和扩展容器。通过服务，用户可以定义容器的数量、更新策略和负载均衡等。
7. 任务（Task）
   - 定义：任务是 Docker Swarm 中服务的一个实例，表示一个正在运行的容器。
   - 作用：任务负责执行服务的具体工作，Swarm 会根据服务的定义自动管理任务的创建、调度和监控。
8. Docker Hub
   - 定义：Docker Hub 是一个公共的镜像仓库，用户可以在其中存储和共享 Docker 镜像。
   - 作用：Docker Hub 提供了一个平台，开发者可以从中下载公共镜像，也可以将自己的镜像上传到 Hub 以供他人使用。

:::

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

### 创建镜像

```bash
docker build -f 
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

## 存储

:::details 目录挂载与卷映射的区别

在 Docker 中，目录挂载（bind mount）和卷映射（volume）都是用于持久化数据的方式，但它们之间有一些重要的区别。以下是这两者的主要区别：

1. 定义
   - **目录挂载（Bind Mount）**：
       - 目录挂载是将主机上的一个目录或文件直接挂载到容器内的指定路径。它允许容器访问主机文件系统中的特定位置。
   - **卷映射（Volume）**：
      - 卷是 Docker 管理的持久化存储，存储在 Docker 的管理目录中（通常在 `/var/lib/docker/volumes/`）。
      - 卷是由 Docker 创建和管理的，容器可以通过卷来持久化数据。
2. 数据存储位置
   - **目录挂载**：
       - 数据存储在主机的文件系统中，直接与主机的目录或文件相关联。
   - **卷映射**：
     - 数据存储在 Docker 的管理目录中，Docker 负责管理卷的生命周期。
3. 生命周期
   - **目录挂载**：
       - 目录挂载的生命周期与主机上的目录或文件相同。如果删除主机上的目录，容器将无法访问该目录。
   - **卷映射**：
     - 卷的生命周期与容器无关。即使容器被删除，卷仍然存在，数据不会丢失。可以在`多个容器之间共享卷`。
4. 性能
   - **目录挂载**：
     - 由于直接访问主机文件系统，性能可能会受到主机文件系统的影响，尤其是在 Linux 上。
   - **卷映射**：
     - 卷通常在 Docker 的管理下，性能更优，因为 Docker 可以优化卷的存储和访问。

5. 使用方式
   - **目录挂载**：
     - 使用 `-v` 或 `--mount` 选项时指定主机路径。例如：

       ```bash
       docker run -v /host/path:/container/path my_image
       ```

   - **卷映射**：
     - 使用 `-v` 或 `--mount` 选项时指定卷名称。例如：

       ```bash
       docker run -v my_volume:/container/path my_image
       ```

6. 适用场景
   - **目录挂载**：
     - 适用于需要直接访问主机文件系统的场景，例如开发环境、调试等。
   - **卷映射**：
     - 适用于需要持久化数据的生产环境，尤其是需要在多个容器之间共享数据的场景。

总结

- **目录挂载** 直接与主机文件系统关联，适合开发和调试。
- **卷映射** 是 Docker 管理的持久化存储，适合生产环境和数据共享。

:::

### 目录挂载

:::info 作用

- 内外数据实时同步
- 关闭容器，数据不丢失

:::

:::details 参数

- -v 挂载到容器
- -v /app:/app 挂载到主机
- -v /app:/app:ro 挂载到主机，并设置为只读
- -v /app:/app:rw 挂载到主机，并设置为可读写
- -v /app:/app:z 挂载到主机，并设置为私有
- -v /app:/app:Z 挂载到主机，并设置为私有
:::

```bash
docker run -d --name my_container -v /app:/app my_image
```

### 数据卷

#### 创建数据卷

```bash
docker volume create my_volume
```

#### 查看卷

```bash
docker volume ls
```

#### 查看卷详情

```bash
docker volume inspect my_volume
```

## 网络 （容器之间网络通讯）

- docker 每个容器启动后都会分配一个独立的IP地址，容器之间可以直接使用容器IP直接通讯，端口直接使用容器的端口即可

### 查看IP地址

```bash
docker container inspect my_image
```
