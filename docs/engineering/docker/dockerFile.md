---
outline: deep
---

## Redis

::: details 配置文件
::: code-group

```markdown [参数说明]
| 参数   | 描述     | 默认值                   |
| ------ | -------- | ------------------------ |
| -d     | 后台运行 | false                    |
| --name | 容器名称 | redis                    |
| -p     | 端口映射 | 6379:6379                |
| -v     | 卷挂载   | /data                    |
| -w     | 工作目录 | /data                    |
| -c     | 配置文件 | /data/redis.conf         |
| -m     | 内存限制 | 100m                     |
| -e     | 环境变量 | -e REDIS_PASSWORD=123456 |
```

```bash [命令]
docker run -d --name redis -p 6379:6379 redis:latest
```

```dockerfile [.Dockerfile]
FROM redis:latest
EXPOSE 6379
VOLUME /data
WORKDIR /data
CMD ["redis-server", "--appendonly", "yes"]
```

```yaml [docker-compose.yaml]
version: '3'
services:
  redis:
    image: redis:latest
    ports:
      - '6379:6379'
```

:::

## Loki

::: details 配置文件
::: code-group

```dockerfile [.Dockerfile]
FROM node:20-alpine
WORKDIR /app
COPY . .
RUN pnpm install --frozen-lockfile
CMD ["pnpm", "run dev"]
```

```dockerCompose [docker-compose.yaml]
version: '3'
services:
  web:
    build: .
    ports:
      - "3000:3000"
  redis:
    image: 'redis:alpine'
    ports:
      - '6379:6379'
    volumes:
      - 'redis_data:/data'
    command: ['redis-server', '--appendonly', 'yes']
    networks:
      - 'redis_network'
    deploy:
      replicas: 3
      resources:
        limits:
          cpus: '1'
          memory: '1G'
```

:::
