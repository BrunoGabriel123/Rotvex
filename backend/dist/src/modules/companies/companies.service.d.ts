import { PrismaService } from '../../common/database/prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
export declare class CompaniesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createCompanyDto: CreateCompanyDto): Promise<{
        name: string;
        id: string;
        active: boolean;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        cnpj: string | null;
    }>;
    findAll(params: {
        page?: number;
        limit?: number;
        search?: string;
    }): Promise<{
        data: {
            name: string;
            id: string;
            active: boolean;
            deletedAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
            cnpj: string | null;
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
        id: string;
        active: boolean;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        cnpj: string | null;
    }>;
    update(id: string, updateCompanyDto: UpdateCompanyDto): Promise<{
        name: string;
        id: string;
        active: boolean;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        cnpj: string | null;
    }>;
    remove(id: string): Promise<{
        name: string;
        id: string;
        active: boolean;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        cnpj: string | null;
    }>;
}
