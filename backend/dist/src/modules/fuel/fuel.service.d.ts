import { PrismaService } from '../../common/database/prisma.service';
import { CreateFuelDto } from './dto/create-fuel.dto';
import { UpdateFuelDto } from './dto/update-fuel.dto';
export declare class FuelService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createFuelDto: CreateFuelDto): Promise<{
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        vehicleId: string;
        cost: number;
        liters: number;
        fuelType: string;
        station: string | null;
        odometer: number | null;
    }>;
    findAll(params: {
        page?: number;
        limit?: number;
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
            id: string;
            deletedAt: Date | null;
            createdAt: Date;
            vehicleId: string;
            cost: number;
            liters: number;
            fuelType: string;
            station: string | null;
            odometer: number | null;
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
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        vehicleId: string;
        cost: number;
        liters: number;
        fuelType: string;
        station: string | null;
        odometer: number | null;
    }>;
    update(id: string, updateFuelDto: UpdateFuelDto): Promise<{
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        vehicleId: string;
        cost: number;
        liters: number;
        fuelType: string;
        station: string | null;
        odometer: number | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        vehicleId: string;
        cost: number;
        liters: number;
        fuelType: string;
        station: string | null;
        odometer: number | null;
    }>;
}
