import { PrismaService } from '../../common/database/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
export declare class OrdersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createOrderDto: CreateOrderDto): Promise<{
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
    }>;
    findAll(companyId: string, params: {
        page?: number;
        limit?: number;
        search?: string;
        status?: string;
    }): Promise<{
        data: ({
            client: {
                name: string;
                email: string | null;
                companyId: string;
                id: string;
                deletedAt: Date | null;
                createdAt: Date;
                updatedAt: Date;
                cnpj: string | null;
                status: string;
                cpf: string | null;
                phone: string | null;
                address: string | null;
                city: string | null;
                state: string | null;
                zipCode: string | null;
            };
        } & {
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
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<{
        client: {
            name: string;
            email: string | null;
            companyId: string;
            id: string;
            deletedAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
            cnpj: string | null;
            status: string;
            cpf: string | null;
            phone: string | null;
            address: string | null;
            city: string | null;
            state: string | null;
            zipCode: string | null;
        };
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
            orderId: string;
            vehicleId: string | null;
            driverId: string | null;
            routeId: string | null;
            completedAt: Date | null;
        }[];
        pickups: {
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
        }[];
    } & {
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
    }>;
    update(id: string, updateOrderDto: UpdateOrderDto): Promise<{
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
    }>;
    remove(id: string): Promise<{
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
    }>;
}
