import { PrismaService } from '../database/prisma.service';
export declare class AuditLogService {
    private prisma;
    constructor(prisma: PrismaService);
    log(params: {
        action: string;
        entity: string;
        entityId?: string;
        userId?: string;
        companyId?: string;
        metadata?: Record<string, unknown>;
    }): Promise<{
        companyId: string | null;
        id: string;
        createdAt: Date;
        userId: string | null;
        action: string;
        entity: string;
        entityId: string | null;
        metadata: import("@prisma/client/runtime/client").JsonValue | null;
    }>;
}
