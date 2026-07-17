import { Module } from '@nestjs/common';
import { AuditLogsService } from './audit-logs.service';
import { AuditLogsInterceptor } from './audit-logs.interceptor';
import { AuditLogsController } from './audit-logs.controller';
import { PrismaService } from '../../common/database/prisma.service';

@Module({
  controllers: [AuditLogsController],
  providers: [AuditLogsService, AuditLogsInterceptor, PrismaService],
  exports: [AuditLogsService, AuditLogsInterceptor],
})
export class AuditLogsModule {}
