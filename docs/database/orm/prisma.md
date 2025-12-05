---
outline: deep
---

# Prisma

## 安装

:::details

```bash
npm install prisma @prisma/client
npx prisma init
```

:::

## Schema 定义

:::details 定义用户和文章模型（一对多关系）

```prisma [prisma/schema.prisma]
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  posts     Post[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)
  authorId  Int
  author    User     @relation(fields: [authorId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

:::

## Fastify 服务示例

:::details 完整的增删改查和联表查询示例

::: code-group

```ts [server.ts]
import Fastify from 'fastify';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const fastify = Fastify({ logger: true });

// 启动服务器
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log('Server running on http://localhost:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
```

```ts [routes/users.ts]
import { FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function userRoutes(fastify: FastifyInstance) {
  // 创建用户
  fastify.post('/users', async (request, reply) => {
    const { name, email } = request.body as { name: string; email: string };
    
    const user = await prisma.user.create({
      data: {
        name,
        email,
      },
    });
    
    return reply.code(201).send(user);
  });

  // 查询所有用户（包含关联的文章）
  fastify.get('/users', async (request, reply) => {
    const users = await prisma.user.findMany({
      include: {
        posts: true, // 联表查询，包含用户的所有文章
      },
    });
    
    return reply.send(users);
  });

  // 根据ID查询用户（包含关联的文章）
  fastify.get('/users/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      include: {
        posts: true, // 联表查询
      },
    });
    
    if (!user) {
      return reply.code(404).send({ error: 'User not found' });
    }
    
    return reply.send(user);
  });

  // 更新用户
  fastify.put('/users/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const { name, email } = request.body as { name?: string; email?: string };
    
    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        ...(name && { name }),
        ...(email && { email }),
      },
    });
    
    return reply.send(user);
  });

  // 删除用户
  fastify.delete('/users/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    
    await prisma.user.delete({
      where: { id: parseInt(id) },
    });
    
    return reply.code(204).send();
  });
}
```

```ts [routes/posts.ts]
import { FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function postRoutes(fastify: FastifyInstance) {
  // 创建文章
  fastify.post('/posts', async (request, reply) => {
    const { title, content, published, authorId } = request.body as {
      title: string;
      content?: string;
      published?: boolean;
      authorId: number;
    };
    
    const post = await prisma.post.create({
      data: {
        title,
        content,
        published: published ?? false,
        authorId,
      },
    });
    
    return reply.code(201).send(post);
  });

  // 查询所有文章（包含关联的作者信息）
  fastify.get('/posts', async (request, reply) => {
    const posts = await prisma.post.findMany({
      include: {
        author: true, // 联表查询，包含文章的作者信息
      },
    });
    
    return reply.send(posts);
  });

  // 根据ID查询文章（包含关联的作者信息）
  fastify.get('/posts/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    
    const post = await prisma.post.findUnique({
      where: { id: parseInt(id) },
      include: {
        author: true, // 联表查询
      },
    });
    
    if (!post) {
      return reply.code(404).send({ error: 'Post not found' });
    }
    
    return reply.send(post);
  });

  // 更新文章
  fastify.put('/posts/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const { title, content, published } = request.body as {
      title?: string;
      content?: string;
      published?: boolean;
    };
    
    const post = await prisma.post.update({
      where: { id: parseInt(id) },
      data: {
        ...(title && { title }),
        ...(content !== undefined && { content }),
        ...(published !== undefined && { published }),
      },
    });
    
    return reply.send(post);
  });

  // 删除文章
  fastify.delete('/posts/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    
    await prisma.post.delete({
      where: { id: parseInt(id) },
    });
    
    return reply.code(204).send();
  });

  // 查询特定用户的所有文章（联表查询）
  fastify.get('/users/:userId/posts', async (request, reply) => {
    const { userId } = request.params as { userId: string };
    
    const posts = await prisma.post.findMany({
      where: {
        authorId: parseInt(userId),
      },
      include: {
        author: true, // 包含作者信息
      },
    });
    
    return reply.send(posts);
  });
}
```

```ts [server.ts - 完整版本]
import Fastify from 'fastify';
import { PrismaClient } from '@prisma/client';
import { userRoutes } from './routes/users';
import { postRoutes } from './routes/posts';

const prisma = new PrismaClient();
const fastify = Fastify({ logger: true });

// 注册路由
fastify.register(userRoutes);
fastify.register(postRoutes);

// 优雅关闭
const gracefulShutdown = async () => {
  await prisma.$disconnect();
  await fastify.close();
  process.exit(0);
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

// 启动服务器
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log('Server running on http://localhost:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
```

:::

## 常用查询示例

:::details 更多查询场景

::: code-group

```ts [条件查询]
// 查询已发布的文章
const publishedPosts = await prisma.post.findMany({
  where: {
    published: true,
  },
  include: {
    author: true,
  },
});

// 查询包含特定关键词的文章
const searchPosts = await prisma.post.findMany({
  where: {
    OR: [
      { title: { contains: '关键词' } },
      { content: { contains: '关键词' } },
    ],
  },
});
```

```ts [分页查询]
const page = 1;
const pageSize = 10;

const posts = await prisma.post.findMany({
  skip: (page - 1) * pageSize,
  take: pageSize,
  include: {
    author: true,
  },
  orderBy: {
    createdAt: 'desc',
  },
});
```

```ts [嵌套查询]
// 查询用户及其已发布的文章
const usersWithPublishedPosts = await prisma.user.findMany({
  include: {
    posts: {
      where: {
        published: true,
      },
    },
  },
});
```

```ts [聚合查询]
// 统计每个用户的文章数量
const userPostCounts = await prisma.user.findMany({
  include: {
    _count: {
      select: {
        posts: true,
      },
    },
  },
});

// 使用聚合函数
const stats = await prisma.post.aggregate({
  _count: {
    id: true,
  },
  where: {
    published: true,
  },
});
```

:::

## 数据库迁移

:::details

```bash
# 生成迁移文件
npx prisma migrate dev --name init

# 应用迁移
npx prisma migrate deploy

# 生成 Prisma Client
npx prisma generate
```

:::
