import { PrismaService } from '../../common/database/prisma.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
export declare class DriversService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createDriverDto: CreateDriverDto): Promise<{
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
    }>;
    findAll(companyId: string, params: {
        page?: number;
        limit?: number;
        search?: string;
        status?: string;
    }): Promise<{
        data: {
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
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<{
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
    }>;
    update(id: string, updateDriverDto: UpdateDriverDto): Promise<{
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
    }>;
    remove(id: string): Promise<{
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
    }>;
}
