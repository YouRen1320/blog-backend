nest new blog-backend
% cd blog-backend
pnpm install prisma --save-dev
npx prisma init  
在项目根目录（blog-backend）下，新建一个文件叫 docker-compose.yml
docker compose up -d
修改 .env 文件： 将之前的 SQLite 路径改为数据库连接字符串：DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/blog_db?schema=public"
修改 prisma/schema.prisma： 将 provider 改回 postgresql：
