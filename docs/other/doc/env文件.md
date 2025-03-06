---
outline: deep
---
## 什么是 .env 文件

:::warning .env 文件是一个配置文件，用于存储环境变量。主要用途：
:::

- 存储敏感信息（数据库连接信息、API密钥、密码等）
- 环境配置（开发/生产环境标识、端口号等）

## .env 文件命名约定

### 标准命名方式

1. 默认名称：.env（推荐）
   - 最通用的命名方式
   - 被所有工具和框架默认支持
   - 无需额外配置
2. 环境区分：.env.{environment}
   - .env.development
   - .env.production
   - .env.testing
3. 本地覆盖：.env.local
   - 用于本地开发环境的特定配置
   - 通常会被加入到 .gitignore

### 自定义文件名

> 可以使用自定义文件名（如 demo.env），但需要注意：

1. 加载方式的变化

    ```javascript
    // nodejs
    require('dotenv').config({path: 'demo.env'})
    ```

2. 注意事项
   - 某些工具可能无法自动识别非标准命名的文件
   - 需要在配置中显式指定文件路径
   - 团队协作时需要额外的文档说明
   - 可能需要修改构建工具和部署脚本的配置

3. 建议
   - 除非有特殊需求，建议使用标准的 .env 命名
   - 如果使用自定义名称，在项目文档中清晰说明
   - 确保所有团队成员了解非标准命名的原因和使用方法

## .env vs 系统环境变量

1. 作用范围不同
   - .env 文件中的变量仅对特定应用程序有效
   - 系统环境变量对整个操作系统有效
2. 生命周期不同
   - .env 变量只在应用程序运行时被加载和使用
   - 系统环境变量在系统运行期间一直存在
3. 使用方式
   - .env 变量需要通过特定的库来读取（如 Node.js 的 dotenv、Python 的 python-dotenv）
   - 系统环境变量可以直接通过系统API或命令访问
  
## .env 文件格式要求

1. 基本格式：每行一个变量，使用 KEY=VALUE 格式
2. 注释：使用 # 开头的行为注释
3. 引号使用：
    - 值可以不使用引号：DB_HOST=localhost
    - 也可以使用单引号或双引号：DB_HOST='localhost' 或 DB_HOST="localhost"
    - 如果值包含空格，必须使用引号：APP_NAME="My Application"
4. 多行值：
    - 可以使用引号包裹多行值
    - 也可以使用 \ 进行换行
5. 空格规则：
    - 等号两边不应该有空格：KEY=value（推荐）而不是 KEY = value
    - 值中的空格会被保留
6. 特殊字符：
    - 可以使用转义字符 \
    - 支持常见的转义序列如 \n、\t 等
7. 变量引用：
    - 某些实现支持使用 $ 引用其他变量：`URL=https://$DOMAIN`
    - 建议使用 ${VARIABLE} 格式以明确引用范围

## 环境变量命名约定

- 全大写字母：`DATABASE_URL`, `API_KEY`
- 使用下划线分隔：`MYSQL_ROOT_PASSWORD`
- 使用前缀区分应用：`MYAPP_DATABASE_URL`
- 使用前缀区分环境：`DEV_API_URL`, `PROD_API_URL`
- 布尔值使用标准命名：`IS_DEBUG`, `HAS_CACHE`, `ENABLE_FEATURE`
