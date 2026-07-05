import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class AuditLogService {
  constructor(private prisma: PrismaService) {}

  async log(params: {
    action: string;
    entity: string;
    entityId?: string;
    userId?: string;
    companyId?: string;
    metadata?: Record<string, unknown>;
  }) {
    return this.prisma.auditLog.create({
      data: {
        action: params.action,
        entity: params.entity,
        ...(params.entityId && { entityId: params.entityId }),
        ...(params.userId && { userId: params.userId }),
        ...(params.companyId && { companyId: params.companyId }),
        ...(params.metadata && { metadata: params.metadata as any }),
      },
    });
  }
}
