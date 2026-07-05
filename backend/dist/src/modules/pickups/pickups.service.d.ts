import { PrismaService } from '../../common/database/prisma.service';
import { CreatePickupDto } from './dto/create-pickup.dto';
import { UpdatePickupDto } from './dto/update-pickup.dto';
export declare class PickupsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createPickupDto: CreatePickupDto): Promise<{
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        address: string;
        city: string;
        state: string;
        zipCode: string;
        latitude: number | null;
        longitude: number | null;
        scheduledAt: Date | null;
        orderId: string;
        completedAt: Date | null;
    }>;
    findAll(params: {
        page?: number;
        limit?: number;
        status?: string;
        orderId?: string;
    }): Promise<{
        data: ({
            order: {
                description: string | null;
                companyId: string;
                id: string;
                deletedAt: Date | null;
                createdAt: Date;
                updatedAt: Date;
                status: string;
                orderNumber: string;
                priority: string;
                clientId: string;
            };
        } & {
            id: string;
            deletedAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
            status: string;
            address: string;
            city: string;
            state: string;
            zipCode: string;
            latitude: number | null;
            longitude: number | null;
            scheduledAt: Date | null;
            orderId: string;
            completedAt: Date | null;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<{
        order: {
            description: string | null;
            companyId: string;
            id: string;
            deletedAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
            status: string;
            orderNumber: string;
            priority: string;
            clientId: string;
        };
    } & {
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        address: string;
        city: string;
        state: string;
        zipCode: string;
        latitude: number | null;
        longitude: number | null;
        scheduledAt: Date | null;
        orderId: string;
        completedAt: Date | null;
    }>;
    update(id: string, updatePickupDto: UpdatePickupDto): Promise<{
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        address: string;
        city: string;
        state: string;
        zipCode: string;
        latitude: number | null;
        longitude: number | null;
        scheduledAt: Date | null;
        orderId: string;
        completedAt: Date | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        address: string;
        city: string;
        state: string;
        zipCode: string;
        latitude: number | null;
        longitude: number | null;
        scheduledAt: Date | null;
        orderId: string;
        completedAt: Date | null;
    }>;
}
