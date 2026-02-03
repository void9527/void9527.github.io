---
outline: deep
---

## 打包成 Docker 镜像
### 1. 准备 Fastify 项目
```json
{
  "name": "my-fastify-app",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "fastify": "^4.0.0"
  }
}
```
### 2. 创建 Dockerfile
```dockerfile
# 使用 Node.js LTS 版本作为基础镜像
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖（生产环境）
RUN npm ci --only=production

# 复制应用程序代码
COPY . .

# 暴露端口（根据你的 Fastify 端口配置）
EXPOSE 3000

# 启动命令
CMD ["npm", "start"]
```
### 创建 .dockerignore
```text
node_modules
npm-debug.log
.git
.gitignore
.env
Dockerfile
.dockerignore
README.md
test
```
### 4. 构建 Docker 镜像
```bash
# 运行容器
docker run -d -p 3000:3000 --name fastify-app my-fastify-app

# 查看运行状态
docker ps

# 查看日志
docker logs fastify-app
```
### 5. 运行 Docker 容器
```bash
# 运行容器
docker run -d -p 3000:3000 --name fastify-app my-fastify-app

# 查看运行状态
docker ps

# 查看日志
docker logs fastify-app
```
## 高级配置示例
### 使用多阶段构建（优化镜像大小）
```dockerfile
# 构建阶段
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build  # 如果有构建步骤

# 生产阶段
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist
COPY . .

# 以非 root 用户运行（安全性）
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001
USER nodejs

EXPOSE 3000
CMD ["npm", "start"]
```
### 使用环境变量
```dockerfile
FROM node:18-alpine
WORKDIR /app

# 设置环境变量
ENV NODE_ENV=production
ENV PORT=3000

COPY package*.json ./
RUN npm ci --only=production
COPY . .

EXPOSE $PORT
CMD ["node", "server.js"]
```
### 配合 docker-compose
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgres://user:pass@db:5432/dbname
    volumes:
      - ./logs:/app/logs
    depends_on:
      - redis
      - db
    restart: unless-stopped

  redis:
    image: redis:alpine
    ports:
      - "6379:6379"

  db:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: example
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```
