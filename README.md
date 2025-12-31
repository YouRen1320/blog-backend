nest new blog-backend
% cd blog-backend
pnpm install prisma --save-dev
pnpm add @prisma/client
npx prisma init  
在项目根目录（blog-backend）下，新建一个文件叫 docker-compose.yml
docker compose up -d
修改 .env 文件： 将之前的 SQLite 路径改为数据库连接字符串：DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/blog_db?schema=public"
修改 prisma/schema.prisma： 将 provider 改回 postgresql：

# 1. 启动 PostgreSQL 数据库

docker compose up -d

# 2. 检查数据库是否运行

docker ps

# 3. 启动 NestJS 开发服务器

cd blog-backend
pnpm start:dev

1.修改schema.prisma文件
// 文章模型
model Post {
  id Int @id @default(autoincrement()) // 文章id,自动递增
  title String // 文章标题
  content String? // 文章内容
  published Boolean @default(false) // 是否发布，默认为false(未发布)
  createdAt DateTime @default(now()) // 创建时间,默认为当前时间
}

2.执行npx prisma migrate dev --name init
3.npx prisma studio <http://localhost:51212/查看数据库>

第 4 步）：在 NestJS 中建立“数据库连接器”
目前的状况是：Prisma 既然知道怎么操作数据库了，但 NestJS 这个框架还不知道怎么用 Prisma。 我们需要创建一个 Prisma Service，把它作为一个“工具”注入到 NestJS 里，让整个项目都能随时调用数据库。
4.1 生成文件
在终端（blog-backend 目录下）运行这两行命令，让 NestJS 自动帮我们创建文件：
nest g module prisma
nest g service prisma
(注：g 是 generate 的缩写。这两行命令会创建一个 src/prisma 文件夹，里面有 module 和 service 文件。)
太棒了！既然前面的“地基”（数据库表）已经打好了，接下来我们要开始在 NestJS 代码里搞建设了。

下一步（第 4 步）：在 NestJS 中建立“数据库连接器”

目前的状况是：Prisma 既然知道怎么操作数据库了，但 NestJS 这个框架还不知道怎么用 Prisma。 我们需要创建一个 Prisma Service，把它作为一个“工具”注入到 NestJS 里，让整个项目都能随时调用数据库。

请按照以下 3 个小步骤操作：

4.1 生成文件
在终端（blog-backend 目录下）运行这两行命令，让 NestJS 自动帮我们创建文件：

Bash

nest g module prisma
nest g service prisma
(注：g 是 generate 的缩写。这两行命令会创建一个 src/prisma 文件夹，里面有 module 和 service 文件。)

4.2 编写连接逻辑
打开新生成的 src/prisma/prisma.service.ts 文件。 这个时候里面是空的类，你需要把它改成下面这样：
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
// 让 PrismaService 继承 PrismaClient，这样它就拥有了操作数据库的所有能力
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    // 当 NestJS 模块启动时，自动连接数据库
    await this.$connect();
  }
}
