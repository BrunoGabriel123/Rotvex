import { PrismaService } from '../../common/database/prisma.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
export declare class PermissionsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createPermissionDto: CreatePermissionDto): Promise<{
        description: string | null;
        name: string;
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        resource: string;
        action: string;
    }>;
    findAll(params: {
        page?: number;
        limit?: number;
        search?: string;
    }): Promise<{
        data: {
            description: string | null;
            name: string;
            id: string;
            deletedAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
            resource: string;
            action: string;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<{
        description: string | null;
        name: string;
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        resource: string;
        action: string;
    }>;
    update(id: string, updatePermissionDto: UpdatePermissionDto): Promise<{
        description: string | null;
        name: string;
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        resource: string;
        action: string;
    }>;
    remove(id: string): Promise<{
        description: string | null;
        name: string;
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        resource: string;
        action: string;
    }>;
}
