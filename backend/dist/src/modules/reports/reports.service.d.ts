import { PrismaService } from '../../common/database/prisma.service';
export declare class ReportsService {
    private prisma;
    constructor(prisma: PrismaService);
    getDeliveriesReport(companyId: string, params: {
        startDate?: string;
        endDate?: string;
    }): Promise<({
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
        } | null;
        driver: {
            name: string;
            companyId: string;
            id: string;
            deletedAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
            status: string;
            cpf: string | null;
            cnh: string | null;
            cnhType: string | null;
            phone: string | null;
        } | null;
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
        completedAt: Date | null;
        orderId: string;
        vehicleId: string | null;
        driverId: string | null;
        routeId: string | null;
    })[]>;
    getFleetReport(companyId: string): Promise<({
        _count: {
            maintenances: number;
            fuels: number;
            deliveries: number;
        };
    } & {
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
    })[]>;
    getDriversReport(companyId: string): Promise<({
        _count: {
            deliveries: number;
        };
    } & {
        name: string;
        companyId: string;
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        cpf: string | null;
        cnh: string | null;
        cnhType: string | null;
        phone: string | null;
    })[]>;
    getCostsReport(companyId: string, params: {
        startDate?: string;
        endDate?: string;
    }): Promise<{
        description: string;
        companyId: string;
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        amount: number;
        category: string;
        date: Date;
    }[]>;
    getClientsReport(companyId: string): Promise<({
        _count: {
            orders: number;
        };
    } & {
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
    })[]>;
}
