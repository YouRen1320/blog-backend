import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // 标记为全局模块，这样其他模块就可以导入使用
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // 导出 PrismaService，这样其他模块就可以导入使用
})
export class PrismaModule {}
