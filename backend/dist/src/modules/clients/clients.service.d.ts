import { PrismaService } from '../../common/database/prisma.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
export declare class ClientsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createClientDto: CreateClientDto): Promise<{
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
    }>;
    findAll(companyId: string, params: {
        page?: number;
        limit?: number;
        search?: string;
        status?: string;
    }): Promise<{
        data: {
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
    }>;
    update(id: string, updateClientDto: UpdateClientDto): Promise<{
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
    }>;
    remove(id: string): Promise<{
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
    }>;
}
