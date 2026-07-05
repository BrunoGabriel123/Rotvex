import { PrismaService } from '../../common/database/prisma.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
export declare class VehiclesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createVehicleDto: CreateVehicleDto): Promise<{
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
    }>;
    findAll(companyId: string, params: {
        page?: number;
        limit?: number;
        search?: string;
        status?: string;
    }): Promise<{
        data: {
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
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<{
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
    }>;
    update(id: string, updateVehicleDto: UpdateVehicleDto): Promise<{
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
    }>;
    remove(id: string): Promise<{
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
    }>;
}
