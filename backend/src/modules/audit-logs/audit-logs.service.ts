import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/database/prisma.service';

export interface CreateAuditLogDto {
  action: string;
  entity: string;
  entityId?: string;
  userId?: string;
  companyId?: string;
  metadata?: Record<string, any>;
}

@Injectable()
export class AuditLogsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateAuditLogDto) {
    return this.prisma.auditLog.create({
      data: {
        action: dto.action,
        entity: dto.entity,
        entityId: dto.entityId,
        userId: dto.userId,
        companyId: dto.companyId,
        metadata: dto.metadata,
      },
    });
  }

  async findByCompany(companyId: string, skip = 0, take = 50) {
    const [logs, total] = await Promise.all([
      this.prisma.auditLog.findMany({
        where: { companyId },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take,
      }),
      this.prisma.auditLog.count({ where: { companyId } }),
    ]);

    return { logs, total };
  }

  async findByUser(userId: string, skip = 0, take = 50) {
    const [logs, total] = await Promise.all([
      this.prisma.auditLog.findMany({
        where: { userId },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take,
      }),
      this.prisma.auditLog.count({ where: { userId } }),
    ]);

    return { logs, total };
  }

  async findByEntity(entity: string, entityId?: string, skip = 0, take = 50) {
    const where: { entity: string; entityId?: string } = { entity };
    if (entityId) {
      where.entityId = entityId;
    }

    const [logs, total] = await Promise.all([
      this.prisma.auditLog.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take,
      }),
      this.prisma.auditLog.count({ where }),
    ]);

    return { logs, total };
  }
}
