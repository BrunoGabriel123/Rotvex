import { PrismaService } from '../../common/database/prisma.service';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
export declare class RoutesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createRouteDto: CreateRouteDto): Promise<{
        description: string | null;
        name: string;
        companyId: string;
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        status: string;
    }>;
    findAll(companyId: string, params: {
        page?: number;
        limit?: number;
        search?: string;
        status?: string;
    }): Promise<{
        data: ({
            deliveries: {
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
                completedAt: Date | null;
                orderId: string;
                vehicleId: string | null;
                driverId: string | null;
                routeId: string | null;
            }[];
        } & {
            description: string | null;
            name: string;
            companyId: string;
            id: string;
            deletedAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
            status: string;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<{
        deliveries: {
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
            completedAt: Date | null;
            orderId: string;
            vehicleId: string | null;
            driverId: string | null;
            routeId: string | null;
        }[];
    } & {
        description: string | null;
        name: string;
        companyId: string;
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        status: string;
    }>;
    update(id: string, updateRouteDto: UpdateRouteDto): Promise<{
        description: string | null;
        name: string;
        companyId: string;
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        status: string;
    }>;
    remove(id: string): Promise<{
        description: string | null;
        name: string;
        companyId: string;
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        status: string;
    }>;
}
