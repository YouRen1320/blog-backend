import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// 让 PrismaService 继承 PrismaClient，这样它就拥有了操作数据库的所有能力
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  // 在 Nest.js 模块初始化时连接数据库
  async onModuleInit() {
    await this.$connect(); // 连接数据库
  }
}
