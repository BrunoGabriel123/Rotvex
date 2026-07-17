import { Module } from '@nestjs/common';
import { AuditLogsService } from './audit-logs.service';
import { AuditLogsInterceptor } from './audit-logs.interceptor';
import { AuditLogsController } from './audit-logs.controller';

@Module({
  controllers: [AuditLogsController],
  providers: [AuditLogsService, AuditLogsInterceptor],
  exports: [AuditLogsService, AuditLogsInterceptor],
})
export class AuditLogsModule {}
