import { PrismaService } from '../../common/database/prisma.service';
import { CreateMaintenanceDto } from './dto/create-maintenance.dto';
import { UpdateMaintenanceDto } from './dto/update-maintenance.dto';
export declare class MaintenanceService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createMaintenanceDto: CreateMaintenanceDto): Promise<{
        type: string;
        description: string | null;
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        scheduledAt: Date | null;
        completedAt: Date | null;
        vehicleId: string;
        cost: number | null;
    }>;
    findAll(params: {
        page?: number;
        limit?: number;
        status?: string;
        vehicleId?: string;
    }): Promise<{
        data: ({
            vehicle: {
                type: string;
                companyId: string;
                id: string;
                deletedAt: Date | null;
                createdAt: Date;
                updatedAt: Date;
                year: number;
                plate: string;
                model: string;
                status: string;
            };
        } & {
            type: string;
            description: string | null;
            id: string;
            deletedAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
            status: string;
            scheduledAt: Date | null;
            completedAt: Date | null;
            vehicleId: string;
            cost: number | null;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<{
        vehicle: {
            type: string;
            companyId: string;
            id: string;
            deletedAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
            year: number;
            plate: string;
            model: string;
            status: string;
        };
    } & {
        type: string;
        description: string | null;
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        scheduledAt: Date | null;
        completedAt: Date | null;
        vehicleId: string;
        cost: number | null;
    }>;
    update(id: string, updateMaintenanceDto: UpdateMaintenanceDto): Promise<{
        type: string;
        description: string | null;
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        scheduledAt: Date | null;
        completedAt: Date | null;
        vehicleId: string;
        cost: number | null;
    }>;
    remove(id: string): Promise<{
        type: string;
        description: string | null;
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        scheduledAt: Date | null;
        completedAt: Date | null;
        vehicleId: string;
        cost: number | null;
    }>;
}
