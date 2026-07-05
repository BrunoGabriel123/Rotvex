import { PrismaService } from '../../common/database/prisma.service';
export declare class DashboardService {
    private prisma;
    constructor(prisma: PrismaService);
    getMetrics(companyId: string): Promise<{
        deliveries: {
            total: number;
            pending: number;
            completed: number;
        };
        vehicles: {
            total: number;
            active: number;
        };
        drivers: {
            total: number;
            active: number;
        };
        clients: number;
    }>;
    getDeliveriesByStatus(companyId: string): Promise<(import("@prisma/client").Prisma.PickEnumerable<import("@prisma/client").Prisma.DeliveryGroupByOutputType, "status"[]> & {
        _count: number;
    })[]>;
    getMonthlyCosts(companyId: string): Promise<any[]>;
}
